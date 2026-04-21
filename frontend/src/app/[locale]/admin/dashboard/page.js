'use client';
import DashboardAdminCards from '@/components/views/admin/DashboardAdminCards';
import ConductoresPage from '../drivers/page';

export default function AdminDashboard() {
  return (
    <div className="p-8">
      <DashboardAdminCards
        totalConductores={128}
        conductoresActivos={54}
        conductoresEnViaje={12}
      />
      <ConductoresPage />
    </div>
  );
}
