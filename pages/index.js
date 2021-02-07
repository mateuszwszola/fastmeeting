import Layout from '@/components/Layout';
import RoomForm from '@/components/RoomForm';

export default function Home() {
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

          <RoomForm />
        </div>
      </div>
    </Layout>
  );
}
