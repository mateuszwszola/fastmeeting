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

  let description;

  if (typeof error === 'string' || error.message) {
    description = error.message || error;
  }

  return (
    <Alert status="error">
      <AlertIcon />
      <AlertTitle mr={2}>Error happened!</AlertTitle>
      {typeof error === 'string' || error.message}
      <AlertDescription>{description}</AlertDescription>
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
  error: PropTypes.any,
  onClose: PropTypes.func.isRequired,
};
