'use client';

import { useState, useEffect } from 'react';
import SidebarDashboard from '@/components/views/conductor/SidebarDashboard';
import HeaderDashboard from '@/components/views/conductor/HeaderDashboard';
import { LayoutContext } from '@/context/LayoutContext';
import clsx from 'clsx';

export default function ConductorLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const handleResize = () => setSidebarOpen(window.innerWidth >= 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <LayoutContext.Provider value={{ sidebarOpen, setSidebarOpen }}>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <HeaderDashboard sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <div className="flex flex-1 pt-16">
          <SidebarDashboard open={sidebarOpen} setOpen={setSidebarOpen} />

          <main
            className={clsx(
              'flex-1 p-4 md:p-6 transition-all duration-300 relative overflow-hidden',
              sidebarOpen ? 'ml-0' : 'ml-0'
            )}
          >
            {children}
          </main>
        </div>
      </div>
    </LayoutContext.Provider>
  );
}
