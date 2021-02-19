import Logo from '@/components/icons/Logo';
import { useAuth } from '@/lib/AuthContext';
import { Box, Flex, HStack, Text, useColorModeValue } from '@chakra-ui/react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import Footer from './layout/Footer';
import Header from './layout/Header';
import Nav from './layout/Nav';
import NavLink from './layout/NavLink';

export const APP_NAME = 'Fast Meeting';

export default function Layout({ children, pageName }) {
  const { user } = useAuth();
  const bgColor = useColorModeValue('gray.50', 'black');

  return (
    <>
      <Head>
        <title>
          {pageName} | {APP_NAME}
        </title>
      </Head>
      <Flex minH="100vh" flexDir="column" bgColor={bgColor}>
        <Header>
          <Nav>
            <NavLink href="/" leftIcon={<Logo w={8} h={8} color="blue.500" />}>
              <Text as="span" display={['none', 'inline']} fontWeight="bold">
                Fast Meeting
              </Text>
            </NavLink>

            <HStack spacing={4}>
              {user ? (
                <>
                  <NavLink href="/dashboard">Dashboard</NavLink>
                  <NavLink href="/account">Account</NavLink>
                </>
              ) : (
                <NavLink href="/signin" colorScheme="blue" variant="solid">
                  Login
                </NavLink>
              )}
            </HStack>
          </Nav>
        </Header>

        <Box as="main" flex={1}>
          {children}
        </Box>

        <Footer>
          <Text textAlign="center" color="gray.500" fontWeight="medium">
            Fast Meeting
          </Text>
        </Footer>
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
