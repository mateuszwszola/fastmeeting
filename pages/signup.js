import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/lib/AuthContext';
import Button from '@/components/Button';
import Layout from '@/components/Layout';

const SignIn = () => {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', content: '' });
  const router = useRouter();
  const { signUp } = useAuth();

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
      <div className="pt-16 lg:pt-32">
        <div className="flex max-w-sm mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="w-full py-8 px-6 md:px-8">
            <h2 className="text-2xl font-semibold text-gray-700 dark:text-white text-center">
              Fast Meeting
            </h2>

            <div className="flex flex-col space-y-4">
              {message.content && (
                <div
                  className={`${
                    message.type === 'error' ? 'text-pink' : 'text-green'
                  } border ${
                    message.type === 'error' ? 'border-pink' : 'border-green'
                  }`}
                >
                  {message.content}
                </div>
              )}
            </div>

            <form onSubmit={handleSignUp} className="mt-4">
              <label
                className="block text-gray-600 dark:text-gray-200 text-sm font-medium mb-1"
                htmlFor="name"
              >
                Name
              </label>
              <input
                id="name"
                type="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded py-2 px-4 block w-full focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />

              <label
                className="block mt-2 text-gray-600 dark:text-gray-200 text-sm font-medium mb-1"
                htmlFor="email"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded py-2 px-4 block w-full focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />

              <label
                className="block mt-2 text-gray-600 dark:text-gray-200 text-sm font-medium mb-1"
                htmlFor="password"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded py-2 px-4 block w-full focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
              <Button className="mt-4" type="submit" disabled={!email.length}>
                Sign up
              </Button>
            </form>

            <div className="mt-5 flex items-center justify-between">
              <span className="border-b dark:border-gray-600 w-1/5 md:w-1/4" />

              <Link href="/signin">
                <a className="text-xs text-gray-500 dark:text-gray-400 uppercase hover:underline">
                  Sign in
                </a>
              </Link>

              <span className="border-b dark:border-gray-600 w-1/5 md:w-1/4" />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SignIn;
