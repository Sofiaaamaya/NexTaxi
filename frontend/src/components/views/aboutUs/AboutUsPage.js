'use client';

import AboutSwiper from '@/components/views/aboutUs/AboutSwiper';
import ContactBanner from '@/components/common/cards/ContactBanner';
import AboutCards from '@/components/views/aboutUs/AboutCards';
import { useTranslations } from 'next-intl';


export default function AboutUsPage() {
  const t = useTranslations("contactBanner");

  return (
    <>
      <AboutSwiper />
      <AboutCards />

      <ContactBanner
        title={t("title")}
        subtitle={t("description")}
        buttonText={t("contactButton")}
        bgColor="bg-primary"
        buttonLink="/contact"
        buttonBg="white"
        buttonTextColor="white"
      />
    </>
  );
}
