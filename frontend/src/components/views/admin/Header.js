'use client';

import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import Icon from '../../icons/Icon';
import Poppins from '../../ui/Poppins';
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';

export default function Header({ setSidebarOpen }) {
  const t = useTranslations('common');
  const locale = useLocale();
  const { user } = useAuth();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-white border-b border-gray-100 px-6 flex justify-between items-center">
      <div className="flex items-center gap-4">
        <button
          onClick={() => setSidebarOpen((prev) => !prev)}
          className="p-2 rounded-xl hover:bg-gray-50 transition-colors hidden lg:block"
        >
          <Icon name="Menu" size={24} className="text-gray-600" />
        </button>

        {/* LOGO */}
        <Link
          href={`/${locale}/${user?.rol === 'gerente' ? 'gerente' : 'admin'}/dashboard`}
          className="flex items-center gap-3"
        >
          <div className="w-9 h-9 bg-[#1e3a8a] rounded-lg flex items-center justify-center shadow-lg shadow-primary/20">
            <Poppins text="NT" size="14|14" weight="bold" color="white" />
          </div>
          <div className="flex flex-col -gap-1">
            <Poppins text="NexTaxi" size="18|20" weight="bold" color="textPrimary" />
            <Poppins
              text={user?.rol === 'gerente' ? 'Gerencia' : 'Administración'}
              size="10|10"
              weight="bold"
              className="text-primary uppercase tracking-[0.2em] hidden lg:block"
            />
          </div>
        </Link>
      </div>

      <div className="flex items-center gap-4">
        {/* Notifications */}
        <button className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-gray-50 transition relative text-gray-400 hover:text-primary">
          <Icon name="Bell" size={22} />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>

        <div className="h-6 w-[1px] bg-gray-100 mx-1"></div>

        {/* Profile Info (Right Side) */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:block text-right">
            <Poppins
              text={user?.nombre || (user?.rol === 'gerente' ? 'Gerente' : 'Administrador')}
              size="14|14"
              weight="semibold"
            />
            <Poppins text={t('managementPanel')} size="12|12" color="gray-400" />
          </div>
          <div className="w-10 h-10 rounded-xl bg-gray-100 overflow-hidden relative border-2 border-white shadow-sm">
            <Image src="/images/icono_avatar.webp" alt="perfil" fill className="object-cover" />
          </div>
        </div>
      </div>
    </header>
  );
}
