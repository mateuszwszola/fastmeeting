import { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';
import { nanoid } from 'nanoid';
import Button from '@/components/Button';
import { useMeeting } from '@/lib/MeetingContext';
import { slugify } from '@/utils/helpers';
import fetcher from '@/utils/fetcher';
import {
  Box,
  Heading,
  Text,
  FormControl,
  FormLabel,
  Input,
  useColorModeValue,
} from '@chakra-ui/react';

function RoomForm() {
  const router = useRouter();
  const { roomName: roomNameParam } = router.query;
  const { identity, roomName, getToken } = useMeeting();
  const [identityValue, setIdentityValue] = useState(identity);
  const [roomNameValue, setRoomNameValue] = useState(roomName);
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState(null);
  const bgColor = useColorModeValue('white', 'gray.900');

  useEffect(() => {
    if (roomNameParam) {
      setRoomNameValue(roomNameParam);
      setIsCreating(false);
    }
  }, [roomNameParam]);

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
    >
      <Heading as="h3" fontSize="3xl" textAlign="center" fontWeight="medium">
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
          />
        </FormControl>

        {!isCreating && (
          <FormControl mt={2} id="roomName">
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
            />
          </FormControl>
        )}

        <Button type="submit" className="w-full h-12 px-6 mt-6 mx-auto">
          {isCreating ? 'Create' : 'Join'}
        </Button>
      </Box>

      <button
        onClick={onCreateToggle}
        className="mt-6 block mx-auto text-blue-500 hover:text-blue-400 focus:text-blue-600 focus:outline-none"
      >
        Or {isCreating ? 'join' : 'create'} room instead
      </button>
    </Box>
  );
}

export default RoomForm;
