import useDbRoom from '@/hooks/useDbRoom';
import useMeetingLayout from '@/hooks/useMeetingLayout';
import { useAuth } from '@/lib/AuthContext';
import { useVideoContext } from '@/lib/VideoContext';
import { Box, Flex, Grid, Text, useDisclosure } from '@chakra-ui/react';
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
import ToggleRoomLockButton from './ToggleRoomLockButton';
import ToggleVideoButton from './ToggleVideoButton';
import useParticipants from './videoProvider/useParticipants';

function Room({ roomName }) {
  const { room } = useVideoContext();
  const { room: dbRoom, setRoom } = useDbRoom(roomName);
  const { user } = useAuth();
  const participants = useParticipants(room);
  const {
    isOpen: isChatOpen,
    onClose: onChatClose,
    onToggle: onChatToggle,
  } = useDisclosure();
  const { width, height, cols } = useMeetingLayout({
    videoCount: participants.length + 1,
    offsetH: 155, // 65px height header, 90px controllers,
    offsetW: isChatOpen ? 300 : 0,
  });

  const isUserRoomOwner = dbRoom && user && dbRoom.owner_id === user.id;

  const remoteParticipants = participants.map((participant) => (
    <Participant
      width={width}
      height={height}
      key={participant.sid}
      local={false}
      participant={participant}
    />
  ));

  return (
    <Flex w="full" h="100vh">
      <Grid flex={1} templateRows="65px auto 90px">
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
              {isUserRoomOwner && (
                <ToggleRoomLockButton
                  roomId={Number(dbRoom.id)}
                  isLocked={dbRoom.locked}
                  setRoom={setRoom}
                />
              )}
            </Flex>
            <CopyLinkButton />
          </Nav>
        </Header>

        <Flex
          wrap="wrap"
          justify="center"
          width="full"
          maxWidth={`calc(${width}px * ${cols})`}
          mx="auto"
        >
          <Participant
            width={width}
            height={height}
            local={true}
            participant={room.localParticipant}
          />
          {remoteParticipants}
        </Flex>

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

      {isChatOpen && <Chat onClose={onChatClose} roomName={roomName} />}
    </Flex>
  );
}

Room.propTypes = {
  roomName: PropTypes.string.isRequired,
};

export default Room;
