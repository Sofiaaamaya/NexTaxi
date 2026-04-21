import HomeSwiper from '@/components/views/home/HomeSwiper';
import WhyChooseNexTaxi from '@/components/views/home/HomeCards';
import WhyChooseUsSection from '@/components/views/home/WhyChooseUsSection';
import ContactBanner from '@/components/common/cards/ContactBanner';
import { getTranslations } from 'next-intl/server';

export default async function HomePage() {
  const t = await getTranslations('contactBanner');

  return (
    <>
      <HomeSwiper />
      <WhyChooseNexTaxi />
      <WhyChooseUsSection />
      <ContactBanner
        title={t('title')}
        description={t('description')}
        textButton={t('contactButton')}
        bgColor="bg-primary"
        buttonBg="bg-white"
        buttonHoverBg="bg-slate-100"
      />
    </>
  );
}
