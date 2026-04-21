'use client';

import { useTranslations } from 'next-intl';
import TitleComponent from '@/components/common/TitleComponent';
import Poppins from '@/components/ui/Poppins';
import Link from 'next/link';

export default function RegisterPage() {
  const t = useTranslations('auth.register');

  return (
    <section className="py-20">
      <div className="max-w-md mx-auto px-4">
        <TitleComponent align="left" title={t('title')} subtitle={t('subtitle')} />

        <form className="mt-8 flex flex-col gap-6">
          <input type="text" placeholder={t('name')} className="input" />

          <input type="email" placeholder={t('email')} className="input" />

          <input type="password" placeholder={t('password')} className="input" />

          <button className="button-primary w-full">
            <Poppins text={t('button')} tag="span" weight="medium" color="white" />
          </button>
        </form>

        <div className="mt-6 text-center">
          <Poppins text={t('haveAccount')} tag="span" color="textSecondary" />
          <Link href="/login" className="ml-2 text-primary hover:text-primary-light">
            <Poppins text={t('goLogin')} tag="span" weight="medium" />
          </Link>
        </div>
      </div>
    </section>
  );
}
