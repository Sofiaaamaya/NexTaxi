'use client';
import { useTranslations } from 'next-intl';
import TitleComponent from '@/components/common/TitleComponent';
import Poppins from '@/components/ui/Poppins';
import Icon from '@/components/icons/Icon';

export default function WhyChooseUsSection() {
  const t = useTranslations('whyChooseUs');
  return (
    <section className="mb-20">
      <div className="max-w-6xl mx-auto">
        <TitleComponent
          eyebrow={t('eyebrow')}
          title={t('title')}
          subtitle={t('subtitle')}
          align="left"
          eyebrowAsBadge={false}
          eyebrowColor="textPrimary"
          titleColor="textPrimary"
          subtitleColor="textSecondary"
          layout="grid"
        >
          <div className="mt-10 w-full grid grid-cols-1 sm:grid-cols-2 gap-10 place-items-start">
            {/* ITEM 1 */}
            <div className="w-50 text-justify">
              <Icon name="Clock" size={40} color="var(--color-primary)" className="mb-4" />
              <Poppins
                text={t('items.fastDeployment.title')}
                tag="h3"
                size="18|22"
                weight="semibold"
                className="mb-2"
              />
              <Poppins
                text={t('items.fastDeployment.description')}
                tag="p"
                size="14|18"
                color="textSecondary"
              />
            </div>

            {/* ITEM 2 */}
            <div className="w-50 text-justify">
              <Icon name="MapPinned" size={40} color="var(--color-primary)" className="mb-4" />
              <Poppins
                text={t('items.efficiency.title')}
                tag="h3"
                size="18|22"
                weight="semibold"
                className="mb-2"
              />
              <Poppins
                text={t('items.efficiency.description')}
                tag="p"
                size="14|18"
                color="textSecondary"
              />
            </div>

            {/* ITEM 3 */}
            <div className="w-50 text-justify">
              <Icon name="Car" size={40} color="var(--color-primary)" className="mb-4" />
              <Poppins
                text={t('items.localExperts.title')}
                tag="h3"
                size="18|22"
                weight="semibold"
                className="mb-2"
              />
              <Poppins
                text={t('items.localExperts.description')}
                tag="p"
                size="14|18"
                color="textSecondary"
              />
            </div>

            {/* ITEM 4 */}
            <div className="w-50">
              <Icon name="CarTaxiFront" size={40} color="var(--color-primary)" className="mb-4" />
              <Poppins
                text={t('items.security.title')}
                tag="h3"
                size="18|22"
                weight="semibold"
                className="mb-2"
              />
              <Poppins
                text={t('items.security.description')}
                tag="p"
                size="14|18"
                color="textSecondary"
              />
            </div>
          </div>
        </TitleComponent>
      </div>
    </section>
  );
}
