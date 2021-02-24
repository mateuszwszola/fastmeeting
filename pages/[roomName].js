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
  const {
    room,
    connect,
    leave,
    isConnecting,
    getAudioAndVideoTracks,
  } = useVideoContext();
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    if (!token) {
      router.push(`/?roomName=${roomName}`);
    }
  }, [roomName, router, token]);

  useEffect(() => {
    if (token) {
      getAudioAndVideoTracks().then((tracks) => connect(token, tracks));

      return () => {
        leave();
      };
    }
  }, [connect, getAudioAndVideoTracks, leave, token]);

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
    leave();
    logout();
  }, [leave, logout]);

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
    <VideoProvider options={{ name: roomName }}>
      <Meeting />
    </VideoProvider>
  );
}
