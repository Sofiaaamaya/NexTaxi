'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import TitleComponent from '@/components/common/TitleComponent';
import Poppins from '@/components/ui/Poppins';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const t = useTranslations('auth.register');
  const { login } = useAuth();
  const router = useRouter();

  const [form, setForm] = useState({
    nombre: '',
    email: '',
    password: '',
    telefono: '',
  });

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:8000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error('Error en registro:', data);
        return;
      }

      // Guardar sesión
      login({
        token: data.token,
        user: data.user,
      });

      router.push('/choose-profile/user');

    } catch (error) {
      console.error('Error conectando al backend:', error);
    }
  };

  return (
    <section className="py-20">
      <div className="max-w-md mx-auto px-4">
        <TitleComponent align="left" title={t('title')} subtitle={t('subtitle')} />

        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-6">
          <input
            type="text"
            placeholder={t('name')}
            className="input"
            value={form.nombre}
            onChange={(e) => handleChange('nombre', e.target.value)}
          />

          <input
            type="email"
            placeholder={t('email')}
            className="input"
            value={form.email}
            onChange={(e) => handleChange('email', e.target.value)}
          />

          <input
            type="password"
            placeholder={t('password')}
            className="input"
            value={form.password}
            onChange={(e) => handleChange('password', e.target.value)}
          />

          <input
            type="text"
            placeholder={t('phone')}
            className="input"
            value={form.telefono}
            onChange={(e) => handleChange('telefono', e.target.value)}
          />

          <button className="button-primary w-full">
            <Poppins text={t('button')} tag="span" weight="medium" />
          </button>
        </form>

        <div className="mt-6 text-center">
          <Poppins text={t('haveAccount')} tag="span" color="textSecondary" />
          <Link href="/login" className="ml-2 text-primary hover:text-primary-light">
            <Poppins text={t('goLogin')} tag="span" weight="medium" />
          </Link>
        </div>
      </div>
    </section>
  );
}
