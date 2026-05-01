'use client';

import { useState, useEffect } from 'react';
import Poppins from '@/components/ui/Poppins';
import TitleComponent from '@/components/common/TitleComponent';
import Icon from '@/components/icons/Icon';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { apiFetch } from '@/lib/api';

// Definido fuera para evitar pérdida de foco al re-renderizar
const InputField = ({ label, id, type = "text", placeholder = "", value, onChange, errors, showPassword, setShowPassword, hint }) => {
  const isPassword = id === 'password' || id === 'password_confirmation';
  
  return (
    <div className="space-y-1.5 w-full">
      <Poppins text={label} tag="label" size="14" weight="medium" className="text-gray-600 ml-1" />
      <div className="relative">
        <input
          type={isPassword ? (showPassword ? 'text' : 'password') : type}
          placeholder={placeholder}
          className={`w-full px-4 py-3 bg-gray-50 border rounded-xl outline-none transition-all focus:ring-2 focus:ring-primary/10 ${
            errors[id] ? 'border-red-500 focus:border-red-500 bg-red-50' : 'border-gray-100 focus:border-primary'
          }`}
          value={value}
          onChange={(e) => onChange(id, e.target.value)}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors"
          >
            <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={20} />
          </button>
        )}
      </div>
      {hint && !errors[id] && (
        <p className="text-[11px] text-gray-400 ml-1 mt-1">{hint}</p>
      )}
      {errors[id] && (
        <p className="text-red-500 text-xs mt-1 ml-1 flex items-center gap-1 font-medium">
          <Icon name="AlertCircle" size={12} />
          {Array.isArray(errors[id]) ? errors[id][0] : errors[id]}
        </p>
      )}
    </div>
  );
};

