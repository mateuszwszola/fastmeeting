import PropTypes from 'prop-types';
import Head from 'next/head';
import NextLink from 'next/link';
import Logo from '@/components/Logo';

export const APP_NAME = 'Fast Meeting';

export default function Layout({ children, pageName }) {
  return (
    <>
      <Head>
        <title>
          {pageName} | {APP_NAME}
        </title>
      </Head>
      <div className="text-gray-900 bg-white dark:text-white dark:bg-gray-900 flex flex-col min-h-screen">
        <header>
          <nav className="w-full container mx-auto flex justify-between items-center p-4">
            <NextLink href="/">
              <a className="font-medium inline-flex items-center">
                <Logo className="text-blue-500" />
                <span className="ml-2">Fast Meeting</span>
              </a>
            </NextLink>
            <NextLink href="/login">
              <a className="px-4 py-2 font-medium tracking-wide text-white transition duration-200 ease-in-out rounded shadow-md bg-black dark:bg-gray-700 hover:bg-white hover:text-black dark:hover:bg-gray-600 dark:hover:text-white focus:outline-none focus:bg-gray-600 transform active:scale-95">
                Login
              </a>
            </NextLink>
          </nav>
        </header>

        <main className="flex-1">{children}</main>

        <footer className="w-full container mx-auto p-4">
          <p className="text-center text-gray-500">Fast Meeting</p>
        </footer>
      </div>
    </>
  );
}

Layout.defaultProps = {
  pageName: 'Home',
};

Layout.propTypes = {
  pageName: PropTypes.string,
};
