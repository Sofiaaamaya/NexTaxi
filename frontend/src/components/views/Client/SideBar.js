'use client';

import Link from 'next/link';
import Poppins from '@/components/ui/Poppins';
import Icon from '@/components/icons/Icon';

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r border-border flex flex-col p-6">
      <div className="flex items-center gap-2 mb-10">
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-semibold">
          NT
        </div>
        <Poppins text="NexTaxi" size="18|22" weight="semibold" />
      </div>

      <nav className="flex flex-col gap-6">
        <Link href="#" className="flex items-center gap-3 text-textPrimary hover:text-primary">
          <Icon name="Home" size={20} />
          <Poppins text="Dashboard" />
        </Link>

        <Link href="#" className="flex items-center gap-3 text-textPrimary hover:text-primary">
          <Icon name="Car" size={20} />
          <Poppins text="Mis Viajes" />
        </Link>

        <Link href="#" className="flex items-center gap-3 text-textPrimary hover:text-primary">
          <Icon name="Wallet" size={20} />
          <Poppins text="Pagos" />
        </Link>

        <Link href="#" className="flex items-center gap-3 text-textPrimary hover:text-primary">
          <Icon name="User" size={20} />
          <Poppins text="Perfil" />
        </Link>
      </nav>

      <div className="mt-auto pt-10">
        <Link href="#" className="flex items-center gap-3 text-textSecondary hover:text-primary">
          <Icon name="HelpCircle" size={20} />
          <Poppins text="Centro de Ayuda" />
        </Link>
      </div>
    </aside>
  );
}
