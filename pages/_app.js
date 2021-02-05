import React from 'react';
import '@/styles/styles.css';
import { AuthProvider } from '@/lib/AuthContext';

export default function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}
