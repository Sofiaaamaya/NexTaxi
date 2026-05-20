'use client';

import { useTranslations } from 'next-intl';
import TitleComponent from '@/components/common/TitleComponent';
import Poppins from '@/components/ui/Poppins';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import Icon from '@/components/icons/Icon';

const InputWrapper = ({ icon, children, label, isFocused, fieldError }) => {
  return (
    <div className="relative w-full">
      <div className="relative">
        {/* Icono */}
        <div
          className={`absolute left-4 top-1/2 -translate-y-1/2 z-10 transition-colors duration-200 
          ${isFocused ? 'text-primary' : fieldError ? 'text-red-500' : 'text-gray-400'}`}
        >
          <Icon name={icon} size={20} />
        </div>

        {children}

        <label
          className={`
            absolute left-3 -top-2.5 pointer-events-none transition-all duration-200 z-20
            text-xs bg-white px-2 font-medium
            ${fieldError ? 'text-red-500' : isFocused ? 'text-primary' : 'text-gray-400'}
          `}
        >
          {label}
        </label>
      </div>

      {/* Mensaje de error */}
      {fieldError && (
        <p className="mt-1 ml-2 text-xs text-red-500 font-medium animate-in fade-in slide-in-from-top-1">
          {fieldError}
        </p>
      )}
    </div>
  );
};

export default function LoginPage() {
  const t = useTranslations('auth.login');
  const { login, googleLogin } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = pathname.split('/')[1] || 'es';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [generalError, setGeneralError] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const handleGoogleSuccess = async (credentialResponse) => {
    setLoading(true);
    setGeneralError(null);
    const res = await googleLogin(credentialResponse.credential);
    setLoading(false);

    if (res.success) {
      const user = JSON.parse(sessionStorage.getItem('user'));
      const rolePath = user?.rol;
      router.push(`/${currentLocale}/${rolePath}/dashboard`);
    } else {
      setGeneralError(res.error || 'Error al iniciar sesión con Google');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setGeneralError(null);
    setFieldErrors({});

    const res = await login({ email, password });
    setLoading(false);

    if (res.success) {
      const user = JSON.parse(sessionStorage.getItem('user'));
      const rolePath = user?.rol;
      router.push(`/${currentLocale}/${rolePath}/dashboard`);
    } else {
      if (res.data?.errors) {
        const formattedErrors = {};
        Object.keys(res.errors).forEach((key) => {
          formattedErrors[key] = Array.isArray(res.errors[key])
            ? res.errors[key][0]
            : res.errors[key];
        });
        setFieldErrors(formattedErrors);
      } else {
        setGeneralError(res.error || 'Error al iniciar sesión');
      }
    }
  };

  const inputClass = (field) => `
    w-full pl-12 pr-4 py-3.5 rounded-xl outline-none transition-all border-2
    ${
      fieldErrors[field]
        ? 'border-red-500 bg-red-50/30 focus:ring-red-100 shadow-sm shadow-red-100'
        : 'border-gray-100 bg-gray-50 focus:ring-primary/10 focus:border-primary focus:bg-white'
    }
  `;

  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
      <section className="w-full flex justify-center transition-all duration-300 max-w-6xl px-4 md:px-8 py-10">
        <div className="w-full max-w-md bg-white shadow-2xl shadow-gray-200/50 rounded-3xl border border-gray-100 p-8 md:p-10">
          <TitleComponent align="center" title={t('title')} subtitle={t('subtitle')} />

          <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5">
            {generalError && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-center">
                <Poppins text={generalError} tag="p" className="text-red-600 text-sm" />
              </div>
            )}

            {/* EMAIL */}
            <InputWrapper
              icon="Mail"
              label={t('email')}
              isFocused={focusedField === 'email'}
              hasValue={email}
              fieldError={fieldErrors.email}
            >
              <input
                type="email"
                value={email}
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField(null)}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (fieldErrors.email) setFieldErrors({ ...fieldErrors, email: null });
                }}
                className={inputClass('email')}
              />
            </InputWrapper>

            {/* PASSWORD */}
            <div className="flex flex-col gap-2">
              <InputWrapper
                icon="Lock"
                label={t('password')}
                isFocused={focusedField === 'password'}
                hasValue={password}
                fieldError={fieldErrors.password}
              >
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField(null)}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (fieldErrors.password) setFieldErrors({ ...fieldErrors, password: null });
                  }}
                  className={`${inputClass('password')} pr-12`}
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
                <Link href={`/${currentLocale}/forgot-password`}>
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
              width="250px"
              locale="es"
            />
          </div>

          <div className="mt-10 text-center text-sm">
            <Poppins text={t('noAccount')} tag="span" className="text-gray-500" />
            <Link
              href={`/${currentLocale}/register/usuario`}
              className="ml-2 text-primary hover:underline font-bold"
            >
              {t('goRegister')}
            </Link>
          </div>
        </div>
      </section>
    </GoogleOAuthProvider>
  );
}
