'use client';
import { useTranslations } from 'next-intl';
import TitleComponent from '@/components/common/TitleComponent';
import Poppins from '@/components/ui/Poppins';
import Icon from '@/components/icons/Icon';

export default function WhyChooseUsSection({ variant = 'default', mainIcon = 'Rocket' }) {
  const t = useTranslations('whyChooseUs');

  const items = [
    { key: 'fastDeployment', bgColor: 'bg-blue-100', iconColor: 'text-blue-600', icon: 'Clock' },
    { key: 'efficiency', bgColor: 'bg-green-100', iconColor: 'text-green-600', icon: 'MapPinned' },
    { key: 'localExperts', bgColor: 'bg-gray-200', iconColor: 'text-gray-600', icon: 'Car' },
    { key: 'security', bgColor: 'bg-red-100', iconColor: 'text-red-600', icon: 'CarTaxiFront' },
  ];

  return (
    <section className="mb-20 px-4 md:px-0">
      <div className="max-w-6xl mx-auto">
        <TitleComponent
          eyebrow={
            variant === 'colored-cards' ? (
              <div className="mb-4 flex justify-center lg:justify-start">
                <Icon name={mainIcon} size={48} className="text-primary" />
              </div>
            ) : (
              t('eyebrow')
            )
          }
          title={t('title')}
          subtitle={t('subtitle')}
          align="left"
          layout="grid"
        >
          <div className="mt-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-6">
            {items.map((item) => (
              <div
                key={item.key}
                className={`
                  flex flex-col transition-all duration-300
                  items-center text-center lg:items-start lg:text-left
                  ${
                    variant === 'colored-cards'
                      ? `${item.bgColor} p-8 rounded-3xl border border-black/5`
                      : ''
                  }
                `}
              >
                {variant === 'default' && (
                  <div
                    className={`w-16 h-16 flex items-center justify-center rounded-2xl mb-4 ${item.bgColor} ${item.iconColor}`}
                  >
                    <Icon name={item.icon} size={32} />
                  </div>
                )}

                <Poppins
                  text={t(`items.${item.key}.title`)}
                  tag="h3"
                  size="18|22"
                  weight="semibold"
                  className="mb-2 text-textPrimary"
                />
                <Poppins
                  text={t(`items.${item.key}.description`)}
                  tag="p"
                  size="14|18"
                  color="textSecondary"
                  className="leading-relaxed lg:text-justify"
                />
              </div>
            ))}
          </div>
        </TitleComponent>
      </div>
    </section>
  );
}
