import { useEffect } from 'react';
import { useMeetingContext } from '@/lib/MeetingContext';
import { useVideoContext } from '@/lib/VideoContext';
import { Button } from '@chakra-ui/button';
import { Box } from '@chakra-ui/layout';

export default function Lobby() {
  const { token } = useMeetingContext();
  const {
    connect,
    isAcquiringLocalTracks,
    getAudioAndVideoTracks,
  } = useVideoContext();

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
      <Box>Lobby</Box>
      <Button onClick={joinRoom} disabled={isAcquiringLocalTracks}>
        Join room
      </Button>
    </>
  );
}
