'use client';

import Poppins from '@/components/ui/Poppins';

export default function DriversWeeklyChart() {
  return (
    <div className="p-6 border border-border rounded-xl bg-white shadow-sm">
      <Poppins text="Actividad semanal" size="18|22" weight="semibold" className="mb-4" />

      <div className="h-40 bg-gray-100 rounded-lg flex items-center justify-center">
        <Poppins text="Gráfico semanal aquí" size="16|20" color="textSecondary" />
      </div>
    </div>
  );
}
