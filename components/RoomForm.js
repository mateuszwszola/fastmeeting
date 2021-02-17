import { useMeeting } from '@/lib/MeetingContext';
import { slugify } from '@/utils/helpers';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';

function RoomForm() {
  const router = useRouter();
  const { identity, roomName, joinRoom, createRoom } = useMeeting();
  const [identityValue, setIdentityValue] = useState(identity);
  const [roomNameValue, setRoomNameValue] = useState(roomName);
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState(null);
  const boxBgColor = useColorModeValue('white', 'black');
  const inputBgColor = useColorModeValue('gray.50', 'gray.900');

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
        const roomName = slugify(roomNameValue);
        await joinRoom(identityValue, roomName);
        router.push(`/${roomName}`);
      }
    } catch (error) {
      setError(error);
    }
  };

  return (
    <Box
      w="full"
      px={4}
      py={8}
      boxShadow="xl"
      borderRadius="xl"
      bgColor={boxBgColor}
    >
      <Heading
        as="h3"
        fontSize={['2xl', '3xl']}
        textAlign="center"
        fontWeight="medium"
      >
        {isCreating ? 'Create' : 'Join'} room
      </Heading>
      {error && (
        <Text textAlign="center" my={2}>
          {error.message}
        </Text>
      )}
      <Box as="form" onSubmit={onSubmit} mt={6} w="full" maxW="xs" mx="auto">
        <FormControl id="name">
          <FormLabel>Display Name</FormLabel>
          <Input
            type="text"
            id="name"
            value={identityValue}
            onChange={(e) => setIdentityValue(e.target.value)}
            placeholder="Enter your name"
            required
            w="full"
            h={12}
            px={4}
            borderRadius="md"
            display="block"
            bgColor={inputBgColor}
          />
        </FormControl>

        {!isCreating && (
          <FormControl mt={3} id="roomName">
            <FormLabel>fastmeeting/</FormLabel>
            <Input
              type="text"
              id="roomName"
              value={roomNameValue}
              onChange={(e) => setRoomNameValue(e.target.value)}
              placeholder="Room name"
              required
              w="full"
              h={12}
              px={4}
              borderRadius="md"
              display="block"
              bgColor={inputBgColor}
            />
          </FormControl>
        )}

        <Button
          type="submit"
          w="full"
          colorScheme="blue"
          h={12}
          px={6}
          mt={6}
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
    </Box>
  );
}

export default RoomForm;
