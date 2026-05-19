'use client';

import { useTranslations } from 'next-intl';
import Cards from '@/components/common/cards/Cards';
import TitleComponent from '@/components/common/TitleComponent';

export default function WhyChooseNexTaxi() {
  const t = useTranslations('whyChooseNexTaxi');

  const items = [
    { id: 'availability', icon: 'Clock', bgColor: 'bg-gray-200', iconColor: 'text-gray-600' },
    { id: 'localExperts', icon: 'MapPinned', bgColor: 'bg-gray-200', iconColor: 'text-gray-600' },
    { id: 'coverage', icon: 'Map', bgColor: 'bg-gray-200', iconColor: 'text-gray-600' },
  ];

  return (
    <section className="py-20 px-4 md:px-0">
      <div className="max-w-6xl mx-auto bg-slate-100 rounded-3xl p-8 md:p-12 shadow-lg">
        <div className="mb-12">
          <TitleComponent align="left" title={t('title')} subtitle={t('subtitle')} />
        </div>

        <div className="grid gap-6 md:grid-cols-3 place-items-center">
          {items.map((item) => (
            <Cards
              key={item.id}
              icon={item.icon}
              title={t(`items.${item.id}.title`)}
              description={t(`items.${item.id}.description`)}
              iconClassName={`${item.bgColor} ${item.iconColor} p-3 rounded-xl`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
