import { useVideoContext } from '@/lib/VideoContext';
import { Box, IconButton, Text } from '@chakra-ui/react';
import { FaVideo, FaVideoSlash } from 'react-icons/fa';

const ToggleVideoButton = () => {
  const { room } = useVideoContext();

  const isEnabled = true;

  return (
    <Box>
      <IconButton
        onClick={() => {}}
        icon={isEnabled ? <FaVideo /> : <FaVideoSlash />}
      />
      <Text>Cam</Text>
    </Box>
  );
};

export default ToggleVideoButton;
