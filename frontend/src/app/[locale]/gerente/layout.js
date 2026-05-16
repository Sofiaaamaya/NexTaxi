'use client';

import { useState } from 'react';
import SidebarDashboard from '@/components/views/conductor/SidebarDashboard';
import HeaderDashboard from '@/components/views/conductor/HeaderDashboard';
import clsx from 'clsx';

export default function GerenteLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <HeaderDashboard sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="flex flex-1 pt-16">
        <SidebarDashboard open={sidebarOpen} setOpen={setSidebarOpen} />

        <main
          className={clsx(
            'flex-1 p-4 md:p-6 transition-all duration-300 relative overflow-hidden',
            'ml-0'
          )}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
