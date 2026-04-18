'use client';

import { useState } from 'react';
import Poppins from '@/components/ui/Poppins';
import TitleComponent from '@/components/common/TitleComponent';
import Icon from '@/components/icons/Icon';
import { useTranslations } from 'next-intl';

const VEHICLE_TYPES = [
  { value: 'normal', label: 'Normal' },
  { value: 'adapted', label: 'Adaptado' },
  { value: 'premium', label: 'Premium' },
];

const VEHICLE_COLORS = ['Negro', 'Blanco', 'Gris', 'Azul'];

export default function DriverRegisterPage() {
  const [step, setStep] = useState(1);
  const t = useTranslations('auth.register');

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
            title="Únete a la flota NexTaxi"
            subtitle="Convierte tu vehículo en un servicio profesional en Lanzarote."
          />

          <div className="space-y-4">

            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Icon name="Wallet" size={20} className="text-primary" />
              </div>
              <div>
                <Poppins text="Pagos semanales" tag="h3" size="16|20" weight="medium" />
                <Poppins
                  text="Cobros puntuales directamente en tu cuenta bancaria."
                  tag="p"
                  size="14|18"
                  color="textSecondary"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Icon name="Clock" size={20} className="text-primary" />
              </div>
              <div>
                <Poppins text="Horarios flexibles" tag="h3" size="16|20" weight="medium" />
                <Poppins
                  text="Conduce cuando quieras, adapta NexTaxi a tu vida."
                  tag="p"
                  size="14|18"
                  color="textSecondary"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Icon name="Headphones" size={20} className="text-primary" />
              </div>
              <div>
                <Poppins text="Soporte 24/7" tag="h3" size="16|20" weight="medium" />
                <Poppins
                  text="Equipo de coordinación siempre disponible para ayudarte."
                  tag="p"
                  size="14|18"
                  color="textSecondary"
                />
              </div>
            </div>

          </div>
        </div>

        <div className="w-full mx-auto rounded-2xl bg-surface border border-border shadow-xl px-8 py-10">

          <div className="flex items-center justify-between mb-6">
            <Poppins text="Registro de Conductor" tag="h2" size="20|26" weight="semibold" />
            <Poppins text={`Paso ${step} de 3`} size="14|18" color="textSecondary" />
          </div>

          <div className="flex items-center gap-3 mb-8">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center gap-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                    ${step >= s ? 'bg-primary text-white' : 'bg-background text-textSecondary'}
                  `}
                >
                  {s}
                </div>
                {s < 3 && <div className="w-8 h-[2px] bg-border" />}
              </div>
            ))}
          </div>

          <div className="space-y-6">

            {/* PASO 1 */}
            {step === 1 && (
              <>
                <Poppins text="Datos de la cuenta" tag="h3" size="16|20" weight="medium" />

                <div className="flex flex-col gap-4">

                  <div>
                    <Poppins text="Nombre completo" tag="label" size="14|18" weight="medium" />
                    <input
                      className="input mt-1"
                      placeholder="Ej. Juan Pérez"
                      value={form.nombre}
                      onChange={(e) => handleChange('nombre', e.target.value)}
                    />
                  </div>

                  <div>
                    <Poppins text="Email" tag="label" size="14|18" weight="medium" />
                    <input
                      type="email"
                      className="input mt-1"
                      placeholder="conductor@nextaxi.com"
                      value={form.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                    />
                  </div>

                  <div>
                    <Poppins text="Contraseña" tag="label" size="14|18" weight="medium" />
                    <input
                      type="password"
                      className="input mt-1"
                      placeholder="••••••••"
                      value={form.password}
                      onChange={(e) => handleChange('password', e.target.value)}
                    />
                  </div>

                  <div>
                    <Poppins text="Teléfono" tag="label" size="14|18" weight="medium" />
                    <input
                      className="input mt-1"
                      placeholder="+34 600 000 000"
                      value={form.telefono}
                      onChange={(e) => handleChange('telefono', e.target.value)}
                    />
                  </div>

                  <div>
                    <Poppins text="DNI / NIE" tag="label" size="14|18" weight="medium" />
                    <input
                      className="input mt-1"
                      placeholder="12345678A"
                      value={form.dni}
                      onChange={(e) => handleChange('dni', e.target.value)}
                    />
                  </div>

                </div>
              </>
            )}

            {/* PASO 2 */}
            {step === 2 && (
              <>
                <Poppins text="Datos de la licencia" tag="h3" size="16|20" weight="medium" />

                <div className="flex flex-col gap-4">

                  <div>
                    <Poppins text="Número de licencia" tag="label" size="14|18" weight="medium" />
                    <input
                      className="input mt-1"
                      placeholder="LZ-1234-5678"
                      value={form.numeroLicencia}
                      onChange={(e) => handleChange('numeroLicencia', e.target.value)}
                    />
                  </div>

                  <div>
                    <Poppins text="Fecha de expiración" tag="label" size="14|18" weight="medium" />
                    <input
                      type="date"
                      className="input mt-1"
                      value={form.licenciaExpira}
                      onChange={(e) => handleChange('licenciaExpira', e.target.value)}
                    />
                  </div>

                </div>
              </>
            )}

            {step === 3 && (
              <>
                <Poppins text="Datos del vehículo" tag="h3" size="16|20" weight="medium" />

                <div className="flex flex-col gap-4">

                  <div>
                    <Poppins text="Matrícula" tag="label" size="14|18" weight="medium" />
                    <input
                      className="input mt-1"
                      placeholder="1234-ABC"
                      value={form.matricula}
                      onChange={(e) => handleChange('matricula', e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Poppins text="Marca" tag="label" size="14|18" weight="medium" />
                      <input
                        className="input mt-1"
                        placeholder="Toyota"
                        value={form.marca}
                        onChange={(e) => handleChange('marca', e.target.value)}
                      />
                    </div>
                    <div>
                      <Poppins text="Modelo" tag="label" size="14|18" weight="medium" />
                      <input
                        className="input mt-1"
                        placeholder="Corolla"
                        value={form.modelo}
                        onChange={(e) => handleChange('modelo', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Poppins text="Plazas" tag="label" size="14|18" weight="medium" />
                      <input
                        type="number"
                        min={1}
                        max={8}
                        className="input mt-1"
                        value={form.plazas}
                        onChange={(e) => handleChange('plazas', Number(e.target.value))}
                      />
                    </div>

                    <div>
                      <Poppins text="Año" tag="label" size="14|18" weight="medium" />
                      <input
                        type="number"
                        className="input mt-1"
                        placeholder="2020"
                        value={form.anho}
                        onChange={(e) => handleChange('anho', e.target.value)}
                      />
                    </div>

                    <div>
                      <Poppins text="Tipo" tag="label" size="14|18" weight="medium" />
                      <select
                        className="input mt-1"
                        value={form.tipo}
                        onChange={(e) => handleChange('tipo', e.target.value)}
                      >
                        {VEHICLE_TYPES.map((t) => (
                          <option key={t.value} value={t.value}>
                            {t.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <Poppins text="Color" tag="label" size="14|18" weight="medium" />
                    <div className="flex flex-wrap gap-2 mt-2">
                      {VEHICLE_COLORS.map((c) => (
                        <button
                          key={c}
                          type="button"
                          onClick={() => handleChange('color', c)}
                          className={`
                            px-3 py-1 rounded-full border text-sm
                            ${form.color === c ? 'bg-primary text-white border-primary' : 'bg-background border-border'}
                          `}
                        >
                          {c}
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
                      Acepto los Términos de servicio y la Política de privacidad.
                    </label>
                  </div>

                </div>
              </>
            )}

          </div>

          <div className="mt-8 flex items-center justify-between gap-4">

            <button
              type="button"
              onClick={handleBack}
              disabled={step === 1}
              className={`
                px-4 py-2 rounded-lg border text-sm
                ${step === 1
                  ? 'border-border text-textSecondary/60 cursor-not-allowed'
                  : 'border-border hover:bg-background'}
              `}
            >
              Atrás
            </button>

            <button
              type="button"
              onClick={handleNext}
              disabled={!canGoNext()}
              className={`
                px-6 py-2 rounded-lg text-sm font-medium
                ${canGoNext()
                  ? 'bg-primary text-white hover:bg-primary-light'
                  : 'bg-border text-textSecondary cursor-not-allowed'}
              `}
            >
              {step === 3 ? 'Finalizar registro' : 'Siguiente paso'}
            </button>

          </div>

        </div>
      </div>
    </section>
  );
}