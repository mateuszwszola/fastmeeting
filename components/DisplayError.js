import PropTypes from 'prop-types';
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
} from '@chakra-ui/react';

export default function DisplayError({ error, onClose }) {
  if (!error) {
    return null;
  }

  return (
    <Alert status="error">
      <AlertIcon />
      <AlertTitle mr={2}>Error happened!</AlertTitle>
      <AlertDescription>{error}</AlertDescription>
      <CloseButton
        onClick={onClose}
        position="absolute"
        right="8px"
        top="8px"
      />
    </Alert>
  );
}

DisplayError.propTypes = {
  error: PropTypes.oneOf([PropTypes.string, null]),
  onClose: PropTypes.func.isRequired,
};
