'use client';

import AdminStatCard from '@/components/common/cards/AdminStatCard';

export default function DashboardAdminCards({
  totalConductores = 0,
  conductoresActivos = 0,
  conductoresEnViaje = 0,
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
      <AdminStatCard
        icon="IdCard"
        label="Total de Conductores"
        value={totalConductores}
      />

      <AdminStatCard
        icon="Check"
        label="Conductores Activos"
        value={conductoresActivos}
      />

      <AdminStatCard
        icon="Car"
        label="Conductores en Viaje"
        value={conductoresEnViaje}
      />
    </div>
  );
}
