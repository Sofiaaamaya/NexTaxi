'use client';

import { useEffect, useState } from 'react';
import { createConductor } from '@/services/conductoresService';
import { getUsuarios } from '@/services/usuariosService';
import { getVehiculos } from '@/services/vehiculosService';
import { useRouter } from 'next/navigation';
import Poppins from '@/components/ui/Poppins';

export default function CrearConductor() {
  const router = useRouter();

  const [usuarios, setUsuarios] = useState([]);
  const [vehiculos, setVehiculos] = useState([]);

  const [form, setForm] = useState({
    id_usuario: '',
    numero_licencia: '',
    id_vehiculo: '',
    estado: 'fuera_servicio',
  });

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    setUsuarios(await getUsuarios());
    setVehiculos(await getVehiculos());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createConductor(form);
    router.push('/es/admin/drivers');
  };

  return (
    <div className="p-8 max-w-xl flex flex-col gap-6">

      <Poppins text="Crear Conductor" size="24|32" weight="semibold" />

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">

        {/* Usuario */}
        <div>
          <Poppins text="Usuario" size="14|16" color="textSecondary" />
          <select
            className="input mt-1"
            value={form.id_usuario}
            onChange={(e) => setForm({ ...form, id_usuario: e.target.value })}
          >
            <option value="">Seleccionar usuario</option>
            {usuarios.map((u) => (
              <option key={u.id_usuario} value={u.id_usuario}>
                {u.nombre} ({u.email})
              </option>
            ))}
          </select>
        </div>

        {/* Número de licencia */}
        <div>
          <Poppins text="Número de licencia" size="14|16" color="textSecondary" />
          <input
            className="input mt-1"
            value={form.numero_licencia}
            onChange={(e) => setForm({ ...form, numero_licencia: e.target.value })}
          />
        </div>

        {/* Vehículo */}
        <div>
          <Poppins text="Vehículo" size="14|16" color="textSecondary" />
          <select
            className="input mt-1"
            value={form.id_vehiculo}
            onChange={(e) => setForm({ ...form, id_vehiculo: e.target.value })}
          >
            <option value="">Seleccionar vehículo</option>
            {vehiculos.map((v) => (
              <option key={v.id_vehiculo} value={v.id_vehiculo}>
                {v.marca} {v.modelo} ({v.matricula})
              </option>
            ))}
          </select>
        </div>

        {/* Estado */}
        <div>
          <Poppins text="Estado" size="14|16" color="textSecondary" />
          <select
            className="input mt-1"
            value={form.estado}
            onChange={(e) => setForm({ ...form, estado: e.target.value })}
          >
            <option value="disponible">Disponible</option>
            <option value="ocupado">Ocupado</option>
            <option value="fuera_servicio">Fuera de servicio</option>
          </select>
        </div>

        <button className="button-primary mt-4">
          <Poppins text="Guardar" color="white" />
        </button>
      </form>
    </div>
  );
}
