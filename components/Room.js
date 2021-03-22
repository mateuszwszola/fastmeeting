import useDbRoom from '@/hooks/useDbRoom';
import { useAuth } from '@/lib/AuthContext';
import { useVideoContext } from '@/lib/VideoContext';
import {
  Box,
  SimpleGrid,
  Flex,
  Text,
  useDisclosure,
  Grid,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';
import Chat from './Chat';
import Controllers from './Controllers';
import EndMeetingButton from './EndMeetingButton';
import Logo from './icons/Logo';
import Header from './layout/Header';
import Nav from './layout/Nav';
import NavLink from './layout/NavLink';
import LeaveRoomButton from './LeaveRoomButton';
import CopyLinkButton from './meetingLayout/CopyLinkButton';
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
    <Flex w="full" h="100vh">
      <Grid w="full" templateRows="65px auto 90px">
        <Header>
          <Nav>
            <Flex align="center">
              <NavLink
                href="/"
                leftIcon={<Logo w={8} h={8} color="blue.500" />}
              >
                <Text as="span" display={['none', 'inline']} fontWeight="bold">
                  Fast Meeting
                </Text>
              </NavLink>
              <Box ml={4}>
                <Text fontWeight="medium">/{roomName}</Text>
              </Box>
            </Flex>

            <CopyLinkButton />
          </Nav>
        </Header>

        <SimpleGrid
          w="full"
          p={2}
          columns={[1, null, 2]}
          spacing={4}
          alignItems="center"
        >
          <Participant local={true} participant={room.localParticipant} />

          {remoteParticipants}
        </SimpleGrid>

        <Controllers>
          <ToggleVideoButton>
            <Text>Cam</Text>
          </ToggleVideoButton>

          <ToggleAudioButton>
            <Text>Mic</Text>
          </ToggleAudioButton>

          <LeaveRoomButton>
            <Text>Leave</Text>
          </LeaveRoomButton>

          {isUserRoomOwner && (
            <EndMeetingButton>
              <Text>End</Text>
            </EndMeetingButton>
          )}

          <ToggleChatButton onToggle={onChatToggle}>
            <Text>Chat</Text>
          </ToggleChatButton>
        </Controllers>
      </Grid>

      {isChatOpen && (
        <Chat
          onClose={onChatClose}
          roomName={roomName}
          identity={user?.full_name || room.localParticipant.identity}
        />
      )}
    </Flex>
  );
}

Room.propTypes = {
  roomName: PropTypes.string.isRequired,
};
