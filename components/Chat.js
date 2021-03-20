import PropTypes from 'prop-types';
import useSWR from 'swr';
import { nanoid } from 'nanoid';
import {
  Box,
  Flex,
  Text,
  CloseButton,
  Input,
  Grid,
  useToast,
} from '@chakra-ui/react';
import fetcher from '@/utils/fetcher';
import { useState } from 'react';

function Chat({ isOpen, onClose, roomName, identity, ...props }) {
  const { data, error, mutate } = useSWR(
    isOpen ? `/api/messages?roomName=${roomName}` : null,
    fetcher
  );
  const [message, setMessage] = useState('');
  const toast = useToast();

  const addMessageOnEnter = async (e) => {
    if (e.keyCode === 13) {
      const messageBody = {
        message,
        identity,
      };
      // Optimistically append the new message
      mutate(
        { messages: [...data.messages, { id: nanoid(), ...messageBody }] },
        false
      );
      setMessage(''); // Clear message input

      try {
        // Add a message
        await fetcher(`/api/messages?roomName=${roomName}`, {
          body: messageBody,
        });
      } catch (error) {
        toast({
          title: `There was an error while adding a new message`,
          status: 'error',
          isClosable: true,
        });

        // Rollback messages on error
        mutate();
      }
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <Box
      pos="fixed"
      right="0"
      top="0"
      bottom="0"
      as="nav"
      w={64}
      bgColor="white"
      color="black"
      minWidth="150px"
      maxHeight="100vh"
      {...props}
    >
      <Grid w="full" h="full" templateRows="50px auto 50px">
        <Flex justify="flex-end" p={2}>
          <CloseButton onClick={onClose} />
        </Flex>
        <Box overflowY="auto" px={2}>
          {error ? (
            <Text>Failed to fetch</Text>
          ) : !data ? (
            <Text>Loading...</Text>
          ) : (
            <>
              {data.messages.map((message) => {
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
        <Box px={2}>
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            bgColor="gray.50"
            placeholder="Enter a message"
            onKeyDown={(e) => addMessageOnEnter(e)}
          />
        </Box>
      </Grid>
    </Box>
  );
}

Chat.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  roomName: PropTypes.string.isRequired,
  identity: PropTypes.string.isRequired,
};

export default Chat;
