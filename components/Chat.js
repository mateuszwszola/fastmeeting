import useChat from '@/hooks/useChat';
import {
  Box,
  CloseButton,
  Flex,
  Grid,
  Input,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { useState } from 'react';

const mobileProps = {
  pos: 'absolute',
  top: 0,
  bottom: 0,
  right: 0,
  left: 0,
};

const desktopProps = {
  width: '300px',
};

function Chat({ onClose, roomName, identity }) {
  const [message, setMessage] = useState('');
  const chatProps = useBreakpointValue({ base: mobileProps, md: desktopProps });
  const { messages, error, addMessage } = useChat(roomName);

  const addMessageOnEnter = async (e) => {
    if (e.keyCode === 13) {
      const messageBody = {
        message,
        identity,
      };
      addMessage(messageBody, {
        // Clear message input on success
        onMutate: () => setMessage(''),
      });
    }
  };

  return (
    <Grid
      height="100vh"
      templateRows="65px auto 65px"
      bgColor="black"
      color="white"
      {...chatProps}
    >
      <Flex w="full" justify="flex-end" p={2}>
        <CloseButton onClick={onClose} />
      </Flex>

      <Box overflowY="auto" px={4} py={2}>
        {error ? (
          <Text>Failed to fetch</Text>
        ) : !messages ? (
          <Text>Loading...</Text>
        ) : (
          <>
            {messages.map((message) => {
              return (
                <Box
                  mt={2}
                  p={2}
                  bgColor="blue"
                  color="white"
                  key={message.id}
                  textAlign="left"
                  rounded="md"
                >
                  <Text>{message.identity}</Text>
                  <Text>{message.message}</Text>
                </Box>
              );
            })}
          </>
        )}
      </Box>

      <Box p={2}>
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          bgColor="gray.50"
          placeholder="Enter a message"
          onKeyDown={addMessageOnEnter}
        />
      </Box>
    </Grid>
  );
}

Chat.propTypes = {
  onClose: PropTypes.func.isRequired,
  roomName: PropTypes.string.isRequired,
  identity: PropTypes.string.isRequired,
};

export default Chat;
