import { APP_NAME } from '@/components/Layout';
import {
  Box,
  Flex,
  IconButton,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { FaHandPaper } from 'react-icons/fa';
import Logo from './icons/Logo';
import Header from './layout/Header';
import Nav from './layout/Nav';
import NavLink from './layout/NavLink';
import Controllers from './meetingLayout/Controllers';
import CopyLinkButton from './meetingLayout/CopyLinkButton';
import ToggleAudioButton from './ToggleAudioButton';
import ToggleVideoButton from './ToggleVideoButton';

const MeetingLayout = ({ isConnecting, handleLogout, children }) => {
  const router = useRouter();
  const { roomName } = router.query;
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
                <Text fontWeight="medium">{roomName}</Text>
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

        {/* Bottom nav */}
        <Box position="fixed" bottom="0" left="0" right="0">
          <Controllers>
            <ToggleVideoButton />

            <ToggleAudioButton />

            {/* <Box>
              <IconButton icon={<BsChatDotsFill />} />
              <Text>Chat</Text>
            </Box> */}
            <Box>
              <IconButton
                isLoading={isConnecting}
                onClick={handleLogout}
                icon={<FaHandPaper />}
              />
              <Text>Leave</Text>
            </Box>
          </Controllers>
        </Box>
      </Flex>
    </>
  );
};

MeetingLayout.propTypes = {
  isConnecting: PropTypes.bool.isRequired,
  handleLogout: PropTypes.func.isRequired,
};

export default MeetingLayout;
