import PropTypes from 'prop-types';
import { Input, useColorModeValue } from '@chakra-ui/react';

function RoomFormInput({ name, value, onChange, ...props }) {
  const inputBgColor = useColorModeValue('gray.50', 'gray.800');

  return (
    <Input
      id={name}
      name={name}
      type="text"
      value={value}
      onChange={onChange}
      required
      w="full"
      h={12}
      px={4}
      borderRadius="md"
      display="block"
      bgColor={inputBgColor}
      {...props}
    />
  );
}

RoomFormInput.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default RoomFormInput;
