import { createContext, useContext, useCallback } from 'react';
import useSetState from '@/hooks/useSetState';
import fetcher from '@/utils/fetcher';

const initialState = {
  identity: '',
  roomName: '',
  isFetching: false,
  error: null,
};

const MeetingContext = createContext(null);

export default function MeetingProvider({ children }) {
  const [state, setState] = useSetState(initialState);

  const createRoom = useCallback(
    async (identity) => {
      setState({ isFetching: true });

      return fetcher('/api/room/create', { method: 'POST' })
        .then(({ roomName }) => {
          setState({ isFetching: false, roomName, identity });
          return { roomName };
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
          setState({ isFetching: false, identity, roomName });
          return { token, roomName };
        })
        .catch((error) => {
          setState({ error, isFetching: false });
          return Promise.reject(error);
        });
    },
    [setState]
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
