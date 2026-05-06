'use client';

import { useState } from 'react';
import Sidebar from '@/components/views/admin/Sidebar';
import Header from '@/components/views/admin/Header';
import clsx from 'clsx';

export default function GerenteLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex flex-1 pt-16">
        <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
        <main
          className={clsx(
            'flex-1 p-4 md:p-6 transition-all duration-300',
            sidebarOpen ? 'lg:ml-64 ml-20' : 'ml-20'
          )}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
