'use client';

import { useTranslations } from 'next-intl';
import DriversPage from '@/components/views/admin/DriversPage';
import Poppins from '@/components/ui/Poppins';
import Icon from '@/components/icons/Icon';

export default function DashboardPage() {
  const t = useTranslations('adminDashboard');

  const stats = [
    { key: 'totalDrivers', value: '24', icon: 'Car', color: 'text-blue-600', bg: 'bg-blue-50' },
    {
      key: 'activeDrivers',
      value: '18',
      icon: 'CheckCircle',
      color: 'text-green-600',
      bg: 'bg-green-50',
    },
    {
      key: 'totalUsers',
      value: '1,240',
      icon: 'Users',
      color: 'text-purple-600',
      bg: 'bg-purple-50',
    },
    {
      key: 'totalTrips',
      value: '45',
      icon: 'MapPin',
      color: 'text-orange-600',
      bg: 'bg-orange-50',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <Poppins text={t('welcome')} size="24|32" weight="bold" color="textPrimary" />
        <Poppins text={t('title')} size="16|16" weight="medium" color="textSecondary" />
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.key}
            className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4"
          >
            <div
              className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-lg flex items-center justify-center`}
            >
              <Icon name={stat.icon} size={24} />
            </div>
            <div>
              <Poppins text={stat.value} size="20|24" weight="bold" color="textPrimary" />
              <Poppins
                text={t(`stats.${stat.key}`)}
                size="14|14"
                weight="medium"
                color="textSecondary"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <Poppins text="Vista General de Conductores" size="18|22" weight="semibold" />
        </div>
        <div className="p-0">
          <DriversPage />
        </div>
      </div>
    </div>
  );
}
