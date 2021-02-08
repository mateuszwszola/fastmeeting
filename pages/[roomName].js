import Router from 'next/router';
import { useEffect } from 'react';
import Layout from '@/components/Layout';
import { useMeeting } from '@/lib/MeetingContext';

export default function Meeting() {
  const { identity, roomName, token, leaveRoom } = useMeeting();

  useEffect(() => {
    if (!identity || !token) {
      Router.push('/');
    }
  }, [identity, token]);

  return (
    <Layout>
      <p>Identity: {identity}</p>
      <p>Room name: {roomName}</p>
      <button onClick={leaveRoom}>Leave room</button>
    </Layout>
  );
}
