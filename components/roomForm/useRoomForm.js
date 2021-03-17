import { useState, useMemo } from 'react';
import { useRouter } from 'next/router';
import { useMeetingContext } from '@/lib/MeetingContext';
import { fetchRoom } from '@/lib/db';

export default function useRoomForm() {
  const [isCreating, setIsCreating] = useState(true);
  const [error, setError] = useState(null);
  const { createRoom } = useMeetingContext();
  const router = useRouter();

  const handlers = useMemo(
    () => ({
      onCreateToggle() {
        setIsCreating((prev) => !prev);
        setError(null);
      },
      onSubmit: ({ identity, roomName }) => async (e) => {
        e.preventDefault();

        if (!identity || (!isCreating && !roomName)) return;

        try {
          if (isCreating) {
            const { roomName } = await createRoom(identity);
            router.push(`/${roomName}`);
          } else {
            // Make sure room exists before joining it
            const room = await fetchRoom(roomName);
            if (!room) {
              throw new Error('Room does not exists');
            }
            router.push(`/${roomName}`);
          }
        } catch (error) {
          setError(error);
        }
      },
    }),
    [createRoom, isCreating, router]
  );

  return [isCreating, error, handlers];
}
