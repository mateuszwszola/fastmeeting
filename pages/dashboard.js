import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import { Box, Flex, Heading, useToast } from '@chakra-ui/react';
import CreateRoom from '@/components/dashboard/CreateRoom';
import RoomTable from '@/components/dashboard/RoomTable';
import Layout from '@/components/Layout';
import { useAuth } from '@/lib/AuthContext';
import { addRoom, deleteRoom, fetchUserRooms } from '@/lib/db';

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

  const onAddRoom = useCallback(
    async (newRoomName) => {
      if (!newRoomName || !user) return;

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
    },
    [toast, user]
  );

  const onDeleteRoom = useCallback(
    async (roomId) => {
      deleteRoom(roomId)
        .then(() => {
          setRooms((prevRooms) =>
            prevRooms.filter((room) => room.id !== roomId)
          );
        })
        .catch((err) => {
          toast({
            title: 'An error occurred.',
            description: err.message || 'Unable to delete room.',
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
        });
    },
    [toast]
  );

  return (
    <Layout>
      <Box w="full" maxW="960px" px={4} pt={16} mx="auto">
        <Flex flexDir={['column', 'row']} justify="space-between">
          <Heading as="h2" size="xl">
            Your Rooms
          </Heading>

          {!isLoadingRooms && (
            <CreateRoom
              onAddRoom={onAddRoom}
              currentRoomsNumber={rooms?.length}
            />
          )}
        </Flex>

        <RoomTable
          rooms={rooms}
          isLoadingRooms={isLoadingRooms}
          onDelete={onDeleteRoom}
        />
      </Box>
    </Layout>
  );
}
