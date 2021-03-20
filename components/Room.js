import useDbRoom from '@/hooks/useDbRoom';
import { useAuth } from '@/lib/AuthContext';
import { useVideoContext } from '@/lib/VideoContext';
import { Box, SimpleGrid, Text, useDisclosure } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import Chat from './Chat';
import Controllers from './Controllers';
import EndMeetingButton from './EndMeetingButton';
import LeaveRoomButton from './LeaveRoomButton';
import Participant from './Participant';
import ToggleAudioButton from './ToggleAudioButton';
import ToggleChatButton from './ToggleChatButton';
import ToggleVideoButton from './ToggleVideoButton';
import useParticipants from './videoProvider/useParticipants';

export default function Room({ roomName }) {
  const { room } = useVideoContext();
  const { room: dbRoom } = useDbRoom(roomName);
  const { user } = useAuth();
  const participants = useParticipants(room);
  const {
    isOpen: isChatOpen,
    onClose: onChatClose,
    onToggle: onChatToggle,
  } = useDisclosure();

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
          <ToggleVideoButton>
            <Text>Cam</Text>
          </ToggleVideoButton>

          <ToggleAudioButton>
            <Text>Mic</Text>
          </ToggleAudioButton>

          <LeaveRoomButton />

          {isUserRoomOwner && <EndMeetingButton />}

          <ToggleChatButton onToggle={onChatToggle}>
            <Text>Chat</Text>
          </ToggleChatButton>

          <Chat
            isOpen={isChatOpen}
            onClose={onChatClose}
            roomName={roomName}
            identity={user.full_name || room.localParticipant.identity}
          />
        </Controllers>
      </Box>
    </Box>
  );
}

Room.propTypes = {
  roomName: PropTypes.string.isRequired,
};
