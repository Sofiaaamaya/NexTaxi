import HeroSwiperCard from '@/components/common/cards/HeroSwiperCard';

export default function HomeSwiper() {
  return (
    <HeroSwiperCard
      slides={[
        {
          image: '/images/dunas_lanzarote.webp',
          alt: 'Volcanic landscape of Lanzarote at sunset',
          eyebrow: '#1 Taxi Service in Lanzarote',
          eyebrowAsBadge: true,
          eyebrowColor: 'white',
          title: 'Experience the Island with NexTaxi',
          titleColor: 'white',
          subtitle:
            'Reliable, comfortable, and professional transfers from the airport to every hidden beach.',
          subtitleColor: 'white',
          button1: { label: 'Request a Taxi', href: '/request' },
          button2: { label: 'Book Transfer', href: '/transfer' },
        },
        {
          image: '/images/hervideros_lanzarote.webp',
          alt: 'Ocean view with cliffs in Lanzarote',
          title: 'Explore Lanzarote with Ease',
          titleColor: 'white',
          subtitle: 'Your trusted transport partner for every adventure.',
          subtitleColor: 'white',
        },
        {
          image: '/images/timanfaya.webp',
          alt: 'Airport transfer taxi in Lanzarote',
          eyebrow: 'Fast & Reliable',
          eyebrowAsBadge: true,
          eyebrowColor: 'white',
          title: 'Airport Transfers 24/7',
          titleColor: 'white',
          button1: { label: 'Book Now', href: '/airport' },
        },
      ]}
    />
  );
}
