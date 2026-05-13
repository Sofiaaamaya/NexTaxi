'use client';

import { useState, useEffect, useRef } from 'react';
import { apiFetch } from '@/lib/api';
import MapComponent from '@/components/common/MapComponent';
import Poppins from '@/components/ui/Poppins';
import Icon from '@/components/icons/Icon';
import { useTranslations } from 'next-intl';

export default function ConductorRideTracking({ rideId, onFinish }) {
  const t = useTranslations('tracking');
  const [ride, setRide] = useState(null);
  const [currentPos, setCurrentPos] = useState(null);
  const [route, setRoute] = useState([]);
  const [loading, setLoading] = useState(true);
  const watchId = useRef(null);

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

    // Iniciar seguimiento de ubicación
    if (navigator.geolocation) {
      watchId.current = navigator.geolocation.watchPosition(
        (position) => {
          const newPos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setCurrentPos(newPos);
          setRoute(prev => [...prev, newPos]);
          
          // Enviar al servidor cada X metros o tiempo (simplificado: siempre por ahora)
          apiFetch(`/viajes/${rideId}/ubicaciones`, {
            method: 'POST',
            body: JSON.stringify({ latitud: newPos.lat, longitud: newPos.lng })
          });
        },
        (error) => console.error(error),
        { enableHighAccuracy: true, distanceFilter: 10 }
      );
    }

    return () => {
      if (watchId.current) navigator.geolocation.clearWatch(watchId.current);
    };
  }, [rideId]);

  const handleRecoger = async () => {
    const res = await apiFetch(`/viajes/${rideId}/recoger`, { method: 'POST' });
    if (!res.error) setRide(res);
  };

  const handleFinalizar = async () => {
    // Aquí se podría abrir un modal para ingresar el destino si no existía y el precio final
    const destino_direccion = prompt(t('prompts.destination'));
    const precio_final = prompt(t('prompts.price'));

    const res = await apiFetch(`/viajes/${rideId}/completar`, {
      method: 'POST',
      body: JSON.stringify({ 
        destino_direccion, 
        precio_final,
        // En una app real usaríamos geocoding para obtener lat/lng del destino
        destino_lat: currentPos?.lat,
        destino_lng: currentPos?.lng
      })
    });

    if (!res.error) {
      if (onFinish) onFinish();
    }
  };

  if (loading) return <div>{t('loading')}</div>;
  if (!ride) return <div>{t('notFound')}</div>;

  return (
    <div className="flex flex-col h-full bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
      <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-white">
        <div>
          <Poppins text={ride.estado === 'recogido' ? t('inTrip') : t('onWay')} weight="bold" color="primary" />
          <Poppins text={ride.solicitud.recogida_direccion} size="13" color="textSecondary" className="truncate max-w-[200px]" />
        </div>
        <div className="flex items-center gap-2">
           <Icon name="User" size={18} className="text-gray-400" />
           <Poppins text={ride.solicitud.nombre_cliente || t('customer')} size="14" weight="semibold" />
        </div>
      </div>

      <div className="flex-1 relative min-h-[400px]">
        <MapComponent 
          center={currentPos || { lat: parseFloat(ride.solicitud.recogida_lat), lng: parseFloat(ride.solicitud.recogida_lng) }}
          markers={[
            { position: { lat: parseFloat(ride.solicitud.recogida_lat), lng: parseFloat(ride.solicitud.recogida_lng) }, label: 'A' },
            currentPos && { position: currentPos, label: '🚗', icon: 'https://maps.google.com/mapfiles/kml/pal2/icon56.png' }
          ].filter(Boolean)}
          route={route}
          zoom={15}
        />
      </div>

      <div className="p-6 bg-white border-t border-gray-100 space-y-4">
        {ride.estado === 'en_camino' && (
          <button 
            onClick={handleRecoger}
            className="w-full bg-primary text-white py-4 rounded-2xl font-bold shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
          >
            <Icon name="UserCheck" size={20} />
            {t('pickupButton')}
          </button>
        )}

        {ride.estado === 'recogido' && (
          <button 
            onClick={handleFinalizar}
            className="w-full bg-green-500 text-white py-4 rounded-2xl font-bold shadow-lg shadow-green-500/20 flex items-center justify-center gap-2"
          >
            <Icon name="CheckCircle" size={20} />
            {t('finishButton')}
          </button>
        )}
      </div>
    </div>
  );
}