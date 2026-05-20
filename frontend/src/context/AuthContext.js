'use client';

import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import Header from './Header';
import Footer from './Footer';

const DASHBOARD_SEGMENTS = ['/admin', '/conductor', '/usuario', '/gerente'];

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();
  const isDashboard = DASHBOARD_SEGMENTS.some((seg) => pathname?.includes(seg));

  return (
    <>
      {!isDashboard && <Header />}
      <main className={clsx('w-full flex justify-center', isDashboard && 'block')}>
        <div
          className={clsx(
            'w-full transition-all duration-300',
            isDashboard ? 'max-w-none px-0 py-0' : 'max-w-6xl px-4 md:px-8 py-10'
          )}
        >
          {children}
        </div>
      </main>
      {!isDashboard && <Footer />}
    </>
  );
}