import { createContext, useContext, useCallback, useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';
import fetcher from '@/utils/fetcher';
import { useAuth } from './AuthContext';

const initialState = {
  userId: '',
  userDisplayName: '',
  status: 'idle',
  error: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'fetching': {
      return { ...state, status: 'fetching', error: null };
    }
    case 'resolved': {
      return { ...state, status: 'resolved', error: null };
    }
    case 'rejected': {
      return { ...state, status: 'rejected', error: action.payload.error };
    }
    case 'setIdentity':
      return { ...state, ...action.payload };
    case 'error': {
      return { ...state, status: 'error', error: action.payload.error };
    }
    default: {
      return state;
    }
  }
};

const localStorageIdentityKey = 'fastMeetingIdentity';

const MeetingContext = createContext(null);

export default function MeetingProvider({ children }) {
  const { user } = useAuth();
  const [state, dispatch] = useReducer(
    reducer,
    initialState,
    (initialState) => {
      if (typeof window !== 'undefined') {
        try {
          const identityJSON = window.localStorage.getItem(
            localStorageIdentityKey
          );
          if (identityJSON) {
            const identity = JSON.parse(identityJSON);
            return {
              ...initialState,
              userId: identity.id,
              userDisplayName: identity.name,
            };
          }
        } catch (error) {
          console.log(error);
        }
      }

      return initialState;
    }
  );

  const createRoom = useCallback(async () => {
    dispatch({ type: 'fetching' });

    return fetcher('/api/room/create', { method: 'POST' })
      .then(({ roomName }) => {
        dispatch({ type: 'resolved' });
        return { roomName };
      })
      .catch((error) => {
        dispatch({ type: 'rejected', payload: { error } });
        return Promise.reject(error);
      });
  }, []);

  const joinRoom = useCallback(
    async (userDisplayName, roomName) => {
      dispatch({ type: 'fetching' });

      let userId = user?.id;

      if (!userId) {
        userId = state.userId || uuidv4();
      }

      window.localStorage.setItem(
        localStorageIdentityKey,
        JSON.stringify({ id: userId, name: userDisplayName })
      );

      dispatch({
        type: 'setIdentity',
        payload: {
          userId,
          userDisplayName,
        },
      });

      return fetcher('/api/room/join', {
        body: { roomName, userId, userDisplayName },
      })
        .then(({ token, roomName }) => {
          dispatch({ type: 'resolved' });
          return { token, roomName };
        })
        .catch((error) => {
          dispatch({ type: 'rejected', payload: { error } });
          return Promise.reject(error);
        });
    },
    [state.userId, user?.id]
  );

  const contextValue = {
    ...state,
    isFetching: state.status === 'fetching',
    isError: state.status === 'error',
    createRoom,
    joinRoom,
    setError: (error) => dispatch({ type: 'error', payload: { error } }),
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
