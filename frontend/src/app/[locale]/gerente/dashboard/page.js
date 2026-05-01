'use client';

import Poppins from '@/components/ui/Poppins';
import TitleComponent from '@/components/common/TitleComponent';

export default function GerenteDashboard() {
  return (
    <div className="p-8">
      <TitleComponent 
        title="Panel de Gerente" 
        subtitle="Bienvenido al panel de gestión de NexTaxi"
      />
      <div className="mt-8 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <Poppins text="Aquí podrás gestionar las operaciones de la flota y reportes." />
      </div>
    </div>
  );
}
