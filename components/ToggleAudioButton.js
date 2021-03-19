import { useCallback, useEffect, useState } from 'react';
import { FaMicrophone, FaMicrophoneSlash } from 'react-icons/fa';
import { Box, IconButton } from '@chakra-ui/react';
import { useVideoContext } from '@/lib/VideoContext';

const ToggleAudioButton = ({ children }) => {
  const { localTracks, isAcquiringLocalTracks } = useVideoContext();
  const [isAudioEnabled, setIsAudioEnabled] = useState(() => {
    const audioTrack = localTracks.find((track) => track.kind === 'audio');
    return audioTrack?.isEnabled || false;
  });

  useEffect(() => {
    const audioTrack = localTracks.find((track) => track.kind === 'audio');

    setIsAudioEnabled(audioTrack?.isEnabled || false);
  }, [localTracks]);

  const toggleAudioEnabled = useCallback(() => {
    const audioTrack = localTracks.find((track) => track.kind === 'audio');

    if (isAudioEnabled) {
      audioTrack.disable();
    } else {
      audioTrack.enable();
    }

    setIsAudioEnabled((prevState) => !prevState);
  }, [isAudioEnabled, localTracks]);

  return (
    <Box>
      <IconButton
        isDisabled={isAcquiringLocalTracks}
        onClick={toggleAudioEnabled}
        icon={isAudioEnabled ? <FaMicrophone /> : <FaMicrophoneSlash />}
      />
      {children}
    </Box>
  );
};

export default ToggleAudioButton;
