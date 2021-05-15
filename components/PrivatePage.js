import { useAuth } from '@/lib/AuthContext';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { FullPageSpinner } from './Spinner';

export default function PrivatePage({ children }) {
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      router.replace('/signin');
    }
  }, [router, user]);

  if (!user) {
    return <FullPageSpinner />;
  }

  return children;
}
