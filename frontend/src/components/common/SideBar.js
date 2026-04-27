'use client';

import { useState, useEffect } from 'react';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import Icon from '../icons/Icon';
import TitleComponent from './TitleComponent';
import { Poppins } from '../ui/Poppins';

export default function Sidebar() {
  const [open, setOpen] = useState(true);
  const [activeItem, setActiveItem] = useState('dashboard');
  const t = useTranslations('sidebar');

  const items = [
    { key: 'dashboard', icon: 'LayoutDashboard' },
    { key: 'drivers', icon: 'Car' },
    { key: 'users', icon: 'Users' },
  ];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) setOpen(false);
      else setOpen(true);
    };

    handleResize(); // Ejecutar al cargar la página
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <aside
      className={clsx(
        'fixed left-0 top-0 h-screen z-50 transition-all duration-300 flex flex-col border-r border-gray-200 bg-white shadow-sm',
        open ? 'w-64' : 'w-20'
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        {open && <Poppins text="NexTaxi" size="18|22" weight="semibold" color="textPrimary" />}

        {/* Botón flecha */}
        <button
          onClick={() => setOpen(!open)}
          className="p-2 rounded-md hover:bg-gray-100 transition"
        >
          <Icon name={open ? 'ChevronLeft' : 'ChevronRight'} className="text-gray-600" />
        </button>
      </div>

      {/* Title Section */}
      {open && (
        <div className="px-4">
          <TitleComponent
            eyebrow={t('menu')}
            title={t('navigation')}
            subtitle={t('subtitle')}
            align="left"
          />
        </div>
      )}

      {/* Menu */}
      <nav className="flex flex-col gap-2 px-2 mt-2">
        {items.map((item) => {
          const isActive = activeItem === item.key;

          return (
            <div
              key={item.key}
              onClick={() => setActiveItem(item.key)}
              className={clsx(
                'flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200',
                isActive
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-text-secondary hover:bg-primary-light hover:text-white'
              )}
            >
              <Icon name={item.icon} />

              {open && <Poppins text={t(item.key)} size="16|16" weight="medium" color="inherit" />}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
