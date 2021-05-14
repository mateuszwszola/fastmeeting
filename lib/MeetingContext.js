import { createContext, useContext, useCallback, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import useSetState from '@/hooks/useSetState';
import fetcher from '@/utils/fetcher';
import { useAuth } from './AuthContext';

const initialState = {
  userId: '',
  userDisplayName: '',
  roomName: '',
  isFetching: false,
  error: null,
};

const localStorageIdentityKey = 'fastMeetingIdentity';

const MeetingContext = createContext(null);

export default function MeetingProvider({ children }) {
  const [state, setState] = useSetState(initialState);
  const { user } = useAuth();

  useEffect(() => {
    const identityJSON = localStorage.getItem(localStorageIdentityKey) || null;

    if (identityJSON) {
      const identity = JSON.parse(identityJSON);

      setState({
        userId: identity.id,
        userDisplayName: identity.name,
      });
    }
  }, [setState]);

  const createRoom = useCallback(async () => {
    setState({ isFetching: true });

    return fetcher('/api/room/create', { method: 'POST' })
      .then(({ roomName }) => {
        setState({ isFetching: false, roomName });
        return { roomName };
      })
      .catch((error) => {
        setState({ isFetching: false, error });
        return Promise.reject(error);
      });
  }, [setState]);

  const joinRoom = useCallback(
    async (userDisplayName, roomName) => {
      setState({ isFetching: true, userDisplayName });

      let userId = user?.id;

      if (!userId) {
        userId = state.userId || uuidv4();
      }

      localStorage.setItem(
        localStorageIdentityKey,
        JSON.stringify({ id: userId, name: userDisplayName })
      );

      return fetcher('/api/room/join', {
        body: { roomName, userId, userDisplayName },
      })
        .then(({ token, roomName }) => {
          setState({ isFetching: false, roomName });
          return { token, roomName };
        })
        .catch((error) => {
          setState({ error, isFetching: false });
          return Promise.reject(error);
        });
    },
    [setState, state.userId, user?.id]
  );

  const contextValue = {
    ...state,
    createRoom,
    joinRoom,
    setError: (error) => setState({ error }),
  };

  return (
    <MeetingContext.Provider value={contextValue}>
      {children}
    </MeetingContext.Provider>
  );
}

export function useMeetingContext() {
  const context = useContext(MeetingContext);
  if (!context) {
    throw new Error('useMeeting must be used within MeetingProvider');
  }
  return context;
}
