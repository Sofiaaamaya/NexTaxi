'use client';

import { useState, useEffect } from 'react';
import Poppins from "@/components/ui/Poppins";
import { apiFetch } from '@/lib/api';
import UsuarioRideTracking from '@/components/views/UsuarioRideTracking';
import RideRequestForm from '@/components/views/usuario/RideRequestForm';

export default function UsuarioDashboard() {
  const [activeRide, setActiveRide] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkActiveRide = async () => {
    setLoading(true);
    const res = await apiFetch('/viajes/activa');
    if (!res.error) {
      setActiveRide(res);
    } else {
      setActiveRide(null);
    }
    setLoading(false);
  };

  useEffect(() => {
    checkActiveRide();
  }, []);

  if (loading) return <div className="p-10 text-center">Cargando dashboard...</div>;

  return (
    <div className="space-y-8">
      <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
        <Poppins text="Bienvenido a NexTaxi" tag="h1" size="24|32" weight="bold" />
        <Poppins text={activeRide ? "Tienes un viaje en curso." : "Pide un taxi ahora o consulta tus viajes anteriores."} color="textSecondary" />
      </div>

      {activeRide ? (
        <div className="max-w-2xl">
          <UsuarioRideTracking rideId={activeRide.id_viaje} />
        </div>
      ) : (
        <div className="max-w-2xl">
          <RideRequestForm onRequested={() => {
            // Re-verificar para mostrar el seguimiento o un mensaje de espera
            checkActiveRide();
          }} />
        </div>
      )}
    </div>
  );
}