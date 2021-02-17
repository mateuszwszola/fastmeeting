import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/lib/AuthContext';
import Layout from '@/components/Layout';
import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Text,
  useColorModeValue,
  Input,
  Button,
} from '@chakra-ui/react';

const SignIn = () => {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', content: '' });
  const router = useRouter();
  const { signUp } = useAuth();
  const bgColor = useColorModeValue('white', 'gray.900');
  const textColor = useColorModeValue('gray.700', 'white');
  const inputBgColor = useColorModeValue('gray.50', 'gray.800');

  const handleSignUp = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage({});

    const { error, user } = await signUp({ email, password });

    if (error) {
      setMessage({ type: 'error', content: error.message });
    } else {
      if (user) {
        await supabase
          .from('users')
          .update({
            full_name: name,
          })
          .eq('id', user.id);
        setUser(user);
      } else {
        setMessage({
          type: 'note',
          content: 'Check your email for the confirmation link',
        });
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    if (user) {
      router.replace('/dashboard');
    }
  }, [router, user]);

  return (
    <Layout>
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

            <Flex flexDir="column" py={2}>
              {message.content && (
                <Box color={message.type === 'error' ? 'red.500' : 'green.500'}>
                  {message.content}
                </Box>
              )}
            </Flex>

            <Box as="form" mt={4} onSubmit={handleSignUp}>
              <FormControl id="name">
                <FormLabel>Name</FormLabel>
                <Input
                  type="name"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  fontWeight="medium"
                  display="block"
                  rounded="base"
                  py={2}
                  px={4}
                  w="full"
                  bgColor={inputBgColor}
                />
              </FormControl>

              <FormControl id="email" mt={2}>
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

              <Button
                colorScheme="blue"
                mt={4}
                w="full"
                type="submit"
                isLoading={loading}
                isDisabled={!email.length || !name.length}
              >
                Sign up
              </Button>
            </Box>

            <Flex className="mt-5 flex items-center justify-between">
              <Text
                as="span"
                borderBottom="1px"
                w={{ lg: 1 / 4 }}
                borderColor="gray.600"
              />

              <Link href="/signin" passHref>
                <Button
                  as="a"
                  size="sm"
                  variant="link"
                  fontSize="sm"
                  color="gray.500"
                  textTransform="uppercase"
                >
                  Sign in
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
