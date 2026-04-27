'use client';

import Link from 'next/link';
import Poppins from '../ui/Poppins';
import { useTranslations } from 'next-intl';

export default function Footer() {
  const t = useTranslations('footer');

  return (
    <footer className="bg-surface border-t border-border py-16 md:px-6 mt-20">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-center">
        {/* LOGO + DESCRIPTION */}
        <div>
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white font-semibold">
              NT
            </div>
            <Poppins text="NexTaxi" tag="span" size="18|22" weight="semibold" color="textPrimary" />
          </div>

          <Poppins
            text={t('description')}
            tag="p"
            size="14|16"
            color="textSecondary"
            className="max-w-xs mx-auto"
          />
        </div>

        {/* COMPANY */}
        <div>
          <Poppins
            text={t('company.title')}
            tag="h4"
            size="16|20"
            weight="semibold"
            color="textPrimary"
            className="mb-4 tracking-wide"
          />

          <ul className="space-y-2">
            <li>
              <Link href="/nosotros" className="inline-block">
                <Poppins
                  text={t('company.about')}
                  size="14|16"
                  color="textSecondary"
                  className="hover:text-primary transition"
                />
              </Link>
            </li>
            <li>
              <Link href="/contacto" className="inline-block">
                <Poppins
                  text={t('company.contact')}
                  size="14|16"
                  color="textSecondary"
                  className="hover:text-primary transition"
                />
              </Link>
            </li>
          </ul>
        </div>

        {/* LEGAL */}
        <div>
          <Poppins
            text={t('legal.title')}
            tag="h4"
            size="16|20"
            weight="semibold"
            color="textPrimary"
            className="mb-4 tracking-wide"
          />

          <ul className="space-y-2">
            <li>
              <Link href="/politica-privacidad" className="inline-block">
                <Poppins
                  text={t('legal.privacy')}
                  size="14|16"
                  color="textSecondary"
                  className="hover:text-primary transition"
                />
              </Link>
            </li>
            <li>
              <Link href="/terminos-servicio" className="inline-block">
                <Poppins
                  text={t('legal.terms')}
                  size="14|16"
                  color="textSecondary"
                  className="hover:text-primary transition"
                />
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* COPYRIGHT */}
      <div className="mt-12 border-t border-[var(--color-border)] pt-6 text-center">
        <Poppins text={t('copyright')} size="14|16" color="textSecondary" />
      </div>
    </footer>
  );
}
