'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import TitleComponent from '@/components/common/TitleComponent';
import Poppins from '@/components/ui/Poppins';
import Link from 'next/link';
import Image from 'next/image';

export default function HeroSwiperCard({ slides = [] }) {
  return (
    <div className="relative w-full h-[450px] md:h-[550px] rounded-2xl overflow-hidden shadow-lg">
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 4500 }}
        loop
        className="w-full h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-full">
              <Image
                src={slide.image}
                alt={slide.alt || `Slide ${index + 1}`}
                fill
                className="object-cover"
                priority={index === 0}
              />
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="absolute inset-0 flex flex-col items-center justify-center px-6">
                <div className="max-w-3xl">
                  <TitleComponent
                    eyebrow={slide.eyebrow}
                    title={slide.title}
                    subtitle={slide.subtitle}
                    align="center"
                    eyebrowColor={slide.eyebrowColor || 'primary'}
                    titleColor={slide.titleColor || 'white'}
                    subtitleColor={slide.subtitleColor || 'white'}
                    eyebrowAsBadge={slide.eyebrowAsBadge || false}
                  />
                </div>

                {(slide.button1 || slide.button2) && (
                  <div className="flex gap-4 mt-4 flex-wrap justify-center">
                    {slide.button1 && (
                      <Link href={slide.button1.href || '#'}>
                        <button className="px-6 py-3 rounded-lg bg-primary text-white hover:bg-primary-light transition">
                          <Poppins
                            text={slide.button1.label}
                            tag="span"
                            size="16|20"
                            weight="medium"
                            color="white"
                          />
                        </button>
                      </Link>
                    )}

                    {slide.button2 && (
                      <Link href={slide.button2.href || '#'}>
                        <button className="px-6 py-3 rounded-lg bg-white text-text-primary border border-white/40 hover:bg-white/90 transition">
                          <Poppins
                            text={slide.button2.label}
                            tag="span"
                            size="16|20"
                            weight="medium"
                            color="textPrimary"
                          />
                        </button>
                      </Link>
                    )}
                  </div>
                )}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
