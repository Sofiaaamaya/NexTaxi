'use client';

import { useTranslations } from 'next-intl';
import TitleComponent from '../../common/TitleComponent';
import Poppins from '../../ui/Poppins';
import Link from 'next/link';
import { useAuth } from '../../../context/AuthContext';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginPage() {
  const t = useTranslations('auth.login');
  const { login } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:8000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        throw new Error('Credenciales incorrectas');
      }

      const data = await res.json();

      // Guardar token + usuario en el AuthContext
      login({
        token: data.token,
        user: data.user,
      });

      // Redirección según rol
      if (data.user.rol === 'conductor') {
        router.push('/choose-profile/driver');
      } else if (data.user.rol === 'cliente') {
        router.push('/choose-profile/user');
      } else {
        router.push('/');
      }

    } catch (error) {
      console.error(error);
    }
  };


  return (
    <section className="py-20 max-w-2xl mx-auto rounded-2xl bg-surface border border-border shadow-xl">
      <div className="max-w-md mx-auto px-6">
        <TitleComponent align="left" title={t('title')} subtitle={t('subtitle')} />

        <form onSubmit={handleSubmit} className="mt-10 flex flex-col gap-6">
          {/* Email */}
          <div className="flex flex-col gap-2">
            <Poppins
              text={t('email')}
              tag="label"
              size="14|18"
              color="textPrimary"
              weight="medium"
            />
            <input
              type="email"
              placeholder="ejemplo@correo.com"
              className="input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <Poppins
                text={t('password')}
                tag="label"
                size="14|18"
                color="textPrimary"
                weight="medium"
              />
              <Link href="/forgot-password">
                <Poppins
                  text={t('forgot')}
                  tag="span"
                  size="12|16"
                  className="text-primary hover:text-primary-light cursor-pointer"
                />
              </Link>
            </div>

            <input
              type="password"
              placeholder="••••••••"
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Botón principal */}
          <button
            type="submit"
            className="w-full px-6 py-4 rounded-xl bg-primary text-white hover:bg-primary-light transition flex items-center justify-center gap-2"
          >
            <Poppins text={t('button')} tag="span" color="textWhite" weight="medium" />
            <span className="text-lg">→</span>
          </button>
        </form>

        {/* Divider */}
        <div className="my-8 flex items-center gap-4">
          <div className="flex-1 h-px bg-border"></div>
          <Poppins text={t('orContinue')} tag="span" size="14|18" color="textSecondary" />
          <div className="flex-1 h-px bg-border"></div>
        </div>

        {/* Social buttons */}
        <div className="flex flex-col gap-4">
          <button className="w-full py-3 rounded-xl border border-border hover:bg-background transition">
            <Poppins text="GOOGLE" tag="span" size="16|20" weight="medium" />
          </button>

          <button className="w-full py-3 rounded-xl border border-border hover:bg-background transition">
            <Poppins text="IOS" tag="span" size="16|20" weight="medium" />
          </button>
        </div>

        {/* Register */}
        <div className="mt-8 text-center">
          <Poppins text={t('noAccount')} tag="span" color="textSecondary" />
          <Link href="/register" className="ml-2 text-primary hover:text-primary-light">
            <Poppins text={t('goRegister')} tag="span" weight="medium" />
          </Link>
        </div>
      </div>
    </section>
  );
}
