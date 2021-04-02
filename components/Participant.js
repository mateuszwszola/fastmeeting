/* eslint-disable jsx-a11y/media-has-caption */
import { Box } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import IdentityText from './participant/IdentityText';
import useParticipant from './videoProvider/useParticipant';

function Participant({ participant, local, width, height }) {
  const { videoRef, audioRef } = useParticipant(participant);

  return (
    <Box
      width={width}
      height={height}
      data-cy={local ? 'main-participant' : 'remote-participant'}
      pos="relative"
    >
      <IdentityText>{participant.identity}</IdentityText>

      <Box
        width="100%"
        height="100%"
        as="video"
        ref={videoRef}
        autoPlay={true}
      />
      <audio ref={audioRef} autoPlay={true} muted={local} />
    </Box>
  );
}

Participant.defaultProps = {
  local: false,
};

Participant.propTypes = {
  participant: PropTypes.object.isRequired,
  local: PropTypes.bool,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};

export default Participant;
