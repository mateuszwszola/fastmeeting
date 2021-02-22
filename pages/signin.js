import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import {
  Box,
  Flex,
  Heading,
  Text,
  useColorModeValue,
  Button,
  FormControl,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import Layout from '@/components/Layout';
import { useAuth } from '@/lib/AuthContext';
import GoogleIcon from '@/components/icons/Google';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', content: '' });
  const router = useRouter();
  const { user, signIn } = useAuth();
  const bgColor = useColorModeValue('white', 'gray.900');
  const textColor = useColorModeValue('gray.700', 'white');
  const secondaryTextColor = useColorModeValue('gray.600', 'gray.200');
  const inputBgColor = useColorModeValue('gray.50', 'gray.800');

  const toggleSignInWithEmailType = () => {
    if (showPasswordInput) setPassword('');
    setShowPasswordInput((prevValue) => !prevValue);
    setMessage({});
  };

  const handleSignIn = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage({});

    const payload = {
      email,
    };

    if (setShowPasswordInput) {
      payload.password = password;
    }

    const { error } = await signIn(payload);
    if (error) {
      setMessage({ type: 'error', content: error.message });
    } else if (!password) {
      setMessage({
        type: 'note',
        content: 'Check your email for the magic link',
      });
    }
    setLoading(false);
  };

  const handleOAuthSignIn = async (provider) => {
    setLoading(true);
    const { error } = await signIn({ provider });
    if (error) {
      setMessage({ type: 'error', content: error.message });
    }
    setLoading(false);
  };

  useEffect(() => {
    if (user) {
      router.replace('/dashboard');
    }
  }, [router, user]);

  return (
    <Layout pageName="Sign In">
      <Box pt={{ base: 16, lg: 32 }}>
        <Flex
          maxW="sm"
          mx="auto"
          bgColor={bgColor}
          borderRadius="lg"
          boxShadow="lg"
          overflow="hidden"
        >
          <Box w="full" py={8} px={{ base: 6, md: 8 }}>
            <Heading
              fontSize="2xl"
              fontWeight="semibold"
              textAlign="center"
              textColor={textColor}
            >
              Fast Meeting
            </Heading>

            <Text
              fontSize="xl"
              textAlign="center"
              textColor={secondaryTextColor}
            >
              Welcome back!
            </Text>

            <Flex flexDir="column" py={2}>
              {message.content && (
                <Box color={message.type === 'error' ? 'red.500' : 'green.500'}>
                  {message.content}
                </Box>
              )}
            </Flex>

            <Flex
              as={Button}
              isDisabled={loading}
              isLoading={loading}
              onClick={() => handleOAuthSignIn('google')}
              align="center"
              justify="center"
              w="full"
              mt={2}
              rounded="lg"
              boxShadow="md"
              h={12}
              leftIcon={<GoogleIcon />}
            >
              Continue with Google
            </Flex>

            <Flex mt={4} align="center" justify="space-between">
              <Text
                as="span"
                borderBottom="1px"
                w={{ lg: 1 / 4 }}
                borderColor="gray.600"
              />

              <Text
                as="span"
                fontSize="xs"
                textAlign="center"
                textTransform="uppercase"
                color="gray.500"
              >
                or sign in with email
              </Text>

              <Text
                as="span"
                borderBottom="1px"
                w={{ lg: 1 / 4 }}
                borderColor="gray.600"
              />
            </Flex>

            <Box as="form" mt={4} onSubmit={handleSignIn}>
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  fontWeight="medium"
                  display="block"
                  rounded="base"
                  py={2}
                  px={4}
                  w="full"
                  bgColor={inputBgColor}
                />
              </FormControl>

              {showPasswordInput && (
                <FormControl id="password" mt={2}>
                  <FormLabel>Password</FormLabel>
                  <Input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    fontWeight="medium"
                    display="block"
                    rounded="base"
                    py={2}
                    px={4}
                    w="full"
                    bgColor={inputBgColor}
                  />
                </FormControl>
              )}
              <Button
                mt={4}
                w="full"
                type="submit"
                isDisabled={loading || !email.length}
                isLoading={loading}
                colorScheme="blue"
              >
                Sign in
              </Button>
            </Box>

            <Button
              variant="link"
              size="sm"
              _focus={{
                outline: 'none',
              }}
              display="block"
              mx="auto"
              mt={5}
              onClick={toggleSignInWithEmailType}
            >
              Sign in with {showPasswordInput ? 'magic link' : 'password'}
            </Button>

            <Flex mt={5} align="center" justify="space-between">
              <Text
                as="span"
                borderBottom="1px"
                w={{ lg: 1 / 4 }}
                borderColor="gray.600"
              />

              <Link href="/signup" passHref>
                <Button
                  as="a"
                  size="sm"
                  variant="link"
                  fontSize="sm"
                  color="gray.500"
                  textTransform="uppercase"
                >
                  Sign up
                </Button>
              </Link>

              <Text
                as="span"
                borderBottom="1px"
                w={{ lg: 1 / 4 }}
                borderColor="gray.600"
              />
            </Flex>
          </Box>
        </Flex>
      </Box>
    </Layout>
  );
};

export default SignIn;
