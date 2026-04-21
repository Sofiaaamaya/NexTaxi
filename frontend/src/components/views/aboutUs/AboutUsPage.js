'use client';

import AboutSwiper from '@/components/views/aboutUs/AboutSwiper';
import ContactBanner from '@/components/common/cards/ContactBanner';
import AboutCards from '@/components/views/aboutUs/AboutCards';

export default function AboutUsPage() {

  return (
    <>
      <AboutSwiper />
      <AboutCards />
      <ContactBanner 
        title="Ready to experience the future of urban mobility?"
        subtitle="Contact us today to learn more about our services and how we can help you get around the city with ease."
        buttonText="Contact Us"
        bgColor='bg-primary'
        buttonLink="/contact"
        buttonBg='white'
        buttonTextColor='white'
      /> 
    </>


  );
}