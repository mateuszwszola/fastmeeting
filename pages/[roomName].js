import { Heading } from '@chakra-ui/layout';
import { useRouter } from 'next/router';
import DisplayError from '@/components/DisplayError';
import Lobby from '@/components/Lobby';
import MeetingLayout from '@/components/MeetingLayout';
import Room from '@/components/Room';
import VideoProvider from '@/components/VideoProvider';
import useDbRoom from '@/hooks/useDbRoom';
import useRoomState from '@/hooks/useRoomState';
import { useMeetingContext } from '@/lib/MeetingContext';
import { Spinner } from '@chakra-ui/spinner';

function Meeting() {
  const router = useRouter();
  const { roomName } = router.query;
  const { room: dbRoom, isLoading, error } = useDbRoom(roomName);
  const roomState = useRoomState();

  return (
    <MeetingLayout roomName={roomName}>
      {error ? (
        <Heading>Something went wrong...</Heading>
      ) : isLoading ? (
        <Spinner />
      ) : !dbRoom ? (
        // Add empty state - room not found :(
        <Heading>Room {roomName} does not exists</Heading>
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
