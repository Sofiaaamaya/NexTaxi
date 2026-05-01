'use client';

import { useTranslations } from 'next-intl';
import TitleComponent from '@/components/common/TitleComponent';
import Poppins from '@/components/ui/Poppins';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { GoogleLogin } from '@react-oauth/google';
import Icon from '@/components/icons/Icon';

const InputWrapper = ({ icon, children, label, isFocused, hasValue }) => {
  const isFloating = isFocused || hasValue;

  return (
    <div className="relative w-full">
      {/* Icono */}
      <div
        className={`absolute left-4 top-1/2 -translate-y-1/2 z-10 transition-colors duration-200 
        ${isFocused ? 'text-primary' : 'text-gray-400'}`}
      >
        <Icon name={icon} size={20} />
      </div>

      {children}

      {/* Etiqueta corregida */}
      <label
        className={`
        absolute left-12 top-1/2 -translate-y-1/2 pointer-events-none transition-all duration-200 z-20
        ${
          isFloating
            ? '-translate-y-[2.6rem] left-3 text-xs text-primary bg-white px-2 font-medium opacity-100'
            : 'text-gray-400 opacity-100'
        }
      `}
      >
        {label}
      </label>
    </div>
  );
};

export default function LoginPage() {
  const t = useTranslations('auth.login');
  const { login } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const handleGoogleSuccess = async (credentialResponse) => {
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/google`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: credentialResponse.credential }),
      });
      const data = await res.json();

      if (data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        const rol = data.user.rol;
        if (rol === 'admin') router.push('/admin/dashboard');
        else if (rol === 'gerente') router.push('/gerente/dashboard');
        else if (rol === 'conductor') router.push('/conductor/dashboard');
        else router.push('/cliente/dashboard');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await login({ email, password });
    setLoading(false);
    if (res.success) {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user?.rol === 'admin') router.push('/admin/dashboard');
      else if (user?.rol === 'gerente') router.push('/gerente/dashboard');
      else if (user?.rol === 'conductor') router.push('/conductor/dashboard');
      else router.push('/cliente/dashboard');
    } else {
      alert(res.error || 'Error al iniciar sesión');
    }
  };

  const inputClass =
    'w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary focus:bg-white transition-all';

  return (
    <section className="min-h-[80vh] flex items-center justify-center bg-gray-50/50 py-12 px-4">
      <div className="w-full max-w-md bg-white shadow-2xl shadow-gray-200/50 rounded-3xl border border-gray-100 p-8 md:p-10">
        <TitleComponent align="left" title={t('title')} subtitle={t('subtitle')} />

        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5">
          {/* EMAIL */}
          <InputWrapper
            icon="Mail"
            label={t('email')}
            isFocused={focusedField === 'email'}
            hasValue={email}
          >
            <input
              required
              type="email"
              value={email}
              onFocus={() => setFocusedField('email')}
              onBlur={() => setFocusedField(null)}
              onChange={(e) => setEmail(e.target.value)}
              className={inputClass}
            />
          </InputWrapper>

          {/* PASSWORD */}
          <div className="flex flex-col gap-2">
            <InputWrapper
              icon="Lock"
              label={t('password')}
              isFocused={focusedField === 'password'}
              hasValue={password}
            >
              <input
                required
                type={showPassword ? 'text' : 'password'}
                value={password}
                onFocus={() => setFocusedField('password')}
                onBlur={() => setFocusedField(null)}
                onChange={(e) => setPassword(e.target.value)}
                className={`${inputClass} pr-12`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary z-20 transition-colors"
              >
                <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={20} />
              </button>
            </InputWrapper>

            <div className="flex justify-end px-1">
              <Link href="/forgot-password">
                <Poppins
                  text={t('forgot')}
                  tag="span"
                  className="text-xs text-primary hover:underline font-medium cursor-pointer"
                />
              </Link>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary hover:bg-primary-dark text-white py-4 rounded-xl font-bold shadow-lg shadow-primary/25 transition-all active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-70 "
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <Poppins text={t('button')} tag="span" weight="medium" color="white" />
                <Icon name="ArrowRight" size={18} className="" />
              </>
            )}
          </button>
        </form>

        <div className="my-8 flex items-center gap-4">
          <div className="flex-1 h-px bg-gray-100"></div>
          <Poppins
            text={t('orContinue')}
            tag="span"
            className="text-xs text-gray-400 uppercase tracking-wider"
          />
          <div className="flex-1 h-px bg-gray-100"></div>
        </div>

        {/* BOTÓN DE GOOGLE */}
        <div className="flex justify-center">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => console.log('Login Failed')}
            useOneTap={false}
            theme="outline"
            size="large"
            shape="pill"
            width="340px"
            locale="es"
          />
        </div>

        <div className="mt-10 text-center text-sm">
          <Poppins text={t('noAccount')} tag="span" className="text-gray-500" />
          <Link href="/register/usuario" className="ml-2 text-primary hover:underline font-bold">
            {t('goRegister')}
          </Link>
        </div>
      </div>
    </section>
  );
}
