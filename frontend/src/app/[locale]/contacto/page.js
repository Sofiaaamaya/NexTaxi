'use client';

import { useTranslations } from 'next-intl';
import ContactLeft from '@/components/views/contacto/ContactLeft';
import ContactForm from '@/components/views/contacto/ContactForm';
import ContactMap from '@/components/views/contacto/ContactMap';

export default function ContactPage() {
  const t = useTranslations('contact');

  return (
    <section className="py-20">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* SECCIÓN PRINCIPAL */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <ContactLeft t={t} />
          <ContactForm t={t} />
        </div>

        {/* MAPA */}
        <div className="mt-20">
          <ContactMap t={t} />
        </div>
      </div>
    </section>
  );
}
