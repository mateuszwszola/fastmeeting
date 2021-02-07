import { createContext, useContext, useCallback } from 'react';
import useSetState from '@/hooks/useSetState';
import { slugify } from '@/utils/helpers';

const initialState = {
  username: '',
  roomName: '',
  token: null,
};

const MeetingContext = createContext(null);

export const MeetingProvider = (props) => {
  const [state, setState] = useSetState(initialState);

  const joinRoom = useCallback(
    (username, roomName) => {
      setState({
        username,
        roomName: slugify(roomName),
      });
    },
    [setState]
  );

  const contextValue = {
    ...state,
    joinRoom,
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
