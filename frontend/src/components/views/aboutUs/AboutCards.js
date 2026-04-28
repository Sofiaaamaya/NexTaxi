'use client';

import { useTranslations } from 'next-intl';
import TitleComponent from '@/components/common/TitleComponent';
import Icon from '@/components/icons/Icon';
import Poppins from '@/components/ui/Poppins';

export default function WhyChooseNexTaxi({ variant = 'colored-cards', mainIcon = 'Rocket' }) {
  const t = useTranslations('whyChooseAboutUs');

  const items = [
    { id: 'speed', bgColor: 'bg-gray-300' },
    { id: 'urbanIntegrity', bgColor: 'bg-gray-300' },
    { id: 'satisfaction', bgColor: 'bg-gray-300' },
    { id: 'coverage', bgColor: 'bg-gray-300' },
  ];

  return (
    <section className="py-20 px-4 md:px-0">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="bg-gray-500 p-8 border rounded-lg border-white/10 flex flex-col justify-center">
            {variant === 'colored-cards' && (
              <div className="mb-4 flex justify-center lg:justify-start">
                <div className="p-3 text-white inline-block shadow-sm">
                  <Icon name={mainIcon} size={40} />
                </div>
              </div>
            )}

            <TitleComponent
              align="left"
              title={t('title')}
              titleColor="white"
              subtitle={t('subtitle')}
              subtitleColor="white"
            />
          </div>

          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
            {items.map((item) => (
              <div
                key={item.id}
                className={`
                  p-6 transition-all duration-300 rounded-lg
                  flex flex-col items-center text-center lg:items-start lg:text-left
                  
                  ${variant === 'colored-cards' ? `${item.bgColor} ${item.border}` : 'bg-white border-border shadow-sm'}
                `}
              >
                <Poppins
                  text={t(`items.${item.id}.title`)}
                  tag="h3"
                  size="16|20"
                  weight="bold"
                  className="mb-2"
                />
                <Poppins
                  text={t(`items.${item.id}.description`)}
                  tag="p"
                  size="13|15"
                  color="textSecondary"
                  className="leading-relaxed lg:text-justify"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
