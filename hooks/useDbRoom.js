import { useAuth } from '@/lib/AuthContext';
import { fetchRoom } from '@/lib/db';
import { useState, useEffect } from 'react';

export default function useDbRoom(roomSlug) {
  const [room, setRoom] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

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
  }, [isLoading, roomSlug]);

  const isUserRoomOwner = room && user && room.owner_id === user.id;

  return {
    room,
    isUserRoomOwner,
    isLoading,
    error,
  };
}
