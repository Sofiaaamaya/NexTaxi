'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import clsx from 'clsx';
import Icon from '@/components/icons/Icon';
import Poppins from '@/components/ui/Poppins';

export default function RideFormConductor() {
  const t = useTranslations('rideForm');
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const vehicleOptions = t.raw('vehicleOptions');
  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);

    setTimeout(() => {
      setSent(false);
      setOpen(false);
    }, 2500);
  };

  return (
    <div className="relative justify-start z-50">

      <button
        onClick={() => setOpen(!open)}
        className={clsx(
          "transition-all duration-500 shadow-xl flex items-center justify-center",
          "bg-primary text-white rounded-full",
          open ? "w-64 h-14 rounded-2xl" : "w-14 h-14"
        )}
      >
        {!open && <Icon name="Menu" size={22} className="text-white" />}
        {open && (
          <Poppins
            text={t('title')}
            size="14|15"
            weight="semibold"
            className="text-white"
          />
        )}
      </button>

      <div
        className={clsx(
          "absolute top-16 w-[90%] max-w-md bg-white rounded-2xl shadow-2xl p-5 transition-all duration-500",
          open ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-5 pointer-events-none"
        )}
      >
        {!sent ? (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">

            <div className="flex flex-col gap-1">
              <Poppins text={t('currentLocation')} size="13|14" weight="medium" />
              <input
                type="text"
                placeholder={t('currentLocationPlaceholder')}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition"
              />
            </div>

            <div className="flex flex-col gap-1">
              <Poppins text={t('manualLocation')} size="13|14" weight="medium" />
              <input
                type="text"
                placeholder={t('manualLocationPlaceholder')}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition"
              />
            </div>

            <div className="flex flex-col gap-1">
              <Poppins text={t('destination')} size="13|14" weight="medium" />
              <input
                type="text"
                placeholder={t('destinationPlaceholder')}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition"
              />
            </div>

            <div className="flex flex-col gap-1">
              <Poppins text={t('vehicleType')} size="13|14" weight="medium" />
              <select
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition cursor-pointer"
              >
                {vehicleOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <Poppins text={t('estimation')} size="13|14" weight="medium" />
              <div className="px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-500">
                {t('estimationPlaceholder')}
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-primary text-white font-semibold hover:bg-primary/90 transition"
            >
              {t('requestTaxi')}
            </button>
          </form>
        ) : (
          <div className="flex flex-col items-center justify-center py-10 gap-4">
            <div className="animate-pulse">
              <Icon name="Car" size={48} className="text-primary" />
            </div>
            <Poppins
              text={t('sentTitle')}
              size="16|18"
              weight="semibold"
              className="text-primary"
            />
            <Poppins
              text={t('sentSubtitle')}
              size="13|14"
              color="gray-500"
            />
          </div>
        )}
      </div>
    </div>
  );
}
