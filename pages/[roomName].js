import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Box } from '@chakra-ui/layout';
import { useMeetingContext } from '@/lib/MeetingContext';
import { useVideoContext } from '@/lib/VideoContext';
import useRoomState from '@/hooks/useRoomState';
import MeetingLayout from '@/components/MeetingLayout';
import VideoProvider from '@/components/VideoProvider';
import Room from '@/components/Room';
import DisplayError from '@/components/DisplayError';
import { Button } from '@chakra-ui/button';

function Meeting() {
  const router = useRouter();
  const { roomName } = router.query;
  const { token } = useMeetingContext();
  const {
    connect,
    getAudioAndVideoTracks,
    isAcquiringLocalTracks,
  } = useVideoContext();
  const roomState = useRoomState();

  // Redirect if room does not exists
  // useEffect(() => {
  //   if (!token) {
  //     router.push(`/?roomName=${roomName}`);
  //   }
  // }, [roomName, router, token]);

  useEffect(() => {
    getAudioAndVideoTracks();
  }, [getAudioAndVideoTracks]);

  const joinRoom = () => {
    if (token) {
      connect(token);
    }
  };

  return (
    <>
      {roomState === 'disconnected' ? (
        <>
          {/* TODO: Add lobby */}
          <Box>Lobby</Box>
          <Button onClick={joinRoom} disabled={isAcquiringLocalTracks}>
            Join room
          </Button>
        </>
      ) : (
        <MeetingLayout roomName={roomName}>
          <Room />
        </MeetingLayout>
      )}
    </>
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
