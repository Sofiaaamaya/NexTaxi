'use client';

import { useState } from 'react';
import Poppins from '@/components/ui/Poppins';
import TitleComponent from '@/components/common/TitleComponent';
import Icon from '@/components/icons/Icon';
import { useTranslations } from 'next-intl';

export default function DriverRegisterPage() {
  const [step, setStep] = useState(1);
  const t = useTranslations('DriverRegister');

  const VEHICLE_TYPES = [
    { value: 'normal', label: t('form.vehicleTypes.normal') },
    { value: 'adapted', label: t('form.vehicleTypes.adapted') },
    { value: 'premium', label: t('form.vehicleTypes.premium') },
  ];

  const VEHICLE_COLORS = t.raw('form.vehicleColors'); 
  const [form, setForm] = useState({
    nombre: '',
    email: '',
    password: '',
    telefono: '',
    dni: '',
    numeroLicencia: '',
    licenciaExpira: '',
    matricula: '',
    marca: '',
    modelo: '',
    plazas: 4,
    color: '',
    tipo: 'normal',
    anho: '',
    aceptaTerminos: false,
  });
  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const canGoNext = () => {
    if (step === 1) {
      return (
        form.nombre &&
        form.email &&
        form.password &&
        form.telefono &&
        form.dni
      );
    }
    if (step === 2) {
      return form.numeroLicencia && form.licenciaExpira;
    }
    if (step === 3) {
      return (
        form.matricula &&
        form.marca &&
        form.modelo &&
        form.plazas &&
        form.color &&
        form.tipo &&
        form.anho &&
        form.aceptaTerminos
      );
    }
    return false;
  };

  const handleNext = () => {
    if (step < 3 && canGoNext()) {
      setStep(step + 1);
    } else if (step === 3 && canGoNext()) {
      console.log('Enviar registro de conductor:', form);
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
<section className="py-20">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

        {/* IZQUIERDA — BENEFICIOS */}
        <div className="space-y-8">
          <TitleComponent
            align="left"
            title={t('benefits.title')}
            subtitle={t('benefits.subtitle')}
          />

          <div className="space-y-4">
            {[
              { icon: 'Wallet', key: 'payments' },
              { icon: 'Clock', key: 'schedule' },
              { icon: 'Headphones', key: 'support' }
            ].map((item) => (
              <div key={item.key} className="flex gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Icon name={item.icon} size={20} className="text-primary" />
                </div>
                <div>
                  <Poppins text={t(`benefits.items.${item.key}.title`)} tag="h3" size="16|20" weight="medium" />
                  <Poppins
                    text={t(`benefits.items.${item.key}.desc`)}
                    tag="p"
                    size="14|18"
                    color="textSecondary"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

         {/* DERECHA — FORMULARIO */}
        <div className="w-full mx-auto rounded-2xl bg-surface border border-border shadow-xl px-8 py-10">
          <div className="flex items-center justify-between mb-6">
            <Poppins text={t('form.title')} tag="h2" size="20|26" weight="semibold" />
            <Poppins text={t('form.stepCounter', { current: step, total: 3 })} size="14|18" color="textSecondary" />
          </div>

          {/* Stepper Visual */}
          <div className="flex items-center gap-3 mb-8">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${step >= s ? 'bg-primary text-white' : 'bg-background text-textSecondary'}`}>
                  {s}
                </div>
                {s < 3 && <div className="w-8 h-[2px] bg-border" />}
              </div>
            ))}
          </div>

          <div className="space-y-6">
  {/* PASO 1: Datos de la cuenta */}
  {step === 1 && (
    <>
      <Poppins text={t('form.steps.1.title')} tag="h3" size="16|20" weight="medium" />
      <div className="flex flex-col gap-4">
        {[
          { id: 'nombre', type: 'text' },
          { id: 'email', type: 'email' },
          { id: 'password', type: 'password' },
          { id: 'telefono', type: 'text' },
          { id: 'dni', type: 'text' },
        ].map((field) => (
          <div key={field.id}>
            <Poppins text={t(`form.fields.${field.id}.label`)} tag="label" size="14|18" weight="medium" />
            <input
              type={field.type}
              className="input mt-1 w-full"
              placeholder={t(`form.fields.${field.id}.placeholder`)}
              value={form[field.id]}
              onChange={(e) => handleChange(field.id, e.target.value)}
            />
          </div>
        ))}
      </div>
    </>
  )}

  {/* PASO 2: Datos de la licencia */}
  {step === 2 && (
    <>
      <Poppins text={t('form.steps.2.title')} tag="h3" size="16|20" weight="medium" />
      <div className="flex flex-col gap-4">
        <div>
          <Poppins text={t('form.fields.numeroLicencia.label')} tag="label" size="14|18" weight="medium" />
          <input
            className="input mt-1 w-full"
            placeholder={t('form.fields.numeroLicencia.placeholder')}
            value={form.numeroLicencia}
            onChange={(e) => handleChange('numeroLicencia', e.target.value)}
          />
        </div>
        <div>
          <Poppins text={t('form.fields.licenciaExpira.label')} tag="label" size="14|18" weight="medium" />
          <input
            type="date"
            className="input mt-1 w-full"
            value={form.licenciaExpira}
            onChange={(e) => handleChange('licenciaExpira', e.target.value)}
          />
        </div>
      </div>
    </>
  )}

  {/* PASO 3: Datos del vehículo */}
  {step === 3 && (
    <>
      <Poppins text={t('form.steps.3.title')} tag="h3" size="16|20" weight="medium" />
      <div className="flex flex-col gap-4">
        <div>
          <Poppins text={t('form.fields.matricula.label')} tag="label" size="14|18" weight="medium" />
          <input
            className="input mt-1 w-full"
            placeholder={t('form.fields.matricula.placeholder')}
            value={form.matricula}
            onChange={(e) => handleChange('matricula', e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Poppins text={t('form.fields.marca.label')} tag="label" size="14|18" weight="medium" />
            <input
              className="input mt-1 w-full"
              placeholder={t('form.fields.marca.placeholder')}
              value={form.marca}
              onChange={(e) => handleChange('marca', e.target.value)}
            />
          </div>
          <div>
            <Poppins text={t('form.fields.modelo.label')} tag="label" size="14|18" weight="medium" />
            <input
              className="input mt-1 w-full"
              placeholder={t('form.fields.modelo.placeholder')}
              value={form.modelo}
              onChange={(e) => handleChange('modelo', e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Poppins text={t('form.fields.plazas.label')} tag="label" size="14|18" weight="medium" />
            <input
              type="number"
              min="1"
              max="8"
              className="input mt-1 w-full"
              value={form.plazas}
              onChange={(e) => handleChange('plazas', Number(e.target.value))}
            />
          </div>
          <div>
            <Poppins text={t('form.fields.anho.label')} tag="label" size="14|18" weight="medium" />
            <input
              type="number"
              className="input mt-1 w-full"
              placeholder="2020"
              value={form.anho}
              onChange={(e) => handleChange('anho', e.target.value)}
            />
          </div>
          <div>
            <Poppins text={t('form.fields.tipo.label')} tag="label" size="14|18" weight="medium" />
            <select
              className="input mt-1 w-full"
              value={form.tipo}
              onChange={(e) => handleChange('tipo', e.target.value)}
            >
              {VEHICLE_TYPES.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <Poppins text={t('form.fields.color.label')} tag="label" size="14|18" weight="medium" />
          <div className="flex flex-wrap gap-2 mt-2">
            {VEHICLE_COLORS.map((color) => (
              <button
                key={color}
                type="button"
                onClick={() => handleChange('color', color)}
                className={`px-3 py-1 rounded-full border text-sm transition-colors ${
                  form.color === color ? 'bg-primary text-white border-primary' : 'bg-background border-border'
                }`}
              >
                {color}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-start gap-2 mt-2">
          <input
            id="aceptaTerminos"
            type="checkbox"
            className="mt-1"
            checked={form.aceptaTerminos}
            onChange={(e) => handleChange('aceptaTerminos', e.target.checked)}
          />
          <label htmlFor="aceptaTerminos" className="text-sm text-textSecondary">
            {t('form.terms')}
          </label>
        </div>
      </div>
    </>
  )}
</div>

          <div className="flex gap-4 mt-8">
            {step > 1 && (
              <button onClick={handleBack} className="btn-secondary flex-1">
                {t('form.buttons.back')}
              </button>
            )}
            <button
              onClick={handleNext}
              disabled={!canGoNext()}
              className={`btn-primary flex-1 ${!canGoNext() ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {step === 3 ? t('form.buttons.submit') : t('form.buttons.next')}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}