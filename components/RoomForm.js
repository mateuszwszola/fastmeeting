import useInput from '@/hooks/useInput';
import { fetchRoom } from '@/lib/db';
import { useMeetingContext } from '@/lib/MeetingContext';
import { Box, Button, FormControl, FormLabel, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';
import RoomFormBox from './roomForm/RoomFormBox';
import RoomFormHeading from './roomForm/RoomFormHeading';
import RoomFormInput from './roomForm/RoomFormInput';

function RoomForm() {
  const router = useRouter();
  const { identity, roomName, createRoom, isFetching } = useMeetingContext();
  const [identityValue, handleIdentityValueChange] = useInput(identity || '');
  const [roomNameValue, handleRoomNameValueChange] = useInput(roomName || '');
  const [isCreating, setIsCreating] = useState(true);
  const [error, setError] = useState(null);

  const onCreateToggle = useCallback(() => {
    setIsCreating((prev) => !prev);
    setError(null);
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!identityValue || (!isCreating && !roomNameValue)) return;

    try {
      if (isCreating) {
        const { roomName } = await createRoom(identityValue);
        router.push(`/${roomName}`);
      } else {
        // Make sure room exists before joining it
        const room = await fetchRoom(roomNameValue);
        if (!room) {
          throw new Error('Room does not exists');
        }
        router.push(`/${roomNameValue}`);
      }
    } catch (error) {
      setError(error);
    }
  };

  return (
    <RoomFormBox>
      <RoomFormHeading>{isCreating ? 'Create' : 'Join'} room</RoomFormHeading>
      {error && (
        <Text textAlign="center" my={2}>
          {error.message}
        </Text>
      )}

      <Box as="form" onSubmit={onSubmit} mt={6} w="full" maxW="xs" mx="auto">
        <FormControl id="name">
          <FormLabel>Display Name</FormLabel>
          <RoomFormInput
            name="name"
            value={identityValue}
            onChange={handleIdentityValueChange}
            placeholder="Enter your name"
          />
        </FormControl>

        {!isCreating && (
          <FormControl mt={3} id="roomName">
            <FormLabel>fastmeeting/</FormLabel>
            <RoomFormInput
              name="roomName"
              value={roomNameValue}
              onChange={handleRoomNameValueChange}
              placeholder="Room name"
            />
          </FormControl>
        )}

        <Button
          mt={6}
          isLoading={isFetching}
          type="submit"
          size="lg"
          w="full"
          colorScheme="blue"
          mx="auto"
        >
          {isCreating ? 'Create' : 'Join'}
        </Button>
      </Box>

      <Button
        variant="link"
        colorScheme="blue"
        onClick={onCreateToggle}
        mt={6}
        display="block"
        mx="auto"
        _focus={{
          outline: 'none',
          color: 'blue.400',
        }}
      >
        Or {isCreating ? 'join' : 'create'} room instead
      </Button>
    </RoomFormBox>
  );
}

export default RoomForm;
