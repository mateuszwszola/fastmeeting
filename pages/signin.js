import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '@/components/Layout';
import Button from '@/components/Button';
import { useAuth } from '@/lib/AuthContext';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', content: '' });
  const router = useRouter();
  const { user, signIn } = useAuth();

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
    <Layout>
      <div className="pt-16 lg:pt-32">
        <div className="flex max-w-sm mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="w-full py-8 px-6 md:px-8">
            <h2 className="text-2xl font-semibold text-gray-700 dark:text-white text-center">
              Fast Meeting
            </h2>

            <p className="text-xl text-gray-600 dark:text-gray-200 text-center">
              Welcome back!
            </p>

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

            <button
              disabled={loading}
              onClick={() => handleOAuthSignIn('google')}
              className="flex items-center justify-center w-full mt-4 text-gray-600 dark:bg-gray-700 dark:text-gray-200 rounded-lg shadow-md hover:bg-gray-100 dark:hover:bg-gray-600"
            >
              <div className="px-4 py-3">
                <svg className="h-6 w-6" viewBox="0 0 40 40">
                  <path
                    d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                    fill="#FFC107"
                  />
                  <path
                    d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z"
                    fill="#FF3D00"
                  />
                  <path
                    d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z"
                    fill="#4CAF50"
                  />
                  <path
                    d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                    fill="#1976D2"
                  />
                </svg>
              </div>

              <span className="px-4 py-3 w-5/6 text-center font-bold">
                Continue with Google
              </span>
            </button>

            <div className="mt-4 flex items-center justify-between">
              <span className="border-b dark:border-gray-600 w-1/5 lg:w-1/4" />

              <span className="text-xs text-center text-gray-500 dark:text-gray-400 uppercase">
                or sign in with email
              </span>

              <span className="border-b dark:border-gray-400 w-1/5 lg:w-1/4" />
            </div>

            <form onSubmit={handleSignIn} className="mt-4">
              <label
                className="block text-gray-600 dark:text-gray-200 text-sm font-medium mb-1"
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
              {showPasswordInput && (
                <>
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
                </>
              )}
              <Button className="mt-4" type="submit" disabled={!email.length}>
                Sign in
              </Button>
            </form>

            <span className="block mt-3 text-center text-sm">
              <button
                className="text-gray-500 dark:text-gray-400 hover:underline focus:outline-none"
                onClick={toggleSignInWithEmailType}
              >
                Sign in with {showPasswordInput ? 'magic link' : 'password'}
              </button>
            </span>

            <div className="mt-5 flex items-center justify-between">
              <span className="border-b dark:border-gray-600 w-1/5 md:w-1/4" />

              <Link href="/signup">
                <a className="text-xs text-gray-500 dark:text-gray-400 uppercase hover:underline">
                  Sign up
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
