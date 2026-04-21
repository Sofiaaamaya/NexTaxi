'use client';

import HeroSwiperCard from '@/components/common/cards/HeroSwiperCard';
import { useTranslations } from 'next-intl';

export default function AboutSwiper() {
  const t = useTranslations('AboutSwiper');

  const slides = [
    {
      image: '/images/about_granHotel.webp',
      alt: t('slides.0.alt'),
      eyebrow: t('slides.0.eyebrow'),
      eyebrowAsBadge: true,
      eyebrowColor: 'white',
      title: t('slides.0.title'),
      titleColor: 'white',
      subtitle: t('slides.0.subtitle'),
      subtitleColor: 'white',
    }
  ];

  return <HeroSwiperCard slides={slides} />;
}
