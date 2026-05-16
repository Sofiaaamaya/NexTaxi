'use client';

import RideForm from '@/components/views/conductor/RideForm';
import Poppins from '@/components/ui/Poppins';

export default function UsuarioDashboard({ sidebarOpen }) {
  return (
    <div className="space-y-8">
      <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
        <Poppins text="Mi Dashboard" tag="h1" size="24|32" weight="bold" />
        <Poppins text="Solicita un taxi ahora y gestiona tus viajes." color="textSecondary" />
      </div>
      <RideForm role="usuario" sidebarOpen={sidebarOpen} />
    </div>
  );
}
