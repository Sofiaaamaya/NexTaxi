'use client';

import { useState, useEffect } from 'react';
import { apiFetch } from '@/lib/api';
import MapComponent from '@/components/common/MapComponent';
import Poppins from '@/components/ui/Poppins';
import Icon from '@/components/icons/Icon';
import { useTranslations } from 'next-intl';

export default function UsuarioRideTracking({ rideId }) {
  const t = useTranslations('userTracking');
  const [ride, setRide] = useState(null);
  const [route, setRoute] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRide = async () => {
      const res = await apiFetch(`/viajes/${rideId}`);
      if (!res.error) {
        setRide(res);
        setRoute(res.ubicaciones.map(u => ({ lat: parseFloat(u.latitud), lng: parseFloat(u.longitud) })));
      }
      setLoading(false);
    };

    fetchRide();
    const interval = setInterval(fetchRide, 5000); // Polling cada 5s para ver al conductor

    return () => clearInterval(interval);
  }, [rideId]);

  if (loading) return <div>{t('loading')}</div>;
  if (!ride) return <div>{t('noActive')}</div>;

  const lastPos = route[route.length - 1];

  return (
    <div className="flex flex-col h-[500px] bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
      <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-white">
        <div>
          <Poppins text={ride.estado === 'recogido' ? t('enRoute') : t('toPickup')} weight="bold" color="primary" />
          <Poppins text={ride.conductor.usuario.nombre + ' - ' + ride.conductor.vehiculo.matricula} size="13" color="textSecondary" />
        </div>
        <div className="flex items-center gap-2">
           <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
             <Icon name="Car" size={20} className="text-primary" />
           </div>
        </div>
      </div>

      <div className="flex-1 relative">
        <MapComponent 
          center={lastPos || { lat: parseFloat(ride.solicitud.recogida_lat), lng: parseFloat(ride.solicitud.recogida_lng) }}
          markers={[
            { position: { lat: parseFloat(ride.solicitud.recogida_lat), lng: parseFloat(ride.solicitud.recogida_lng) }, label: '🏠' },
            lastPos && { position: lastPos, label: '🚕', icon: 'https://maps.google.com/mapfiles/kml/pal2/icon56.png' }
          ].filter(Boolean)}
          route={route}
          zoom={15}
        />
      </div>

      <div className="p-6 bg-gray-50 flex items-center justify-between">
        <div className="flex flex-col">
          <Poppins text={t('estPrice')} size="12" color="textSecondary" className="uppercase" />
          <Poppins text={ride.precio_estimado ? `${ride.precio_estimado}€` : '--'} weight="bold" size="18" />
        </div>
        <button className="bg-white p-3 rounded-2xl shadow-sm border border-gray-100 text-primary">
          <Icon name="Phone" size={24} />
        </button>
      </div>
    </div>
  );
}