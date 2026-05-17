'use client';

import { useState, useEffect, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import DriversPage from '@/components/views/admin/DriversPage';
import Poppins from '@/components/ui/Poppins';
import Icon from '@/components/icons/Icon';
import { apiFetch } from '@/lib/api';
import clsx from 'clsx';

export default function GerenteDashboardPage() {
  const t = useTranslations('adminDashboard');
  const [isLoading, setIsLoading] = useState(false);
  const [statsData, setStatsData] = useState({
    totalDrivers: '...',
    activeDrivers: '...',
    totalUsers: '1,240',
    totalTrips: '45',
  });

  const fetchStats = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await apiFetch('/admin/stats');
      if (data && !data.error) {
        setStatsData((prev) => ({
          ...prev,
          totalDrivers: data.total_conductores?.toString() || '0',
          activeDrivers: data.conductores_activos?.toString() || '0',
          totalUsers: data.total_usuarios?.toLocaleString() || prev.totalUsers,
          totalTrips: data.total_viajes?.toString() || prev.totalTrips,
        }));
      }
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  const stats = [
    {
      key: 'totalDrivers',
      value: statsData.totalDrivers,
      icon: 'Car',
      color: 'text-blue-600',
      bg: 'bg-blue-50',
    },
    {
      key: 'activeDrivers',
      value: statsData.activeDrivers,
      icon: 'CheckCircle',
      color: 'text-green-600',
      bg: 'bg-green-50',
    },
    {
      key: 'totalUsers',
      value: statsData.totalUsers,
      icon: 'Users',
      color: 'text-purple-600',
      bg: 'bg-purple-50',
    },
    {
      key: 'totalTrips',
      value: statsData.totalTrips,
      icon: 'MapPin',
      color: 'text-orange-600',
      bg: 'bg-orange-50',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <Poppins text={t('welcome')} size="24|32" weight="bold" color="textPrimary" />
          <Poppins text={t('title')} size="16|16" weight="medium" color="textSecondary" />
        </div>
        <button
          onClick={fetchStats}
          disabled={isLoading}
          className={clsx(
            'p-2 text-gray-400 hover:text-primary transition-colors',
            isLoading && 'cursor-not-allowed opacity-50'
          )}
          title="Actualizar estadísticas"
        >
          {isLoading ? (
            <Icon name="Loader" size={20} className="animate-spin" />
          ) : (
            <Icon name="RefreshCw" size={20} />
          )}
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.key}
            className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow"
          >
            <div
              className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-xl flex items-center justify-center`}
            >
              <Icon name={stat.icon} size={24} />
            </div>
            <div>
              <Poppins text={stat.value} size="20|24" weight="bold" color="textPrimary" />
              <Poppins
                text={t(`stats.${stat.key}`)}
                size="13|14"
                weight="medium"
                color="textSecondary"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <Poppins text={t('driversOverview')} size="18|22" weight="semibold" />
          <div className="flex gap-2">
            <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-bold rounded-full uppercase tracking-wider">
              Real-time Sync
            </span>
          </div>
        </div>
        <div className="p-0">
          <DriversPage onDataChange={fetchStats} />
        </div>
      </div>
    </div>
  );
}
