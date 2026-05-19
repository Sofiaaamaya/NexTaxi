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

export default function RideForm({ role = 'usuario' }) {
  const t = useTranslations('rideForm');

  const [loading, setLoading] = useState(true);
  const [activeRide, setActiveRide] = useState(null);
  const [waitingForDriver, setWaitingForDriver] = useState(false);
  const [open, setOpen] = useState(false);
  const [formError, setFormError] = useState(null);
  const [form, setForm] = useState({
    pickup: '',
    pickup_lat: null,
    pickup_lng: null,
    destination: '',
    destination_lat: null,
    destination_lng: null,
    name: '',
    phone: '',
    tipo_vehiculo: 'normal',
  });

  const vehicleOptions = t.raw('vehicleOptions');

  const {
    data: routeData,
    loading: loadingRoute,
    error: errorRoute,
    fetchRoute,
  } = useGoogleRoute(form.pickup, form.destination);

  const checkActiveRide = useCallback(async () => {
    const res = await apiFetch('/viajes/activa');
    if (!res.error && res.active !== false && res.id_viaje) {
      setActiveRide(res);
      setWaitingForDriver(false);
    } else {
      setActiveRide(null);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    const id = setTimeout(() => checkActiveRide(), 0);
    return () => clearTimeout(id);
  }, [checkActiveRide]);

  // AUTO-FETCH RUTA cuando cambian los campos
  useEffect(() => {
    if (form.pickup && form.destination) {
      const timer = setTimeout(() => {
        fetchRoute();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [form.pickup, form.destination, fetchRoute]);

  useEffect(() => {
    let interval;
    if (waitingForDriver && !activeRide) {
      interval = setInterval(() => {
        checkActiveRide();
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [waitingForDriver, activeRide, checkActiveRide]);

  const handleToggle = () => {
    setOpen(!open);
    if (!open) setFormError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);

    if (!form.pickup_lat || !form.pickup_lng) {
      setFormError('Por favor, selecciona una dirección de recogida válida de la lista sugerida.');
      return;
    }

    await fetchRoute();

    const body = {
      recogida_direccion: form.pickup,
      recogida_lat: parseFloat(form.pickup_lat),
      recogida_lng: parseFloat(form.pickup_lng),
      destino_direccion: form.destination || '',
      destino_lat: form.destination_lat ? parseFloat(form.destination_lat) : null,
      destino_lng: form.destination_lng ? parseFloat(form.destination_lng) : null,
      nombre_cliente: form.name || 'Cliente',
      telefono_cliente: form.phone || '',
      tipo_vehiculo: form.tipo_vehiculo,
    };

    const res = await apiFetch('/solicitudes', { method: 'POST', body: JSON.stringify(body) });

    if (res.error) {
      setFormError(res.data?.message || 'Error al enviar la solicitud');
      return;
    }

    if (role === 'conductor') {
      const viaje = await apiFetch(`/viajes/${res.id_solicitud}/aceptar`, { method: 'POST' });
      if (!viaje.error) setActiveRide(viaje);
    } else {
      setWaitingForDriver(true);
      setOpen(false);
    }
  };

  if (loading)
    return (
      <div className="w-full h-[700px] bg-gray-50 flex items-center justify-center rounded-[2.5rem]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );

  const isBusy = !!(activeRide || waitingForDriver);

  // Extraer polyline de routeData o de activeRide
  const polyline = activeRide
    ? activeRide.polyline
    : routeData?.routes?.[0]?.overview_polyline?.points;

  // Construir marcadores basados en la ruta calculada o el viaje activo
  const markers = activeRide
    ? [
        {
          position: {
            lat: parseFloat(activeRide.solicitud.recogida_lat),
            lng: parseFloat(activeRide.solicitud.recogida_lng),
          },
          label: 'A',
        },
        activeRide.solicitud.destino_lat && {
          position: {
            lat: parseFloat(activeRide.solicitud.destino_lat),
            lng: parseFloat(activeRide.solicitud.destino_lng),
          },
          label: 'B',
        },
      ].filter(Boolean)
    : routeData?.routes?.[0]?.legs?.[0]
      ? [
          { position: routeData.routes[0].legs[0].start_location, label: 'A' },
          { position: routeData.routes[0].legs[0].end_location, label: 'B' },
        ]
      : [];

  return (
    <div className="relative w-full h-[750px] rounded-[2.5rem] shadow-2xl border border-gray-100 bg-gray-50">
      {/* MAPA */}
      <div className="absolute inset-0 rounded-[2.5rem] overflow-hidden">
        <MapComponent isBackground={false} polyline={polyline} markers={markers} />
      </div>

      {isBusy && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:right-6 z-10 w-full max-w-md px-4 animate-in fade-in slide-in-from-bottom-6 duration-500">
          {activeRide ? (
            role === 'conductor' ? (
              <ConductorRideTracking
                rideId={activeRide.id_viaje}
                onFinish={() => {
                  setActiveRide(null);
                  setOpen(false);
                }}
                compact={true}
              />
            ) : (
              <UsuarioRideTracking
                rideId={activeRide.id_viaje}
                compact={true}
                onFinish={() => {
                  setActiveRide(null);
                  setOpen(false);
                  setWaitingForDriver(false);
                }}
              />
            )
          ) : (
            <div className="bg-white p-6 rounded-[2rem] shadow-2xl border border-gray-100 flex items-center gap-5">
              <div className="w-14 h-14 bg-amber-50 text-amber-500 rounded-2xl flex items-center justify-center animate-pulse">
                <Icon name="Clock" size={28} />
              </div>
              <div className="flex-1">
                <Poppins text="Buscando conductor..." size="18" weight="bold" color="textPrimary" />
                <Poppins
                  text="Estamos asignando el mejor taxi para ti"
                  size="14"
                  color="textSecondary"
                />
              </div>
              <button
                onClick={() => setWaitingForDriver(false)}
                className="p-2 hover:bg-gray-100 rounded-xl transition-colors text-gray-400 hover:text-red-500"
              >
                <Icon name="X" size={20} />
              </button>
            </div>
          )}
        </div>
      )}

      {!isBusy && role === 'usuario' && (
        <>
          <button
            onClick={handleToggle}
            className={clsx(
              'absolute z-20 top-8 left-8 w-14 h-14 rounded-2xl bg-primary shadow-2xl flex items-center justify-center hover:bg-primary-dark transition-all active:scale-95 group',
              open && 'bg-white shadow-none border border-gray-100'
            )}
          >
            <Icon
              name={open ? 'X' : 'Menu'}
              size={24}
              className={clsx('transition-colors', open ? 'text-gray-500' : 'text-white')}
            />
          </button>

          <div
            className={clsx(
              'absolute z-10 top-0 left-0 bottom-0 transition-all duration-500 ease-in-out',
              'w-full md:w-[450px] bg-white/95 backdrop-blur-xl border-r border-gray-100 shadow-2xl p-8 pt-28',
              open ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
            )}
          >
            <div className="h-full overflow-y-auto pr-2 custom-scrollbar">
              <Poppins
                text={t('title')}
                size="24"
                weight="bold"
                color="textPrimary"
                className="mb-2"
              />
              <Poppins
                text={t('subtitle') || 'Calcula tu ruta y solicita un taxi'}
                size="15"
                color="textSecondary"
                className="mb-8"
              />

              <form onSubmit={handleSubmit} className="space-y-6">
                {formError && (
                  <div className="p-4 rounded-2xl bg-red-50 text-red-600 text-sm font-medium border border-red-100 flex gap-2 animate-in fade-in zoom-in-95 duration-200">
                    <Icon name="AlertCircle" size={18} className="shrink-0" />
                    <p>{formError}</p>
                  </div>
                )}

                <div className="space-y-2">
                  <Poppins
                    text={t('currentLocation')}
                    size="14"
                    weight="bold"
                    color="textPrimary"
                    className="uppercase tracking-wider opacity-60"
                  />
                  <GooglePlacesInput
                    placeholder={t('currentLocationPlaceholder')}
                    value={form.pickup}
                    onChange={(place) =>
                      setForm((prev) => ({
                        ...prev,
                        pickup: place.address,
                        pickup_lat: place.lat,
                        pickup_lng: place.lng,
                      }))
                    }
                    className="w-full px-6 py-4 rounded-[1.25rem] border border-gray-100 focus:border-primary focus:ring-4 focus:ring-primary/5 outline-none transition bg-gray-50 font-medium"
                  />
                </div>

                <div className="space-y-2">
                  <Poppins
                    text={t('destination')}
                    size="14"
                    weight="bold"
                    color="textPrimary"
                    className="uppercase tracking-wider opacity-60"
                  />
                  <GooglePlacesInput
                    placeholder={t('destinationPlaceholder')}
                    value={form.destination}
                    onChange={(place) =>
                      setForm((prev) => ({
                        ...prev,
                        destination: place.address,
                        destination_lat: place.lat,
                        destination_lng: place.lng,
                      }))
                    }
                    className="w-full px-6 py-4 rounded-[1.25rem] border border-gray-100 focus:border-primary focus:ring-4 focus:ring-primary/5 outline-none transition bg-gray-50 font-medium"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="space-y-2">
                    <Poppins
                      text={t('vehicleType')}
                      size="13"
                      weight="bold"
                      color="textPrimary"
                      className="uppercase tracking-wider opacity-60"
                    />
                    <select
                      value={form.tipo_vehiculo}
                      onChange={(e) =>
                        setForm((prev) => ({ ...prev, tipo_vehiculo: e.target.value }))
                      }
                      className="w-full px-4 py-4 rounded-2xl border border-gray-100 bg-gray-50 focus:border-primary outline-none transition cursor-pointer appearance-none font-semibold text-sm"
                    >
                      {vehicleOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Poppins
                      text={t('estimation')}
                      size="13"
                      weight="bold"
                      color="textPrimary"
                      className="uppercase tracking-wider opacity-60"
                    />
                    <div className="h-[54px] flex items-center px-4 rounded-2xl bg-primary/5 border border-primary/10">
                      <Poppins
                        text={routeData?.routes?.[0]?.legs?.[0]?.duration?.text || '--'}
                        size="16"
                        weight="bold"
                        color="primary"
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loadingRoute || !form.pickup}
                  className="w-full py-5 rounded-[1.5rem] bg-primary text-white font-bold hover:bg-primary-dark transition-all shadow-xl shadow-primary/30 active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-3 mt-4"
                >
                  {loadingRoute ? (
                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <Icon name="Send" size={20} />
                      <Poppins text={t('requestTaxi')} size="18" weight="bold" color="white" />
                    </>
                  )}
                </button>
              </form>

              {errorRoute && (
                <div className="mt-6 p-4 rounded-2xl bg-red-50 text-red-600 text-sm font-medium border border-red-100 flex gap-2">
                  <Icon name="AlertCircle" size={18} />
                  {errorRoute}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
