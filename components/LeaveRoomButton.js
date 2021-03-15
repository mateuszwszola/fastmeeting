import { Box, IconButton, Text } from '@chakra-ui/react';
import { FaHandPaper } from 'react-icons/fa';
import useRoomState from '@/hooks/useRoomState';
import { useVideoContext } from '@/lib/VideoContext';

export default function LeaveRoomButton() {
  const { room } = useVideoContext();
  const roomState = useRoomState();

  const handleLeave = () => {
    room.disconnect();
  };

  return (
    <Box>
      <IconButton
        isDisabled={roomState === 'reconnecting'}
        onClick={handleLeave}
        icon={<FaHandPaper />}
      />
      <Text>Leave</Text>
    </Box>
  );
}
