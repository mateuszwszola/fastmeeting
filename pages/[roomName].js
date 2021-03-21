import { Text, Spinner, Flex } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import Lobby from '@/components/Lobby';
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
    <Flex w="full" h="100vh" direction="column" justify="center" align="center">
      {error ? (
        <Text>Something went wrong...</Text>
      ) : isLoading ? (
        <Spinner size="xl" />
      ) : !dbRoom ? (
        <Text>Room {roomName} does not exists</Text>
      ) : roomState === 'disconnected' ? (
        <Lobby roomName={roomName} />
      ) : (
        <Room roomName={roomName} />
      )}
    </Flex>
  );
}

export default function MeetingPage() {
  const { setError } = useMeetingContext();

  return (
    <VideoProvider onError={setError}>
      <Meeting />
    </VideoProvider>
  );
}
