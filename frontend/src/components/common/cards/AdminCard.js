'use client';

import Cards from './Cards';
import Poppins from '@/components/ui/Poppins';

export default function AdminStatCard({ icon, label, value }) {
  return (
    <Cards
      icon={icon}
      title={label}
      description={
        `<span style="font-size: 32px; font-weight: 600;">${value}</span>`
      }
    />
  );
}
