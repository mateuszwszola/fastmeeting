import RoomTable from '@/components/dashboard/RoomTable';
import Layout from '@/components/Layout';
import { Box, Button, Flex, Heading } from '@chakra-ui/react';

export default function Dashboard() {
  return (
    <Layout>
      <Box w="full" maxW="1280px" px={4} pt={{ base: 16, lg: 32 }} mx="auto">
        <Flex justify="space-between">
          <Heading as="h2" size="lg">
            Your Rooms
          </Heading>
          <Button colorScheme="yellow">Add room</Button>
        </Flex>

        <RoomTable />
      </Box>
    </Layout>
  );
}
