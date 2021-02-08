import { createContext, useContext, useCallback } from 'react';
import useSetState from '@/hooks/useSetState';
import { slugify } from '@/utils/helpers';

const initialState = {
  identity: '',
  roomName: '',
  token: null,
  isFetching: false,
  error: null,
};

const MeetingContext = createContext(null);

export const MeetingProvider = (props) => {
  const [state, setState] = useSetState(initialState);

  const getToken = useCallback(
    async (identity, roomName) => {
      setState({ isFetching: true });

      const headers = new window.Headers();
      const params = new window.URLSearchParams({ identity, roomName });

      return fetch(`/api/videoToken?${params}`, { headers })
        .then((res) => res.json())
        .then(({ token }) => {
          setState({ isFetching: false, token });
          return token;
        })
        .catch((error) => {
          setState({ error, isFetching: false });
          return Promise.reject(error);
        });
    },
    [setState]
  );

  const joinRoom = useCallback(
    (identity, roomName) => {
      setState({
        identity,
        roomName: slugify(roomName),
      });
    },
    [setState]
  );

  const leaveRoom = useCallback(() => {
    setState({ token: null });
  }, [setState]);

  const contextValue = {
    ...state,
    joinRoom,
    getToken,
    leaveRoom,
  };

  return <MeetingContext.Provider value={contextValue} {...props} />;
};

export function useMeeting() {
  const context = useContext(MeetingContext);
  if (!context) {
    throw new Error('useMeeting must be used within MeetingProvider');
  }
  return context;
}
