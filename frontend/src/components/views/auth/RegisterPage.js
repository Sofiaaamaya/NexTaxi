'use client';

import { useTranslations } from 'next-intl';
import TitleComponent from '@/components/common/TitleComponent';
import Poppins from '@/components/ui/Poppins';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Icon from '@/components/icons/Icon';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';

const InputWrapper = ({ icon, children, label, isFocused, hasValue, fieldError }) => {
  const isFloating = isFocused || hasValue;

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
          absolute left-12 top-1/2 -translate-y-1/2 pointer-events-none transition-all duration-200 z-20
          ${
            isFloating
              ? '-translate-y-[2.6rem] left-3 text-xs bg-white px-2 font-medium opacity-100 ' +
                (fieldError ? 'text-red-500' : 'text-primary')
              : 'text-gray-400 opacity-100'
          }
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

export default function RegisterPage() {
  const t = useTranslations('auth.register');
  const { register, googleLogin } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = pathname.split('/')[1] || 'es';

  const [form, setForm] = useState({
    nombre: '',
    email: '',
    password: '',
    password_confirmation: '',
    rol: 'cliente',
  });

  const [loading, setLoading] = useState(false);
  const [generalError, setGeneralError] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const handleGoogleSuccess = async (credentialResponse) => {
    setLoading(true);
    const res = await googleLogin(credentialResponse.credential);
    setLoading(false);

    if (res.success) {
      const user = JSON.parse(sessionStorage.getItem('user'));
      const rolePath = user?.rol === 'usuario' || user?.rol === 'cliente' ? 'usuario' : user?.rol;
      router.push(`/${currentLocale}/${rolePath}/dashboard`);
    } else {
      setGeneralError(res.error || 'Error al registrarse con Google');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setGeneralError(null);
    setFieldErrors({});

    const res = await register(form);
    setLoading(false);

    if (res.success) {
      const user = JSON.parse(sessionStorage.getItem('user'));
      const rolePath = user?.rol === 'usuario' || user?.rol === 'cliente' ? 'usuario' : user?.rol;
      router.push(`/${currentLocale}/${rolePath}/dashboard`);
    } else {
      if (res.errors) {
        const formattedErrors = {};
        Object.keys(res.errors).forEach((key) => {
          formattedErrors[key] = Array.isArray(res.errors[key])
            ? res.errors[key][0]
            : res.errors[key];
        });
        setFieldErrors(formattedErrors);
      } else {
        setGeneralError(res.error || 'Error en el servidor');
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
      <section className="flex items-center justify-center bg-gray-50/50 px-4 py-12">
        <div className="w-full max-w-md bg-white shadow-2xl shadow-gray-200/40 rounded-3xl border border-gray-100 p-8 md:p-10">
          <TitleComponent align="center" title={t('title')} subtitle={t('subtitle')} />

          <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5">
            {generalError && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-center">
                <Poppins text={generalError} tag="p" className="text-red-600 text-sm" />
              </div>
            )}

            <InputWrapper
              icon="User"
              label={t('name')}
              isFocused={focusedField === 'nombre'}
              hasValue={form.nombre}
              fieldError={fieldErrors.nombre}
            >
              <input
                type="text"
                value={form.nombre}
                onFocus={() => setFocusedField('nombre')}
                onBlur={() => setFocusedField(null)}
                onChange={(e) => {
                  setForm({ ...form, nombre: e.target.value });
                  if (fieldErrors.nombre) setFieldErrors({ ...fieldErrors, nombre: null });
                }}
                className={inputClass('nombre')}
              />
            </InputWrapper>

            <InputWrapper
              icon="Mail"
              label={t('email')}
              isFocused={focusedField === 'email'}
              hasValue={form.email}
              fieldError={fieldErrors.email}
            >
              <input
                type="email"
                value={form.email}
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField(null)}
                onChange={(e) => {
                  setForm({ ...form, email: e.target.value });
                  if (fieldErrors.email) setFieldErrors({ ...fieldErrors, email: null });
                }}
                className={inputClass('email')}
              />
            </InputWrapper>

            <InputWrapper
              icon="Lock"
              label={t('password')}
              isFocused={focusedField === 'password'}
              hasValue={form.password}
              fieldError={fieldErrors.password}
            >
              <input
                type={showPassword ? 'text' : 'password'}
                value={form.password}
                onFocus={() => setFocusedField('password')}
                onBlur={() => setFocusedField(null)}
                onChange={(e) => {
                  setForm({ ...form, password: e.target.value });
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

            <InputWrapper
              icon="Lock"
              label={t('confirmPassword')}
              isFocused={focusedField === 'password_confirmation'}
              hasValue={form.password_confirmation}
              fieldError={fieldErrors.password_confirmation}
            >
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                value={form.password_confirmation}
                onFocus={() => setFocusedField('password_confirmation')}
                onBlur={() => setFocusedField(null)}
                onChange={(e) => {
                  setForm({ ...form, password_confirmation: e.target.value });
                  if (fieldErrors.password_confirmation)
                    setFieldErrors({ ...fieldErrors, password_confirmation: null });
                }}
                className={`${inputClass('password_confirmation')} pr-12`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary z-20 transition-colors"
              >
                <Icon name={showConfirmPassword ? 'EyeOff' : 'Eye'} size={20} />
              </button>
            </InputWrapper>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-primary-dark text-white py-4 rounded-xl font-bold shadow-lg shadow-primary/25 transition-all active:scale-[0.98] flex items-center justify-center gap-2 mt-2 disabled:grayscale"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <Poppins text={t('button')} tag="span" weight="medium" color="white" />
              )}
            </button>
          </form>

          <div className="my-6 flex items-center gap-3">
            <div className="flex-1 h-px bg-gray-100"></div>
            <Poppins
              text={t('orContinue') || 'O continuar con'}
              tag="span"
              className="text-xs text-gray-400 uppercase tracking-wider"
            />
            <div className="flex-1 h-px bg-gray-100"></div>
          </div>

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

          <div className="mt-8 text-center text-sm">
            <Poppins text={t('haveAccount')} tag="span" className="text-gray-500" />
            <Link
              href={`/${currentLocale}/login`}
              className="ml-2 text-primary hover:underline font-bold"
            >
              {t('goLogin')}
            </Link>
          </div>
        </div>
      </section>
    </GoogleOAuthProvider>
  );
}
