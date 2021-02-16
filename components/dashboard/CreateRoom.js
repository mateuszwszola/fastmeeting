import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button, ButtonGroup, Flex, Input, Text } from '@chakra-ui/react';
import { slugify } from '@/utils/helpers';

const CreateRoomInput = ({ value, onChange }) => {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current && inputRef.current.focus();
  }, []);

  return (
    <Input
      ref={inputRef}
      mt={4}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Enter room name"
      h={12}
    />
  );
};

CreateRoomInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

const CreateRoom = ({ onAddRoom, currentRoomsNumber }) => {
  const [newRoomName, setNewRoomName] = useState('');
  const [isCreatingRoom, setIsCreatingRoom] = useState(false);

  const handleAddRoom = () => {
    if (newRoomName) {
      onAddRoom(newRoomName);
      setIsCreatingRoom(false);
    }
  };

  const onAddRoomButtonClick = () => {
    setIsCreatingRoom(true);
  };

  const onCancelButtonClick = () => {
    setIsCreatingRoom(false);
  };

  return (
    <Flex flexDir="column" alignItems="flex-end">
      {isCreatingRoom ? (
        <>
          <ButtonGroup variant="outline" spacing="4">
            <Button onClick={handleAddRoom} colorScheme="yellow">
              Add
            </Button>
            <Button onClick={onCancelButtonClick}>Cancel</Button>
          </ButtonGroup>
        </>
      ) : (
        <Button
          isDisabled={currentRoomsNumber >= 3}
          colorScheme="yellow"
          onClick={onAddRoomButtonClick}
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
  currentRoomsNumber: PropTypes.number,
};

export default CreateRoom;
