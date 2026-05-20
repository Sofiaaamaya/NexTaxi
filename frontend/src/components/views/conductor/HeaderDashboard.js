'use client';

import { useState, useEffect } from 'react';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import Icon from '../../icons/Icon';
import Poppins from '../../ui/Poppins';
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';
import { getRolePath } from '@/lib/auth';

export default function HeaderDashboard({ setSidebarOpen }) {
  const locale = useLocale();
  const { user } = useAuth();

  const roleConfig = {
    usuario: {
      label: 'Usuario',
      subtitle: 'User Panel',
      dashboard: `/${locale}/usuario/dashboard`,
    },
    conductor: {
      label: 'Conductor',
      subtitle: 'Driver Panel',
      dashboard: `/${locale}/conductor/dashboard`,
    },
    admin: {
      label: 'Administrador',
      subtitle: 'Admin Panel',
      dashboard: `/${locale}/admin/dashboard`,
    },
    gerente: {
      label: 'Gerente',
      subtitle: 'Manager Panel',
      dashboard: `/${locale}/gerente/dashboard`,
    },
  };

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setTimeout(() => setMounted(true), 0);
  }, []);

  const currentRole =
    mounted && user?.rol
      ? roleConfig[getRolePath(user.rol)] || roleConfig.usuario
      : roleConfig.usuario;

  if (!mounted) return <div className="h-16 bg-white border-b border-gray-100" />;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-white border-b border-gray-100 px-6 flex justify-between items-center">
      <div className="flex items-center gap-4">
        <button
          onClick={() => setSidebarOpen((prev) => !prev)}
          className="p-2 rounded-xl hover:bg-gray-50 transition-colors"
        >
          <Icon name="Menu" size={24} className="text-gray-600" />
        </button>

        <Link href={currentRole.dashboard} className="flex items-center gap-3">
          <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center shadow-lg shadow-primary/20">
            <Poppins text="NT" size="14|14" weight="bold" color="white" />
          </div>

          <div className="flex flex-col">
            <Poppins text="NexTaxi" size="18|20" weight="bold" color="textPrimary" />
            <Poppins
              text={currentRole.label}
              size="10|10"
              weight="bold"
              className="text-primary uppercase tracking-[0.2em] hidden lg:block"
            />
          </div>
        </Link>
      </div>

      <div className="flex items-center gap-4">
        <button className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-gray-50 transition relative text-gray-400 hover:text-primary">
          <Icon name="Bell" size={22} />
        </button>

        <div className="h-6 w-[1px] bg-gray-100 mx-1"></div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:block text-right">
            <Poppins text={user?.nombre || currentRole.label} size="14|14" weight="semibold" />
            <Poppins text={currentRole.subtitle} size="12|12" color="gray-400" />
          </div>

          <div className="w-10 h-10 rounded-xl bg-gray-100 overflow-hidden relative border-2 border-white shadow-sm">
            <Image
              src={
                user?.foto_perfil
                  ? `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/storage/${user.foto_perfil}`
                  : '/images/icono_avatar.webp'
              }
              alt="perfil"
              fill
              sizes="40px"
              className="object-cover"
              unoptimized={!!user?.foto_perfil}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
