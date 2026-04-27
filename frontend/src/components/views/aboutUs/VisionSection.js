'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import TitleComponent from '@/components/common/TitleComponent';

export default function VisionSection() {
  const t = useTranslations('vision');

  return (
    <section className="mt-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-blue-50 p-8 rounded-lg">
          <div>
            <TitleComponent title={t('title')} subtitle={t('subtitle')} align="left" />

            <div className="mt-8 grid grid-cols-2 gap-8 max-w-md">
              <div>
                <p
                  className="text-3xl font-semibold text-primary"
                  style={{ fontFamily: 'Poppins' }}
                >
                  {t('metric1.value')}
                </p>
                <p className="text-gray-600 mt-1" style={{ fontFamily: 'Poppins' }}>
                  {t('metric1.label')}
                </p>
              </div>

              <div>
                <p
                  className="text-3xl font-semibold text-primary"
                  style={{ fontFamily: 'Poppins' }}
                >
                  {t('metric2.value')}
                </p>
                <p className="text-gray-600 mt-1" style={{ fontFamily: 'Poppins' }}>
                  {t('metric2.label')}
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="w-full max-w-lg rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/images/imagen_perfil.webp"
                alt="Vision Image"
                width={700}
                height={500}
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
