import Layout from '@/components/Layout';
import Button from '@/components/Button';

export default function Home() {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center px-4 pt-16 mx-auto sm:max-w-xl md:max-w-full lg:pt-32 md:px-0">
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
          <form className="w-full">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Display name
            </label>
            <input
              id="name"
              placeholder="Name"
              required
              type="text"
              className="mt-1 w-full h-12 px-4 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-purple-400 focus:outline-none focus:shadow-outline"
            />
            <label htmlFor="room" className="block mt-3 text-sm font-medium text-gray-700">
              fastmeeting.io/
            </label>
            <input
              id="room"
              placeholder="Room name"
              required
              type="text"
              className="mt-1 w-full h-12 px-4 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-purple-400 focus:outline-none focus:shadow-outline"
            />
            <Button type="submit" className="w-full h-12 px-6 mt-5 mx-auto">
              Create
            </Button>
          </form>
        </div>
      </div>
    </Layout>
  );
}
