import { useMeeting } from '@/lib/MeetingContext';
import fetcher from '@/utils/fetcher';
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
import { nanoid } from 'nanoid';
import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';

function RoomForm() {
  const router = useRouter();
  const { identity, roomName, getToken } = useMeeting();
  const [identityValue, setIdentityValue] = useState(identity);
  const [roomNameValue, setRoomNameValue] = useState(roomName);
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState(null);
  const bgColor = useColorModeValue('white', 'gray.900');

  const onCreateToggle = useCallback(() => {
    setIsCreating((prev) => !prev);
    setError(null);
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!identityValue || (!isCreating && !roomNameValue)) return;

    const roomName = slugify(isCreating ? nanoid() : roomNameValue);

    try {
      // Make sure a room exists before user will try to join it
      if (!isCreating) {
        await fetcher(`/api/video/room?name=${roomName}`);
      }

      await getToken(identityValue, roomName);
      router.push(`/${roomName}`);
    } catch (error) {
      setError(error);
    }
  };

  return (
    <Box
      bgColor={bgColor}
      w="full"
      px={4}
      py={8}
      boxShadow="xl"
      borderRadius="lg"
      bgGradient="linear(yellow.50 0%, gray.50 30%, blue.50 60%)"
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
        <Text textAlign="center" my={2} color="red.500">
          {error.message}
        </Text>
      )}
      <Box as="form" onSubmit={onSubmit} mt={6} w="full" maxW="md" mx="auto">
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
            bgColor="white"
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
              bgColor="white"
            />
          </FormControl>
        )}

        <Button
          type="submit"
          w="full"
          colorScheme="yellow"
          h={12}
          px={6}
          mt={6}
          mx="auto"
          // bgGradient="linear(to-r, blue.400, blue.500)"
        >
          {isCreating ? 'Create' : 'Join'}
        </Button>
      </Box>

      <Button
        variant="link"
        onClick={onCreateToggle}
        mt={6}
        display="block"
        mx="auto"
        color="blue.500"
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
