'use client';

import { useTranslations } from 'next-intl';
import NexTaxiCard from '../../common/cards/Cards';
import TitleComponent from '../../common/TitleComponent';

export default function WhyChooseNexTaxi() {
  const t = useTranslations('whyChooseNexTaxi');

  return (
    <section className="py-20">
      <div>
        <TitleComponent align="left" title={t('title')} subtitle={t('subtitle')} />
      </div>

      <div className="grid gap-8 md:grid-cols-3 justify-center">
        <NexTaxiCard
          icon="Clock"
          title={t('items.availability.title')}
          description={t('items.availability.description')}
        />

        <NexTaxiCard
          icon="MapPinned"
          title={t('items.localExperts.title')}
          description={t('items.localExperts.description')}
        />

        <NexTaxiCard
          icon="Map"
          title={t('items.coverage.title')}
          description={t('items.coverage.description')}
        />
      </div>
    </section>
  );
}
