import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Box, Button, Flex, Heading } from '@chakra-ui/react';
import Layout from '@/components/Layout';
import { useAuth } from '@/lib/AuthContext';

export default function Account() {
  const router = useRouter();
  const { user, signOut } = useAuth();

  useEffect(() => {
    if (!user) {
      router.replace('/signin');
    }
  }, [router, user]);

  return (
    <Layout>
      <Box w="full" maxW="1280px" px={4} pt={{ base: 16, lg: 32 }} mx="auto">
        <Flex justify="space-between">
          <Heading as="h2" size="lg">
            Your Account
          </Heading>

          <Button onClick={signOut} colorScheme="yellow">
            Logout
          </Button>
        </Flex>
      </Box>
    </Layout>
  );
}
