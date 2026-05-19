'use client';

import Poppins from '@/components/ui/Poppins';
import { useTranslations } from 'next-intl';

export default function DriversWeeklyChart() {
  const t = useTranslations('common');
  return (
    <div className="p-6 border border-border rounded-xl bg-white shadow-sm">
      <Poppins text={t('weeklyActivity')} size="18|22" weight="semibold" className="mb-4" />

      <div className="h-64 rounded-lg flex items-center justify-center bg-gray-50 text-gray-400">
        <Poppins text={t('weeklyChartPlaceholder')} size="16|20" color="textSecondary" />
      </div>
    </div>
  );
}
