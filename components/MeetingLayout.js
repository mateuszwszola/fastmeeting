import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import PropTypes from 'prop-types';
import { APP_NAME } from '@/components/Layout';
import {
  Box,
  Button,
  Flex,
  IconButton,
  Text,
  useClipboard,
  useColorModeValue,
} from '@chakra-ui/react';
import {
  FaLink,
  FaVideo,
  FaVideoSlash,
  FaHandPaper,
  FaMicrophone,
  FaMicrophoneSlash,
} from 'react-icons/fa';
import { BsPeopleFill, BsChatDotsFill } from 'react-icons/bs';
import Logo from './icons/Logo';
import Header from './layout/Header';
import Nav from './layout/Nav';
import NavLink from './layout/NavLink';
import Controllers from './meetingLayout/Controllers';

const MeetingLayout = ({ isConnecting, handleLogout, children }) => {
  const router = useRouter();
  const { roomName } = router.query;
  const [roomUrl, setRoomUrl] = useState('');
  const { hasCopied, onCopy } = useClipboard(roomUrl);
  const bgColor = useColorModeValue('gray.50', 'black');
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);

  useEffect(() => {
    setRoomUrl(window.location.href);
  }, []);

  const toggleVideo = () => {
    setIsVideoOn((on) => !on);
  };

  const toggleMic = () => {
    setIsMicOn((on) => !on);
  };

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
              <Button
                size="sm"
                onClick={onCopy}
                aria-label="Copy meeting link"
                leftIcon={<FaLink />}
              >
                {hasCopied ? 'Copied' : 'Copy link'}
              </Button>
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
            <Box>
              <IconButton
                onClick={toggleVideo}
                icon={isVideoOn ? <FaVideo /> : <FaVideoSlash />}
              />
              <Text>Cam</Text>
            </Box>
            <Box>
              <IconButton
                onClick={toggleMic}
                icon={isMicOn ? <FaMicrophone /> : <FaMicrophoneSlash />}
              />
              <Text>Mic</Text>
            </Box>
            <Box>
              <IconButton icon={<BsChatDotsFill />} />
              <Text>Chat</Text>
            </Box>
            <Box>
              <IconButton icon={<BsPeopleFill />} />
              <Text>People</Text>
            </Box>
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
