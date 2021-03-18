import PropTypes from 'prop-types';
import { Box, SimpleGrid } from '@chakra-ui/react';
import { useVideoContext } from '@/lib/VideoContext';
import useParticipants from './videoProvider/useParticipants';
import Participant from './Participant';
import useDbRoom from '@/hooks/useDbRoom';
import Controllers from './meetingLayout/Controllers';
import ToggleVideoButton from './ToggleVideoButton';
import ToggleAudioButton from './ToggleAudioButton';
import LeaveRoomButton from './LeaveRoomButton';
import { useAuth } from '@/lib/AuthContext';
import EndMeetingButton from './EndMeetingButton';

export default function Room({ roomName }) {
  const { room } = useVideoContext();
  const { room: dbRoom } = useDbRoom(roomName);
  const { user } = useAuth();
  const participants = useParticipants(room);

  const isUserRoomOwner = dbRoom && user && dbRoom.owner_id === user.id;

  const remoteParticipants = participants.map((participant) => (
    <Participant
      key={participant.sid}
      local={false}
      participant={participant}
    />
  ));

  return (
    <Box w="full" mx="auto">
      <SimpleGrid columns={[1, null, 2]} spacing={4}>
        <Participant local={true} participant={room.localParticipant} />

        {remoteParticipants}
      </SimpleGrid>

      <Box position="fixed" bottom="0" left="0" right="0">
        <Controllers>
          <ToggleVideoButton />

          <ToggleAudioButton />

          <LeaveRoomButton />

          {isUserRoomOwner && <EndMeetingButton />}
        </Controllers>
      </Box>
    </Box>
  );
}

Room.propTypes = {
  roomName: PropTypes.string.isRequired,
};
