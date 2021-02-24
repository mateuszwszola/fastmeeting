import PropTypes from 'prop-types';
import { IconButton } from '@chakra-ui/react';
import { FaMicrophone, FaMicrophoneSlash } from 'react-icons/fa';

const ToggleAudioButton = ({ isEnabled, toggleAudioEnabled }) => {
  return (
    <IconButton
      onClick={toggleAudioEnabled}
      icon={isEnabled ? <FaMicrophone /> : <FaMicrophoneSlash />}
    />
  );
};

ToggleAudioButton.propTypes = {
  isEnabled: PropTypes.bool.isRequired,
  toggleAudioEnabled: PropTypes.func.isRequired,
};

export default ToggleAudioButton;
