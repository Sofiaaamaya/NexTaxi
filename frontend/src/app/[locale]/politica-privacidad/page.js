'use client';

import { useTranslations } from 'next-intl';
import TitleComponent from '@/components/common/TitleComponent';
import Poppins from '@/components/ui/Poppins';

export default function PrivacyPolicyPage() {
  const t = useTranslations('privacy');

  const sections = t.raw('sections');

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 max-w-4xl">
        <TitleComponent title={t('title')} subtitle={t('intro')} align="left" />

        <div className="space-y-12">
          {sections.map((section) => (
            <div key={section.id}>
              <Poppins text={section.title} tag="h3" weight="semibold" className="text-xl mb-3" />

              {section.paragraphs.map((p, idx) => (
                <Poppins key={idx} text={p} tag="p" color="textSecondary" className="mt-2" />
              ))}
            </div>
          ))}
        </div>

        <div className="mt-12">
          <Poppins text={t('lastUpdated')} tag="p" color="textSecondary" className="text-sm" />
        </div>
      </div>
    </section>
  );
}
