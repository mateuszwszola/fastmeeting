import { fetchRoom } from '@/lib/db';
import { useEffect, useReducer } from 'react';

function reducer(state, action) {
  const { type, payload } = action;

  switch (type) {
    case 'success':
      return { isLoading: false, error: null, room: payload };
    case 'error':
      return { isLoading: false, error: payload, room: null };
    default:
      throw new Error();
  }
}

export default function useDbRoom(roomSlug) {
  const [state, dispatch] = useReducer(reducer, {
    room: null,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    fetchRoom(roomSlug)
      .then((room) => {
        dispatch({ type: 'success', payload: room });
      })
      .catch((err) => {
        dispatch({ type: 'error', payload: err });
      });
  }, [roomSlug]);

  return state;
}
