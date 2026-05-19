'use client';

import DriversPage from '@/components/views/admin/DriversPage';
import { useTranslations } from 'next-intl';

export default function DashboardPage() {
  const t = useTranslations('drivers');
  return (
    <div className="flex">
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-4">{t('title')}</h1>
        <DriversPage />
      </main>
    </div>
  );
}
