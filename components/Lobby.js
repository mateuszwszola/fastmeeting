import { useAuth } from '@/lib/AuthContext';
import { useMeetingContext } from '@/lib/MeetingContext';
import { useVideoContext } from '@/lib/VideoContext';
import { Button } from '@chakra-ui/button';
import { FormControl } from '@chakra-ui/form-control';
import { Box } from '@chakra-ui/layout';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import Controllers from './Controllers';
import RoomFormBox from './roomForm/RoomFormBox';
import RoomFormHeading from './roomForm/RoomFormHeading';
import RoomFormInput from './roomForm/RoomFormInput';
import ToggleAudioButton from './ToggleAudioButton';
import ToggleVideoButton from './ToggleVideoButton';
import VideoPreview from './VideoPreview';

export default function Lobby({ roomName }) {
  const { joinRoom, isFetching, identity } = useMeetingContext();
  const { user } = useAuth();
  const {
    connect,
    isConnecting,
    isAcquiringLocalTracks,
    getAudioAndVideoTracks,
  } = useVideoContext();
  const [step, setStep] = useState(0);
  const [identityValue, setIdentityValue] = useState(
    user?.full_name || identity
  );

  useEffect(() => {
    if (identity || user?.full_name) {
      setIdentityValue(identity || user?.full_name);
    }
  }, [identity, user]);

  useEffect(() => {
    if (step === 1) {
      getAudioAndVideoTracks();
    }
  }, [getAudioAndVideoTracks, step]);

  const handleJoin = () => {
    joinRoom(identityValue, roomName).then(({ token }) => connect(token));
  };

  const isLoading = isFetching || isConnecting || isAcquiringLocalTracks;

  const identityStep = (
    <RoomFormBox>
      <Box
        mx="auto"
        maxW="xs"
        as="form"
        onSubmit={(e) => {
          e.preventDefault();
          setStep(1);
        }}
      >
        <FormControl id="name">
          <RoomFormHeading>Enter your name</RoomFormHeading>
          <RoomFormInput
            mt={6}
            name="name"
            placeholder="Enter your name"
            required
            value={identityValue}
            onChange={(e) => setIdentityValue(e.target.value)}
          />
        </FormControl>

        <Button
          w="full"
          mt={6}
          type="submit"
          size="md"
          mx="auto"
          colorScheme="blue"
        >
          Continue
        </Button>
      </Box>
    </RoomFormBox>
  );

  const previewStep = (
    <RoomFormBox>
      <Box pos="relative">
        <VideoPreview />
        <Controllers pos="absolute" bottom="0" left="0" right="0" p={2}>
          {!isAcquiringLocalTracks && (
            <>
              <ToggleVideoButton />
              <ToggleAudioButton />
            </>
          )}
        </Controllers>
      </Box>
      <Button
        w="full"
        mt={6}
        colorScheme="blue"
        onClick={handleJoin}
        disabled={isLoading}
        display="block"
        mx="auto"
      >
        Join meeting
      </Button>
    </RoomFormBox>
  );

  return (
    <Box w="full" mx="auto" maxW="sm" alignSelf="center">
      {step === 0 ? identityStep : previewStep}
    </Box>
  );
}

Lobby.propTypes = {
  roomName: PropTypes.string.isRequired,
};
