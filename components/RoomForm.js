import { Box, Button, FormControl, FormLabel, Text } from '@chakra-ui/react';
import { useMeetingContext } from '@/lib/MeetingContext';
import RoomFormBox from './roomForm/RoomFormBox';
import RoomFormHeading from './roomForm/RoomFormHeading';
import RoomFormInput from './roomForm/RoomFormInput';
import useRoomForm from '@/components/roomForm/useRoomForm';
import useInput from '@/hooks/useInput';

function RoomForm() {
  const { identity, roomName, isFetching } = useMeetingContext();
  const [identityValue, handleIdentityValueChange] = useInput(identity || '');
  const [roomNameValue, handleRoomNameValueChange] = useInput(roomName || '');
  const [isCreating, error, { onCreateToggle, onSubmit }] = useRoomForm();

  return (
    <RoomFormBox>
      <RoomFormHeading>{isCreating ? 'Create' : 'Join'} room</RoomFormHeading>
      {error && (
        <Text textAlign="center" my={2}>
          {error.message}
        </Text>
      )}

      <Box
        as="form"
        onSubmit={onSubmit({
          identity: identityValue,
          roomName: roomNameValue,
        })}
        mt={6}
        w="full"
        maxW="xs"
        mx="auto"
      >
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
          data-cy="room-form-btn"
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
