import { useRouter } from 'next/router';
import { useState, useEffect, useCallback } from 'react';
import { useMeeting } from '@/lib/MeetingContext';
import useVideoRoom from '@/hooks/useVideoRoom';
import Layout from '@/components/Layout';
import Participant from '@/components/Participant';
import { Flex, Heading, Button } from '@chakra-ui/react';

export default function Meeting() {
  const router = useRouter();
  const { roomName } = router.query;
  const { token, logout } = useMeeting();
  const { room, connect, leave, isConnecting } = useVideoRoom(roomName);
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    if (!token) {
      router.push(`/?roomName=${roomName}`);
    }
  }, [roomName, router, token]);

  useEffect(() => {
    if (token) {
      connect(token);
    }
  }, [connect, token]);

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
      <Flex justify="space-between" align="center">
        <Heading as="h2">Room: {roomName}</Heading>
        <Button isLoading={isConnecting} onClick={handleLogout}>
          Leave Room
        </Button>
      </Flex>

      <div>{room && <Participant participant={room.localParticipant} />}</div>

      <Heading as="h3">Remote participants</Heading>
      <div>{remoteParticipants}</div>
    </Layout>
  );
}
