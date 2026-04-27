'use client';

import Image from 'next/image';
import Poppins from '@/components/ui/Poppins';
import { useTranslations } from 'next-intl';
import TitleComponent from '@/components/common/TitleComponent';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

export default function TeamSection() {
  const t = useTranslations('team');

  const team = [
    {
      name: 'Julian Vance',
      role: 'Founder & CEO',
      image: '/images/imagen_perfil.webp',
    },
    {
      name: 'Sarah Chen',
      role: 'Chief Technology Officer',
      image: '/images/imagen_perfil.webp',
    },
    {
      name: 'Marcus Thorne',
      role: 'Director of Logistics',
      image: '/images/imagen_perfil.webp',
    },
    {
      name: 'Elena Rodriguez',
      role: 'Head of Product Design',
      image: '/images/imagen_perfil.webp',
    },
  ];

  return (
    <section className="mb-20">
      <TitleComponent title={t('title')} subtitle={t('subtitle')} align="left" />

      <Swiper
        modules={[Autoplay]}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        spaceBetween={30}
        slidesPerView={1.2}
        breakpoints={{
          640: { slidesPerView: 1.5 },
          768: { slidesPerView: 2.2 },
          1024: { slidesPerView: 3 },
        }}
        className="px-4"
      >
        {team.map((member, index) => (
          <SwiperSlide key={index}>
            <div className="bg-white border border-gray-200 shadow-xl rounded-2xl p-8 flex flex-col items-center min-h-[380px]">
              <div className="w-48 h-48 rounded-xl overflow-hidden mb-6 shadow-md">
                <Image
                  src={member.image}
                  alt={member.name}
                  width={192}
                  height={192}
                  className="object-cover"
                />
              </div>

              <Poppins text={member.name} tag="h3" weight="medium" className="text-xl" />

              <Poppins text={member.role} tag="p" color="textSecondary" className="text-sm mt-1" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
