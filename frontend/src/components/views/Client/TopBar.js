'use client';

import { useAuth } from '@/context/AuthContext';
import Poppins from '@/components/ui/Poppins';

export default function Topbar() {
  const { user } = useAuth();

  return (
    <header className="w-full h-16 bg-white border-b border-border flex items-center justify-end px-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center">
          {user?.nombre?.[0] ?? 'U'}
        </div>
        <div className="flex flex-col">
          <Poppins text={user?.nombre ?? 'Usuario'} weight="medium" />
          <Poppins text="Cliente" size="12|14" color="textSecondary" />
        </div>
      </div>
    </header>
  );
}
