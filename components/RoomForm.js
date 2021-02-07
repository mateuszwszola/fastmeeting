import { useState } from 'react';
import Router from 'next/router';
import Button from '@/components/Button';
import { useMeeting } from '@/lib/MeetingContext';
import { slugify } from '@/utils/helpers';

function RoomForm() {
  const [isCreating, setIsCreating] = useState(true);
  const [usernameValue, setUsernameValue] = useState('');
  const [roomNameValue, setRoomNameValue] = useState('');
  const { joinRoom } = useMeeting();

  const onCreateToggle = () => {
    setIsCreating((prev) => !prev);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    joinRoom(usernameValue, roomNameValue);
    Router.push(`/${slugify(roomNameValue)}`);
  };

  return (
    <div className="w-full px-4 py-8 shadow-xl bg-gray-50 dark:bg-gray-800 rounded-lg">
      <h3 className="text-3xl text-center font-medium">
        {isCreating ? 'Create' : 'Join'} room
      </h3>
      <form onSubmit={onSubmit} className="mt-6 w-full max-w-md mx-auto">
        <label
          htmlFor="name"
          className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
        >
          Display Name
        </label>
        <input
          value={usernameValue}
          onChange={(e) => setUsernameValue(e.target.value)}
          id="name"
          placeholder="Enter your name"
          required
          type="text"
          className="w-full h-12 px-4 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded block placeholder-gray-500 dark:placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring"
        />
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
        <Button type="submit" className="w-full h-12 px-6 mt-6 mx-auto">
          {isCreating ? 'Create' : 'Join'}
        </Button>
      </form>

      <button
        onClick={onCreateToggle}
        className="mt-6 block mx-auto text-blue-500 hover:text-blue-400 focus:text-blue-600 focus:outline-none"
      >
        {isCreating ? 'Join' : 'Create'} room instead
      </button>
    </div>
  );
}

export default RoomForm;
