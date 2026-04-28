'use client';

import { useLocale, useTranslations } from 'next-intl';
import clsx from 'clsx';
import SidebarItem from './SidebarItem';
import Icon from '../../icons/Icon';
import Poppins from '../../ui/Poppins';
import { ADMIN_NAV_ITEMS } from '@/lib/constants/adminNav';

export default function Sidebar({ open, setOpen }) {
  const t = useTranslations('sidebar');
  const locale = useLocale();

  return (
    <aside
      className={clsx(
        'fixed left-0 top-0 h-screen z-50 transition-all duration-300 flex flex-col border-r border-gray-200 bg-white shadow-sm',
        open ? 'w-64 translate-x-0' : 'w-20 lg:translate-x-0 -translate-x-full'
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 mb-4">
        {open && (
          <Poppins text="NexTaxi" size="18|22" weight="semibold" color="textPrimary" />
        )}
        <button
          onClick={() => setOpen(!open)}
          className="p-2 rounded-md hover:bg-gray-100 transition"
        >
          <Icon name={open ? 'ChevronLeft' : 'ChevronRight'} className="text-gray-600" />
        </button>
      </div>

      {/* Menu */}
      <nav className="flex-1 flex flex-col gap-1 px-2">
        {ADMIN_NAV_ITEMS.map((item) => (
          <SidebarItem
            key={item.key}
            icon={item.icon}
            label={t(item.key)}
            path={`/${locale}${item.path}`}
            open={open}
          />
        ))}
      </nav>

      {/* Footer */}
      <div className="p-2 border-t border-gray-100">
        <SidebarItem
          icon="LogOut"
          label={t('logout')}
          path={`/${locale}/logout`}
          open={open}
        />
      </div>
    </aside>
  );
}
