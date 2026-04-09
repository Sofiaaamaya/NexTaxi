'use client';

import Link from 'next/link';
import Poppins from '../ui/Poppins';
import { useAuth } from '../../context/AuthContext';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import Icon from '../icons/Icon';

export default function Header() {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const [openLang, setOpenLang] = useState(false);

  // Detectar locale actual
  const segments = pathname.split('/').filter(Boolean);
  const currentLocale = segments[0] || 'es';
  const restPath = '/' + segments.slice(1).join('/');

  const changeLocale = (locale) => {
    window.location.href = `/${locale}${restPath === '/' ? '' : restPath}`;
  };

  return (
    <nav className="w-full py-4 bg-surface border-b border-border">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4">
        {/* IZQUIERDA: LOGO */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-semibold">
            NT
          </div>
          <Poppins text="NexTaxi" tag="span" size="18|22" weight="semibold" color="textPrimary" />
        </div>

        {/* CENTRO: LINKS */}
        <div className="hidden md:flex items-center gap-8">
          <Link href={`/${currentLocale}/`}>
            <Poppins
              text="Home"
              tag="span"
              size="16|20"
              color="textSecondary"
              className="hover:text-primary transition-colors"
            />
          </Link>

          <Link href={`/${currentLocale}/services`}>
            <Poppins
              text="Services"
              tag="span"
              size="16|20"
              color="textSecondary"
              className="hover:text-primary transition-colors"
            />
          </Link>

          <Link href={`/${currentLocale}/contact`}>
            <Poppins
              text="Contact"
              tag="span"
              size="16|20"
              color="textSecondary"
              className="hover:text-primary transition-colors"
            />
          </Link>
        </div>

        {/* DERECHA: IDIOMA + AUTH */}
        <div className="flex items-center gap-4 relative">
          {/* Dropdown de idioma */}
          <div className="relative">
            <button
              onClick={() => setOpenLang(!openLang)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-md border border-border bg-surface hover:bg-background transition text-sm"
            >
              <Poppins text={currentLocale === 'es' ? 'ES' : 'EN'} size="14|16" />
              <Icon name="ChevronDown" size={16} className="text-textSecondary" />
            </button>

            {openLang && (
              <div className="absolute right-0 mt-2 w-36 bg-white border border-border rounded-lg shadow-lg py-2 z-50 animate-fadeIn">
                <button
                  onClick={() => changeLocale('es')}
                  className="w-full text-left px-4 py-2 hover:bg-slate-100 transition"
                >
                  <Poppins text="Español" size="14|16" />
                </button>

                <button
                  onClick={() => changeLocale('en')}
                  className="w-full text-left px-4 py-2 hover:bg-slate-100 transition"
                >
                  <Poppins text="English" size="14|16" />
                </button>
              </div>
            )}
          </div>

          {/* SI NO HAY USUARIO → LOGIN + REGISTER */}
          {!user && (
            <>
              <Link href={`/${currentLocale}/login`}>
                <Poppins
                  text="Login"
                  tag="span"
                  size="16|20"
                  color="textSecondary"
                  className="px-5 py-2 rounded-lg bg-white border border-border hover:bg-slate-100 transition"
                />
              </Link>

              <Link href={`/${currentLocale}/register`}>
                <button className="px-5 py-2 rounded-lg bg-primary text-white hover:bg-primary-light transition">
                  <Poppins text="Register" tag="span" size="16|20" weight="medium" color="white" />
                </button>
              </Link>
            </>
          )}

          {/* SI HAY USUARIO → NOMBRE + LOGOUT */}
          {user && (
            <div className="flex items-center gap-3">
              <Poppins text={user.name} tag="span" size="16|20" color="textPrimary" />
              <button
                onClick={logout}
                className="px-3 py-1 rounded-md border border-border hover:bg-background transition"
              >
                <Poppins text="Logout" tag="span" size="14|16" />
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
