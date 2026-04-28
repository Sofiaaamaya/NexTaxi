'use client';

import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import Icon from '../../icons/Icon';
import Poppins from '../../ui/Poppins';
import { ADMIN_NAV_ITEMS } from '@/lib/constants/adminNav';

export default function Header({ sidebarOpen, setSidebarOpen }) {
  const locale = useLocale();
  const t = useTranslations('sidebar');
  const pathname = usePathname();

  return (
    <header
      className={clsx(
        'fixed top-0 right-0 z-40 bg-white border-b border-gray-200 px-4 py-2 flex justify-between items-center transition-all duration-300',
        sidebarOpen ? 'left-0 lg:left-64' : 'left-0 lg:left-20'
      )}
    >
      <div className="flex items-center gap-4">
        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setSidebarOpen((prev) => !prev)}
          className="p-2 rounded-md hover:bg-gray-100 lg:hidden"
        >
          <Icon name="Menu" size={28} className="text-gray-600" />
        </button>

        {/* Administrative Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {ADMIN_NAV_ITEMS.map((item) => {
            const fullPath = `/${locale}${item.path}`;
            const isActive = pathname === fullPath || pathname.startsWith(`${fullPath}/`);

            return (
              <Link
                key={item.key}
                href={fullPath}
                className={clsx(
                  'px-4 py-2 rounded-md transition-all duration-200 flex items-center gap-2',
                  isActive
                    ? 'bg-primary/10 text-primary font-semibold'
                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
                )}
              >
                <Icon name={item.icon} size={18} />
                <Poppins
                  text={t(item.key)}
                  size="14|14"
                  color="inherit"
                  weight={isActive ? 'semibold' : 'medium'}
                />
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="flex items-center gap-3">
        <button className="p-2 rounded-full hover:bg-gray-100 transition relative text-gray-500">
          <Icon name="Search" size={20} />
        </button>

        <button className="p-2 rounded-full hover:bg-gray-100 transition relative text-gray-500">
          <Icon name="Bell" size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>

        <div className="h-8 w-[1px] bg-gray-200 mx-2 hidden sm:block"></div>

        <Link
          href={`/${locale}/admin/perfil`}
          className="flex items-center gap-2 p-1 pr-2 rounded-full hover:bg-gray-100 transition"
        >
          <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center shadow-sm">
            <Icon name="User" size={18} />
          </div>
          <div className="hidden sm:block">
            <Poppins text="Admin" size="14|14" weight="semibold" />
          </div>
        </Link>
      </div>
    </header>
  );
}
