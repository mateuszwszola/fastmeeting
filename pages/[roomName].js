import Layout from '@/components/Layout';
import { useMeeting } from '@/lib/MeetingContext';

export default function Meeting() {
  const { username, roomName } = useMeeting();
  return (
    <Layout>
      <p>Username: {username}</p>
      <p>Room name: {roomName}</p>
    </Layout>
  );
}
