import { useCallback } from 'react';
import { Box, IconButton, Text } from '@chakra-ui/react';
import { FaHandPaper } from 'react-icons/fa';
import useRoomState from '@/hooks/useRoomState';
import { useVideoContext } from '@/lib/VideoContext';

export default function LeaveRoomButton() {
  const { room, isConnecting } = useVideoContext();
  const roomState = useRoomState();

  const handleLeave = useCallback(() => {
    room.disconnect();
  }, [room]);

  return (
    <Box>
      <IconButton
        isDisabled={roomState === 'reconnecting' || isConnecting}
        onClick={handleLeave}
        icon={<FaHandPaper />}
      />
      <Text>Leave</Text>
    </Box>
  );
}
