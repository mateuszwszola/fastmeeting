import PropTypes from 'prop-types';
import Head from 'next/head';
import NextLink from 'next/link';
import { Box, Flex, Button, HStack, Text } from '@chakra-ui/react';
import Logo from '@/components/icons/Logo';
import { useAuth } from '@/lib/AuthContext';

export const APP_NAME = 'Fast Meeting';

export default function Layout({ children, pageName }) {
  const { user } = useAuth();

  return (
    <>
      <Head>
        <title>
          {pageName} | {APP_NAME}
        </title>
      </Head>
      <Flex minH="100vh" flexDir="column">
        <header>
          <Flex
            as="nav"
            w="100%"
            maxW="1280px"
            mx="auto"
            flexDir={['column', 'row']}
            justify="space-between"
            align={['flex-start', 'center']}
            p={4}
          >
            <NextLink href="/" passHref>
              <Button
                as="a"
                variant="link"
                leftIcon={<Logo color="yellow.400" />}
              >
                Fast Meeting
              </Button>
            </NextLink>
            <HStack spacing={4} mt={[4, 0]}>
              {user ? (
                <>
                  <NextLink href="/dashboard" passHref>
                    <Button as="a" variant="link">
                      Dashboard
                    </Button>
                  </NextLink>
                  <NextLink href="/account" passHref>
                    <Button as="a" variant="link">
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
        </header>

        <Box as="main" flex={1}>
          {children}
        </Box>

        <Box as="footer" w="full" p={4}>
          <Box w="full" maxW="1280px" mx="auto">
            <Text textAlign="center" color="gray.500">
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
