'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { apiFetch } from '@/lib/api';
import Poppins from '@/components/ui/Poppins';
import Icon from '@/components/icons/Icon';
import MapComponent from '@/components/common/MapComponent';

export default function TripHistoryView({ rol }) {
  const t = useTranslations('tripHistory');
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTrip, setSelectedTrip] = useState(null);

  useEffect(() => {
    const fetchTrips = async () => {
      const res = await apiFetch('/viajes');
      if (!res.error) {
        setTrips(res);
      }
      setLoading(false);
    };
    fetchTrips();
  }, []);

  if (loading) return <div className="p-10 text-center">Cargando historial...</div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <Poppins text={t('title')} tag="h1" size="24|32" weight="bold" />
        <Poppins text={t('subtitle')} color="textSecondary" />
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-6 py-4 font-semibold text-sm text-gray-600">{t('table.date')}</th>
                <th className="px-6 py-4 font-semibold text-sm text-gray-600">{t('table.route')}</th>
                <th className="px-6 py-4 font-semibold text-sm text-gray-600">{t('table.status')}</th>
                <th className="px-6 py-4 font-semibold text-sm text-gray-600 text-right">{t('table.price')}</th>
                <th className="px-6 py-4 font-semibold text-sm text-gray-600 text-center">{t('table.map')}</th>
              </tr>
            </thead>
            <tbody>
              {trips.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-10 text-center text-gray-400">{t('noTrips')}</td>
                </tr>
              ) : (
                trips.map((trip) => (
                  <tr key={trip.id_viaje} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <Poppins text={new Date(trip.created_at).toLocaleDateString()} size="14" weight="medium" />
                        <Poppins text={new Date(trip.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} size="12" color="textSecondary" />
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1 max-w-xs">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-green-500" />
                          <Poppins text={trip.solicitud.recogida_direccion} size="13" className="truncate" />
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-red-500" />
                          <Poppins text={trip.solicitud.destino_direccion || 'No especificado'} size="13" className="truncate text-gray-500" />
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                        trip.estado === 'completado' ? 'bg-green-100 text-green-600' : 
                        trip.estado === 'cancelado' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'
                      }`}>
                        {trip.estado}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Poppins text={trip.precio_final ? `${trip.precio_final}€` : '-'} weight="semibold" />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button 
                        onClick={() => setSelectedTrip(trip)}
                        className="p-2 hover:bg-primary/10 rounded-lg text-primary transition-colors"
                      >
                        <Icon name="Map" size={20} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Mapa */}
      {selectedTrip && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <div>
                <Poppins text={t('modal.title')} tag="h3" size="18" weight="bold" />
                <Poppins text={`${new Date(selectedTrip.created_at).toLocaleDateString()} - ${selectedTrip.solicitud.recogida_direccion}`} size="14" color="textSecondary" />
              </div>
              <button onClick={() => setSelectedTrip(null)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <Icon name="X" size={24} />
              </button>
            </div>
            <div className="h-[500px] w-full relative">
              <MapComponent 
                center={{ 
                  lat: parseFloat(selectedTrip.solicitud.recogida_lat), 
                  lng: parseFloat(selectedTrip.solicitud.recogida_lng) 
                }}
                markers={[
                  { 
                    position: { lat: parseFloat(selectedTrip.solicitud.recogida_lat), lng: parseFloat(selectedTrip.solicitud.recogida_lng) },
                    label: 'A',
                    icon: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png'
                  },
                  selectedTrip.solicitud.destino_lat && { 
                    position: { lat: parseFloat(selectedTrip.solicitud.destino_lat), lng: parseFloat(selectedTrip.solicitud.destino_lng) },
                    label: 'B',
                    icon: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png'
                  }
                ].filter(Boolean)}
                route={selectedTrip.ubicaciones.map(u => ({ 
                  lat: parseFloat(u.latitud), 
                  lng: parseFloat(u.longitud) 
                }))}
                zoom={14}
              />
            </div>
            <div className="p-6 bg-gray-50 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <Poppins text={t('modal.distance')} size="12" weight="medium" color="textSecondary" className="uppercase" />
                <Poppins text="-- km" weight="bold" />
              </div>
              <div>
                <Poppins text={t('modal.duration')} size="12" weight="medium" color="textSecondary" className="uppercase" />
                <Poppins text={selectedTrip.fin_viaje ? t('status.finished') : t('status.ongoing')} weight="bold" />
              </div>
              <div>
                <Poppins text={t('modal.driver')} size="12" weight="medium" color="textSecondary" className="uppercase" />
                <Poppins text={selectedTrip.conductor.usuario.nombre} weight="bold" />
              </div>
              <div>
                <Poppins text={t('modal.finalPrice')} size="12" weight="medium" color="textSecondary" className="uppercase" />
                <Poppins text={selectedTrip.precio_final ? `${selectedTrip.precio_final}€` : '-'} weight="bold" className="text-primary" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}