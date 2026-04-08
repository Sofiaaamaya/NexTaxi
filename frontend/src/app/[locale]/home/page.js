'use client';

import HomeSwiper from '../../../components/views/HomeSwiper';
import { useTranslations } from 'next-intl';
import WhyChooseNexTaxi from '../../../components/views/HomeCards';

export default function HomePage() {
  const t = useTranslations('home');

  return (
    <>
      <HomeSwiper />
      <WhyChooseNexTaxi />
    </>
  );
}
