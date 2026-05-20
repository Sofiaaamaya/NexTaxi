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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTimeout(() => setMounted(true), 0);
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (
    pathname.includes('/admin') ||
    pathname.includes('/gerente') ||
    pathname.includes('/conductor') ||
    pathname.includes('/usuario')
  ) {
    return null;
  }

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
            const isActive =
              pathname === linkPath || (item === 'home' && pathname === `/${currentLocale}`);

            return (
              <Link key={item} href={linkPath}>
                <Poppins
                  text={t(`nav.${item}`)}
                  tag="span"
                  size="14|18"
                  color={isActive ? 'primary' : 'textSecondary'}
                  weight={isActive ? 'semibold' : 'medium'}
                  className={`px-3 py-1 rounded-md transition-all duration-200 ${
                    isActive
                      ? 'bg-primary/10 text-primary'
                      : 'hover:text-primary hover:bg-primary/5'
                  }`}
                />
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-3 relative">
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

          {mounted && user ? (
            <div className="hidden md:flex items-center gap-2">
              <div className="relative group">
                <div className="flex items-center gap-3 px-3 py-1.5 rounded-xl bg-gray-50 border border-border cursor-pointer hover:bg-gray-100 transition-all">
                  <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                    <Icon name="User" size={18} />
                  </div>
                  <Poppins
                    text={user.nombre || user.name}
                    tag="span"
                    size="14|16"
                    weight="semibold"
                  />
                  <Icon
                    name="ChevronDown"
                    size={14}
                    className="text-gray-400 group-hover:text-primary transition-colors"
                  />
                </div>

                {/* DROPDOWN USER */}
                <div className="absolute right-0 mt-1 w-48 bg-white border border-border rounded-xl shadow-xl py-2 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 translate-y-2 group-hover:translate-y-0">
                  <Link href={`/${currentLocale}/${user.rol}/dashboard`}>
                    <div className="px-4 py-2 hover:bg-gray-50 flex items-center gap-2 transition-colors">
                      <Icon name="LayoutDashboard" size={16} className="text-gray-400" />
                      <Poppins text="Dashboard" size="14" />
                    </div>
                  </Link>
                  <Link href={`/${currentLocale}/${user.rol}/mis-viajes`}>
                    <div className="px-4 py-2 hover:bg-gray-50 flex items-center gap-2 transition-colors">
                      <Icon name="History" size={16} className="text-gray-400" />
                      <Poppins text={t('nav.misViajes') || 'Mis Viajes'} size="14" />
                    </div>
                  </Link>
                  <div className="border-t border-gray-100 my-1"></div>
                  <button
                    onClick={logout}
                    className="w-full text-left px-4 py-2 hover:bg-red-50 text-red-500 flex items-center gap-2 transition-colors"
                  >
                    <Icon name="LogOut" size={16} />
                    <Poppins text={t('auth.logout')} size="14" />
                  </button>
                </div>
              </div>
            </div>
          ) : (
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
                  <Poppins
                    text={t('auth.register')}
                    tag="span"
                    size="14|18"
                    weight="medium"
                    color="white"
                  />
                </button>
              </Link>
            </div>
          )}

          {/* HAMBURGER MENU  RESPONSICVE*/}
          <button
            className="md:hidden p-2 rounded-lg bg-white border border-border"
            onClick={() => setOpenMenu(!openMenu)}
            aria-label={openMenu ? t('aria.closeMenu') : t('aria.openMenu')}
            aria-expanded={openMenu}
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
                <Link
                  className="self-center"
                  key={item}
                  href={linkPath}
                  onClick={() => setOpenMenu(false)}
                >
                  <Poppins
                    text={t(`nav.${item}`)}
                    size="16|20"
                    className="py-2 px-2 rounded-md hover:bg-primary/10 transition"
                  />
                </Link>
              );
            })}

            <div className="border-t border-border pt-3 mt-2">
              {mounted && user ? (
                <>
                  <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-gray-50 border border-border">
                    <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                      <Icon name="User" size={18} />
                    </div>
                    <Poppins text={user.nombre || user.name} size="16|20" weight="semibold" />
                  </div>

                  <Link
                    href={`/${currentLocale}/${user.rol}/dashboard`}
                    onClick={() => setOpenMenu(false)}
                  >
                    <div className="w-full py-3 px-4 mt-2 flex items-center gap-3 hover:bg-gray-50 rounded-xl transition">
                      <Icon name="LayoutDashboard" size={20} className="text-gray-400" />
                      <Poppins text="Dashboard" size="16" />
                    </div>
                  </Link>
                  <Link
                    href={`/${currentLocale}/${user.rol}/mis-viajes`}
                    onClick={() => setOpenMenu(false)}
                  >
                    <div className="w-full py-3 px-4 flex items-center gap-3 hover:bg-gray-50 rounded-xl transition">
                      <Icon name="History" size={20} className="text-gray-400" />
                      <Poppins text={t('nav.misViajes') || 'Mis Viajes'} size="16" />
                    </div>
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setOpenMenu(false);
                    }}
                    className="w-full py-3 mt-4 text-center rounded-xl bg-red-500 text-white hover:bg-red-600 transition shadow-lg shadow-red-500/20"
                  >
                    <Poppins text={t('auth.logout')} size="16" weight="bold" color="white" />
                  </button>
                </>
              ) : (
                <>
                  <Link href={`/${currentLocale}/login`} onClick={() => setOpenMenu(false)}>
                    <div className="w-full py-2 text-center rounded-lg bg-white border border-border hover:bg-slate-100 transition mb-1">
                      <Poppins text={t('auth.login')} size="16|20" color="textPrimary" />
                    </div>
                  </Link>

                  <Link
                    href={`/${currentLocale}/register/usuario`}
                    onClick={() => setOpenMenu(false)}
                  >
                    <div className="w-full py-2 text-center rounded-lg bg-primary text-white hover:bg-primary-light transition">
                      <Poppins
                        text={t('auth.register')}
                        size="16|20"
                        weight="medium"
                        color="white"
                      />
                    </div>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
