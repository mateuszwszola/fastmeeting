import Button from '@/components/Button';
import Layout from '@/components/Layout';
import { useAuth } from '@/lib/AuthContext';

export default function Account() {
  const { user, signOut } = useAuth();

  return (
    <Layout>
      <h1>Account</h1>
      <p>Hello {user?.full_name || 'User'}</p>
      <Button onClick={signOut}>Logout</Button>
    </Layout>
  );
}
