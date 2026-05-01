'use client';

import { useTranslations } from 'next-intl';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { apiFetch } from '@/lib/api';
import Poppins from '@/components/ui/Poppins';
import TitleComponent from '@/components/common/TitleComponent';
import Icon from '@/components/icons/Icon';
import DriverRegisterPage from '@/components/views/Driver/DriverRegisterPage';

function AcceptInvitationContent() {
  const t = useTranslations('acceptInvitation');
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get('token');

  const [invitationData, setInvitationData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [form, setForm] = useState({
    nombre: '',
    password: '',
    password_confirmation: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!token) {
      setError(t('invalid'));
      setLoading(false);
      return;
    }

    const validateToken = async () => {
      const res = await apiFetch('/invitaciones/validar', {
        method: 'POST',
        body: JSON.stringify({ token })
      });

      if (res.error) {
        setError(t('invalid'));
      } else {
        setInvitationData(res);
      }
      setLoading(false);
    };

    validateToken();
  }, [token, t]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setErrors({});

    const res = await apiFetch('/invitaciones/completar', {
      method: 'POST',
      body: JSON.stringify({ 
        token, 
        nombre: form.nombre, 
        password: form.password, 
        password_confirmation: form.password_confirmation 
      })
    });

    setSubmitting(false);

    if (res.error) {
      setErrors(res.data?.errors || { global: res.data?.message || t('error') });
    } else {
      setSuccess(true);
      // Guardar sesión
      localStorage.setItem('token', res.token);
      localStorage.setItem('user', JSON.stringify(res.user));

      // Redirigir según rol después de 2 segundos
      setTimeout(() => {
        const rol = res.user.rol;
        if (rol === 'admin') router.push('/admin/dashboard');
        else if (rol === 'gerente') router.push('/gerente/dashboard');
        else if (rol === 'conductor') router.push('/conductor/dashboard');
        else router.push('/cliente/dashboard');
      }, 2000);
    }
  };

  if (loading) return <div className="flex justify-center py-20"><Icon name="Loader" className="animate-spin text-primary" size={40} /></div>;

  if (error && !success) return (
    <div className="max-w-md mx-auto py-20 text-center">
      <div className="bg-red-50 p-6 rounded-2xl border border-red-100 text-red-600">
        <Icon name="AlertCircle" size={48} className="mx-auto mb-4" />
        <Poppins text={error} size="18" weight="medium" />
      </div>
    </div>
  );

  if (success) return (
    <div className="max-w-md mx-auto py-20 text-center">
      <div className="bg-green-50 p-6 rounded-2xl border border-green-100 text-green-600">
        <Icon name="CheckCircle" size={48} className="mx-auto mb-4" />
        <Poppins text={t('success')} size="18" weight="medium" />
      </div>
    </div>
  );

  if (invitationData?.rol === 'conductor') {
    return (
      <DriverRegisterPage 
        invitationToken={token} 
        invitationData={invitationData} 
      />
    );
  }

  return (
    <div className="max-w-md mx-auto py-12 px-4">
      <TitleComponent 
        title={t('title')} 
        subtitle={t('subtitle', { rol: invitationData?.rol })} 
        align="center"
      />

      <div className="mt-8 bg-white p-8 rounded-3xl border border-gray-100 shadow-xl shadow-gray-200/50">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {errors.global && (
            <div className="p-3 bg-red-50 text-red-600 rounded-xl text-sm border border-red-100 flex items-center gap-2">
              <Icon name="AlertCircle" size={16} />
              {errors.global}
            </div>
          )}

          <div className="space-y-1.5">
            <Poppins text={t('nameLabel')} tag="label" size="14" weight="medium" className="text-gray-600 ml-1" />
            <input
              type="text"
              required
              placeholder="Tu nombre completo"
              value={form.nombre}
              onChange={(e) => setForm({...form, nombre: e.target.value})}
              className={`w-full px-4 py-3 bg-gray-50 border rounded-xl outline-none transition-all focus:ring-2 focus:ring-primary/10 ${errors.nombre ? 'border-red-500 bg-red-50' : 'border-gray-100 focus:border-primary'}`}
            />
            {errors.nombre && <p className="text-red-500 text-xs mt-1 ml-1">{errors.nombre[0]}</p>}
          </div>

          <div className="space-y-1.5">
            <Poppins text={t('passwordLabel')} tag="label" size="14" weight="medium" className="text-gray-600 ml-1" />
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="••••••••"
                value={form.password}
                onChange={(e) => setForm({...form, password: e.target.value})}
                className={`w-full px-4 py-3 bg-gray-50 border rounded-xl outline-none transition-all focus:ring-2 focus:ring-primary/10 ${errors.password ? 'border-red-500 bg-red-50' : 'border-gray-100 focus:border-primary'}`}
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors">
                <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={20} />
              </button>
            </div>
            {!errors.password && <p className="text-[11px] text-gray-400 ml-1">Mín. 8 carac., una mayúscula, un número y un símbolo.</p>}
            {errors.password && <p className="text-red-500 text-xs mt-1 ml-1">{errors.password[0]}</p>}
          </div>

          <div className="space-y-1.5">
            <Poppins text={t('confirmPasswordLabel')} tag="label" size="14" weight="medium" className="text-gray-600 ml-1" />
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="Repite tu contraseña"
                value={form.password_confirmation}
                onChange={(e) => setForm({...form, password_confirmation: e.target.value})}
                className={`w-full px-4 py-3 bg-gray-50 border rounded-xl outline-none transition-all focus:ring-2 focus:ring-primary/10 ${errors.password_confirmation ? 'border-red-500 bg-red-50' : 'border-gray-100 focus:border-primary'}`}
              />
            </div>
            {errors.password_confirmation && <p className="text-red-500 text-xs mt-1 ml-1">{errors.password_confirmation[0]}</p>}
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-primary hover:bg-primary-dark text-white py-4 rounded-xl font-bold shadow-lg shadow-primary/25 transition-all active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-70 mt-4"
          >
            {submitting ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <Icon name="UserPlus" size={18} />
                <Poppins text={t('button')} tag="span" weight="medium" color="white" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function AcceptInvitationPage() {
  return (
    <Suspense fallback={<div className="flex justify-center py-20"><Icon name="Loader" className="animate-spin text-primary" size={40} /></div>}>
      <AcceptInvitationContent />
    </Suspense>
  );
}
