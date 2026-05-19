'use client';

import HeroSwiperCard from '@/components/common/cards/HeroSwiperCard';
import { useTranslations, useLocale } from 'next-intl';

export default function HomeSwiper() {
  const t = useTranslations('HomeSwiper');
  const locale = useLocale();

  const slides = [
    {
      image: '/images/puente_bolas_arrecife.webp',
      alt: t('slides.0.alt'),
      eyebrow: t('slides.0.eyebrow'),
      eyebrowAsBadge: true,
      eyebrowColor: 'white',
      title: t('slides.0.title'),
      titleColor: 'white',
      subtitle: t('slides.0.subtitle'),
      subtitleColor: 'white',
      button1: { label: t('slides.0.button1'), href: `/${locale}/reserva` },
      button2: { label: t('slides.0.button2'), href: `/${locale}/contacto` },
    },
    {
      image: '/images/hervideros_lanzarote.webp',
      alt: t('slides.1.alt'),
      title: t('slides.1.title'),
      titleColor: 'white',
      subtitle: t('slides.1.subtitle'),
      subtitleColor: 'white',
    },
    {
      image: '/images/jameos.webp',
      alt: t('slides.2.alt'),
      eyebrow: t('slides.2.eyebrow'),
      eyebrowAsBadge: true,
      eyebrowColor: 'white',
      title: t('slides.2.title'),
      titleColor: 'white',
      button1: { label: t('slides.2.button1'), href: `/${locale}/reserva` },
    },
  ];

  return <HeroSwiperCard slides={slides} />;
}
