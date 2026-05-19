'use client';

import { useTranslations } from 'next-intl';
import TitleComponent from '@/components/common/TitleComponent';
import Poppins from '@/components/ui/Poppins';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Icon from '@/components/icons/Icon';
import { apiFetch } from '@/lib/api';

const InputWrapper = ({ icon, children, label, isFocused, hasValue, fieldError }) => {
  const isFloating = isFocused || hasValue;

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

export default function ForgotPasswordPage() {
  const t = useTranslations('auth.forgotPassword');
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = pathname.split('/')[1] || 'es';

  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [focusedField, setFocusedField] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await apiFetch('/auth/forgot-password', {
        method: 'POST',
        body: JSON.stringify({ email }),
      });

      if (res.error) {
        setError(res.data?.error || res.data?.message || t('error'));
      } else {
        setSuccess(true);
      }
    } catch (err) {
      setError(t('error'));
    } finally {
      setLoading(false);
    }
  };

  const inputClass = `
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
              icon="Mail"
              label={t('email')}
              isFocused={focusedField === 'email'}
              hasValue={email}
            >
              <input
                type="email"
                required
                value={email}
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField(null)}
                onChange={(e) => setEmail(e.target.value)}
                className={inputClass}
                placeholder={t('placeholder')}
              />
            </InputWrapper>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-primary-dark text-white py-4 rounded-xl font-bold shadow-lg shadow-primary/25 transition-all active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <Poppins text={t('button')} tag="span" weight="medium" color="white" />
                  <Icon name="Send" size={18} />
                </>
              )}
            </button>

            <Link
              href={`/${currentLocale}/login`}
              className="text-center text-primary font-bold hover:underline"
            >
              {t('backToLogin')}
            </Link>
          </form>
        )}
      </div>
    </section>
  );
}
