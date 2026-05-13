'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Poppins from '@/components/ui/Poppins';
import Icon from '@/components/icons/Icon';
import { apiFetch } from '@/lib/api';

export default function RideRequestForm({ onRequested }) {
  const t = useTranslations('reserva');
  const [form, setForm] = useState({
    pickup: '',
    destination: '',
    name: '',
    phone: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // En una app real usaríamos Google Maps Autocomplete para obtener lat/lng
    const body = {
      recogida_direccion: form.pickup,
      recogida_lat: 28.9622, 
      recogida_lng: -13.5550,
      destino_direccion: form.destination || null,
      destino_lat: form.destination ? 28.9600 : null,
      destino_lng: form.destination ? -13.5500 : null,
      nombre_cliente: form.name,
      telefono_cliente: form.phone
    };

    const res = await apiFetch('/solicitudes', {
      method: 'POST',
      body: JSON.stringify(body)
    });

    setLoading(false);
    if (!res.error) {
      if (onRequested) onRequested(res);
    }
  };

  return (
    <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-xl shadow-gray-200/50">
      <Poppins text={t('formTitle')} tag="h2" size="20" weight="bold" className="mb-6" />
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <Poppins text={t('form.pickup')} tag="label" size="14" weight="medium" className="text-gray-600 ml-1" />
          <div className="relative">
            <input
              type="text"
              required
              placeholder={t('form.pickupPlaceholder')}
              value={form.pickup}
              onChange={(e) => setForm({...form, pickup: e.target.value})}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
            />
            <Icon name="MapPin" size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-primary" />
          </div>
        </div>

        <div className="space-y-1.5">
          <Poppins text={t('form.destination')} tag="label" size="14" weight="medium" className="text-gray-600 ml-1" />
          <div className="relative">
            <input
              type="text"
              placeholder={t('form.destinationPlaceholder')}
              value={form.destination}
              onChange={(e) => setForm({...form, destination: e.target.value})}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
            />
            <Icon name="Navigation" size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Poppins text={t('form.name')} tag="label" size="14" weight="medium" className="text-gray-600 ml-1" />
            <input
              type="text"
              required
              placeholder={t('form.namePlaceholder')}
              value={form.name}
              onChange={(e) => setForm({...form, name: e.target.value})}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
            />
          </div>
          <div className="space-y-1.5">
            <Poppins text={t('form.phone')} tag="label" size="14" weight="medium" className="text-gray-600 ml-1" />
            <input
              type="text"
              required
              placeholder={t('form.phonePlaceholder')}
              value={form.phone}
              onChange={(e) => setForm({...form, phone: e.target.value})}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary text-white py-4 rounded-2xl font-bold shadow-lg shadow-primary/20 hover:bg-primary-dark transition-all active:scale-[0.98] disabled:opacity-70 mt-4 flex items-center justify-center gap-2"
        >
          {loading ? (
            <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              <Icon name="Car" size={20} />
              {t('form.submit')}
            </>
          )}
        </button>
      </form>
    </div>
  );
}