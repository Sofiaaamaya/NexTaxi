'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import TitleComponent from '@/components/common/TitleComponent';
import Poppins from '@/components/ui/Poppins';
import Icon from '@/components/icons/Icon';
import { apiFetch } from '@/lib/api';
import clsx from 'clsx';
import UserTripStatus from './UserTripStatus';
import GooglePlacesInput from '@/components/common/GooglePlacesInput';

export default function ReservaPage() {
  const t = useTranslations('reserva');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isProcessActive, setIsProcessActive] = useState(false);

  const [form, setForm] = useState({
    nombre_cliente: '',
    telefono_cliente: '',
    recogida_direccion: '',
    recogida_lat: null,
    recogida_lng: null,
    destino_direccion: '',
    destino_lat: null,
    destino_lng: null,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!form.recogida_lat || !form.recogida_lng) {
      setError('Por favor, selecciona una dirección de recogida válida.');
      setLoading(false);
      return;
    }

    const payload = {
      nombre_cliente: form.nombre_cliente,
      telefono_cliente: form.telefono_cliente,
      recogida_direccion: form.recogida_direccion,
      recogida_lat: form.recogida_lat,
      recogida_lng: form.recogida_lng,
      destino_direccion: form.destino_direccion,
      destino_lat: form.destino_lat,
      destino_lng: form.destino_lng,
    };

    try {
      const res = await apiFetch('/solicitudes', {
        method: 'POST',
        body: JSON.stringify(payload),
      });

      if (res.error) {
        setError(res.data?.message || t('form.error'));
      } else {
        // Guardar ID en localStorage para persistencia básica del invitado
        localStorage.setItem('guest_ride_id', res.id_solicitud);
        setIsProcessActive(true);
      }
    } catch {
      setError(t('form.error'));
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    'w-full px-4 py-3 bg-white border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all';

  return (
    <div className="max-w-5xl mx-auto py-12 px-4">
      <TitleComponent title={t('title')} subtitle={t('subtitle')} align="center" />

      <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-xl shadow-gray-200/50">
          {isProcessActive ? (
            <UserTripStatus onFinish={() => setIsProcessActive(false)} />
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-1.5">
                <Poppins
                  text={t('form.name')}
                  tag="label"
                  size="14"
                  weight="medium"
                  className="text-gray-600 ml-1"
                />
                <input
                  type="text"
                  required
                  placeholder={t('form.namePlaceholder')}
                  value={form.nombre_cliente}
                  onChange={(e) => setForm({ ...form, nombre_cliente: e.target.value })}
                  className={inputClass}
                />
              </div>

              <div className="space-y-1.5">
                <Poppins
                  text={t('form.phone')}
                  tag="label"
                  size="14"
                  weight="medium"
                  className="text-gray-600 ml-1"
                />
                <input
                  type="tel"
                  required
                  placeholder={t('form.phonePlaceholder')}
                  value={form.telefono_cliente}
                  onChange={(e) => setForm({ ...form, telefono_cliente: e.target.value })}
                  className={inputClass}
                />
              </div>

              <div className="space-y-1.5">
                <Poppins
                  text={t('form.pickup')}
                  tag="label"
                  size="14"
                  weight="medium"
                  className="text-gray-600 ml-1"
                />
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-primary z-10">
                    <Icon name="MapPin" size={18} />
                  </div>
                  <GooglePlacesInput
                    placeholder={t('form.pickupPlaceholder')}
                    value={form.recogida_direccion}
                    onChange={(place) =>
                      setForm((prev) => ({
                        ...prev,
                        recogida_direccion: place.address,
                        recogida_lat: place.lat,
                        recogida_lng: place.lng,
                      }))
                    }
                    className={clsx(inputClass, 'pl-10')}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Poppins
                  text={t('form.destination')}
                  tag="label"
                  size="14"
                  weight="medium"
                  className="text-gray-600 ml-1"
                />
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 z-10">
                    <Icon name="Navigation" size={18} />
                  </div>
                  <GooglePlacesInput
                    placeholder={t('form.destinationPlaceholder')}
                    value={form.destino_direccion}
                    onChange={(place) =>
                      setForm((prev) => ({
                        ...prev,
                        destino_direccion: place.address,
                        destino_lat: place.lat,
                        destino_lng: place.lng,
                      }))
                    }
                    className={clsx(inputClass, 'pl-10')}
                  />
                </div>
              </div>

              {error && (
                <div className="p-3 bg-red-50 text-red-600 rounded-xl text-sm border border-red-100 flex items-center gap-2">
                  <Icon name="AlertCircle" size={16} />
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary hover:bg-primary-dark text-white py-4 rounded-xl font-bold shadow-lg shadow-primary/25 transition-all active:scale-[0.98] flex items-center justify-center gap-2 mt-4 disabled:opacity-70"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <Icon name="Send" size={18} />
                    <Poppins text={t('form.submit')} tag="span" weight="medium" color="white" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        {/* INFO / CALL SECTION */}
        <div className="space-y-8">
          <div className="bg-primary text-white p-8 rounded-3xl shadow-xl">
            <div className="w-12 h-12 bg-white/20 text-white rounded-xl flex items-center justify-center mb-6">
              <Icon name="Phone" size={24} color="white" />
            </div>
            <Poppins text={t('call.title')} size="22" weight="bold" color="white" />
            <Poppins text={t('call.text')} size="16" className="mt-2 text-slate-300" />

            <a
              href={`tel:${t('call.phone')}`}
              className="mt-8 w-full bg-white text-black py-4 rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-slate-100 transition-colors"
            >
              <Icon name="PhoneCall" size={20} />
              <Poppins text={t('call.button')} tag="span" weight="bold" />
            </a>
            <div className="mt-4 text-center">
              <Poppins text={t('call.phone')} size="20" weight="bold" color="white" />
            </div>
          </div>

          <div className="bg-primary/5 border border-primary/10 p-8 rounded-3xl">
            <Poppins text={t('benefits.title')} size="18" weight="bold" color="textPrimary" />
            <ul className="mt-4 space-y-4">
              {[
                { icon: 'Zap', text: t('benefits.items.immediate') },
                { icon: 'Shield', text: t('benefits.items.verified') },
                { icon: 'Clock', text: t('benefits.items.available') },
              ].map((item, idx) => (
                <li key={idx} className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-primary shadow-sm">
                    <Icon name={item.icon} size={16} />
                  </div>
                  <Poppins text={item.text} size="14" weight="medium" color="textSecondary" />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
