import { useState } from 'react';
import useSWR from 'swr';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import {
  Box,
  Flex,
  Text,
  CloseButton,
  Input,
  useToast,
  useBreakpointValue,
  Grid,
} from '@chakra-ui/react';
import fetcher from '@/utils/fetcher';

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
  const { data, error, mutate } = useSWR(
    `/api/messages?roomName=${roomName}`,
    fetcher
  );
  const [message, setMessage] = useState('');
  const toast = useToast();
  const chatProps = useBreakpointValue({ base: mobileProps, md: desktopProps });

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

      <Box p={2}>
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          bgColor="gray.50"
          placeholder="Enter a message"
          onKeyDown={(e) => addMessageOnEnter(e)}
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
