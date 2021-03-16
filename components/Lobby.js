import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Button } from '@chakra-ui/button';
import { Box, Flex } from '@chakra-ui/layout';
import { Input } from '@chakra-ui/input';
import { useMeetingContext } from '@/lib/MeetingContext';
import { useVideoContext } from '@/lib/VideoContext';
import { useAuth } from '@/lib/AuthContext';

export default function Lobby({ roomName }) {
  const { joinRoom, isFetching, identity } = useMeetingContext();
  const {
    connect,
    isAcquiringLocalTracks,
    getAudioAndVideoTracks,
  } = useVideoContext();
  const { user } = useAuth();
  const [identityValue, setIdentityValue] = useState(
    user?.full_name || identity
  );
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (identity || user?.full_name) {
      setStep(1);
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

  const identityStep = (
    <Box
      as="form"
      onSubmit={(e) => {
        e.preventDefault();
        setStep(1);
      }}
    >
      <Input
        placeholder="Enter your name"
        required
        value={identityValue}
        onChange={(e) => setIdentityValue(e.target.value)}
      />
      <Button type="submit">Continue</Button>
    </Box>
  );

  return (
    <Flex justify="center" align="center">
      {step === 0 ? (
        <>{identityStep}</>
      ) : (
        <Button
          onClick={handleJoin}
          disabled={isAcquiringLocalTracks || isFetching}
        >
          Join room
        </Button>
      )}
    </Flex>
  );
}

Lobby.propTypes = {
  roomName: PropTypes.string.isRequired,
};
