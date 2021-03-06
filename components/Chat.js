import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  CloseButton,
  Flex,
  Grid,
  Input,
  ListItem,
  Spinner,
  Text,
  UnorderedList,
  useBreakpointValue,
  useColorModeValue,
} from '@chakra-ui/react';
import useChat from '@/hooks/useChat';
import { useMeetingContext } from '@/lib/MeetingContext';

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

const Chat = ({ onClose, roomName }) => {
  const [message, setMessage] = useState('');
  const chatProps = useBreakpointValue({ base: mobileProps, md: desktopProps });
  const { messages, error, addMessage } = useChat(roomName);
  const { userDisplayName } = useMeetingContext();
  const bgColor = useColorModeValue('white', 'black');
  const borderColor = useColorModeValue('gray.200', 'gray.800');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({
        block: 'start',
        behavior: 'smooth',
      });
    }
  }, [messages]);

  const addMessageOnEnter = async (e) => {
    if (e.keyCode === 13) {
      const messageBody = {
        message,
        identity: userDisplayName,
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
      templateRows="65px auto 90px"
      bgColor={bgColor}
      boxShadow="md"
      {...chatProps}
    >
      <Flex w="full" justify="flex-end" align="center" p={2}>
        <CloseButton size="lg" onClick={onClose} />
      </Flex>

      <Box overflowY="auto" px={4} py={2}>
        {error ? (
          <Text textAlign="center">Unable to load messages</Text>
        ) : !messages ? (
          <Spinner display="block" mx="auto" />
        ) : messages.length === 0 ? (
          <Text textAlign="center">There are no messages</Text>
        ) : (
          <UnorderedList spacing={5} listStyleType="none" m={0}>
            {messages.map((message) => {
              return (
                <ListItem
                  p={2}
                  bgColor="blue.500"
                  color="white"
                  key={message.id}
                  textAlign="left"
                  rounded="md"
                >
                  <Text fontWeight="medium">{message.identity}</Text>
                  <Text mt={1}>{message.message}</Text>
                </ListItem>
              );
            })}
            <ListItem ref={messagesEndRef} height={0} />
          </UnorderedList>
        )}
      </Box>

      <Flex align="center" borderTop="2px" borderColor={borderColor} p={2}>
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter a message"
          onKeyDown={addMessageOnEnter}
        />
      </Flex>
    </Grid>
  );
};

Chat.propTypes = {
  onClose: PropTypes.func.isRequired,
  roomName: PropTypes.string.isRequired,
};

export default Chat;
