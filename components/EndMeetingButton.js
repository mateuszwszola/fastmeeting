import { useState, useRef } from 'react';
import { useRouter } from 'next/router';
import {
  useToast,
  Box,
  IconButton,
  Text,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
} from '@chakra-ui/react';
import { useAuth } from '@/lib/AuthContext';
import { MdCallEnd } from 'react-icons/md';
import fetcher from '@/utils/fetcher';

export default function EndMeetingButton() {
  const router = useRouter();
  const { roomName } = router.query;
  const { session } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const cancelRef = useRef();

  function handleMeetingEnd() {
    setIsLoading(true);

    return fetcher('/api/room/complete', {
      body: { roomName },
      token: session?.access_token,
    })
      .catch((err) => {
        toast({
          title: 'An error occurred.',
          description: err.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <>
      <Box>
        <IconButton
          onClick={() => setIsOpen(true)}
          isDisabled={isLoading}
          icon={<MdCallEnd />}
        />
        <Text>End</Text>
      </Box>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={() => setIsOpen(false)}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              End a meeting
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? All participants will be disconnected
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={handleMeetingEnd} ml={3}>
                End
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
