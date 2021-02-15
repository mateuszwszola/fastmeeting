import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import '@/styles/styles.css';
import { AuthProvider } from '@/lib/AuthContext';
import { MeetingProvider } from '@/lib/MeetingContext';
import theme from '@/styles/theme';

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
