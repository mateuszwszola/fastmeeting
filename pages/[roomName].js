import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Box, SimpleGrid } from '@chakra-ui/react';
import MeetingLayout from '@/components/MeetingLayout';
import Participant from '@/components/Participant';
import VideoProvider from '@/components/VideoProvider';
import { useMeeting } from '@/lib/MeetingContext';
import { useVideoContext } from '@/lib/VideoContext';

function Meeting() {
  const router = useRouter();
  const { roomName } = router.query;
  const { token, logout } = useMeeting();
  const { room, connect, leave, isConnecting } = useVideoContext();
  const [participants, setParticipants] = useState([]);

  console.log('room', room);

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
    <Box
      key={participant.sid}
      w="full"
      mx="auto"
      borderRadius="md"
      boxShadow="md"
    >
      <Participant participant={participant} />
    </Box>
  ));

  return (
    <MeetingLayout isConnecting={isConnecting} handleLogout={handleLogout}>
      <SimpleGrid columns={[1, null, 2]} spacing={4}>
        <Box w="full" mx="auto" borderRadius="md" boxShadow="md">
          {room && <Participant participant={room.localParticipant} />}
        </Box>
        {remoteParticipants}
      </SimpleGrid>
    </MeetingLayout>
  );
}

export default function MeetingContainer() {
  const router = useRouter();
  const { roomName } = router.query;

  return (
    <VideoProvider roomName={roomName}>
      <Meeting />
    </VideoProvider>
  );
}
