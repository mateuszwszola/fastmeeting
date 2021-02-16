import CreateRoom from '@/components/dashboard/CreateRoom';
import RoomTable from '@/components/dashboard/RoomTable';
import Layout from '@/components/Layout';
import { useAuth } from '@/lib/AuthContext';
import { addRoom, fetchUserRooms } from '@/lib/db';
import { Box, Flex, Heading, useToast } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Dashboard() {
  const router = useRouter();
  const { user } = useAuth();
  const [rooms, setRooms] = useState([]);
  const [isLoadingRooms, setIsLoadingRooms] = useState(false);
  const toast = useToast();

  useEffect(() => {
    if (!user) {
      router.replace('/signin');
    }
  }, [router, user]);

  useEffect(() => {
    if (!user) return;

    setIsLoadingRooms(true);

    fetchUserRooms(user.id)
      .then((data) => setRooms(data))
      .catch((err) => {
        toast({
          title: 'An error occurred.',
          description: err.message || 'Unable to load rooms.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      })
      .finally(() => {
        setIsLoadingRooms(false);
      });
  }, [toast, user]);

  const onAddRoom = async (newRoomName) => {
    if (!newRoomName) return;

    addRoom(newRoomName, user.id)
      .then((newRoom) => {
        setRooms((prevRooms) => [...prevRooms, newRoom]);
      })
      .catch((err) => {
        toast({
          title: 'An error occurred.',
          description: err.message || 'Unable to add room.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      });
  };

  return (
    <Layout>
      <Box w="full" maxW="1280px" px={4} pt={{ base: 16, lg: 32 }} mx="auto">
        <Flex justify="space-between">
          <Heading as="h2" size="lg">
            Your Rooms
          </Heading>

          <CreateRoom
            onAddRoom={onAddRoom}
            currentRoomsNumber={rooms?.length}
          />
        </Flex>

        <RoomTable rooms={rooms} isLoadingRooms={isLoadingRooms} />
      </Box>
    </Layout>
  );
}
