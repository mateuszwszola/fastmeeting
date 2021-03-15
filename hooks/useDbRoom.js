import { fetchRoom } from '@/lib/db';
import { useState, useEffect } from 'react';

export default function useDbRoom(roomSlug) {
  const [room, setRoom] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchRoom(roomSlug)
      .then((room) => {
        setRoom(room);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [roomSlug]);

  return {
    room,
    isLoading,
    error,
  };
}
