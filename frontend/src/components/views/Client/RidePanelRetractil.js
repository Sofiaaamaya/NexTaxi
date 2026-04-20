'use client';

import { useState } from 'react';
import Poppins from '@/components/ui/Poppins';
import Icon from '@/components/icons/Icon';

export default function RidePanelRetractil() {
  const [open, setOpen] = useState(true);

  return (
    <div className="absolute top-10 left-10 z-20 flex items-start gap-3">
      <button
        onClick={() => setOpen(!open)}
        className="w-12 h-12 rounded-xl bg-white shadow-lg flex items-center justify-center border border-border hover:bg-slate-100 transition-all"
      >
        <div
          className={`
            transition-transform duration-300 ease-in-out
            ${open ? '' : '-rotate-90'}
          `}
        >
          <Icon name="Menu" size={22} className="text-textPrimary" />
        </div>
      </button>

      <div
        className={`
          overflow-hidden transition-all duration-300
          ${open ? 'w-[360px] opacity-100' : 'w-0 opacity-0'}
        `}
      >
        <div
          className={`
            bg-white shadow-xl rounded-2xl p-6 h-full transition-transform duration-300
            ${open ? 'translate-x-0' : '-translate-x-10'}
          `}
        >
          <Poppins text="Pedir un Taxi" size="22|26" weight="semibold" />

          <div className="mt-6 flex flex-col gap-4">

            <div className="flex flex-col">
              <Poppins
                text="Punto de recogida"
                size="14|16"
                color="textSecondary"
                className="mb-1"
              />
              <input
                className="input text-start"
                placeholder="¿Dónde estás?"
              />
            </div>

            <div className="flex flex-col">
              <Poppins
                text="Destino"
                size="14|16"
                color="textSecondary"
                className="mb-1"
              />
              <input
                className="input text-start"
                placeholder="¿A dónde vas?"
              />
            </div>

            <button className="button-primary w-full mt-4">
              <Poppins text="Solicitar Taxi" weight="medium" color="white" />
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}
