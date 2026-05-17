'use client';

import RideForm from '@/components/views/conductor/RideForm';
import Poppins from '@/components/ui/Poppins';

export default function ConductorDashboard() {
  return (
    <div className="space-y-8">
      <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
        <Poppins text="Panel del Conductor" tag="h1" size="24|32" weight="bold" />
        <Poppins
          text="Gestiona tus servicios activos y solicita nuevos servicios manuales."
          color="textSecondary"
        />
      </div>

      <RideForm role="conductor" />
    </div>
  );
}
