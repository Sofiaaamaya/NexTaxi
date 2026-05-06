'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import Poppins from '@/components/ui/Poppins';
import { useAuth } from '@/context/AuthContext';
import Icon from '@/components/icons/Icon';
import { useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';

export default function Header() {
  const { user, logout } = useAuth();
  const t = useTranslations('Header');
  const pathname = usePathname();
  const router = useRouter();

  const [openLang, setOpenLang] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (pathname.includes('/admin') || pathname.includes('/gerente')) return null;

  const segments = pathname.split('/').filter(Boolean);
  const currentLocale = segments[0] || 'es';
  const restPath = '/' + segments.slice(1).join('/');

  const changeLocale = (locale) => {
    router.push(`/${locale}${restPath === '/' ? '' : restPath}`);
    setOpenLang(false);
  };

  return (
    <nav
      className={`
        sticky top-0 z-50 w-full py-3 transition-all duration-300
        ${isScrolled ? 'bg-surface/70 backdrop-blur-lg shadow-sm' : 'bg-surface'}
        border-b border-border
      `}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4">

        {/* LOGO */}
        <div className="flex items-center gap-2 px-3 py-1.5 bg-white/30 backdrop-blur-md rounded-lg">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-semibold">
            NT
          </div>

          <Link href="/" className="inline-block">
            <Poppins
              text="NexTaxi"
              tag="span"
              size="18|22"
              weight="semibold"
              color="textPrimary"
              className="cursor-pointer hover:text-primary transition"
            />
          </Link>
        </div>

        {/* NAV DESKTOP */}
        <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-white/30 backdrop-blur-md rounded-lg">
          {['home', 'reserva', 'contacto', 'nosotros'].map((item) => {
            const linkPath = `/${currentLocale}/${item === 'home' ? 'home' : item}`;
            const isActive = pathname === linkPath || (item === 'home' && pathname === `/${currentLocale}`);

            return (
              <Link key={item} href={linkPath}>
                <Poppins
                  text={t(`nav.${item}`)}
                  tag="span"
                  size="14|18"
                  color={isActive ? 'primary' : 'textSecondary'}
                  weight={isActive ? 'semibold' : 'medium'}
                  className={`px-3 py-1 rounded-md transition-all duration-200 ${
                    isActive ? 'bg-primary/10 text-primary' : 'hover:text-primary hover:bg-primary/5'
                  }`}
                />
              </Link>
            );
          })}
        </div>

        {/* ACTIONS */}
        <div className="flex items-center gap-3 relative">

          {/* LANG SELECTOR */}
          <div className="relative hidden sm:block">
            <button
              onClick={() => setOpenLang(!openLang)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-md border border-border bg-surface hover:bg-background transition text-sm uppercase"
            >
              <Poppins text={currentLocale} size="14|16" />
              <Icon name="ChevronDown" size={16} className="text-textSecondary" />
            </button>

            {openLang && (
              <div className="absolute right-0 mt-2 w-36 bg-white border border-border rounded-lg shadow-lg py-2 z-50 animate-fadeIn">
                {['es', 'en'].map((lang) => (
                  <button
                    key={lang}
                    onClick={() => changeLocale(lang)}
                    className="w-full text-left px-4 py-2 hover:bg-slate-100 transition"
                  >
                    <Poppins text={t(`languages.${lang}`)} size="14|16" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* BOTONES LOGIN / REGISTER (DESKTOP) */}
          {!user ? (
            <div className="hidden md:flex items-center gap-2">
              <Link href={`/${currentLocale}/login`}>
                <Poppins
                  text={t('auth.login')}
                  tag="span"
                  size="14|18"
                  color="textPrimary"
                  className="px-4 py-2 rounded-lg bg-white border border-border hover:bg-slate-100 transition"
                />
              </Link>

              <Link href={`/${currentLocale}/register/usuario`}>
                <button className="px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary-light transition">
                  <Poppins text={t('auth.register')} tag="span" size="14|18" weight="medium" color='white' />
                </button>
              </Link>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-2">
              <div className="flex items-center gap-3 px-3 py-1.5 rounded-xl bg-gray-50 border border-border">
                <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                  <Icon name="User" size={18} />
                </div>
                <Poppins text={user.nombre || user.name} tag="span" size="14|16" weight="semibold" />
              </div>

              <button
                onClick={logout}
                className="p-2.5 rounded-xl border border-border bg-white text-red-500 hover:bg-red-50 hover:border-red-100 transition-all duration-200 shadow-sm"
              >
                <Icon name="LogOut" size={20} />
              </button>
            </div>
          )}

          {/* HAMBURGER MENU (MOBILE) */}
          <button
            className="md:hidden p-2 rounded-lg bg-white border border-border"
            onClick={() => setOpenMenu(!openMenu)}
          >
            <Icon name={openMenu ? 'X' : 'Menu'} size={22} />
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {openMenu && (
        <div className="md:hidden bg-white border-t border-border shadow-md animate-fadeIn">
          <div className="flex flex-col p-4 gap-3">

            {['home', 'reserva', 'contacto', 'nosotros'].map((item) => {
              const linkPath = `/${currentLocale}/${item === 'home' ? 'home' : item}`;
              return (
                <Link className="self-center" key={item} href={linkPath} onClick={() => setOpenMenu(false)}>
                  <Poppins
                    text={t(`nav.${item}`)}
                    size="16|20"
                    className="py-2 px-2 rounded-md hover:bg-primary/10 transition"
                  />
                </Link>
              );
            })}

            <div className="border-t border-border pt-3 mt-2">
              {!user ? (
                <>
                  <Link href={`/${currentLocale}/login`} onClick={() => setOpenMenu(false)}>
                    <div className="w-full py-2 text-center rounded-lg bg-white border border-border hover:bg-slate-100 transition mb-1">
                      <Poppins text={t('auth.login')} size="16|20" color='textPrimary' />
                    </div>
                  </Link>

                  <Link href={`/${currentLocale}/register/usuario`} onClick={() => setOpenMenu(false)}>
                    <div className="w-full py-2 text-center rounded-lg bg-primary text-white hover:bg-primary-light transition">
                      <Poppins text={t('auth.register')} size="16|20" weight="medium" color='white'/>
                    </div>
                  </Link>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-gray-50 border border-border">
                    <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                      <Icon name="User" size={18} />
                    </div>
                    <Poppins text={user.nombre || user.name} size="16|20" weight="semibold" />
                  </div>

                  <button
                    onClick={() => {
                      logout();
                      setOpenMenu(false);
                    }}
                    className="w-full py-2 mt-2 text-center rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
                  >
                    <Poppins text={t('auth.logout')} size="16|20" />
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
