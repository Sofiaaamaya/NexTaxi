'use client';

import AboutSwiper from '@/components/views/aboutUs/AboutSwiper';
import ContactBanner from '@/components/common/cards/ContactBanner';
import AboutCards from '@/components/views/aboutUs/AboutCards';
import { useTranslations } from 'next-intl';
import TeamSection from '@/components/views/aboutUs/TeamSection';
import VisionSection from './VisionSection';

export default function AboutUsPage() {
  const t = useTranslations('contactBanner');

  return (
    <>
      <AboutSwiper />
      <VisionSection />
      <AboutCards />
      <TeamSection />
      <ContactBanner
        title={t('title')}
        description={t('description')}
        textButton={t('contactButton')}
        bgColor="bg-primary"
        buttonLink="/contacto"
        buttonBg="bg-white"
        buttonTextColor="text-black"
      />
    </>
  );
}
