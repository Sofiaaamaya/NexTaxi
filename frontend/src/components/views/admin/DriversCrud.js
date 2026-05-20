'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Poppins from '@/components/ui/Poppins';
import Icon from '@/components/icons/Icon';
import { apiFetch } from '@/lib/api';

export default function DriversCrud({ data = [], refreshData }) {
  const ITEMS_PER_PAGE = 10;
  const t = useTranslations('drivers');
  const tCommon = useTranslations('common');

  const [drivers, setDrivers] = useState(data);
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingDriver, setEditingDriver] = useState(null);
  const [driverToDelete, setDriverToDelete] = useState(null);
  const [statusMessage, setStatusMessage] = useState(null);

  const initialFormState = {
    nombre: '',
    email: '',
    dni: '',
    numero_licencia: '',
    password: '',
    matricula: '',
    marca: '',
    modelo: '',
    color: 'Blanco',
    tipo: 'normal',
    anio: new Date().getFullYear(),
  };

  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    setDrivers(data);
  }, [data]);

  const totalPages = Math.ceil(drivers.length / ITEMS_PER_PAGE) || 1;
  const paginated = drivers.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const showStatus = (message, type = 'success') => {
    setStatusMessage({ message, type });
    setTimeout(() => setStatusMessage(null), 5000);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleOpenAddModal = () => {
    setEditingDriver(null);
    setFormData(initialFormState);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (driver) => {
    setEditingDriver(driver);
    setFormData({
      nombre: driver.usuario?.nombre || '',
      email: driver.usuario?.email || '',
      dni: driver.dni || '',
      numero_licencia: driver.numero_licencia || '',
      password: '',
      matricula: driver.vehiculo?.matricula || '',
      marca: driver.vehiculo?.marca || '',
      modelo: driver.vehiculo?.modelo || '',
      color: driver.vehiculo?.color || 'Blanco',
      tipo: driver.vehiculo?.tipo || 'normal',
      anio: driver.vehiculo?.anio || new Date().getFullYear(),
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const url = editingDriver ? `/conductores/${editingDriver.id_conductor}` : '/conductores';
      const method = editingDriver ? 'PUT' : 'POST';

      const res = await apiFetch(url, {
        method,
        body: JSON.stringify(formData),
      });

      if (res && !res.error) {
        setIsModalOpen(false);
        showStatus(editingDriver ? t('dashboard.updatedSuccess') : t('dashboard.createdSuccess'));
        refreshData();
      } else {
        showStatus(res?.data?.message || t('dashboard.errorOperation'), 'error');
      }
    } catch (error) {
      console.error(error);
      showStatus(t('dashboard.errorConnection'), 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteClick = (driver) => {
    setDriverToDelete(driver);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!driverToDelete) return;
    setIsSubmitting(true);

    try {
      const res = await apiFetch(`/conductores/${driverToDelete.id_conductor}`, {
        method: 'DELETE',
      });

      if (res && !res.error) {
        setIsDeleteModalOpen(false);
        showStatus(t('dashboard.deletedSuccess'));
        refreshData();
      } else {
        showStatus(t('dashboard.errorDelete'), 'error');
      }
    } catch (error) {
      console.error(error);
      showStatus(t('dashboard.errorConnection'), 'error');
    } finally {
      setIsSubmitting(false);
      setDriverToDelete(null);
    }
  };

  return (
    <div className="p-6 rounded-2xl shadow-md border bg-white relative max-w-none w-full">

      {/* STATUS MESSAGE */}
      {statusMessage && (
        <div
          className={`fixed top-4 right-4 z-[100] p-4 rounded-xl shadow-lg border animate-in slide-in-from-right duration-300 ${
            statusMessage.type === 'error'
              ? 'bg-red-50 border-red-200 text-red-800'
              : 'bg-green-50 border-green-200 text-green-800'
          }`}
        >
          <div className="flex items-center gap-3">
            <Icon name={statusMessage.type === 'error' ? 'AlertCircle' : 'CheckCircle'} size={20} />
            <Poppins text={statusMessage.message} size="14|16" weight="medium" />
            <button onClick={() => setStatusMessage(null)} className="ml-2 hover:opacity-70">
              <Icon name="X" size={16} />
            </button>
          </div>
        </div>
      )}

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <Poppins text={t('dashboard.title')} size="20|24" weight="bold" />
          <Poppins text={t('managementSubtitle')} size="14|16" color="gray-500" />
        </div>

        <button
          onClick={handleOpenAddModal}
          className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white rounded-xl hover:bg-primary/90 transition shadow-lg shadow-primary/20"
        >
          <Icon name="Plus" size={20} />
          <Poppins text={t('dashboard.add')} size="14|16" color="white" weight="medium" />
        </button>
      </div>

      {/* TABLE */}
<div className="relative -mx-6">
  <div className="overflow-x-auto rounded-xl border border-gray-100 w-full max-w-none px-6">
    <table className="min-w-full text-left">

          <thead>
            <tr className="bg-gray-50/50 border-b border-gray-100">
              <th className="p-4">
                <Poppins
                  text={t('dashboard.photo')}
                  size="13|14"
                  weight="semibold"
                  color="gray-500"
                />
              </th>
              <th className="p-4">
                <Poppins
                  text={t('dashboard.name')}
                  size="13|14"
                  weight="semibold"
                  color="gray-500"
                />
              </th>
              <th className="p-4">
                <Poppins
                  text={t('table.dniLicense')}
                  size="13|14"
                  weight="semibold"
                  color="gray-500"
                />
              </th>
              <th className="p-4">
                <Poppins
                  text={t('table.vehicle')}
                  size="13|14"
                  weight="semibold"
                  color="gray-500"
                />
              </th>
              <th className="p-4">
                <Poppins
                  text={t('dashboard.status')}
                  size="13|14"
                  weight="semibold"
                  color="gray-500"
                />
              </th>
              <th className="p-4 text-right">
                <Poppins
                  text={t('dashboard.actions')}
                  size="13|14"
                  weight="semibold"
                  color="gray-500"
                />
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-50">
            {paginated.map((d) => (
              <tr key={d.id_conductor} className="hover:bg-gray-50/30 transition group">
                <td className="p-4">
                  <div className="w-12 h-12 rounded-2xl bg-gray-100 overflow-hidden relative border-2 border-white shadow-sm">
                    <Image
                      src="/images/imagen_perfil.webp"
                      alt="perfil"
                      fill
                      className="object-cover"
                    />
                  </div>
                </td>
                <td className="p-4">
                  <Poppins text={d.usuario?.nombre} size="14|16" weight="semibold" />
                  <Poppins text={d.usuario?.email} size="12|14" color="gray-400" />
                </td>
                <td className="p-4">
                  <Poppins text={d.dni} size="13|15" />
                  <Poppins text={d.numero_licencia} size="12|14" color="gray-400" />
                </td>
                <td className="p-4">
                  {d.vehiculo ? (
                    <>
                      <Poppins
                        text={`${d.vehiculo.marca} ${d.vehiculo.modelo}`}
                        size="13|15"
                        weight="medium"
                      />
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span className="px-1.5 py-0.5 bg-gray-100 rounded text-[10px] font-bold text-gray-600 uppercase">
                          {d.vehiculo.matricula}
                        </span>
                        <span
                          className="w-2 h-2 rounded-full"
                          style={{
                            backgroundColor:
                              d.vehiculo.color === 'Blanco' ? '#f3f4f6' : d.vehiculo.color,
                          }}
                        ></span>
                      </div>
                    </>
                  ) : (
                    <Poppins text={tCommon('noVehicle')} size="13|15" color="red-400" italic />
                  )}
                </td>
                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                      d.estado === 'disponible'
                        ? 'bg-green-100 text-green-700'
                        : d.estado === 'ocupado'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {d.estado}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => handleOpenEditModal(d)}
                      className="p-2 text-warning hover:bg-blue-50 rounded-lg transition"
                      title={tCommon('save')}
                    >
                      <Icon name="Edit2" size={18} />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(d)}
                      className="p-2 text-red-400 hover:bg-red-50 rounded-lg transition"
                      title={tCommon('delete')}
                    >
                      <Icon name="Trash2" size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </div>

      {/* PAGINACIÓN */}
      <div className="flex justify-between items-center mt-8 px-2">
        <button
          onClick={() => setPage((p) => p - 1)}
          disabled={page === 1}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl transition font-medium ${
            page === 1 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-gray-100 text-gray-700'
          }`}
        >
          <Icon name="ArrowLeft" size={18} />
          <Poppins text={t('dashboard.prev')} size="14|15" />
        </button>

        <div className="flex gap-2">
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`w-10 h-10 rounded-xl transition font-bold text-sm ${
                page === i + 1
                  ? 'bg-primary text-white shadow-md shadow-primary/30'
                  : 'hover:bg-gray-100 text-gray-500'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>

        <button
          onClick={() => setPage((p) => p + 1)}
          disabled={page === totalPages}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl transition font-medium ${
            page === totalPages
              ? 'opacity-30 cursor-not-allowed'
              : 'hover:bg-gray-100 text-gray-700'
          }`}
        >
          <Poppins text={t('dashboard.next')} size="14|15" />
          <Icon name="ArrowRight" size={18} />
        </button>
      </div>

      {/* MODAL DE AÑADIR/EDITAR */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-gray-900/40 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in zoom-in duration-300">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <div>
                <Poppins
                  text={editingDriver ? t('dashboard.editDriver') : t('dashboard.newDriver')}
                  size="20|24"
                  weight="bold"
                />
                <Poppins
                  text={editingDriver ? t('dashboard.editSubtitle') : t('dashboard.newSubtitle')}
                  size="13|14"
                  color="gray-500"
                />
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-200 transition text-gray-400"
              >
                <Icon name="X" size={24} />
              </button>
            </div>

            <form
              onSubmit={handleSubmit}
              className="p-8 max-h-[70vh] overflow-y-auto custom-scrollbar"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* SECCIÓN PERSONAL */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
                    <Icon name="User" size={18} className="text-primary" />
                    <Poppins text={t('form.personalInfo')} size="14|16" weight="bold" />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                      {t('form.fullName')}
                    </label>
                    <input
                      required
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleInputChange}
                      placeholder="Ej: Manuel García"
                      className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                      {t('form.professionalEmail')}
                    </label>
                    <input
                      required
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="manuel@nextaxi.com"
                      className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition"
                    />
                  </div>

                  {!editingDriver && (
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                        {t('form.password')}
                      </label>
                      <input
                        required
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition"
                      />
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                        {t('form.dni')}
                      </label>
                      <input
                        required
                        name="dni"
                        value={formData.dni}
                        onChange={handleInputChange}
                        placeholder="12345678Z"
                        className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition uppercase"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                        {t('form.license')}
                      </label>
                      <input
                        required
                        name="numero_licencia"
                        value={formData.numero_licencia}
                        onChange={handleInputChange}
                        placeholder="LIC-1234"
                        className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition uppercase"
                      />
                    </div>
                  </div>
                </div>

                {/* SECCIÓN VEHÍCULO */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
                    <Icon name="Truck" size={18} className="text-primary" />
                    <Poppins text={t('form.vehicleInfo')} size="14|16" weight="bold" />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                      {t('form.plate')}
                    </label>
                    <input
                      required
                      name="matricula"
                      value={formData.matricula}
                      onChange={handleInputChange}
                      placeholder="1234-BBB"
                      className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition uppercase"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                        {t('form.brand')}
                      </label>
                      <input
                        required
                        name="marca"
                        value={formData.marca}
                        onChange={handleInputChange}
                        placeholder="Toyota"
                        className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                        {t('form.model')}
                      </label>
                      <input
                        required
                        name="modelo"
                        value={formData.modelo}
                        onChange={handleInputChange}
                        placeholder="Prius"
                        className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                        {t('form.color')}
                      </label>
                      <input
                        name="color"
                        value={formData.color}
                        onChange={handleInputChange}
                        placeholder="Blanco"
                        className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                        {t('form.type')}
                      </label>
                      <select
                        name="tipo"
                        value={formData.tipo}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition appearance-none bg-white"
                      >
                        <option value="normal">{t('form.vehicleTypes.normal')}</option>
                        <option value="adaptado">{t('form.vehicleTypes.adapted')}</option>
                        <option value="premium">{t('form.vehicleTypes.premium')}</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-10 flex gap-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-6 py-4 rounded-2xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition font-bold"
                >
                  {tCommon('cancel')}
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-[2] px-6 py-4 rounded-2xl bg-primary text-white hover:opacity-90 transition font-bold shadow-xl shadow-primary/20 disabled:opacity-50"
                >
                  {isSubmitting
                    ? t('dashboard.processing')
                    : editingDriver
                      ? t('dashboard.saveChanges')
                      : t('dashboard.registerDriver')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL DE ELIMINAR */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-gray-900/40 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden animate-in zoom-in duration-300">
            <div className="p-8 text-center">
              <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Icon name="Trash2" size={40} />
              </div>
              <Poppins text={tCommon('areYouSure')} size="20|24" weight="bold" />
              <Poppins
                text={t('dashboard.deleteConfirmText', { name: driverToDelete?.usuario?.nombre })}
                size="14|16"
                color="gray-500"
                className="mt-2"
              />

              <div className="mt-8 flex flex-col gap-3">
                <button
                  onClick={confirmDelete}
                  disabled={isSubmitting}
                  className="w-full px-6 py-3 rounded-2xl bg-red-500 text-white hover:bg-red-600 transition font-bold shadow-lg shadow-red-200"
                >
                  {isSubmitting ? t('dashboard.processing') : t('dashboard.deleteYes')}
                </button>
                <button
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="w-full px-6 py-3 rounded-2xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition font-bold"
                >
                  {t('dashboard.deleteNo')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
