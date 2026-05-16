'use client';

import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import Icon from '@/components/icons/Icon';
import Poppins from '@/components/ui/Poppins';
import { apiFetch } from '@/lib/api';
import GooglePlacesInput from '@/components/common/GooglePlacesInput';
import MapComponent from '@/components/common/MapComponent';
import { useGoogleRoute } from '@/hooks/useGoogleRoute';
import UsuarioRideTracking from '../UsuarioRideTracking';
import ConductorRideTracking from './ConductorRideTracking';
import { useLayout } from '@/context/LayoutContext';

export default function RideForm({ role = 'usuario' }) {
  const t = useTranslations('rideForm');
  const { sidebarOpen } = useLayout();

  const [loading, setLoading] = useState(true);
  const [activeRide, setActiveRide] = useState(null);
  const [open, setOpen] = useState(false);
  const [btnVisible, setBtnVisible] = useState(true);
  const [form, setForm] = useState({
    pickup: '',
    pickup_lat: null,
    pickup_lng: null,
    destination: '',
    destination_lat: null,
    destination_lng: null,
    name: '',
    phone: '',
    tipo_vehiculo: 'normal'
  });

  const vehicleOptions = t.raw('vehicleOptions');

  const { data: routeData, loading: loadingRoute, error: errorRoute, fetchRoute } =
    useGoogleRoute(form.pickup, form.destination);

  useEffect(() => { checkActiveRide(); }, []);

  useEffect(() => {
    if (sidebarOpen && open) {
      setOpen(false);
      setTimeout(() => setBtnVisible(true), 280);
    }
  }, [sidebarOpen]);

  const checkActiveRide = async () => {
    setLoading(true);
    const res = await apiFetch('/viajes/activa');
    setActiveRide(!res.error ? res : null);
    setLoading(false);
  };

  const handleToggle = () => {
    if (!open) {
      setBtnVisible(false);
      setTimeout(() => setOpen(true), 280);
    } else {
      setOpen(false);
      setTimeout(() => setBtnVisible(true), 280);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetchRoute();

    const body = {
      recogida_direccion: form.pickup,
      recogida_lat: form.pickup_lat,
      recogida_lng: form.pickup_lng,
      destino_direccion: form.destination,
      destino_lat: form.destination_lat,
      destino_lng: form.destination_lng,
      nombre_cliente: form.name,
      telefono_cliente: form.phone,
      tipo_vehiculo: form.tipo_vehiculo
    };

    const solicitud = await apiFetch('/solicitudes', { method: 'POST', body: JSON.stringify(body) });
    if (solicitud.error) return;

    if (role === 'conductor') {
      const viaje = await apiFetch(`/viajes/${solicitud.id_solicitud}/aceptar`, { method: 'POST' });
      if (!viaje.error) setActiveRide(viaje);
    }
  };


  const floatLeft = sidebarOpen
    ? 'left-4 lg:left-[272px]'
    : 'left-4 lg:left-[88px]';

  if (loading) return null;

  if (activeRide) {
    return (
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:right-6 z-10 w-full max-w-md px-4">
        {role === 'conductor' ? (
          <ConductorRideTracking
            rideId={activeRide.id_viaje}
            onFinish={() => { setActiveRide(null); setOpen(false); }}
          />
        ) : (
          <UsuarioRideTracking rideId={activeRide.id_viaje} />
        )}
      </div>
    );
  }

  return (
    <>
      <div className="relative w-full h-full min-h-[calc(100vh-4rem)]">
        <MapComponent
          isBackground={true}
          polyline={routeData?.routes?.[0]?.overview_polyline?.points}
          markers={
            routeData?.routes?.[0]
              ? [
                  { position: routeData.routes[0].legs[0].start_location, label: 'A' },
                  { position: routeData.routes[0].legs[0].end_location, label: 'B' }
                ]
              : []
          }
        />
      </div>

      <button
        onClick={handleToggle}
        aria-label={t('title')}
        className={clsx(
          'fixed z-30 top-[4.75rem] transition-all duration-300',
          floatLeft,
          btnVisible
            ? 'opacity-100 scale-100 pointer-events-auto'
            : 'opacity-0 scale-50 pointer-events-none'
        )}
      >
        <div className="w-12 h-12 rounded-full bg-primary shadow-xl flex items-center justify-center">
          <Icon name="Menu" size={22} className="text-white" />
        </div>
      </button>

      <div
        className={clsx(
          'fixed z-30 top-[4.75rem] transition-all duration-300 ease-out origin-top-left',
          floatLeft,
          'w-[calc(100vw-2rem)] md:w-[480px]',
          'bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl',
          'overflow-y-auto max-h-[calc(100vh-6rem)]',
          open
            ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 scale-90 -translate-y-2 pointer-events-none'
        )}
      >
        <div className="flex items-center justify-between px-6 pt-6 pb-2">
          <Poppins text={t('title')} size="16|18" weight="semibold" />
          <button
            onClick={handleToggle}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition"
          >
            <Icon name="X" size={18} className="text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6 p-6 pt-4">
          <div className="flex flex-col gap-2">
            <Poppins text={t('currentLocation')} size="14|15" weight="semibold" />
            <GooglePlacesInput
              placeholder={t('currentLocationPlaceholder')}
              value={form.pickup}
              onChange={(place) =>
                setForm((prev) => ({
                  ...prev,
                  pickup: place.address,
                  pickup_lat: place.lat,
                  pickup_lng: place.lng
                }))
              }
              className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition bg-gray-50/50"
            />
          </div>

          <div className="flex flex-col gap-2">
            <Poppins text={t('destination')} size="14|15" weight="semibold" />
            <GooglePlacesInput
              placeholder={t('destinationPlaceholder')}
              value={form.destination}
              onChange={(place) =>
                setForm((prev) => ({
                  ...prev,
                  destination: place.address,
                  destination_lat: place.lat,
                  destination_lng: place.lng
                }))
              }
              className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition bg-gray-50/50"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <Poppins text={t('vehicleType')} size="14|15" weight="semibold" />
              <select
                value={form.tipo_vehiculo}
                onChange={(e) => setForm((prev) => ({ ...prev, tipo_vehiculo: e.target.value }))}
                className="w-full px-5 py-4 rounded-2xl border border-gray-200 bg-gray-50/50 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition cursor-pointer appearance-none"
              >
                {vehicleOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <Poppins text={t('estimation')} size="14|15" weight="semibold" />
              <div className="h-full flex items-center px-5 py-4 rounded-2xl border border-primary/10 bg-primary/5">
                <Poppins
                  text={routeData?.routes?.[0]?.legs?.[0]?.duration?.text || t('estimationPlaceholder')}
                  size="16|16"
                  weight="medium"
                  color="textPrimary"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loadingRoute || !form.pickup}
            className="w-full py-5 rounded-2xl bg-primary text-white font-bold hover:bg-primary-dark transition-all shadow-xl shadow-primary/25 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-3 mt-2"
          >
            {loadingRoute ? (
              <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <Icon name="Navigation" size={20} />
                <Poppins text={t('requestTaxi')} size="16|18" weight="bold" color="white" />
              </>
            )}
          </button>
        </form>

        {errorRoute && (
          <div className="mx-6 mb-6 p-4 rounded-xl bg-red-50 text-red-600 text-sm font-medium border border-red-100">
            {errorRoute}
          </div>
        )}
      </div>
    </>
  );
}