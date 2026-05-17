'use client';

import { useState, useEffect } from 'react';
import { apiFetch } from '@/lib/api';
import MapComponent from '@/components/common/MapComponent';
import Poppins from '@/components/ui/Poppins';
import Icon from '@/components/icons/Icon';
import { useTranslations } from 'next-intl';

export default function UsuarioRideTracking({ rideId, compact = false, onFinish }) {
  const t = useTranslations('userTracking');
  const [ride, setRide] = useState(null);
  const [route, setRoute] = useState([]);
  const [polyline, setPolyline] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRide = async () => {
      const res = await apiFetch(`/viajes/${rideId}`);
      if (!res.error) {
        setRide(res);
        setRoute(
          res.ubicaciones.map((u) => ({ lat: parseFloat(u.latitud), lng: parseFloat(u.longitud) }))
        );
        if (res.polyline) setPolyline(res.polyline);

        // SI EL VIAJE ESTÁ COMPLETADO O CANCELADO, TERMINAMOS
        if (res.estado === 'completado' || res.estado === 'cancelado') {
          if (onFinish) onFinish();
        }
      }
      setLoading(false);
    };

    fetchRide();
    const interval = setInterval(fetchRide, 5000); // Poll cada 5 segundos
    return () => clearInterval(interval);
  }, [rideId, onFinish]);

  if (loading)
    return (
      <div className="p-8 text-center bg-white rounded-3xl">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
      </div>
    );
  if (!ride) return <div className="p-8 text-center bg-white rounded-3xl">{t('noActive')}</div>;

  const content = (
    <>
      <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-white">
        <div>
          <Poppins
            text={ride.estado === 'recogido' ? t('enRoute') : t('toPickup')}
            weight="bold"
            color="primary"
          />
          <Poppins
            text={
              ride.conductor?.usuario?.nombre +
              ' - ' +
              (ride.conductor?.vehiculo?.matricula || 'Sin matrícula')
            }
            size="13"
            color="textSecondary"
          />
        </div>
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <Icon name="Car" size={20} className="text-primary" />
          </div>
        </div>
      </div>

      {!compact && (
        <div className="flex-1 relative">
          <MapComponent
            polyline={polyline}
            markers={[
              {
                position: route[0] || {
                  lat: parseFloat(ride.solicitud.recogida_lat),
                  lng: parseFloat(ride.solicitud.recogida_lng),
                },
                label: 'A',
              },
              (route.length > 1 || ride.solicitud.destino_lat) && {
                position:
                  route.length > 1
                    ? route[route.length - 1]
                    : {
                        lat: parseFloat(ride.solicitud.destino_lat),
                        lng: parseFloat(ride.solicitud.destino_lng),
                      },
                label: 'B',
              },
            ].filter(Boolean)}
          />
        </div>
      )}

      <div className="p-6 bg-gray-50 flex items-center justify-between">
        <div className="flex flex-col">
          <Poppins text={t('estPrice')} size="12" color="textSecondary" className="uppercase" />
          <Poppins
            text={ride.precio_estimado ? `${ride.precio_estimado}€` : '--'}
            weight="bold"
            size="18"
          />
        </div>
        <button className="bg-white p-3 rounded-2xl shadow-sm border border-gray-100 text-primary">
          <Icon name="Phone" size={24} />
        </button>
      </div>
    </>
  );

  return (
    <div
      className={
        compact
          ? 'bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100'
          : 'flex flex-col h-[500px] bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100'
      }
    >
      {content}
    </div>
  );
}
