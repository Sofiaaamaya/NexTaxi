'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { apiFetch } from '@/lib/api';
import Poppins from '@/components/ui/Poppins';
import Icon from '@/components/icons/Icon';
import MapComponent from '@/components/common/MapComponent';
import FinishTripModal from './conductor/FinishTripModal';

import { useRouter } from 'next/navigation';

export default function TripHistoryView({ rol }) {
  const t = useTranslations('tripHistory');
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('historial');
  const [trips, setTrips] = useState([]);
  const [pendientes, setPendientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingPendientes, setLoadingPendientes] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [finishingTrip, setFinishingTrip] = useState(null);

  const fetchTrips = useCallback(async () => {
    setLoading(true);
    const res = await apiFetch('/viajes/');
    if (!res.error) {
      setTrips(res);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    const id = setTimeout(() => fetchTrips(), 0);
    return () => clearTimeout(id);
  }, [fetchTrips]);

  const [actionError, setActionError] = useState(null);

  useEffect(() => {
    if (rol !== 'conductor') return;

    let interval;
    const fetchPendientes = async () => {
      setLoadingPendientes(true);
      const res = await apiFetch('/solicitudes/pendientes');
      if (!res.error) {
        setPendientes(res);
      }
      setLoadingPendientes(false);
    };

    if (activeTab === 'solicitudes') {
      fetchPendientes();
      interval = setInterval(fetchPendientes, 5000);
    }

    return () => clearInterval(interval);
  }, [activeTab, rol]);

  const handleAceptarViaje = async (id_solicitud) => {
    setActionError(null);
    const res = await apiFetch(`/viajes/${id_solicitud}/aceptar`, { method: 'POST' });
    if (!res.error) {
      router.push(window.location.pathname.replace('/mis-viajes', '/dashboard'));
    } else {
      setActionError(res.message || 'Error al aceptar el viaje');
    }
  };

  const handleFinalizarViaje = async (data) => {
    const res = await apiFetch(`/viajes/${finishingTrip.id_viaje}/completar`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
    if (!res.error) {
      setFinishingTrip(null);
      fetchTrips();
    } else {
      alert(res.message || 'Error al finalizar el viaje');
    }
  };

  if (loading && activeTab === 'historial')
    return <div className="p-10 text-center">Cargando...</div>;

  return (
    <div className="space-y-6">
      {actionError && (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-100 flex items-center justify-between">
          <Poppins text={actionError} size="14" weight="medium" />
          <button onClick={() => setActionError(null)} className="text-red-400 hover:text-red-600">
            <Icon name="X" size={18} />
          </button>
        </div>
      )}
      <div className="flex flex-col gap-2">
        <Poppins text={t('title')} tag="h1" size="24|32" weight="bold" />
        <Poppins text={t('subtitle')} color="textSecondary" />
      </div>

      {rol === 'conductor' && (
        <div className="flex space-x-4 border-b border-gray-100">
          <button
            className={`py-2 px-4 border-b-2 transition-colors ${activeTab === 'historial' ? 'border-primary text-primary font-bold' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('historial')}
          >
            Historial de Viajes
          </button>
          <button
            className={`py-2 px-4 border-b-2 transition-colors ${activeTab === 'solicitudes' ? 'border-primary text-primary font-bold' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('solicitudes')}
          >
            Solicitudes Pendientes
          </button>
        </div>
      )}

      {activeTab === 'historial' && (
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="px-6 py-4 font-semibold text-sm text-gray-600">
                    {t('table.date')}
                  </th>
                  <th className="px-6 py-4 font-semibold text-sm text-gray-600">
                    {t('table.route')}
                  </th>
                  <th className="px-6 py-4 font-semibold text-sm text-gray-600">
                    {t('table.status')}
                  </th>
                  <th className="px-6 py-4 font-semibold text-sm text-gray-600 text-right">
                    {t('table.price')}
                  </th>
                  <th className="px-6 py-4 font-semibold text-sm text-gray-600 text-center">
                    {t('table.map')}
                  </th>
                </tr>
              </thead>
              <tbody>
                {trips.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-10 text-center text-gray-400">
                      {t('noTrips')}
                    </td>
                  </tr>
                ) : (
                  trips.map((trip) => (
                    <tr
                      key={trip.id_viaje}
                      className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <Poppins
                            text={new Date(trip.created_at).toLocaleDateString()}
                            size="14"
                            weight="medium"
                          />
                          <Poppins
                            text={new Date(trip.created_at).toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                            size="12"
                            color="textSecondary"
                          />
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-1 max-w-xs">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-green-500" />
                            <Poppins
                              text={trip.solicitud.recogida_direccion}
                              size="13"
                              className="truncate"
                            />
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-red-500" />
                            <Poppins
                              text={trip.solicitud.destino_direccion || 'No especificado'}
                              size="13"
                              className="truncate text-gray-500"
                            />
                          </div>
                          <Poppins
                            text={
                              rol === 'conductor'
                                ? trip.solicitud.nombre_cliente || 'Cliente'
                                : trip.conductor?.usuario?.nombre || 'Conductor'
                            }
                            size="11"
                            color="textSecondary"
                            className="mt-1"
                          />
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                            trip.estado === 'completado'
                              ? 'bg-green-100 text-green-600'
                              : trip.estado === 'cancelado'
                                ? 'bg-red-100 text-red-600'
                                : 'bg-blue-100 text-blue-600'
                          }`}
                        >
                          {trip.estado}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Poppins
                          text={trip.precio_final ? `${trip.precio_final}€` : '-'}
                          weight="semibold"
                        />
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => setSelectedTrip(trip)}
                            className="p-2 hover:bg-primary/10 rounded-lg text-primary transition-colors"
                            title={t('table.map')}
                          >
                            <Icon name="Map" size={20} />
                          </button>
                          {rol === 'conductor' && trip.estado === 'recogido' && (
                            <button
                              onClick={() => setFinishingTrip(trip)}
                              className="p-2 hover:bg-green-100 rounded-lg text-green-600 transition-colors"
                              title="Finalizar Viaje"
                            >
                              <Icon name="CheckCircle" size={20} />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'solicitudes' && rol === 'conductor' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {loadingPendientes && pendientes.length === 0 ? (
            <div className="col-span-full p-10 text-center">Buscando solicitudes...</div>
          ) : pendientes.length === 0 ? (
            <div className="col-span-full p-10 text-center bg-white rounded-3xl border border-gray-100 shadow-sm text-gray-500">
              No hay solicitudes pendientes en este momento.
            </div>
          ) : (
            pendientes.map((sol) => (
              <div
                key={sol.id_solicitud}
                className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm flex flex-col gap-4"
              >
                <div className="flex justify-between items-start">
                  <div className="flex flex-col">
                    <Poppins text={sol.nombre_cliente || 'Cliente'} size="16" weight="bold" />
                    <Poppins
                      text={new Date(sol.fecha_solicitud).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                      size="12"
                      color="textSecondary"
                    />
                  </div>
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-bold uppercase">
                    Pendiente
                  </span>
                </div>

                <div className="flex flex-col gap-2 bg-gray-50 p-4 rounded-2xl">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                    <Poppins text={sol.recogida_direccion} size="14" />
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                    <Poppins
                      text={sol.destino_direccion || 'Destino no especificado'}
                      size="14"
                      color={!sol.destino_direccion ? 'textSecondary' : 'textPrimary'}
                    />
                  </div>
                </div>

                <button
                  onClick={() => handleAceptarViaje(sol.id_solicitud)}
                  className="mt-2 w-full py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary-dark transition-colors shadow-lg shadow-primary/25"
                >
                  Aceptar Viaje
                </button>
              </div>
            ))
          )}
        </div>
      )}

      {/* Modal Mapa */}
      {selectedTrip && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <div>
                <Poppins text={t('modal.title')} tag="h3" size="18" weight="bold" />
                <Poppins
                  text={`${new Date(selectedTrip.created_at).toLocaleDateString()} - ${selectedTrip.solicitud.recogida_direccion}`}
                  size="14"
                  color="textSecondary"
                />
              </div>
              <button
                onClick={() => setSelectedTrip(null)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <Icon name="X" size={24} />
              </button>
            </div>
            <div className="h-[500px] w-full relative">
              <MapComponent
                center={{
                  lat: parseFloat(selectedTrip.solicitud.recogida_lat),
                  lng: parseFloat(selectedTrip.solicitud.recogida_lng),
                }}
                markers={[
                  {
                    position: {
                      lat: parseFloat(selectedTrip.solicitud.recogida_lat),
                      lng: parseFloat(selectedTrip.solicitud.recogida_lng),
                    },
                    label: 'A',
                    icon: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png',
                  },
                  selectedTrip.solicitud.destino_lat && {
                    position: {
                      lat: parseFloat(selectedTrip.solicitud.destino_lat),
                      lng: parseFloat(selectedTrip.solicitud.destino_lng),
                    },
                    label: 'B',
                    icon: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
                  },
                ].filter(Boolean)}
                route={
                  selectedTrip.ubicaciones?.map((u) => ({
                    lat: parseFloat(u.latitud),
                    lng: parseFloat(u.longitud),
                  })) || []
                }
                zoom={14}
              />
            </div>
            <div className="p-6 bg-gray-50 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <Poppins
                  text={t('modal.distance')}
                  size="12"
                  weight="medium"
                  color="textSecondary"
                  className="uppercase"
                />
                <Poppins
                  text={
                    selectedTrip.distancia
                      ? `${(selectedTrip.distancia / 1000).toFixed(1)} km`
                      : '-- km'
                  }
                  weight="bold"
                />
              </div>
              <div>
                <Poppins
                  text={t('modal.duration')}
                  size="12"
                  weight="medium"
                  color="textSecondary"
                  className="uppercase"
                />
                <Poppins
                  text={selectedTrip.fin_viaje ? t('status.finished') : t('status.ongoing')}
                  weight="bold"
                />
              </div>
              <div>
                <Poppins
                  text={rol === 'conductor' ? 'Cliente' : 'Conductor'}
                  size="12"
                  weight="medium"
                  color="textSecondary"
                  className="uppercase"
                />
                <Poppins
                  text={
                    rol === 'conductor'
                      ? selectedTrip.solicitud?.nombre_cliente
                      : selectedTrip.conductor?.usuario?.nombre
                  }
                  weight="bold"
                />
              </div>
              <div>
                <Poppins
                  text={t('modal.finalPrice')}
                  size="12"
                  weight="medium"
                  color="textSecondary"
                  className="uppercase"
                />
                <Poppins
                  text={selectedTrip.precio_final ? `${selectedTrip.precio_final}€` : '-'}
                  weight="bold"
                  className="text-primary"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Finalizar */}
      {finishingTrip && (
        <FinishTripModal
          isOpen={!!finishingTrip}
          onClose={() => setFinishingTrip(null)}
          onFinish={handleFinalizarViaje}
          initialDest={finishingTrip.solicitud?.destino_direccion || ''}
        />
      )}
    </div>
  );
}
