import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useMeeting } from '@/lib/MeetingContext';
import useVideoRoom from '@/hooks/useVideoRoom';
import Layout from '@/components/Layout';
import Participant from '@/components/Participant';

export default function Meeting() {
  const router = useRouter();
  const { roomName } = router.query;
  const { identity, getToken } = useMeeting();
  const { room, connect, logout, isConnecting } = useVideoRoom(roomName);
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    if (!identity) {
      router.push('/');
    } else {
      getToken(identity, roomName).then((token) => connect(token));
    }
  }, [connect, getToken, identity, roomName, router]);

  useEffect(() => {
    if (room) {
      const tidyUp = (event) => {
        if (!event.persisted) {
          logout();
        }
      };
      window.addEventListener('pagehide', tidyUp);
      window.addEventListener('beforeunload', tidyUp);
      return () => {
        window.removeEventListener('pagehide', tidyUp);
        window.removeEventListener('beforeunload', tidyUp);
      };
    }
  }, [logout, room]);

  useEffect(() => {
    const participantConnected = (participant) => {
      setParticipants((prevParticipants) => [...prevParticipants, participant]);
    };

    const participantDisconnected = (participant) => {
      setParticipants((prevParticipants) =>
        prevParticipants.filter((p) => p !== participant)
      );
    };

    if (room) {
      room.on('participantConnected', participantConnected);
      room.on('participantDisconnected', participantDisconnected);
      room.participants.forEach(participantConnected);

      return () => {
        room.off('participantConnected', participantConnected);
        room.off('participantDisconnected', participantDisconnected);
      };
    }
  }, [room]);

  const remoteParticipants = participants.map((participant) => (
    <Participant key={participant.sid} participant={participant} />
  ));

  return (
    <Layout>
      <div className="flex justify-between items-center">
        <h2>Room: {roomName}</h2>
        <button
          disabled={isConnecting}
          className="py-2 px-4 bg-blue-500 rounded shadow"
          onClick={() => logout()}
        >
          Leave Room
        </button>
      </div>

      <div>{room && <Participant participant={room.localParticipant} />}</div>

      <h3>Remote participants</h3>
      <div>{remoteParticipants}</div>
    </Layout>
  );
}
