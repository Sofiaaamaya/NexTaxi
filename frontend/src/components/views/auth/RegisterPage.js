'use client';

import { useTranslations } from 'next-intl';
import TitleComponent from '@/components/common/TitleComponent';
import Poppins from '@/components/ui/Poppins';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const t = useTranslations('auth.register');
  const { register } = useAuth();
  const router = useRouter();

  const [form, setForm] = useState({
    nombre: '',
    email: '',
    password: '',
    password_confirmation: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const res = await register(form);

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

      setError(res.error || "Error al registrarse");
    }
  };

  return (
    <section className="py-20">
      <div className="max-w-md mx-auto px-4">
        <TitleComponent align="left" title={t('title')} subtitle={t('subtitle')} />

        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-6">
          {error && <p className="text-red-500 text-sm">{error}</p>}
          
          <input required
            type="text"
            placeholder={t('name')}
            className="input"
            value={form.nombre}
            onChange={(e) => setForm({...form, nombre: e.target.value})}
          />

          <input required
            type="email"
            placeholder={t('email')}
            className="input"
            value={form.email}
            onChange={(e) => setForm({...form, email: e.target.value})}
          />

          <input required
            type="password"
            placeholder={t('password')}
            className="input"
            value={form.password}
            onChange={(e) => setForm({...form, password: e.target.value})}
          />

          <input required
            type="password"
            placeholder="Confirm password"
            className="input"
            value={form.password_confirmation}
            onChange={(e) =>
              setForm({...form, password_confirmation: e.target.value})
            }
          />

          <button 
            type="submit" 
            disabled={loading}
            className="btn-primary" 
          >
            {loading ? "Cargando..." : t('button')}
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
