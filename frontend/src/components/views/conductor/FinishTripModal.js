'use client';

import { useState } from 'react';
import Poppins from '@/components/ui/Poppins';
import Icon from '@/components/icons/Icon';
import { useTranslations } from 'next-intl';

export default function FinishTripModal({ isOpen, onClose, onFinish, initialDest = '' }) {
  const t = useTranslations('tracking');
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    destino_direccion: initialDest,
    precio_final: '',
  });

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await onFinish(form);
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white w-full max-w-md rounded-3xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <Poppins text={t('finishButton')} tag="h3" size="20" weight="bold" />
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <Icon name="X" size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div className="space-y-1.5">
            <Poppins
              text={t('prompts.destination')}
              tag="label"
              size="14"
              weight="medium"
              className="text-gray-600 ml-1"
            />
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-primary">
                <Icon name="Navigation" size={18} />
              </div>
              <input
                type="text"
                required
                placeholder="Ej. Aeropuerto de Lanzarote"
                value={form.destino_direccion}
                onChange={(e) => setForm({ ...form, destino_direccion: e.target.value })}
                className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Poppins
              text={t('prompts.price')}
              tag="label"
              size="14"
              weight="medium"
              className="text-gray-600 ml-1"
            />
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-green-600">
                <Icon name="Euro" size={18} />
              </div>
              <input
                type="number"
                step="0.01"
                required
                placeholder="0.00"
                value={form.precio_final}
                onChange={(e) => setForm({ ...form, precio_final: e.target.value })}
                className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all font-bold"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-500 hover:bg-green-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-green-500/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2 mt-4 disabled:opacity-70"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <Icon name="CheckCircle" size={18} />
                <Poppins text={t('finishButton')} tag="span" weight="bold" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
