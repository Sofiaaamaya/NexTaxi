'use client';

import { useEffect, useState } from 'react';
import { getConductores, deleteConductor } from '@/services/conductoresService';
import Poppins from '@/components/ui/Poppins';
import Link from 'next/link';

export default function ConductoresPage() {
  const [conductores, setConductores] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const data = await getConductores();
    setConductores(data);
  };

  const handleDelete = async (id) => {
    await deleteConductor(id);
    load();
  };

  const filtered = conductores.filter((c) =>
    c.nombre.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-8 flex flex-col gap-6">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Poppins text="Conductores Activos" size="24|32" weight="semibold" />
          <span className="px-3 py-1 rounded-full bg-primary-light text-primary-normal text-sm">
            {filtered.length}
          </span>
        </div>

        <Link href="drivers/create" className="button-primary">
          <Poppins text="Crear Conductor" color="white" />
        </Link>
      </div>

      {/* BUSCADOR */}
      <div className="w-full">
        <input
          className="input w-full"
          placeholder="Buscar conductor por nombre..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* CARD TABLE */}
      <div className="bg-white shadow-md rounded-2xl p-6">
        <div className="grid grid-cols-5 px-2 pb-3 border-b">
          <Poppins text="ID" size="14|16" color="textSecondary" />
          <Poppins text="Nombre" size="14|16" color="textSecondary" />
          <Poppins text="Email" size="14|16" color="textSecondary" />
          <Poppins text="Estado" size="14|16" color="textSecondary" />
          <Poppins text="Acción" size="14|16" color="textSecondary" />
        </div>

        <div className="flex flex-col divide-y">
          {filtered.map((c) => (
            <div
              key={c.id_conductor}
              className="grid grid-cols-5 items-center py-4 px-2 hover:bg-gray-50 transition-all"
            >
              <Poppins text={`#${c.id_conductor}`} size="14|16" />

              <Poppins text={c.usuario?.nombre || '—'} size="14|16" />

              <Poppins text={c.usuario?.email || '—'} size="14|16" />

              {/* Estado con pill */}
              <div>
                <span
                  className={`
                    px-3 py-1 rounded-full text-sm
                    ${
                      c.estado === 'disponible'
                        ? 'bg-green-100 text-green-700'
                        : c.estado === 'ocupado'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-gray-200 text-gray-700'
                    }
                  `}
                >
                  {c.estado}
                </span>
              </div>

              {/* ACCIONES */}
              <div className="flex gap-3">
                <Link
                  href={`conductores/${c.id_conductor}/editar`}
                  className="text-primary-normal hover:underline"
                >
                  <Poppins text="Editar" size="14|16" />
                </Link>

                <button
                  onClick={() => handleDelete(c.id_conductor)}
                  className="text-danger hover:underline"
                >
                  <Poppins text="Eliminar" size="14|16" color="danger" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* PAGINADOR */}
      <div className="flex justify-center items-center gap-4 mt-4">
        <button className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition">
          <Poppins text="Anterior" size="14|16" />
        </button>

        <button className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition">
          <Poppins text="Siguiente" size="14|16" />
        </button>
      </div>
    </div>
  );
}
