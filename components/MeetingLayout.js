import Link from 'next/link';
import { useAuth } from '@/lib/AuthContext';
import { addChannel } from '@/lib/db';
import { slugify } from '@/utils/helpers';

export default function MeetingLayout(props) {
  const { signOut } = useAuth();

  const newChannel = async () => {
    const slug = prompt('Please enter your name');
    if (slug) {
      addChannel(slugify(slug));
    }
  };

  return (
    <main className="main flex h-screen w-screen overflow-hidden">
      {/* Messages */}
      <div className="flex-1 bg-gray-800 h-screen">{props.children}</div>
      {/* Sidebar */}
      <nav
        className="w-64 bg-gray-900 text-gray-100 overflow-scroll"
        style={{ maxWidth: '20%', minWidth: 150, maxHeight: '100vh' }}
      >
        <div className="p-2 ">
          <div className="p-2">
            <button
              className="bg-blue-900 hover:bg-blue-800 text-white py-2 px-4 rounded w-full transition duration-150"
              onClick={() => newChannel()}
            >
              New Channel
            </button>
          </div>
          <hr className="m-2" />
          <div className="p-2">
            <button
              className="bg-blue-900 hover:bg-blue-800 text-white py-2 px-4 rounded w-full transition duration-150"
              onClick={() => signOut()}
            >
              Log out
            </button>
          </div>
          <hr className="m-2" />
          <h4 className="font-bold">Channels</h4>
          <ul className="channel-list">
            {props.channels.map((x) => (
              <SidebarItem
                channel={x}
                key={x.id}
                isActiveChannel={x.id === props.activeChannelId}
              />
            ))}
          </ul>
        </div>
      </nav>
    </main>
  );
}

const SidebarItem = ({ channel, isActiveChannel }) => (
  <>
    <li>
      <Link href={`/r/${channel.id}`}>
        <a className={isActiveChannel ? 'font-bold' : ''}>{channel.slug}</a>
      </Link>
    </li>
  </>
);
