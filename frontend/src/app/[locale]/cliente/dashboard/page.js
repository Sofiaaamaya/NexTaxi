'use client';

import { useTranslations } from 'next-intl';
import Poppins from '@/components/ui/Poppins';

export default function ClienteDashboard() {
  const t = useTranslations('clienteDashboard');
  return (
    <div className="p-8">
      <Poppins text={t('title')} tag="h1" size="24|32" weight="bold" />
      <Poppins text={t('welcome')} tag="p" size="16|20" color="textSecondary" className="mt-4" />
    </div>
  );
}