export default function DriverRegisterPage({ invitationToken = null, invitationData = null }) {
  const [step, setStep] = useState(1);
  const t = useTranslations('DriverRegister');
  const router = useRouter();
  
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const VEHICLE_TYPES = [
    { value: 'normal', label: t('form.vehicleTypes.normal') },
    { value: 'adaptado', label: t('form.vehicleTypes.adapted') },
    { value: 'premium', label: t('form.vehicleTypes.premium') },
  ];

  const VEHICLE_COLORS = t.raw('form.vehicleColors');

  const [form, setForm] = useState({
    nombre: invitationData?.nombre || '',
    email: invitationData?.email || '',
    password: '',
    password_confirmation: '',
    telefono: '',
    dni: '',
    numero_licencia: '',
    licencia_expira: '',
    matricula: '',
    marca: '',
    modelo: '',
    plazas: 4,
    color: '',
    tipo: 'normal',
    anio: '',
    aceptaTerminos: false,
  });

  const [passwordCriteria, setPasswordCriteria] = useState({
    length: false,
    upper: false,
    number: false,
    special: false,
  });

  useEffect(() => {
    const pass = form.password;
    setPasswordCriteria({
      length: pass.length >= 8,
      upper: /[A-Z]/.test(pass),
      number: /[0-9]/.test(pass),
      special: /[@$!%*?&]/.test(pass),
    });
  }, [form.password]);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const isStep1Valid = () => {
    const basicInfo = form.nombre && form.telefono && form.dni && form.password && (form.password === form.password_confirmation);
    const passValid = Object.values(passwordCriteria).every(Boolean);
    const emailValid = invitationToken ? true : form.email;
    return basicInfo && passValid && emailValid;
  };

  const isStep2Valid = () => form.numero_licencia && form.licencia_expira;
  const isStep3Valid = () => (
    form.matricula && form.marca && form.modelo && 
    form.plazas && form.color && form.tipo && 
    form.anio && form.aceptaTerminos
  );

  const canGoNext = () => {
    if (step === 1) return isStep1Valid();
    if (step === 2) return isStep2Valid();
    if (step === 3) return isStep3Valid();
    return false;
  };

  const handleNext = async () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      setSubmitting(true);
      setErrors({});

      const body = { ...form, token: invitationToken };
      const endpoint = invitationToken ? '/invitaciones/completar' : '/auth/register/conductor';

      const res = await apiFetch(endpoint, {
        method: 'POST',
        body: JSON.stringify(body),
      });

      setSubmitting(false);

      if (res.error) {
        if (res.data?.errors) {
          setErrors(res.data.errors);
          if (res.data.errors.nombre || res.data.errors.email || res.data.errors.password || res.data.errors.telefono || res.data.errors.dni) {
            setStep(1);
          } else if (res.data.errors.numero_licencia || res.data.errors.licencia_expira) {
            setStep(2);
          }
        } else {
          setErrors({ global: res.data?.message || 'Error al completar el registro' });
        }
      } else {
        setSuccessMessage('¡Registro completado con éxito!');
        localStorage.setItem('token', res.token);
        localStorage.setItem('user', JSON.stringify(res.user));
        setTimeout(() => router.push('/conductor/dashboard'), 1500);
      }
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <section className="py-6 lg:py-12">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* IZQUIERDA — BENEFICIOS */}
        <div className="space-y-8 lg:sticky lg:top-24">
          <TitleComponent
            align="left"
            title={t('benefits.title')}
            subtitle={t('benefits.subtitle')}
          />
          <div className="space-y-4">
            {[{ icon: 'Car', key: 'payments' }, { icon: 'Clock', key: 'schedule' }, { icon: 'Headset', key: 'support' }].map((item) => (
              <div key={item.key} className="flex gap-4 p-4 rounded-2xl bg-white border border-gray-100 shadow-sm">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Icon name={item.icon} size={24} className="text-primary" />
                </div>
                <div>
                  <Poppins text={t(`benefits.items.${item.key}.title`)} tag="h3" size="16|18" weight="semibold" />
                  <Poppins text={t(`benefits.items.${item.key}.desc`)} tag="p" size="14" color="textSecondary" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* DERECHA — FORMULARIO */}
        <div className="w-full mx-auto rounded-3xl bg-white border border-gray-100 shadow-2xl shadow-gray-200/50 px-8 py-10">
          <div className="flex items-center justify-between mb-8">
            <Poppins text={t('form.title')} tag="h2" size="20|24" weight="bold" />
            <div className="px-3 py-1 bg-primary/10 rounded-full">
              <Poppins text={t('form.stepCounter', { current: step, total: 3 })} size="12" weight="bold" className="text-primary uppercase tracking-wider" />
            </div>
          </div>

          {errors.global && (
            <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl flex items-center gap-3 text-sm font-medium border border-red-100">
              <Icon name="AlertCircle" size={20} />
              {errors.global}
            </div>
          )}

          {successMessage && (
            <div className="mb-6 p-4 bg-green-50 text-green-600 rounded-xl flex items-center gap-3 text-sm font-medium border border-green-100">
              <Icon name="CheckCircle" size={20} />
              {successMessage}
            </div>
          )}

          {/* Stepper */}
          <div className="flex items-center gap-3 mb-10">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex-1 flex items-center gap-2">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold transition-all duration-300 ${step >= s ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'bg-gray-100 text-gray-400'}`}>
                  {s}
                </div>
                {s < 3 && <div className={`flex-1 h-1 rounded-full ${step > s ? 'bg-primary' : 'bg-gray-100'}`} />}
              </div>
            ))}
          </div>

          <div className="space-y-6">
            {step === 1 && (
              <div className="flex flex-col gap-5 animate-in fade-in slide-in-from-bottom-4">
                <Poppins text={t('form.steps.1.title')} tag="h3" size="18" weight="semibold" className="text-gray-800" />
                
                <InputField label={t('form.fields.nombre.label')} id="nombre" placeholder="Ej: Juan Pérez" value={form.nombre} onChange={handleChange} errors={errors} />
                {!invitationToken && <InputField label={t('form.fields.email.label')} id="email" type="email" placeholder="ejemplo@correo.com" value={form.email} onChange={handleChange} errors={errors} />}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <InputField label={t('form.fields.telefono.label')} id="telefono" placeholder="+34 600 000 000" value={form.telefono} onChange={handleChange} errors={errors} />
                  <InputField label={t('form.fields.dni.label')} id="dni" placeholder="12345678Z" value={form.dni} onChange={handleChange} errors={errors} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <InputField 
                    label={t('form.fields.password.label')} 
                    id="password" 
                    type="password" 
                    placeholder="••••••••" 
                    hint="Mín. 8 carac., una mayúscula, un número y un símbolo."
                    value={form.password} 
                    onChange={handleChange} 
                    errors={errors} 
                    showPassword={showPassword} 
                    setShowPassword={setShowPassword} 
                  />
                  <InputField label="Confirmar Contraseña" id="password_confirmation" type="password" placeholder="Repite tu contraseña" value={form.password_confirmation} onChange={handleChange} errors={errors} showPassword={showPassword} setShowPassword={setShowPassword} />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="flex flex-col gap-5 animate-in fade-in slide-in-from-bottom-4">
                <Poppins text={t('form.steps.2.title')} tag="h3" size="18" weight="semibold" className="text-gray-800" />
                <InputField label={t('form.fields.numeroLicencia.label')} id="numero_licencia" placeholder="Ej: LZ-12345-A" value={form.numero_licencia} onChange={handleChange} errors={errors} />
                <InputField label={t('form.fields.licenciaExpira.label')} id="licencia_expira" type="date" value={form.licencia_expira} onChange={handleChange} errors={errors} />
              </div>
            )}

            {step === 3 && (
              <div className="flex flex-col gap-5 animate-in fade-in slide-in-from-bottom-4">
                <Poppins text={t('form.steps.3.title')} tag="h3" size="18" weight="semibold" className="text-gray-800" />
                <InputField label={t('form.fields.matricula.label')} id="matricula" placeholder="1234-BBB" className="uppercase" value={form.matricula} onChange={handleChange} errors={errors} />
                <div className="grid grid-cols-2 gap-5">
                  <InputField label={t('form.fields.marca.label')} id="marca" placeholder="Ej: Toyota" value={form.marca} onChange={handleChange} errors={errors} />
                  <InputField label={t('form.fields.modelo.label')} id="modelo" placeholder="Ej: Prius" value={form.modelo} onChange={handleChange} errors={errors} />
                </div>
                <div className="grid grid-cols-3 gap-5">
                  <InputField label={t('form.fields.plazas.label')} id="plazas" type="number" placeholder="4" value={form.plazas} onChange={handleChange} errors={errors} />
                  <InputField label={t('form.fields.anho.label')} id="anio" type="number" placeholder="2024" value={form.anio} onChange={handleChange} errors={errors} />
                  <div className="space-y-1.5">
                    <Poppins text={t('form.fields.tipo.label')} tag="label" size="14" weight="medium" className="text-gray-600 ml-1" />
                    <select className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all" value={form.tipo} onChange={(e) => handleChange('tipo', e.target.value)}>
                      {VEHICLE_TYPES.map((type) => (<option key={type.value} value={type.value}>{type.label}</option>))}
                    </select>
                  </div>
                </div>
                <div className="space-y-3">
                  <Poppins text={t('form.fields.color.label')} tag="label" size="14" weight="medium" className="text-gray-600 ml-1" />
                  <div className="flex flex-wrap gap-2">
                    {VEHICLE_COLORS.map((color) => (
                      <button key={color} type="button" onClick={() => handleChange('color', color)} className={`px-4 py-2 rounded-xl border text-sm font-medium transition-all ${form.color === color ? 'bg-primary border-primary text-white shadow-md shadow-primary/20' : 'bg-white border-gray-100 text-gray-500 hover:border-primary/30'}`}>
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
                <div className={`flex items-center gap-3 p-4 rounded-2xl border transition-all ${form.aceptaTerminos ? 'bg-primary/5 border-primary/20' : 'bg-gray-50 border-gray-100'}`}>
                  <input id="aceptaTerminos" type="checkbox" className="w-5 h-5 accent-primary cursor-pointer" checked={form.aceptaTerminos} onChange={(e) => handleChange('aceptaTerminos', e.target.checked)} />
                  <label htmlFor="aceptaTerminos" className="text-sm text-gray-600 cursor-pointer select-none">{t('form.terms')}</label>
                </div>
              </div>
            )}
          </div>

          <div className="flex gap-4 mt-10">
            {step > 1 && (
              <button onClick={handleBack} className="flex-1 px-6 py-4 bg-gray-50 text-gray-500 rounded-2xl font-bold hover:bg-gray-100 transition-all active:scale-[0.98]">
                {t('form.buttons.back')}
              </button>
            )}
            <button
              onClick={handleNext}
              disabled={!canGoNext() || submitting}
              className={`flex-1 px-6 py-4 bg-primary text-white rounded-2xl font-bold shadow-lg shadow-primary/25 transition-all active:scale-[0.98] flex items-center justify-center gap-2 ${(!canGoNext() || submitting) ? 'opacity-50 cursor-not-allowed' : 'hover:bg-primary-dark'}`}
            >
              {submitting ? (<div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />) : (
                <><Poppins text={step === 3 ? t('form.buttons.submit') : t('form.buttons.next')} tag="span" color="white" weight="bold" /><Icon name={step === 3 ? 'CheckCircle' : 'ArrowRight'} size={20} /></>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
