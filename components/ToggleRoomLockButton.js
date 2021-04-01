import PropTypes from 'prop-types';
import { IconButton, useToast } from '@chakra-ui/react';
import { BsUnlockFill, BsLockFill } from 'react-icons/bs';
import { updateRoom } from '@/lib/db';
import { useState } from 'react';

function ToggleRoomLockButton({ roomId, isLocked, setRoom }) {
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const onToggle = async () => {
    setIsLoading(true);

    try {
      const updatedRoom = await updateRoom(roomId, { locked: !isLocked });
      setRoom(updatedRoom);
    } catch (err) {
      toast({
        title: 'Something went wrong... 😥',
        status: 'error',
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <IconButton
      isDisabled={isLoading}
      isLoading={isLoading}
      ml={2}
      onClick={onToggle}
      aria-label={isLocked ? 'Unlock room' : 'Lock room'}
      icon={isLocked ? <BsLockFill /> : <BsUnlockFill />}
    />
  );
}

ToggleRoomLockButton.propTypes = {
  roomId: PropTypes.number.isRequired,
  isLocked: PropTypes.bool.isRequired,
  setRoom: PropTypes.func.isRequired,
};

export default ToggleRoomLockButton;
