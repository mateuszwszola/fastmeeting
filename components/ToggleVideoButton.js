import { useState, useCallback, useEffect } from 'react';
import { FaVideo, FaVideoSlash } from 'react-icons/fa';
import { Box, IconButton } from '@chakra-ui/react';
import { useVideoContext } from '@/lib/VideoContext';

const ToggleVideoButton = ({ children }) => {
  const { localTracks, isAcquiringLocalTracks } = useVideoContext();
  const [isVideoEnabled, setIsVideoEnabled] = useState(() => {
    const videoTrack = localTracks.find((track) => track.kind === 'video');
    return videoTrack?.isEnabled || false;
  });

  useEffect(() => {
    const videoTrack = localTracks.find((track) => track.kind === 'video');

    setIsVideoEnabled(videoTrack?.isEnabled || false);
  }, [localTracks]);

  const toggleVideoEnabled = useCallback(() => {
    const videoTrack = localTracks.find((track) => track.kind === 'video');

    if (isVideoEnabled) {
      videoTrack.disable();
    } else {
      videoTrack.enable();
    }

    setIsVideoEnabled((prevState) => !prevState);
  }, [isVideoEnabled, localTracks]);

  return (
    <Box>
      <IconButton
        isDisabled={isAcquiringLocalTracks}
        onClick={toggleVideoEnabled}
        icon={isVideoEnabled ? <FaVideo /> : <FaVideoSlash />}
      />
      {children}
    </Box>
  );
};

export default ToggleVideoButton;
