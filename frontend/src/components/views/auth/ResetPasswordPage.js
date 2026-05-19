'use client';

import { useTranslations } from 'next-intl';
import TitleComponent from '@/components/common/TitleComponent';
import Poppins from '@/components/ui/Poppins';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import Icon from '@/components/icons/Icon';
import { apiFetch } from '@/lib/api';
const InputWrapper = ({ icon, children, label, isFocused, fieldError }) => {
  return (
    <div className="relative w-full">
      <div className="relative">
        <div
          className={`absolute left-4 top-1/2 -translate-y-1/2 z-10 transition-colors duration-200 
          ${isFocused ? 'text-primary' : fieldError ? 'text-red-500' : 'text-gray-400'}`}
        >
          <Icon name={icon} size={20} />
        </div>

        {children}

        <label
          className={`
          absolute left-3 -translate-y-[2.6rem] pointer-events-none transition-all duration-200 z-20
          text-xs bg-white px-2 font-medium opacity-100
          ${fieldError ? 'text-red-500' : isFocused ? 'text-primary' : 'text-gray-400'}
        `}
        >
          {label}
        </label>
      </div>

      {fieldError && (
        <p className="mt-1 ml-2 text-xs text-red-500 font-medium animate-in fade-in slide-in-from-top-1">
          {fieldError}
        </p>
      )}
    </div>
  );
};

export default function ResetPasswordPage() {
  const t = useTranslations('auth.resetPassword');
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentLocale = pathname.split('/')[1] || 'es';

  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [focusedField, setFocusedField] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const token = searchParams.get('token');
  const email = searchParams.get('email');

  useEffect(() => {
    if (!token || !email) {
      setError('Enlace inválido o incompleto.');
    }
  }, [token, email]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== passwordConfirmation) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await apiFetch('/auth/reset-password', {
        method: 'POST',
        body: JSON.stringify({
          token,
          email,
          password,
          password_confirmation: passwordConfirmation,
        }),
      });

      if (res.error) {
        setError(res.data?.error || res.data?.message || t('error'));
      } else {
        setSuccess(true);
      }
    } catch {
      setError(t('error'));
    } finally {
      setLoading(false);
    }
  };

  const inputClass = () => `
    w-full pl-12 pr-4 py-3.5 rounded-xl outline-none transition-all border-2
    ${
      error
        ? 'border-red-500 bg-red-50/30 focus:ring-red-100 shadow-sm shadow-red-100'
        : 'border-gray-100 bg-gray-50 focus:ring-primary/10 focus:border-primary focus:bg-white'
    }
  `;

  return (
    <section className="w-full flex justify-center transition-all duration-300 max-w-6xl px-4 md:px-8 py-10">
      <div className="w-full max-w-md bg-white shadow-2xl shadow-gray-200/50 rounded-3xl border border-gray-100 p-8 md:p-10">
        <TitleComponent align="center" title={t('title')} subtitle={t('subtitle')} />

        {success ? (
          <div className="mt-8 text-center space-y-6">
            <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto">
              <Icon name="CheckCircle" size={48} />
            </div>
            <Poppins text={t('success')} weight="medium" color="textPrimary" />
            <Link
              href={`/${currentLocale}/login`}
              className="block w-full bg-primary hover:bg-primary-dark text-white py-4 rounded-xl font-bold transition-all"
            >
              {t('backToLogin')}
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-6">
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-center">
                <Poppins text={error} tag="p" className="text-red-600 text-sm" />
              </div>
            )}

            <InputWrapper
              icon="Lock"
              label={t('password')}
              isFocused={focusedField === 'password'}
              hasValue={password}
            >
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onFocus={() => setFocusedField('password')}
                onBlur={() => setFocusedField(null)}
                onChange={(e) => setPassword(e.target.value)}
                className={inputClass()}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary z-20"
              >
                <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={20} />
              </button>
            </InputWrapper>

            <InputWrapper
              icon="Lock"
              label={t('confirm')}
              isFocused={focusedField === 'confirm'}
              hasValue={passwordConfirmation}
            >
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={passwordConfirmation}
                onFocus={() => setFocusedField('confirm')}
                onBlur={() => setFocusedField(null)}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                className={inputClass()}
              />
            </InputWrapper>

            <button
              type="submit"
              disabled={loading || (!!error && !password)}
              className="w-full bg-primary hover:bg-primary-dark text-white py-4 rounded-xl font-bold shadow-lg shadow-primary/25 transition-all active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <Poppins text={t('button')} tag="span" weight="medium" color="white" />
                  <Icon name="Save" size={18} />
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
