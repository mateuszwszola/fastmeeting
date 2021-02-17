import Layout from '@/components/Layout';
import RoomForm from '@/components/RoomForm';
import { Box, Flex, Heading, Text } from '@chakra-ui/react';

export default function Home() {
  return (
    <Layout>
      <Flex
        flexDir="column"
        align="center"
        justify="center"
        px={{ base: 4, md: 0 }}
        pt={{ base: 16, lg: 32 }}
        mx="auto"
        maxW={{ sm: 'xl', md: 'full' }}
      >
        <Flex
          w="full"
          maxW="2xl"
          flexDir="column"
          align="center"
          px={{ md: 8 }}
        >
          <Box
            maxW="xl"
            mb={[10, 12]}
            mx={{ md: 'auto' }}
            textAlign={{ sm: 'center' }}
          >
            <Heading
              as="h1"
              size="2xl"
              bgGradient="linear(to-l, yellow.400,blue.500)"
              bgClip="text"
              maxW="lg"
              fontWeight="bold"
              lineHeight={1}
              letterSpacing="tight"
              mx={{ sm: 'auto' }}
            >
              Online video meetings with live chat
            </Heading>
            <Text mt={6} color="gray.500" fontSize={{ md: 'lg' }}>
              Simply create or join the room, invite friends by sending them a
              link <br />
              and enjoy the company.
            </Text>
          </Box>

          <RoomForm />
        </Flex>
      </Flex>
    </Layout>
  );
}
