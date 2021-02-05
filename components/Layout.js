import NextLink from 'next/link';

export default function Layout({ children }) {
  return (
    <div className="text-gray-900 flex flex-col min-h-screen">
      <header>
        <nav className="w-full container mx-auto flex justify-between items-center p-4">
          <NextLink href="/">
            <a className="font-medium">Fast Meeting</a>
          </NextLink>
          <NextLink href="/auth">
            <a className="px-4 py-2 font-medium tracking-wide text-white transition duration-200 ease-in-out rounded shadow-md bg-black hover:bg-white hover:text-black focus:shadow-outline focus:outline-none transform active:scale-95">
              Login
            </a>
          </NextLink>
        </nav>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="w-full container mx-auto p-4">
        <p className="text-center">Fast Meeting</p>
      </footer>
    </div>
  );
}
