/* eslint-disable jsx-a11y/media-has-caption */
import { Box } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import IdentityText from './participant/IdentityText';
import useParticipant from './videoProvider/useParticipant';

function Participant({ participant, local }) {
  const { videoRef, audioRef } = useParticipant(participant);

  return (
    <Box position="relative" w="full" mx="auto">
      <IdentityText>{participant.identity}</IdentityText>

      <video ref={videoRef} autoPlay={true} />
      <audio ref={audioRef} autoPlay={true} muted={local} />
    </Box>
  );
}

Participant.defaultProps = {
  local: false,
};

Participant.propTypes = {
  participant: PropTypes.object.isRequired,
  local: PropTypes.bool.isRequired,
};

export default Participant;
