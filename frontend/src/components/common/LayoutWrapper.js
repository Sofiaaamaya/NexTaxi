'use client';

import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import Header from './Header';
import Footer from './Footer';

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();
  const isAdmin = pathname?.includes('/admin');

  return (
    <>
      <Header />
      <main className={clsx('w-full flex justify-center', isAdmin && 'block')}>
        <div
          className={clsx(
            'w-full transition-all duration-300',
            isAdmin ? 'max-w-none px-0 py-0' : 'max-w-6xl px-4 md:px-8 py-10'
          )}
        >
          {children}
        </div>
      </main>
      <Footer />
    </>
  );
}
