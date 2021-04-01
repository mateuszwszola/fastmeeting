import { useMemo, useReducer } from 'react';
import { useRouter } from 'next/router';
import { useMeetingContext } from '@/lib/MeetingContext';
import { getRoom } from '@/lib/db';

function reducer(state, action) {
  switch (action.type) {
    case 'toggle-create':
      return { isCreating: !state.isCreating, error: null };
    case 'submit':
      return { isSubmitting: true };
    case 'error':
      return { error: action.payload, isSubmitting: false };
    default:
      throw new Error(
        `Action type: ${action.type} used in useRoomForm reducer does not exists`
      );
  }
}

export default function useRoomForm() {
  const { createRoom } = useMeetingContext();
  const router = useRouter();
  const [state, dispatch] = useReducer(reducer, {
    isCreating: true,
    isSubmitting: false,
    error: null,
  });

  const handlers = useMemo(
    () => ({
      onCreateToggle() {
        dispatch({ type: 'toggle-create' });
      },
      onSubmit: ({ identity, roomName }) => async (e) => {
        e.preventDefault();

        const { isCreating } = state;

        if (!identity || (!isCreating && !roomName)) return;

        dispatch({ type: 'submit' });

        try {
          if (isCreating) {
            const { roomName } = await createRoom(identity);
            router.push(`/${roomName}`);
          } else {
            // Make sure room exists before joining it
            const room = await getRoom(roomName);
            if (!room) {
              throw new Error('That room does not exists');
            }
            router.push(`/${roomName}`);
          }
        } catch (error) {
          dispatch({ type: 'error', payload: error });
        }
      },
    }),
    [createRoom, router, state]
  );

  return { ...state, ...handlers };
}
