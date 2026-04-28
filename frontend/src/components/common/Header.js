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
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Detectar locale actual
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
      sticky top-0 z-50 w-full py-4 transition-all duration-300
      ${isScrolled ? 'bg-surface/70 backdrop-blur-lg shadow-sm' : 'bg-surface shadow-none'}
      border-b border-border
    `}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4">
        {/* IZQUIERDA: LOGO */}
        <div className="flex items-center gap-2 md:flex px-4 py-2 bg-white/30 backdrop-blur-md rounded-lg">
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

        {/* CENTRO: LINKS */}
        <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-white/30 backdrop-blur-md rounded-lg">
          {['home', 'reserva', 'contacto', 'nosotros'].map((item) => (
            <Link key={item} href={`/${currentLocale}/${item === 'home' ? '' : item}`}>
              <Poppins
                text={t(`nav.${item}`)}
                tag="span"
                size="14|18"
                color="textSecondary"
                className="px-3 py-1 rounded-md hover:text-primary hover:bg-primary/5 transition-all duration-200"
              />
            </Link>
          ))}
        </div>

        {/* DERECHA: IDIOMA + AUTH */}
        <div className="flex items-center gap-4 relative">
          <div className="relative">
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

          {!user ? (
            <>
              <Link href={`/${currentLocale}/login`}>
                <Poppins
                  text={t('auth.login')}
                  tag="span"
                  size="16|20"
                  color="textSecondary"
                  className="px-5 py-2 rounded-lg bg-white border border-border hover:bg-slate-100 transition"
                />
              </Link>

              <Link href={`/${currentLocale}/register/usuario`}>
                <button className="px-5 py-2 rounded-lg bg-primary text-white hover:bg-primary-light transition">
                  <Poppins
                    text={t('auth.register')}
                    tag="span"
                    size="16|20"
                    weight="medium"
                    color="white"
                  />
                </button>
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-3">
              <Poppins text={user.name} tag="span" size="16|20" color="textPrimary" />
              <button
                onClick={logout}
                className="px-3 py-1 rounded-md border border-border hover:bg-background transition"
              >
                <Poppins text={t('auth.logout')} tag="span" size="14|16" />
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
