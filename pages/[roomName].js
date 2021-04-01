import { Text, Spinner } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import Lobby from '@/components/Lobby';
import Room from '@/components/Room';
import VideoProvider from '@/components/VideoProvider';
import useDbRoom from '@/hooks/useDbRoom';
import useRoomState from '@/hooks/useRoomState';
import { useMeetingContext } from '@/lib/MeetingContext';
import MeetingLayout from '@/components/MeetingLayout';
import { useAuth } from '@/lib/AuthContext';

function Meeting() {
  const router = useRouter();
  const { roomName } = router.query;
  const { room: dbRoom, isLoading, error } = useDbRoom(roomName);
  const roomState = useRoomState();
  const { user } = useAuth();

  return (
    <MeetingLayout>
      {error ? (
        <Text>Something went wrong...</Text>
      ) : isLoading ? (
        <Spinner size="xl" />
      ) : !dbRoom ? (
        <Text>Room {roomName} does not exists</Text>
      ) : dbRoom.locked && dbRoom.owner_id !== user?.id ? (
        <Text>
          You cannot join a room, because it is locked{' '}
          <span aria-label="Emoji" role="img">
            🙈
          </span>
        </Text>
      ) : roomState === 'disconnected' ? (
        <Lobby roomName={roomName} />
      ) : (
        <Room roomName={roomName} />
      )}
    </MeetingLayout>
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
