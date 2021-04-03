import Head from 'next/head';
import { Flex, useColorModeValue } from '@chakra-ui/react';
import { APP_NAME } from '@/components/Layout';

export default function MeetingLayout({ children }) {
  const bgColor = useColorModeValue('gray.50', 'black');

  return (
    <>
      <Head>
        <title>Meeting | {APP_NAME}</title>
      </Head>

      <Flex
        w="full"
        height="100vh"
        direction="column"
        justify="center"
        align="center"
        bgColor={bgColor}
      >
        {children}
      </Flex>
    </>
  );
}
