'use client';

import { useTranslations } from 'next-intl';
import TitleComponent from '../../../components/common/TitleComponent';
import Poppins from '../../../components/ui/Poppins';
import Link from 'next/link';
import Icon from '../../../components/icons/Icon';

export default function ChooseProfilePage() {
  const t = useTranslations('chooseProfile');

  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Imagen izquierda */}
        <div className="w-full h-full">
          <div className="w-full h-[380px] md:h-[500px] rounded-2xl overflow-hidden shadow-lg">
            <img src="/images/taxi_banner.png" alt="Taxi" className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Derecha */}
        <div>
          <TitleComponent align="center" title={t('title')} subtitle={t('subtitle')} />

          <div className="mt-10 flex flex-col gap-6">
            {/* Botón: Soy Usuario */}
            <Link href="/login?role=user">
              <button
                className="
                  w-full flex items-center justify-between
                  px-6 py-5 rounded-xl border border-border bg-primary text-white
                  hover:bg-primary-light transition
                "
              >
                <div className="flex items-center gap-4 ">
                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
                    <Icon name="User" size={26} className="text-primary" />
                  </div>

                  <div className="flex flex-col text-left">
                    <Poppins
                      text={t('userButtonTitle')}
                      tag="span"
                      size="18|22"
                      weight="medium"
                      color="white"
                    />
                    <Poppins
                      text={t('userButtonSubtitle')}
                      tag="span"
                      size="13|16"
                      color="textSecondary"
                    />
                  </div>
                </div>

                <Icon name="ArrowRight" size={22} className="text-white" />
              </button>
            </Link>

            {/* Botón: Soy Trabajador */}
            <Link href="/login?role=driver">
              <button
                className="
                  w-full flex items-center justify-between
                  px-6 py-5 rounded-xl border border-border bg-white
                  hover:bg-slate-100 transition
                "
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center">
                    <Icon name="User" size={26} className="text-primary" />
                  </div>

                  <div className="flex flex-col text-left">
                    <Poppins
                      text={t('driverButtonTitle')}
                      tag="span"
                      size="18|22"
                      weight="medium"
                      color="textPrimary"
                    />
                    <Poppins
                      text={t('driverButtonSubtitle')}
                      tag="span"
                      size="13|16"
                      color="textSecondary"
                    />
                  </div>
                </div>

                <Icon name="ArrowRight" size={22} className="text-primary" />
              </button>
            </Link>

            {/* Legal */}
            <p className="text-xs text-textSecondary text-center mt-6">{t('legal')}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
