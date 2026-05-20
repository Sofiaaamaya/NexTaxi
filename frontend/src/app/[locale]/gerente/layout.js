'use client';

import { useState, useEffect } from 'react';
import SidebarDashboard from '@/components/views/conductor/SidebarDashboard';
import HeaderDashboard from '@/components/views/conductor/HeaderDashboard';
import { LayoutContext } from '@/context/LayoutContext';
import clsx from 'clsx';

export default function GerenteLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const handleResize = () => setSidebarOpen(window.innerWidth >= 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    setMounted(true);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!mounted) return null;

  return (
    <LayoutContext.Provider value={{ sidebarOpen, setSidebarOpen }}>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <HeaderDashboard sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <div className="flex flex-1 pt-16">
          <SidebarDashboard open={sidebarOpen} setOpen={setSidebarOpen} />

          <main
            className={clsx(
              'flex-1 transition-all duration-300 p-6 overflow-auto',
              sidebarOpen ? 'lg:ml-64' : 'lg:ml-20'
            )}
          >
            {children}
          </main>
        </div>
      </div>
    </LayoutContext.Provider>
  );
}