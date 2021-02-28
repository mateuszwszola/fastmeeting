import { SimpleGrid, Box } from '@chakra-ui/react';
import { useVideoContext } from '@/lib/VideoContext';
import useParticipants from './videoProvider/useParticipants';
import Participant from './Participant';

const Room = () => {
  const { room } = useVideoContext();
  const participants = useParticipants(room);

  const remoteParticipants = participants.map((participant) => (
    <Box
      key={participant.sid}
      w="full"
      mx="auto"
      borderRadius="md"
      boxShadow="md"
    >
      <Participant participant={participant} />
    </Box>
  ));

  return (
    <SimpleGrid columns={[1, null, 2]} spacing={4}>
      <Box w="full" mx="auto" borderRadius="md" boxShadow="md">
        {room && <Participant participant={room.localParticipant} />}
      </Box>
      {remoteParticipants}
    </SimpleGrid>
  );
};

export default Room;
