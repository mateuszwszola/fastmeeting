import { useState } from 'react';
import Layout from '@/components/Layout';
import Button from '@/components/Button';

export default function Home() {
  const [createRoom, setCreateRoom] = useState(true);

  const onToggle = () => {
    setCreateRoom((prev) => !prev);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log('The form has been submitted');
  };

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center px-4 pt-16 mx-auto sm:max-w-xl md:max-w-full lg:pt-32 md:px-0 mb-8">
        <div className="flex flex-col items-center max-w-2xl md:px-8">
          <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
            <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto">
              Online meetings with video and text chat
            </h2>
            <p className="text-base text-gray-700 md:text-lg">
              Simply create or join the room, invite friends by sending them a link and enjoy the
              company.
            </p>
          </div>

          <div className="w-full px-4 py-8 shadow-xl bg-gray-50 rounded-lg">
            <h3 className="text-3xl text-center font-medium">
              {createRoom ? 'Create' : 'Join'} room
            </h3>
            <form onSubmit={onSubmit} className="mt-6 w-full max-w-md mx-auto">
              <label htmlFor="name" className="block text-sm font-medium">
                Display name
              </label>
              <input
                id="name"
                placeholder="Name"
                required
                type="text"
                className="mt-1 w-full h-12 px-4 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-blue-500 focus:outline-none focus:shadow-outline"
              />
              <label htmlFor="room" className="block mt-3 text-sm font-medium">
                fastmeeting/
              </label>
              <input
                id="room"
                placeholder="Room name"
                required
                type="text"
                className="mt-1 w-full h-12 px-4 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-blue-500 focus:outline-none focus:shadow-outline"
              />
              <Button type="submit" className="w-full h-12 px-6 mt-5 mx-auto">
                {createRoom ? 'Create' : 'Join'}
              </Button>
            </form>

            <button
              onClick={onToggle}
              className="mt-6 block mx-auto text-blue-500 hover:text-blue-400 focus:text-blue-600 focus:outline-none"
            >
              {createRoom ? 'Join' : 'Create'} room instead
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
