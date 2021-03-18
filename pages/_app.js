import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { AuthProvider } from '@/lib/AuthContext';
import theme from '@/styles/theme';
import MeetingProvider from '@/lib/MeetingContext';

export default function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <MeetingProvider>
          <Component {...pageProps} />
        </MeetingProvider>
      </AuthProvider>
    </ChakraProvider>
  );
}
