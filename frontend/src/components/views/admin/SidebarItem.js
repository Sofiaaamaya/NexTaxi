'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import Icon from '../../icons/Icon';
import Poppins from '../../ui/Poppins';

export default function SidebarItem({ icon, label, path, open }) {
  const pathname = usePathname();
  const isActive = pathname === path || pathname.startsWith(`${path}/`);

  return (
    <Link
      href={path}
      className={clsx(
        'flex items-center gap-3 px-3 py-2 my-1 rounded-lg transition-all duration-200',
        isActive
          ? 'bg-primary text-white shadow-sm'
          : 'text-gray-600 hover:bg-gray-100'
      )}
    >
      <Icon 
        name={icon} 
        size={24} 
        className={clsx(isActive ? 'text-white' : 'text-primary')} 
      />

      {open && (
        <Poppins 
          text={label} 
          size="16|16" 
          color="inherit" 
          weight="medium" 
          className="whitespace-nowrap" 
        />
      )}
    </Link>
  );
}
