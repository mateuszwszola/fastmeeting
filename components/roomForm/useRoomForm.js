import { useMemo, useReducer } from 'react';
import { useRouter } from 'next/router';
import { useMeetingContext } from '@/lib/MeetingContext';
import { getRoom } from '@/lib/db';

const initialState = {
  isCreating: true,
  status: 'idle',
  error: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'toggleCreate':
      return { ...state, isCreating: !state.isCreating, error: null };
    case 'submit':
      return { ...state, status: 'submitting', error: null };
    case 'error':
      return { ...state, status: 'error', error: action.payload.error };
    default:
      throw new Error(
        `Action type: ${action.type} used in useRoomForm reducer does not exists`
      );
  }
};

export default function useRoomForm() {
  const { createRoom } = useMeetingContext();
  const router = useRouter();
  const [state, dispatch] = useReducer(reducer, initialState);

  const handlers = useMemo(
    () => ({
      onCreateToggle() {
        dispatch({ type: 'toggleCreate' });
      },
      onSubmit: ({ userDisplayName, roomName }) => async (e) => {
        e.preventDefault();

        const { isCreating } = state;

        if (!userDisplayName || (!isCreating && !roomName)) return;

        dispatch({ type: 'submit' });

        try {
          if (isCreating) {
            const { roomName } = await createRoom();
            router.push(`/${roomName}`);
          } else {
            // Make sure room exists before joining it
            const room = await getRoom(roomName);
            if (!room) {
              throw new Error(`Room '${roomName}' does not exists`);
            }
            router.push(`/${roomName}`);
          }
        } catch (error) {
          dispatch({ type: 'error', payload: { error } });
        }
      },
    }),
    [createRoom, router, state]
  );

  return {
    ...state,
    isSubmitting: state.status === 'submitting',
    isError: state.status === 'error',
    ...handlers,
  };
}
