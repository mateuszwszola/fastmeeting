import { useRouter } from 'next/router';
import { useState, useEffect, useCallback } from 'react';
import { useMeeting } from '@/lib/MeetingContext';
import useVideoRoom from '@/hooks/useVideoRoom';
import Layout from '@/components/Layout';
import Participant from '@/components/Participant';

export default function Meeting() {
  const router = useRouter();
  const { roomName } = router.query;
  const { token, logout } = useMeeting();
  const { room, connect, leave, isConnecting } = useVideoRoom(roomName);
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    if (token) {
      connect(token);
    } else {
      router.push('/');
    }
  }, [connect, router, token]);

  useEffect(() => {
    const tidyUp = (event) => {
      if (!event.persisted) {
        leave();
      }
      logout();
    };
    window.addEventListener('pagehide', tidyUp);
    window.addEventListener('beforeunload', tidyUp);
    return () => {
      window.removeEventListener('pagehide', tidyUp);
      window.removeEventListener('beforeunload', tidyUp);
    };
  }, [leave, logout, room]);

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

  const handleLogout = useCallback(() => {
    if (room) {
      leave();
    }
    logout();
  }, [leave, logout, room]);

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
          onClick={handleLogout}
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
