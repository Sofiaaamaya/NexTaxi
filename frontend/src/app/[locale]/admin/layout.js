'use client';

import { useState } from 'react';
import Sidebar from '@/components/views/admin/Sidebar';
import Header from '@/components/views/admin/Header';
import clsx from 'clsx';

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      <div
        className={clsx(
          'transition-all duration-300 flex flex-col min-h-screen',
          sidebarOpen ? 'lg:pl-64' : 'lg:pl-20'
        )}
      >
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="flex-1 p-4 md:p-6 mt-16">{children}</main>
      </div>
    </div>
  );
}
