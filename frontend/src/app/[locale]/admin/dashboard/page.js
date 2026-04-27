'use client';

import Sidebar from '@/components/common/SideBar';
import DriversPage from '@/components/views/admin/DriversPage';

export default function DashboardPage() {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
        <DriversPage />
      </main>
    </div>
  );
}
