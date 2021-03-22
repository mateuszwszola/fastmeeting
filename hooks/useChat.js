import fetcher from '@/utils/fetcher';
import { useToast } from '@chakra-ui/react';
import { nanoid } from 'nanoid';
import { useCallback } from 'react';
import useSWR from 'swr';

export default function useChat(roomName) {
  const { data, error, mutate } = useSWR(
    `/api/messages?roomName=${roomName}`,
    fetcher,
    { refreshInterval: 1000 }
  );
  const toast = useToast();

  const addMessage = useCallback(
    async (newMessage, options) => {
      const { onMutate, onSuccess, onError } = options;

      // Optimistically append the new message
      mutate(
        (prevData) => ({
          messages: [
            ...(prevData?.messages || []),
            // Generate temporary unique ID for a message
            { id: nanoid(), ...newMessage },
          ],
        }),
        false
      );

      if (onMutate) onMutate(newMessage);

      try {
        // Make a request to add a message
        const response = await fetcher(`/api/messages?roomName=${roomName}`, {
          body: newMessage,
        });

        if (onSuccess) onSuccess(response);
      } catch (error) {
        toast({
          title: `There was an error while adding a new message`,
          status: 'error',
          isClosable: true,
        });

        // Rollback messages on error
        mutate();

        if (onError) onError(error);
      }
    },
    [mutate, roomName, toast]
  );

  return { messages: data?.messages, error, addMessage };
}
