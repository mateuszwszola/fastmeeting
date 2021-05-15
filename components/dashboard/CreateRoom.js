import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  ButtonGroup,
  Flex,
  Input,
  Text,
  useColorModeValue,
  VisuallyHidden,
} from '@chakra-ui/react';
import { slugify } from '@/utils/helpers';

const CreateRoomInput = ({ value, onChange }) => {
  const inputRef = useRef(null);
  const inputBgColor = useColorModeValue('white', 'gray.800');

  useEffect(() => {
    inputRef.current && inputRef.current.focus();
  }, []);

  return (
    <>
      <Text as="label" htmlFor="roomName">
        <VisuallyHidden>Room name</VisuallyHidden>
      </Text>

      <Input
        id="roomName"
        ref={inputRef}
        mt={4}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter room name"
        h={12}
        bgColor={inputBgColor}
      />
    </>
  );
};

CreateRoomInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

const CreateRoom = ({ onAddRoom, disabled }) => {
  const [newRoomName, setNewRoomName] = useState('');
  const [isCreatingRoom, setIsCreatingRoom] = useState(false);

  const handleAddRoom = () => {
    if (newRoomName) {
      onAddRoom(newRoomName);
      setIsCreatingRoom(false);
      setNewRoomName('');
    }
  };

  return (
    <Flex flexDir="column" my={[4, 0]} alignItems={['flex-start', 'flex-end']}>
      {isCreatingRoom ? (
        <ButtonGroup variant="outline" spacing="4">
          <Button
            disabled={!newRoomName}
            onClick={handleAddRoom}
            colorScheme="blue"
          >
            Add
          </Button>
          <Button onClick={() => setIsCreatingRoom(false)}>Cancel</Button>
        </ButtonGroup>
      ) : (
        <Button
          isDisabled={disabled}
          colorScheme="blue"
          onClick={() => setIsCreatingRoom(true)}
        >
          Add room
        </Button>
      )}

      {isCreatingRoom && (
        <>
          <CreateRoomInput value={newRoomName} onChange={setNewRoomName} />
          <Text mt={2}>{newRoomName ? `/${slugify(newRoomName)}` : ''}</Text>
        </>
      )}
    </Flex>
  );
};

CreateRoom.propTypes = {
  onAddRoom: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default CreateRoom;
