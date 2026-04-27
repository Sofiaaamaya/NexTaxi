'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import Poppins from '@/components/ui/Poppins';
import Icon from '@/components/icons/Icon';
import { apiFetch } from '@/lib/api';

export default function DriversCrud({ data = [], refreshData }) {
  const ITEMS_PER_PAGE = 10;
  const t = useTranslations('drivers.dashboard');

  const [drivers, setDrivers] = useState(data);
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Estado para el nuevo conductor
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    dni: '',
    numero_licencia: '',
    password: '',
    password_confirmation: '',
  });

  useEffect(() => {
    setDrivers(data);
  }, [data]);

  const totalPages = Math.ceil(drivers.length / ITEMS_PER_PAGE) || 1;
  const paginated = drivers.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const updateCell = (id, field, value) => {
    setDrivers((prev) => prev.map((d) => (d.id === id ? { ...d, [field]: value } : d)));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await apiFetch('/conductores', {
        method: 'POST',
        body: JSON.stringify(formData),
      });

      if (res && !res.error) {
        setIsModalOpen(false);
        setFormData({
          nombre: '',
          email: '',
          dni: '',
          numero_licencia: '',
          password: '',
          password_confirmation: '',
        });
        refreshData();
      } else {
        alert(res?.data?.message || 'Error al crear el conductor');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdate = async (id) => {
    const d = drivers.find((drv) => drv.id === id);
    if (!d) return;

    try {
      const res = await apiFetch(`/conductores/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
          nombre: d.name,
          email: d.email,
          estado: d.status,
          dni: d.dni,
          numero_licencia: d.licencia,
        }),
      });

      if (res && !res.error) {
        refreshData();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    // Usaremos un confirm nativo por ahora, pero estilizado o mediante modal sería lo ideal.
    // Para no complicar demasiado el flujo inicial, mantenemos la lógica pero preparamos el borrado.
    if (!window.confirm('¿Estás seguro de que deseas eliminar este conductor?')) return;

    try {
      await apiFetch(`/conductores/${id}`, {
        method: 'DELETE',
      });
      refreshData();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-6 rounded-2xl shadow-md border border-[var(--color-border)] bg-[var(--color-surface)] relative">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">
        <Poppins text={t('title')} size="20|24" weight="semibold" />

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:opacity-90 transition shadow-sm"
        >
          <Icon name="Plus" size={18} />
          <Poppins text={t('add')} size="14|16" color="white" />
        </button>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto rounded-xl border border-[var(--color-border)]">
        <table className="w-full">
          <thead className="bg-gray-50/50">
            <tr className="text-left border-b border-[var(--color-border)]">
              <th className="p-4">
                <Poppins text={t('photo')} size="14|16" weight="medium" />
              </th>
              <th className="p-4">
                <Poppins text={t('name')} size="14|16" weight="medium" />
              </th>
              <th className="p-4">
                <Poppins text={t('email')} size="14|16" weight="medium" />
              </th>
              <th className="p-4">
                <Poppins text={t('status')} size="14|16" weight="medium" />
              </th>
              <th className="p-4 text-right">
                <Poppins text={t('actions')} size="14|16" weight="medium" />
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-[var(--color-border)]">
            {paginated.map((d) => (
              <tr key={d.id} className="hover:bg-gray-50/50 transition">
                <td className="p-4">
                  <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
                    <img
                      src="/images/imagen_perfil.webp"
                      alt="perfil"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </td>
                <td className="p-4">
                  <input
                    value={d.name}
                    onChange={(e) => updateCell(d.id, 'name', e.target.value)}
                    className="w-full bg-transparent border-none focus:ring-0 font-medium text-sm"
                  />
                </td>
                <td className="p-4">
                  <input
                    value={d.email}
                    onChange={(e) => updateCell(d.id, 'email', e.target.value)}
                    className="w-full bg-transparent border-none focus:ring-0 text-sm text-gray-600"
                  />
                </td>
                <td className="p-4">
                  <select
                    value={d.status}
                    onChange={(e) => {
                      updateCell(d.id, 'status', e.target.value);
                      // Opcional: Auto-guardar al cambiar estado
                    }}
                    className="bg-transparent border-none focus:ring-0 text-sm font-medium cursor-pointer"
                  >
                    <option value="disponible">Disponible</option>
                    <option value="ocupado">Ocupado</option>
                    <option value="fuera_servicio">Fuera de Servicio</option>
                  </select>
                </td>
                <td className="p-4 flex items-center justify-end gap-3">
                  <button
                    onClick={() => handleUpdate(d.id)}
                    className="text-blue-600 hover:text-blue-800 transition"
                    title="Guardar"
                  >
                    <Icon name="Save" size={20} />
                  </button>
                  <button
                    onClick={() => handleDelete(d.id)}
                    className="text-red-500 hover:text-red-700 transition"
                    title="Eliminar"
                  >
                    <Icon name="Trash" size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* PAGINACIÓN */}
      <div className="flex justify-between items-center mt-6">
        <button
          onClick={() => setPage((p) => p - 1)}
          disabled={page === 1}
          className={`px-4 py-2 rounded-lg flex items-center gap-2 transition ${
            page === 1
              ? 'opacity-50 cursor-not-allowed bg-gray-100'
              : 'bg-primary text-white hover:bg-primary/90'
          }`}
        >
          <Icon name="ChevronLeft" size={18} />
          <Poppins text={t('prev')} size="14|16" />
        </button>

        <Poppins text={t('page', { page, total: totalPages })} size="14|16" color="textSecondary" />

        <button
          onClick={() => setPage((p) => p + 1)}
          disabled={page === totalPages}
          className={`px-4 py-2 rounded-lg flex items-center gap-2 transition ${
            page === totalPages
              ? 'opacity-50 cursor-not-allowed bg-gray-100'
              : 'bg-primary text-white hover:bg-primary/90'
          }`}
        >
          <Poppins text={t('next')} size="14|16" />
          <Icon name="ChevronRight" size={18} />
        </button>
      </div>

      {/* MODAL DE AÑADIR CONDUCTOR */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <Poppins text="Añadir Nuevo Conductor" size="18|20" weight="semibold" />
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition"
              >
                <Icon name="X" size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Nombre Completo
                </label>
                <input
                  required
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleInputChange}
                  placeholder="Ej: Juan Pérez"
                  className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Email
                </label>
                <input
                  required
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="juan@ejemplo.com"
                  className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    DNI/NIE
                  </label>
                  <input
                    required
                    name="dni"
                    value={formData.dni}
                    onChange={handleInputChange}
                    placeholder="12345678X"
                    className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Licencia
                  </label>
                  <input
                    required
                    name="numero_licencia"
                    value={formData.numero_licencia}
                    onChange={handleInputChange}
                    placeholder="L-99999"
                    className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Contraseña
                </label>
                <input
                  required
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition"
                />
              </div>

              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-4 py-2 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition font-medium"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 px-4 py-2 rounded-xl bg-primary text-white hover:opacity-90 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Guardando...' : 'Crear Conductor'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
