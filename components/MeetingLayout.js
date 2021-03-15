import PropTypes from 'prop-types';
import { APP_NAME } from '@/components/Layout';
import { Box, Flex, Text, useColorModeValue } from '@chakra-ui/react';
import Head from 'next/head';
import Logo from './icons/Logo';
import Header from './layout/Header';
import Nav from './layout/Nav';
import NavLink from './layout/NavLink';
import CopyLinkButton from './meetingLayout/CopyLinkButton';

export default function MeetingLayout({ roomName, children }) {
  const bgColor = useColorModeValue('gray.50', 'black');

  return (
    <>
      <Head>
        <title>Meeting | {APP_NAME}</title>
      </Head>

      <Flex
        position="relative"
        w="100%"
        minH="100vh"
        flexDir="column"
        overflow="hidden"
        bgColor={bgColor}
      >
        <Header>
          <Nav>
            <Flex align="center">
              <NavLink
                href="/"
                leftIcon={<Logo w={8} h={8} color="blue.500" />}
              >
                <Text as="span" display={['none', 'inline']} fontWeight="bold">
                  Fast Meeting
                </Text>
              </NavLink>
              <Box ml={4}>
                <Text fontWeight="medium">Room name: {roomName}</Text>
              </Box>
            </Flex>
            <Flex>
              <CopyLinkButton />
            </Flex>
          </Nav>
        </Header>

        {/* Main */}
        <Box as="main" w="full" maxWidth="1280px" mx="auto" flex={1} p={4}>
          {children}
        </Box>

        {/* Sidebar */}
        <Box
          display="none"
          as="nav"
          w={64}
          bgColor="gray.900"
          color="gray.100"
          overflow="scroll"
          maxW="20%"
          minWidth="150px"
          maxHeight="100vh"
        ></Box>
      </Flex>
    </>
  );
}

MeetingLayout.propTypes = {
  roomName: PropTypes.string,
};
