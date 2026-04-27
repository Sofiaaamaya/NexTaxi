'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import TitleComponent from '@/components/common/TitleComponent';
import DriversWeeklyChart from './DriversWeeklyChart';
import DriversMap from './DriversMap';
import DriversCrud from './DriversCrud';
import { apiFetch } from '@/lib/api';
import Poppins from '@/components/ui/Poppins';
import Icon from '@/components/icons/Icon';

export default function DriversPage() {
  const t = useTranslations('drivers');
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDrivers();
  }, []);

  const fetchDrivers = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiFetch('/conductores');

      // Si hay error de conexión o error 500/400
      if (data && data.error) {
        setError(data.data?.message || 'No se pudo conectar con el servidor');
        setDrivers([]);
        return;
      }

      // Extracción segura del array
      let rawData = [];
      if (Array.isArray(data)) {
        rawData = data;
      } else if (data && typeof data === 'object') {
        rawData = data.conductores || data.data || [];
        if (!Array.isArray(rawData)) rawData = [];
      }

      const formatted = rawData.map((d) => ({
        id: d?.id_conductor || d?.id,
        name: d?.usuario?.nombre || d?.nombre || 'N/A',
        email: d?.usuario?.email || d?.email || 'N/A',
        status: d?.estado || 'fuera_servicio',
        dni: d?.dni || '',
        licencia: d?.numero_licencia || '',
      }));

      setDrivers(formatted);
    } catch (err) {
      console.error('Error fetching drivers:', err);
      setError('Error crítico al cargar los datos');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-10">
      <TitleComponent
        eyebrow={t('eyebrow')}
        title={t('title')}
        subtitle={t('subtitle')}
        align="left"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {loading ? (
            <div className="flex flex-col items-center justify-center p-20 bg-white rounded-2xl border border-dashed border-gray-300">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary mb-4"></div>
              <Poppins text="Cargando conductores..." size="16|20" color="textSecondary" />
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center p-20 bg-red-50 rounded-2xl border border-red-200">
              <Icon name="AlertCircle" size={48} className="text-red-500 mb-4" />
              <Poppins text={error} size="18|22" weight="semibold" className="text-red-600 mb-2" />
              <button
                onClick={fetchDrivers}
                className="px-6 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition"
              >
                Reintentar conexión
              </button>
              <p className="mt-4 text-xs text-red-400">
                Verifica que el servidor backend esté corriendo en http://localhost:8000
              </p>
            </div>
          ) : (
            <DriversCrud data={drivers} refreshData={fetchDrivers} />
          )}
        </div>

        <div className="space-y-6">
          <DriversWeeklyChart />
          <DriversMap />
        </div>
      </div>
    </div>
  );
}
