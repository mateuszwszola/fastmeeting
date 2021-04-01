import { getRoom } from '@/lib/db';
import { useEffect, useReducer } from 'react';

function reducer(_state, action) {
  const { type, payload } = action;

  switch (type) {
    case 'success':
      return { isLoading: false, error: null, room: payload };
    case 'error':
      return { isLoading: false, error: payload, room: null };
    default:
      throw new Error(
        `Action type: ${type} in useDbRoom reducer does not exists`
      );
  }
}

export default function useDbRoom(roomSlug) {
  const [state, dispatch] = useReducer(reducer, {
    room: null,
    isLoading: true,
    error: null,
  });

  const setRoom = (room) => dispatch({ type: 'success', payload: room });

  useEffect(() => {
    if (!roomSlug) return;

    getRoom(roomSlug)
      .then(setRoom)
      .catch((err) => {
        dispatch({ type: 'error', payload: err });
      });
  }, [roomSlug]);

  return { ...state, setRoom };
}
