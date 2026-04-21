'use client';

import { useEffect, useState } from 'react';
import { getConductor, updateConductor } from '@/services/conductoresService';
import { getUsuarios } from '@/services/usuariosService';
import { getVehiculos } from '@/services/vehiculosService';
import { useRouter, useParams } from 'next/navigation';
import Poppins from '@/components/ui/Poppins';

export default function EditarConductor() {
  const router = useRouter();
  const { id, locale } = useParams();

  const [usuarios, setUsuarios] = useState([]);
  const [vehiculos, setVehiculos] = useState([]);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    id_usuario: '',
    numero_licencia: '',
    id_vehiculo: '',
    estado: '',
  });

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const conductor = await getConductor(id);
    const usuariosList = await getUsuarios();
    const vehiculosList = await getVehiculos();

    setUsuarios(usuariosList);
    setVehiculos(vehiculosList);

    setForm({
      id_usuario: conductor.id_usuario,
      numero_licencia: conductor.numero_licencia,
      id_vehiculo: conductor.id_vehiculo,
      estado: conductor.estado,
    });

    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateConductor(id, form);
    router.push(`/${locale}/admin/drivers`);
  };

  if (loading) {
    return (
      <div className="p-8">
        <Poppins text="Cargando datos..." size="18|22" />
      </div>
    );
  }

  return (
    <div className="p-8 max-w-xl flex flex-col gap-6">

      <Poppins text="Editar Conductor" size="24|32" weight="semibold" />

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
          <Poppins text="Guardar Cambios" color="white" />
        </button>
      </form>
    </div>
  );
}
