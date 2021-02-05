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
            <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight sm:text-4xl md:mx-auto">
              Online video meetings with live chat
            </h2>
            <p className="text-base text-gray-700 dark:text-gray-400 md:text-lg">
              Simply create or join the room, invite friends by sending them a
              link <br />
              and enjoy the company.
            </p>
          </div>

          <div className="w-full px-4 py-8 shadow-xl bg-gray-50 dark:bg-gray-800 rounded-lg">
            <h3 className="text-3xl text-center font-medium">
              {createRoom ? 'Create' : 'Join'} room
            </h3>
            <form onSubmit={onSubmit} className="mt-6 w-full max-w-md mx-auto">
              <label htmlFor="name" className="block mb-1 text-sm font-medium">
                Display name
              </label>
              <input
                id="name"
                placeholder="Enter your name"
                required
                type="text"
                className="w-full h-12 px-4 transition duration-200 bg-white dark:bg-gray-800 text-gray-700 border border-gray-300 dark:border-gray-600 rounded block placeholder-gray-500 dark:placeholder-gray-400 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
              <label
                htmlFor="room"
                className="block mt-3 mb-1 text-sm font-medium"
              >
                fastmeeting/
              </label>
              <input
                id="room"
                placeholder="Room name"
                required
                type="text"
                className="w-full h-12 px-4 transition duration-200 bg-white dark:bg-gray-800 text-gray-700 border border-gray-300 dark:border-gray-600 rounded block placeholder-gray-500 dark:placeholder-gray-400 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
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
