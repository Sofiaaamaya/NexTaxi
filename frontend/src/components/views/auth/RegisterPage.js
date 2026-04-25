'use client';

import { useTranslations } from 'next-intl';
import TitleComponent from '@/components/common/TitleComponent';
import Poppins from '@/components/ui/Poppins';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Icon from '@/components/icons/Icon'; 

export default function RegisterPage() {
  const t = useTranslations('auth.register');
  const { register } = useAuth();
  const router = useRouter();

  const [form, setForm] = useState({
    nombre: '',
    email: '',
    password: '',
    password_confirmation: '',
    rol: 'cliente',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

          <div className="relative w-full">
            <input required
              type={showPassword ? "text" : "password"}
              placeholder={t('password')}
              className="input w-full pr-10"
              value={form.password}
              onChange={(e) => setForm({...form, password: e.target.value})}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-primary transition-colors"
              aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
            >
              <Icon name={showPassword ? "EyeOff" : "Eye"} size={20} />
            </button>
          </div>

          <div className="relative w-full">
            <input required
              type={showConfirmPassword ? "text" : "password"}
              placeholder={t('confirmPassword')}
              className="input w-full pr-10"
              value={form.password_confirmation}
              onChange={(e) => setForm({...form, password_confirmation: e.target.value})}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-primary transition-colors"
              aria-label={showConfirmPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
            >
              <Icon name={showConfirmPassword ? "EyeOff" : "Eye"} size={20} />
            </button>
          </div>

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