import { useEffect } from 'react';
import { useMeetingContext } from '@/lib/MeetingContext';
import { useVideoContext } from '@/lib/VideoContext';
import { Button } from '@chakra-ui/button';
import { Flex } from '@chakra-ui/layout';

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
    connect(token);
  };

  return (
    <Flex justify="center" align="center">
      <Button onClick={joinRoom} disabled={isAcquiringLocalTracks}>
        Join room
      </Button>
    </Flex>
  );
}
