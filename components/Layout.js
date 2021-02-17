import PropTypes from 'prop-types';
import Head from 'next/head';
import NextLink from 'next/link';
import {
  Box,
  Flex,
  Button,
  HStack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import Logo from '@/components/icons/Logo';
import { useAuth } from '@/lib/AuthContext';

export const APP_NAME = 'Fast Meeting';

export default function Layout({ children, pageName }) {
  const { user } = useAuth();
  const bgColor = useColorModeValue('white', 'gray.900');
  const borderColor = useColorModeValue('gray.200', 'gray.900');

  return (
    <>
      <Head>
        <title>
          {pageName} | {APP_NAME}
        </title>
      </Head>
      <Flex minH="100vh" flexDir="column" bgColor="gray.50">
        <Box
          as="header"
          bgColor={bgColor}
          borderBottom="1px"
          borderColor={borderColor}
        >
          <Flex
            as="nav"
            w="100%"
            maxW="1280px"
            mx="auto"
            flexWrap="wrap"
            justify="space-between"
            align="center"
            p={[2, 4]}
          >
            <NextLink href="/" passHref>
              <Button
                as="a"
                variant="link"
                color="gray.700"
                leftIcon={<Logo w={8} h={8} color="blue.500" />}
              >
                <Text as="span" display={['none', 'inline']}>
                  Fast Meeting
                </Text>
              </Button>
            </NextLink>
            <HStack spacing={4}>
              {user ? (
                <>
                  <NextLink href="/dashboard" passHref>
                    <Button as="a" variant="link" color="gray.700">
                      Dashboard
                    </Button>
                  </NextLink>
                  <NextLink href="/account" passHref>
                    <Button as="a" variant="link" color="gray.700">
                      Account
                    </Button>
                  </NextLink>
                </>
              ) : (
                <NextLink href="/signin" passHref>
                  <Button as="a" colorScheme="blue">
                    Login
                  </Button>
                </NextLink>
              )}
            </HStack>
          </Flex>
        </Box>

        <Box as="main" flex={1} mb={8}>
          {children}
        </Box>

        <Box as="footer" w="full" p={4}>
          <Box w="full" maxW="1280px" mx="auto">
            <Text textAlign="center" color="gray.500" fontWeight="medium">
              Fast Meeting
            </Text>
          </Box>
        </Box>
      </Flex>
    </>
  );
}

Layout.defaultProps = {
  pageName: 'Home',
};

Layout.propTypes = {
  pageName: PropTypes.string,
};
