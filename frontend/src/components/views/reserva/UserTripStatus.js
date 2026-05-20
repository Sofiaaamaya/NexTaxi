'use client';

import { useState, useEffect, useCallback } from 'react';
import { apiFetch } from '@/lib/api';
import Poppins from '@/components/ui/Poppins';
import Icon from '@/components/icons/Icon';
import { useTranslations } from 'next-intl';
import UsuarioRideTracking from '../UsuarioRideTracking';

export default function UserTripStatus({ onFinish }) {
  const t = useTranslations('reserva');
  const [loading, setLoading] = useState(true);
  const [activeRequest, setActiveRequest] = useState(null);
  const [activeRide, setActiveRide] = useState(null);

  const checkStatus = useCallback(async () => {
    try {
      // 1. Intentar por API normal (si está logueado)
      const rideRes = await apiFetch('/viajes/activa');
      if (!rideRes.error && rideRes.id_viaje) {
        setActiveRide(rideRes);
        setActiveRequest(null);
        setLoading(false);
        return;
      }

      const reqRes = await apiFetch('/solicitudes');
      if (!reqRes.error && Array.isArray(reqRes)) {
        const pending = reqRes.find((r) => r.estado === 'pendiente');
        if (pending) {
          setActiveRequest(pending);
          setActiveRide(null);
          setLoading(false);
          return;
        }
      }

      // 2. Si falló (ej: 401 por ser invitado) o no hay nada, intentar por ID guardado localmente
      const guestRideId = localStorage.getItem('guest_ride_id');
      if (guestRideId) {
        // Obtenemos la solicitud específica (si el endpoint lo permite)
        // Como no tenemos /solicitudes/{id}, usamos un truco: si está en localStorage, 
        // asumimos que sigue pendiente hasta que recibamos un error o el conductor la acepte.
        // Pero para seguimiento real de invitado, necesitamos que el backend permita GET /solicitudes/{id} a invitados.
        
        // Intentamos ver si hay un viaje activo para esa solicitud específica
        // NOTA: Esto requiere que el backend permita consultar el estado de un viaje por ID de solicitud sin auth
        // Por ahora, simulamos o dejamos que falle si no hay auth.
      }

      setActiveRide(null);
      setActiveRequest(null);
      if (onFinish) onFinish();
    } catch {
      if (onFinish) onFinish();
    } finally {
      setLoading(false);
    }
  }, [onFinish]);

  useEffect(() => {
    checkStatus();
    const interval = setInterval(checkStatus, 5000);
    return () => clearInterval(interval);
  }, [checkStatus]);

  const handleCancel = async () => {
    const idToCancel = activeRequest?.id_solicitud || localStorage.getItem('guest_ride_id');
    if (!idToCancel) return;
    if (!confirm(t('confirmCancel'))) return;

    const res = await apiFetch(`/solicitudes/${idToCancel}/cancelar`, {
      method: 'POST',
    });

    if (!res.error) {
      localStorage.removeItem('guest_ride_id');
      setActiveRequest(null);
      if (onFinish) onFinish();
    } else {
      alert(res.data?.message || 'Error al cancelar');
    }
  };

  if (loading)
    return (
      <div className="p-8 text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
      </div>
    );

  if (activeRide) {
    return (
      <div className="space-y-6">
        <div className="bg-green-50 border border-green-100 p-4 rounded-2xl flex items-center gap-3">
          <div className="w-10 h-10 bg-green-500 text-white rounded-full flex items-center justify-center">
            <Icon name="Check" size={20} />
          </div>
          <div>
            <Poppins text={t('status.accepted')} weight="bold" color="textPrimary" />
            <Poppins text={t('status.driverOnWay')} size="14" color="textSecondary" />
          </div>
        </div>
        <UsuarioRideTracking rideId={activeRide.id_viaje} />
      </div>
    );
  }

  if (activeRequest) {
    return (
      <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-xl text-center space-y-6">
        <div className="w-20 h-20 bg-amber-50 text-amber-500 rounded-full flex items-center justify-center mx-auto animate-pulse">
          <Icon name="Clock" size={40} />
        </div>
        <div>
          <Poppins text={t('status.searching')} size="20" weight="semibold" color="textPrimary" />
          <Poppins
            text={t('status.searchingSub')}
            size="14"
            color="textSecondary"
            className="mt-2"
          />
        </div>

        <div className="p-4 bg-gray-50 rounded-2xl text-left">
          <div className="flex items-start gap-3">
            <Icon name="MapPin" size={18} className="text-primary mt-1" />
            <div>
              <Poppins
                text={t('form.pickup')}
                size="12"
                weight="bold"
                color="textSecondary"
                className="uppercase"
              />
              <Poppins text={activeRequest.recogida_direccion} size="15" />
            </div>
          </div>
          {activeRequest.destino_direccion && (
            <div className="flex items-start gap-3 mt-4">
              <Icon name="Navigation" size={18} className="text-gray-400 mt-1" />
              <div>
                <Poppins
                  text={t('form.destination')}
                  size="12"
                  weight="bold"
                  color="textSecondary"
                  className="uppercase"
                />
                <Poppins text={activeRequest.destino_direccion} size="15" />
              </div>
            </div>
          )}
        </div>

        <button
          onClick={handleCancel}
          className="w-full py-3 text-red-500 font-medium hover:bg-red-50 rounded-xl transition-colors"
        >
          {t('status.cancel')}
        </button>
      </div>
    );
  }

  return null;
}
