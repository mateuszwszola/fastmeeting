import { useRef, useState } from 'react';
import {
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
import { FaHandPaper } from 'react-icons/fa';
import { useVideoContext } from '@/lib/VideoContext';
import useRoomState from '@/hooks/useRoomState';

export default function LeaveRoomButton() {
  const { room } = useVideoContext();
  const [isOpen, setIsOpen] = useState(false);
  const cancelRef = useRef();
  const roomState = useRoomState();

  const handleLeave = () => {
    room.disconnect();
  };

  return (
    <>
      <Box>
        <IconButton
          isDisabled={roomState === 'reconnecting'}
          onClick={() => setIsOpen(true)}
          icon={<FaHandPaper />}
        />
        <Text>Leave</Text>
      </Box>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={() => setIsOpen(false)}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Leave a meeting
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You are about to leave a meeting
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={handleLeave} ml={3}>
                Leave
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
