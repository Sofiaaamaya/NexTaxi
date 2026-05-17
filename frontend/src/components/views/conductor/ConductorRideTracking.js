'use client';

import { useState, useEffect, useRef } from 'react';
import { apiFetch } from '@/lib/api';
import MapComponent from '@/components/common/MapComponent';
import Poppins from '@/components/ui/Poppins';
import Icon from '@/components/icons/Icon';
import { useTranslations } from 'next-intl';

export default function ConductorRideTracking({ rideId, onFinish, compact = false }) {
  const t = useTranslations('tracking');
  const [ride, setRide] = useState(null);
  const [currentPos, setCurrentPos] = useState(null);
  const [route, setRoute] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFinishing, setIsFinishing] = useState(false);
  const [finishForm, setFinishForm] = useState({
    destino_direccion: '',
    precio_final: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const watchId = useRef(null);

  useEffect(() => {
    const fetchRide = async () => {
      const res = await apiFetch(`/viajes/${rideId}`);
      if (!res.error) {
        setRide(res);
        setRoute(
          res.ubicaciones.map((u) => ({ lat: parseFloat(u.latitud), lng: parseFloat(u.longitud) }))
        );
        setFinishForm((prev) => ({
          ...prev,
          destino_direccion: res.solicitud?.destino_direccion || '',
        }));
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
            lng: position.coords.longitude,
          };
          setCurrentPos(newPos);
          setRoute((prev) => [...prev, newPos]);

          // Enviar al servidor cada X metros o tiempo (simplificado: siempre por ahora)
          apiFetch(`/viajes/${rideId}/ubicaciones`, {
            method: 'POST',
            body: JSON.stringify({ latitud: newPos.lat, longitud: newPos.lng }),
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

  const handleFinalizar = async (e) => {
    if (e) e.preventDefault();
    setSubmitting(true);
    const res = await apiFetch(`/viajes/${rideId}/completar`, {
      method: 'POST',
      body: JSON.stringify({
        ...finishForm,
        destino_lat: currentPos?.lat,
        destino_lng: currentPos?.lng,
      }),
    });

    if (!res.error) {
      if (onFinish) onFinish();
    }
    setSubmitting(false);
  };

  if (loading)
    return (
      <div className="p-8 text-center bg-white rounded-3xl">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
      </div>
    );
  if (!ride) return <div className="p-8 text-center bg-white rounded-3xl">{t('notFound')}</div>;

  const content = (
    <div className="flex flex-col">
      {/* HEADER */}
      <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-white">
        <div>
          <Poppins
            text={ride.estado === 'recogido' ? t('inTrip') : t('onWay')}
            weight="bold"
            color="primary"
          />
          <Poppins
            text={ride.solicitud?.recogida_direccion || 'Cargando dirección...'}
            size="13"
            color="textSecondary"
            className="truncate max-w-[200px]"
          />
        </div>
        <div className="flex items-center gap-2">
          <Icon name="User" size={18} className="text-gray-400" />
          <Poppins
            text={ride.solicitud?.nombre_cliente || t('customer')}
            size="14"
            weight="semibold"
          />
        </div>
      </div>

      {/* FORMULARIO FINALIZAR (INLINE EXPANDIBLE HACIA ARRIBA) */}
      {isFinishing && (
        <form
          onSubmit={handleFinalizar}
          className="p-6 space-y-4 bg-gray-50/50 animate-in slide-in-from-bottom-2 duration-300 border-b border-gray-100"
        >
          <div className="space-y-1.5">
            <Poppins
              text={t('prompts.destination')}
              tag="label"
              size="13"
              weight="bold"
              color="textPrimary"
              className="uppercase tracking-wider opacity-60 ml-1"
            />
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-primary">
                <Icon name="Navigation" size={16} />
              </div>
              <input
                type="text"
                required
                value={finishForm.destino_direccion}
                onChange={(e) =>
                  setFinishForm({ ...finishForm, destino_direccion: e.target.value })
                }
                className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all text-sm"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Poppins
              text={t('prompts.price')}
              tag="label"
              size="13"
              weight="bold"
              color="textPrimary"
              className="uppercase tracking-wider opacity-60 ml-1"
            />
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-green-600">
                <Icon name="Euro" size={16} />
              </div>
              <input
                type="number"
                step="0.01"
                required
                placeholder="0.00"
                value={finishForm.precio_final}
                onChange={(e) => setFinishForm({ ...finishForm, precio_final: e.target.value })}
                className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all font-bold text-sm"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={() => setIsFinishing(false)}
              className="flex-1 py-3 rounded-xl border border-gray-200 font-bold text-gray-500 hover:bg-gray-100 transition-colors text-sm"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="flex-[2] bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl font-bold shadow-lg shadow-green-500/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2 text-sm disabled:opacity-70"
            >
              {submitting ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <Icon name="CheckCircle" size={18} />
                  {t('finishButton')}
                </>
              )}
            </button>
          </div>
        </form>
      )}

      {!isFinishing && !compact && (
        <div className="flex-1 relative min-h-[400px]">
          <MapComponent
            center={
              currentPos || {
                lat: parseFloat(ride.solicitud.recogida_lat),
                lng: parseFloat(ride.solicitud.recogida_lng),
              }
            }
            markers={[
              {
                position: {
                  lat: parseFloat(ride.solicitud.recogida_lat),
                  lng: parseFloat(ride.solicitud.recogida_lng),
                },
                label: 'A',
              },
              currentPos && {
                position: currentPos,
                label: '🚗',
                icon: 'https://maps.google.com/mapfiles/kml/pal2/icon56.png',
              },
            ].filter(Boolean)}
            route={route}
            zoom={15}
          />
        </div>
      )}

      {!isFinishing && (
        <div className="p-6 bg-white border-t border-gray-100 space-y-4">
          {ride.estado === 'en_camino' && (
            <button
              onClick={handleRecoger}
              className="w-full bg-primary text-white py-4 rounded-2xl font-bold shadow-lg shadow-primary/20 flex items-center justify-center gap-2 hover:bg-primary-dark transition-colors"
            >
              <Icon name="UserCheck" size={20} />
              {t('pickupButton')}
            </button>
          )}

          {ride.estado === 'recogido' && (
            <button
              onClick={() => setIsFinishing(true)}
              className="w-full bg-green-500 text-white py-4 rounded-2xl font-bold shadow-lg shadow-green-500/20 flex items-center justify-center gap-2 hover:bg-green-600 transition-colors"
            >
              <Icon name="CheckCircle" size={20} />
              {t('finishButton')}
            </button>
          )}
        </div>
      )}
    </div>
  );

  return (
    <div
      className={
        compact
          ? 'bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100'
          : 'flex flex-col h-full bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100'
      }
    >
      {content}
    </div>
  );
}
