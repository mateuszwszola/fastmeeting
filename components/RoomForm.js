import { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';
import { nanoid } from 'nanoid';
import Button from '@/components/Button';
import { useMeeting } from '@/lib/MeetingContext';
import { slugify } from '@/utils/helpers';
import fetcher from '@/utils/fetcher';

function RoomForm() {
  const router = useRouter();
  const { roomName: roomNameParam } = router.query;
  const { identity, roomName, getToken } = useMeeting();
  const [identityValue, setIdentityValue] = useState(identity);
  const [roomNameValue, setRoomNameValue] = useState(roomName);
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (roomNameParam) {
      setRoomNameValue(roomNameParam);
      setIsCreating(false);
    }
  }, [roomNameParam]);

  const onCreateToggle = useCallback(() => {
    setIsCreating((prev) => !prev);
    setError(null);
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!identityValue || (!isCreating && !roomNameValue)) return;

    const roomName = slugify(isCreating ? nanoid() : roomNameValue);

    try {
      // Make sure a room exists before user will try to join it
      if (!isCreating) {
        await fetcher(`/api/video/room?name=${roomName}`);
      }

      await getToken(identityValue, roomName);
      router.push(`/${roomName}`);
    } catch (error) {
      setError(error);
    }
  };

  return (
    <div className="w-full px-4 py-8 shadow-xl bg-gray-50 dark:bg-gray-800 rounded-lg">
      <h3 className="text-3xl text-center font-medium">
        {isCreating ? 'Create' : 'Join'} room
      </h3>
      {error && <p className="text-center">{error.message}</p>}
      <form onSubmit={onSubmit} className="mt-6 w-full max-w-md mx-auto">
        <label
          htmlFor="name"
          className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
        >
          Display Name
        </label>
        <input
          value={identityValue}
          onChange={(e) => setIdentityValue(e.target.value)}
          id="name"
          placeholder="Enter your name"
          required
          type="text"
          className="w-full h-12 px-4 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded block placeholder-gray-500 dark:placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring"
        />
        {!isCreating ? (
          <>
            <label
              htmlFor="roomName"
              className="block mt-4 mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
            >
              fastmeeting/
            </label>
            <input
              value={roomNameValue}
              onChange={(e) => setRoomNameValue(e.target.value)}
              id="roomName"
              placeholder="Room name"
              required
              type="text"
              className="w-full h-12 px-4 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded block placeholder-gray-500 dark:placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring"
            />
          </>
        ) : (
          ''
        )}
        <Button type="submit" className="w-full h-12 px-6 mt-6 mx-auto">
          {isCreating ? 'Create' : 'Join'}
        </Button>
      </form>

      <button
        onClick={onCreateToggle}
        className="mt-6 block mx-auto text-blue-500 hover:text-blue-400 focus:text-blue-600 focus:outline-none"
      >
        Or {isCreating ? 'join' : 'create'} room instead
      </button>
    </div>
  );
}

export default RoomForm;
