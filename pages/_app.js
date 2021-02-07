import React from 'react';
import '@/styles/styles.css';
import { AuthProvider } from '@/lib/AuthContext';
import { MeetingProvider } from '@/lib/MeetingContext';

export default function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <MeetingProvider>
        <Component {...pageProps} />
      </MeetingProvider>
    </AuthProvider>
  );
}
