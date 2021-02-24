import { useState, useCallback } from 'react';
import { FaVideo, FaVideoSlash } from 'react-icons/fa';
import { Box, IconButton, Text } from '@chakra-ui/react';
import { useVideoContext } from '@/lib/VideoContext';
import { trackpubsToTracks } from '@/utils/helpers';

const ToggleVideoButton = () => {
  const { room } = useVideoContext();
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);

  const toggleVideoEnabled = useCallback(() => {
    if (!room) return;

    const videoTracks = trackpubsToTracks(room.localParticipant.videoTracks);

    if (isVideoEnabled) {
      videoTracks.forEach((track) => {
        track.disable();
      });
    } else {
      videoTracks.forEach((track) => {
        track.enable();
      });
    }

    setIsVideoEnabled((prevState) => !prevState);
  }, [isVideoEnabled, room]);

  return (
    <Box>
      <IconButton
        isDisabled={!room}
        onClick={toggleVideoEnabled}
        icon={isVideoEnabled ? <FaVideo /> : <FaVideoSlash />}
      />
      <Text>Cam</Text>
    </Box>
  );
};

export default ToggleVideoButton;
