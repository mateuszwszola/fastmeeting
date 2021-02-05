import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import Layout from '@/components/Layout';

export default function Login() {
  const [username, setUsername] = useState('');

  const handleLogin = async (type, username) => {
    try {
      const { error, user } =
        type === 'LOGIN'
          ? await supabase.auth.signIn({ email: username })
          : await supabase.auth.signUp({ email: username });
      // If the user doesn't exist here and an error hasn't been raised yet,
      // that must mean that a confirmation email has been sent.
      // NOTE: Confirming your email address is required by default.
      if (error) {
        alert('Error with auth: ' + error.message);
      } else if (!user)
        alert('Signup successful, confirmation mail should be sent soon!');
    } catch (error) {
      console.log('error', error);
      alert(error.error_description || error);
    }
  };

  return (
    <Layout>
      <div className="pt-16 lg:pt-32">
        <div className="flex max-w-sm mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden lg:max-w-md">
          <div className="w-full py-8 px-6 md:px-8">
            <h2 className="text-2xl font-semibold text-gray-700 dark:text-white text-center">
              Fast Meeting
            </h2>

            <p className="text-xl text-gray-600 dark:text-gray-200 text-center">
              Welcome back!
            </p>

            <a
              href="#"
              className="flex items-center justify-center mt-4 text-gray-600 dark:bg-gray-700 dark:text-gray-200 rounded-lg shadow-md hover:bg-gray-100 dark:hover:bg-gray-600"
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
                Sign in with Google
              </span>
            </a>

            <div className="mt-4 flex items-center justify-between">
              <span className="border-b dark:border-gray-600 w-1/5 lg:w-1/4" />

              <span className="text-xs text-center text-gray-500 dark:text-gray-400 uppercase">
                or login with email
              </span>

              <span className="border-b dark:border-gray-400 w-1/5 lg:w-1/4" />
            </div>

            <div className="mt-4">
              <label
                className="block text-gray-600 dark:text-gray-200 text-sm font-medium mb-2"
                htmlFor="username"
              >
                Email Address
              </label>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                id="username"
                className="bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded py-2 px-4 block w-full focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                type="email"
              />
            </div>

            <div className="mt-8">
              <button
                onClick={() => handleLogin('LOGIN', username)}
                className="bg-gray-700 text-white py-2 px-4 w-full tracking-wide rounded hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
              >
                Login
              </button>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <span className="border-b dark:border-gray-600 w-1/5 md:w-1/4" />

              <a
                href="#"
                className="text-xs text-gray-500 dark:text-gray-400 uppercase hover:underline"
              >
                or sign up
              </a>

              <span className="border-b dark:border-gray-600 w-1/5 md:w-1/4" />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
