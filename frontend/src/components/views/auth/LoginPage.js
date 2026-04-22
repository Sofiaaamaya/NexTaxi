'use client';

import { useTranslations } from 'next-intl';
import TitleComponent from '@/components/common/TitleComponent';
import Poppins from '@/components/ui/Poppins';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const t = useTranslations('auth.login');
  const { login } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await login({
      email,
      password,
    });

    setLoading(false);

    if (res.success) {
      const user = JSON.parse(localStorage.getItem("user"));

      if (user?.rol === "administrador") {
        router.push('/admin/dashboard');
      } else if (user?.rol === "conductor") {
        router.push('/conductor/dashboard');
      } else {
        router.push('/cliente/dashboard'); 
      }
    } else {
      alert(res.error || "Error al iniciar sesión");
    }
  };

  return (
    <section className="py-20 max-w-2xl mx-auto rounded-2xl bg-surface border border-border shadow-xl">
      <div className="max-w-md mx-auto px-6">
        <TitleComponent align="left" title={t('title')} subtitle={t('subtitle')} />

        <form onSubmit={handleSubmit} className="mt-10 flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <Poppins
              text={t('email')}
              tag="label"
              size="14|18"
              color="textPrimary"
              weight="medium"
            />
            <input
              required
              type="email"
              placeholder="ejemplo@correo.com"
              className="input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

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
              required
              type="password"
              placeholder="••••••••"
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading} 
            className={`w-full px-6 py-4 rounded-xl text-white transition flex items-center justify-center gap-2 ${
              loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary hover:bg-primary-light'
            }`}
          >
            <Poppins 
              text={loading ? "Cargando..." : t('button')} 
              tag="span" 
              color="textWhite" 
              weight="medium" 
            />
            {!loading && <span className="text-lg">→</span>}
          </button>
        </form>

        <div className="my-8 flex items-center gap-4">
          <div className="flex-1 h-px bg-border"></div>
          <Poppins text={t('orContinue')} tag="span" size="14|18" color="textSecondary" />
          <div className="flex-1 h-px bg-border"></div>
        </div>

        <div className="flex flex-col gap-4">
          <button type="button" className="w-full py-3 rounded-xl border border-border hover:bg-background transition">
            <Poppins text="GOOGLE" tag="span" size="16|20" weight="medium" />
          </button>
        </div>

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
