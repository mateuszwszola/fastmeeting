import { useCallback } from 'react';
import { Box, Flex, Heading, Text, useToast } from '@chakra-ui/react';
import CreateRoom from '@/components/dashboard/CreateRoom';
import RoomTable from '@/components/dashboard/RoomTable';
import Layout from '@/components/Layout';
import { useAuth } from '@/lib/AuthContext';
import { addRoom, deleteRoom, fetchUserRooms } from '@/lib/db';
import useSWR, { mutate } from 'swr';
import PrivatePage from '@/components/PrivatePage';

function Dashboard() {
  const { user } = useAuth();
  const toast = useToast();
  const { data: rooms, error: roomsError } = useSWR(
    user ? '/rooms' : null,
    () => fetchUserRooms(user.id)
  );

  const onAddRoom = useCallback(
    async (newRoomName) => {
      try {
        const newRoom = await addRoom(newRoomName, user.id);
        // update the local data immediately and revalidate (refetch)
        mutate('/rooms', (currentRooms) => [...currentRooms, newRoom]);
      } catch (err) {
        let errorMessage = 'Unable to add the room.';
        if (err.code === '23505') {
          errorMessage = `Room '${newRoomName}' already exists. Try a different name`;
        }

        toast({
          title: 'An error occurred.',
          description: errorMessage,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    },
    [toast, user]
  );

  const onDeleteRoom = useCallback(
    async (roomId) => {
      // Optimistically update cache data
      mutate(
        '/rooms',
        (currentRooms) => currentRooms.filter((r) => r.id !== roomId),
        false
      );

      await deleteRoom(roomId).catch(() => {
        toast({
          title: 'An error occurred.',
          description: 'Unable to delete the room.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      });

      // trigger a revalidation (refetch) to make sure our local data is correct
      mutate('/rooms');
    },
    [toast]
  );

  return (
    <Layout pageName="Dashboard">
      <Box w="full" maxW="960px" px={4} pt={16} mx="auto">
        <Flex flexDir={['column', 'row']} justify="space-between">
          <Heading as="h2" size="lg">
            Your Rooms
          </Heading>
          <CreateRoom
            disabled={roomsError || !rooms || Boolean(rooms?.length >= 3)}
            onAddRoom={onAddRoom}
          />
        </Flex>

        {roomsError ? (
          <Text textAlign="center">Unable to load rooms</Text>
        ) : (
          <RoomTable
            rooms={rooms}
            isLoadingRooms={!rooms}
            onDelete={onDeleteRoom}
          />
        )}
      </Box>
    </Layout>
  );
}

export default function DashboardPage() {
  return (
    <PrivatePage>
      <Dashboard />
    </PrivatePage>
  );
}
