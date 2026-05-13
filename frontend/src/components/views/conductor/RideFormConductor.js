'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import clsx from 'clsx';
import Icon from '@/components/icons/Icon';
import Poppins from '@/components/ui/Poppins';
import { apiFetch } from '@/lib/api';
import ConductorRideTracking from './ConductorRideTracking';

export default function RideFormConductor() {
  const t = useTranslations('rideForm');
  const [open, setOpen] = useState(false);
  const [activeRide, setActiveRide] = useState(null);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    recogida_direccion: '',
    destino_direccion: '',
    nombre_cliente: '',
    telefono_cliente: '',
    tipo_vehiculo: 'normal'
  });

  const vehicleOptions = t.raw('vehicleOptions');

  useEffect(() => {
    checkActiveRide();
  }, []);

  const checkActiveRide = async () => {
    setLoading(true);
    const res = await apiFetch('/viajes/activa');
    if (!res.error) {
      setActiveRide(res);
      setOpen(true); // Auto-abrir si hay viaje activo
    } else {
      setActiveRide(null);
    }
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Simulación de coordenadas para el ejemplo (en prod usar Google Places/Geocoding)
    const body = {
      recogida_direccion: form.recogida_direccion,
      recogida_lat: 28.9622, 
      recogida_lng: -13.5550,
      destino_direccion: form.destino_direccion || null,
      destino_lat: form.destino_direccion ? 28.9600 : null,
      destino_lng: form.destino_direccion ? -13.5500 : null,
      nombre_cliente: form.nombre_cliente,
      telefono_cliente: form.telefono_cliente
    };

    // 1. Crear solicitud
    const solicitud = await apiFetch('/solicitudes', {
      method: 'POST',
      body: JSON.stringify(body)
    });

    if (!solicitud.error) {
      // 2. Aceptar automáticamente (viaje manual de conductor)
      const viaje = await apiFetch(`/viajes/${solicitud.id_solicitud}/aceptar`, {
        method: 'POST'
      });

      if (!viaje.error) {
        setActiveRide(viaje);
      }
    }
  };

  if (loading) return null;

  if (activeRide) {
    return (
      <div className="fixed bottom-6 right-6 z-50 w-full max-w-md px-4">
        <ConductorRideTracking 
          rideId={activeRide.id_viaje} 
          onFinish={() => {
            setActiveRide(null);
            setOpen(false);
          }} 
        />
      </div>
    );
  }

  return (
    <div className="relative justify-start z-50">
      <button
        onClick={() => setOpen(!open)}
        className={clsx(
          "transition-all duration-500 shadow-xl flex items-center justify-center",
          "bg-primary text-white rounded-full",
          open ? "w-64 h-14 rounded-2xl" : "w-14 h-14"
        )}
      >
        {!open && <Icon name="Menu" size={22} className="text-white" />}
        {open && (
          <Poppins
            text={t('title')}
            size="14|15"
            weight="semibold"
            className="text-white"
          />
        )}
      </button>

      <div
        className={clsx(
          "absolute top-16 w-[90vw] max-w-md bg-white rounded-2xl shadow-2xl p-5 transition-all duration-500 overflow-y-auto max-h-[80vh]",
          open ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-5 pointer-events-none"
        )}
      >
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <Poppins text={t('currentLocation')} size="13|14" weight="medium" />
            <input
              type="text"
              required
              value={form.recogida_direccion}
              onChange={(e) => setForm({...form, recogida_direccion: e.target.value})}
              placeholder={t('currentLocationPlaceholder')}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition"
            />
          </div>

          <div className="flex flex-col gap-1">
            <Poppins text={t('destination')} size="13|14" weight="medium" />
            <input
              type="text"
              value={form.destino_direccion}
              onChange={(e) => setForm({...form, destino_direccion: e.target.value})}
              placeholder={t('destinationPlaceholder')}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <Poppins text="Nombre Cliente" size="13|14" weight="medium" />
              <input
                type="text"
                value={form.nombre_cliente}
                onChange={(e) => setForm({...form, nombre_cliente: e.target.value})}
                placeholder="Ej. Ana"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition"
              />
            </div>
            <div className="flex flex-col gap-1">
              <Poppins text="Teléfono" size="13|14" weight="medium" />
              <input
                type="text"
                value={form.telefono_cliente}
                onChange={(e) => setForm({...form, telefono_cliente: e.target.value})}
                placeholder="600000000"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <Poppins text={t('vehicleType')} size="13|14" weight="medium" />
            <select
              value={form.tipo_vehiculo}
              onChange={(e) => setForm({...form, tipo_vehiculo: e.target.value})}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition cursor-pointer"
            >
              {vehicleOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-4 rounded-xl bg-primary text-white font-bold hover:bg-primary/90 transition shadow-lg shadow-primary/20"
          >
            Comenzar Viaje
          </button>
        </form>
      </div>
    </div>
  );
}
