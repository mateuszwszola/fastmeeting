import { useCallback, useState } from 'react';
import { Box, IconButton, Text } from '@chakra-ui/react';
import { FaMicrophone, FaMicrophoneSlash } from 'react-icons/fa';
import { useVideoContext } from '@/lib/VideoContext';
import { trackpubsToTracks } from '@/utils/helpers';

const ToggleAudioButton = () => {
  const { room } = useVideoContext();
  const [isEnabled, setIsEnabled] = useState(true);

  const toggleAudioEnabled = useCallback(() => {
    if (!room) return;

    const audioTracks = trackpubsToTracks(room.localParticipant.audioTracks);

    if (isEnabled) {
      audioTracks.forEach((track) => {
        track.disable();
      });
    } else {
      audioTracks.forEach((track) => {
        track.enable();
      });
    }

    setIsEnabled((prevState) => !prevState);
  }, [isEnabled, room]);

  return (
    <Box>
      <IconButton
        isDisabled={!room}
        onClick={toggleAudioEnabled}
        icon={isEnabled ? <FaMicrophone /> : <FaMicrophoneSlash />}
      />
      <Text>Mic</Text>
    </Box>
  );
};

export default ToggleAudioButton;
