'use client';

import DriversPage from '@/components/views/admin/Driver/DriversPage';

export default function DashboardPage() {
  return (
    <div className="flex">
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-4">Admin Conductores</h1>
        <DriversPage />
      </main>
    </div>
  );
}
