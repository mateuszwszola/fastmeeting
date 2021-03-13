import { createContext, useContext, useCallback } from 'react';
import useSetState from '@/hooks/useSetState';
import fetcher from '@/utils/fetcher';

const initialState = {
  identity: '',
  roomName: '',
  isFetching: false,
  token: null,
  error: null,
};

const MeetingContext = createContext(null);

export default function MeetingProvider({ children }) {
  const [state, setState] = useSetState(initialState);

  const createRoom = useCallback(
    async (identity) => {
      setState({ isFetching: true });

      return fetcher('/api/room/create', { body: { identity } })
        .then(({ token, roomName }) => {
          setState({ isFetching: false, token, identity, roomName });
          return { token, roomName };
        })
        .catch((error) => {
          setState({ error, isFetching: false });
          return Promise.reject(error);
        });
    },
    [setState]
  );

  const joinRoom = useCallback(
    async (identity, roomName) => {
      setState({ isFetching: true });

      return fetcher('/api/room/join', { body: { identity, roomName } })
        .then(({ token, roomName }) => {
          setState({ isFetching: false, token, identity, roomName });
          return { token, roomName };
        })
        .catch((error) => {
          setState({ error, isFetching: false });
          return Promise.reject(error);
        });
    },
    [setState]
  );

  const logout = useCallback(() => {
    setState({ token: null });
  }, [setState]);

  const contextValue = {
    ...state,
    createRoom,
    joinRoom,
    logout,
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
