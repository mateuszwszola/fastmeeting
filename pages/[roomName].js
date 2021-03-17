import { Text, Spinner } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import DisplayError from '@/components/DisplayError';
import Lobby from '@/components/Lobby';
import MeetingLayout from '@/components/MeetingLayout';
import Room from '@/components/Room';
import VideoProvider from '@/components/VideoProvider';
import useDbRoom from '@/hooks/useDbRoom';
import useRoomState from '@/hooks/useRoomState';
import { useMeetingContext } from '@/lib/MeetingContext';

function Meeting() {
  const router = useRouter();
  const { roomName } = router.query;
  const { room: dbRoom, isLoading, error } = useDbRoom(roomName);
  const roomState = useRoomState();

  return (
    <MeetingLayout roomName={roomName}>
      {error ? (
        <Text mt={4}>Something went wrong...</Text>
      ) : isLoading ? (
        <Spinner
          pos="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          size="xl"
        />
      ) : !dbRoom ? (
        <Text mt={4}>Room {roomName} does not exists</Text>
      ) : roomState === 'disconnected' ? (
        <Lobby roomName={roomName} />
      ) : (
        <Room />
      )}
    </MeetingLayout>
  );
}

export default function MeetingPage() {
  const { error, setError } = useMeetingContext();

  return (
    <VideoProvider onError={setError}>
      <DisplayError error={error} onClose={() => setError(null)} />
      <Meeting />
    </VideoProvider>
  );
}
