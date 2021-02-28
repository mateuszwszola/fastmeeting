import { Box, IconButton, Text } from '@chakra-ui/react';
import { useVideoContext } from '@/lib/VideoContext';
import { FaHandPaper } from 'react-icons/fa';
import { useMeeting } from '@/lib/MeetingContext';

const LeaveRoomButton = () => {
  const { isConnecting, leave } = useVideoContext();
  const { logout } = useMeeting();

  const handleClick = () => {
    leave();
    logout();
  };

  return (
    <Box>
      <IconButton
        isDisabled={isConnecting}
        onClick={handleClick}
        icon={<FaHandPaper />}
      />
      <Text>Leave</Text>
    </Box>
  );
};

export default LeaveRoomButton;
