import { useState } from 'react';
import { useRouter } from 'next/router';
import { useToast, Box, IconButton } from '@chakra-ui/react';
import { useAuth } from '@/lib/AuthContext';
import { MdCallEnd } from 'react-icons/md';
import fetcher from '@/utils/fetcher';

const EndMeetingButton = () => {
  const router = useRouter();
  const { roomName } = router.query;
  const { session } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const handleMeetingEnd = () => {
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
  };

  return (
    <Box>
      <IconButton
        onClick={handleMeetingEnd}
        isDisabled={isLoading}
        icon={<MdCallEnd />}
      />
    </Box>
  );
};

export default EndMeetingButton;
