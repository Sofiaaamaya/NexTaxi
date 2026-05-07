'use client';

import { useState } from 'react';
import SidebarConductor from '@/components/views/conductor/SidebarConductor';
import HeaderConductor from '@/components/views/conductor/HeaderConductor';
import clsx from 'clsx';

export default function ConductorLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <HeaderConductor sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="flex flex-1 pt-16">
        <SidebarConductor open={sidebarOpen} setOpen={setSidebarOpen} />

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
