'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import clsx from 'clsx';
import SidebarItem from '../admin/SidebarItem';
import Icon from '../../icons/Icon';
import Poppins from '../../ui/Poppins';
import Image from 'next/image';
import {
  CONDUCTOR_NAV_ITEMS,
  USUARIO_NAV_ITEMS,
  ADMIN_NAV_ITEMS,
  GERENTE_NAV_ITEMS
} from '@/lib/constants/adminNav';
import { useAuth } from '@/context/AuthContext';
import { useEffect, useState } from 'react';

export default function SidebarDashboard({ open, setOpen }) {
  const t = useTranslations('sidebar');
  const locale = useLocale();
  const router = useRouter();
  const { user, logout } = useAuth();

  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  if (!hydrated) return null;

  const handleLogout = () => {
    logout();
    router.push(`/${locale}/home`);
  };

  const menuByRole = {
    usuario: USUARIO_NAV_ITEMS,
    conductor: CONDUCTOR_NAV_ITEMS,
    administrador: ADMIN_NAV_ITEMS,
    gerente: GERENTE_NAV_ITEMS
  };

  const navItems = menuByRole[user?.rol] || menuByRole.usuario;

  const roleLabel = {
    usuario: 'Usuario',
    conductor: 'Conductor',
    administrador: 'Administrador',
    gerente: 'Gerente'
  };

  const defaultEmail = {
    usuario: 'usuario@nextaxi.com',
    conductor: 'conductor@nextaxi.com',
    administrador: 'admin@nextaxi.com',
    gerente: 'gerente@nextaxi.com'
  };

  const isSidebarExpanded = open;

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={clsx(
          'fixed left-0 top-16 bottom-0 z-40 transition-all duration-300 flex flex-col border-r border-gray-100 bg-white shadow-xl shadow-gray-200/50',
          open
            ? 'w-64 translate-x-0'
            : '-translate-x-full lg:translate-x-0 lg:w-20'
        )}
      >
        <nav className="flex-1 flex flex-col gap-1.5 px-3 py-6 overflow-y-auto custom-scrollbar">
          {navItems.map((item) => (
            <SidebarItem
              key={item.key}
              icon={item.icon}
              label={t(item.key)}
              path={`/${locale}${item.path}`}
              open={isSidebarExpanded}
            />
          ))}
        </nav>

        <div className="p-4 border-t border-gray-100 bg-gray-50/50">
          <div
            className={clsx(
              "flex items-center gap-3 p-2 rounded-2xl bg-white border border-gray-100 shadow-sm transition-all duration-300",
              !isSidebarExpanded ? "justify-center" : "lg:justify-start justify-center"
            )}
          >
            <div className="w-10 h-10 rounded-xl bg-gray-100 overflow-hidden relative flex-shrink-0 border-2 border-white shadow-sm">
              <Image src="/images/imagen_perfil.webp" alt="perfil" fill className="object-cover" />
            </div>

            {isSidebarExpanded && (
              <div className="flex flex-1 min-w-0 flex-col">
                <Poppins
                  text={user?.nombre || roleLabel[user?.rol]}
                  size="13|14"
                  weight="bold"
                  className="truncate"
                />
                <Poppins
                  text={user?.email || defaultEmail[user?.rol]}
                  size="11|12"
                  color="gray-400"
                  className="truncate"
                />
              </div>
            )}
          </div>

          <button
            onClick={handleLogout}
            className={clsx(
              "mt-3 w-full flex items-center gap-3 p-3 rounded-xl text-red-500 hover:bg-red-50 transition-all group",
              !isSidebarExpanded ? "justify-center" : "lg:justify-start justify-center"
            )}
          >
            <Icon name="LogOut" size={20} className="group-hover:scale-110 transition-transform" />
            {isSidebarExpanded && (
              <Poppins text={t('logout')} size="14|14" weight="semibold" />
            )}
          </button>
        </div>
      </aside>
    </>
  );
}
