'use client';

import { useState } from 'react';
import Poppins from '@/components/ui/Poppins';
import Icon from '@/components/icons/Icon';
import clsx from 'clsx';
import { apiFetch } from '@/lib/api';

const InputWrapper = ({ icon, children, label, isFocused, hasValue, isTextarea = false }) => {
  const isFloating = isFocused || hasValue;

  return (
    <div className="relative w-full">
      <div
        className={`absolute left-4 z-10 transition-colors duration-200 
        ${isTextarea ? 'top-5' : 'top-1/2 -translate-y-1/2'}
        ${isFocused ? 'text-primary' : 'text-gray-400'}`}
      >
        <Icon name={icon} size={20} />
      </div>

      {children}

      <label
        className={`
        absolute left-12 pointer-events-none transition-all duration-200 z-20
        ${isTextarea ? 'top-5' : 'top-1/2 -translate-y-1/2'}
        ${
          isFloating
            ? '!-translate-y-[2.6rem] left-3 text-xs text-primary bg-white px-2 font-semibold'
            : 'text-gray-400'
        }
      `}
      >
        {label}
      </label>
    </div>
  );
};

export default function ContactForm({ t }) {
  const [form, setForm] = useState({ email: '', subject: '', message: '' });
  const [cvFile, setCvFile] = useState(null);
  const [focusedField, setFocusedField] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');
    setFieldErrors({});

    const formData = new FormData();
    formData.append('email', form.email);
    formData.append('subject', form.subject);
    formData.append('message', form.message);
    if (cvFile && form.subject === 'Oportunidades de Empleo') {
      formData.append('cv', cvFile);
    }

    const token = typeof window !== 'undefined' ? sessionStorage.getItem('token') : null;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/contacto`,
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            ...(token && { Authorization: 'Bearer ' + token }),
          },
          body: formData,
        }
      );

      const data = await res.json();

      if (!res.ok) {
        if (res.status === 422) {
          setFieldErrors(data.errors || {});
          setErrorMessage(data.message || 'Error de validación');
        } else {
          setErrorMessage(data.message || 'Hubo un problema al enviar el mensaje.');
        }
      } else {
        setIsSent(true);
      }
    } catch (err) {
      setErrorMessage('Error de conexión');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass =
    'w-full pl-12 pr-4 py-4 bg-gray-50/50 border border-gray-100 rounded-2xl outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary focus:bg-white transition-all duration-300';

  if (isSent) {
    return (
      <div className="bg-white border border-gray-50 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] rounded-[2.5rem] p-8 md:p-12 text-center animate-in fade-in zoom-in duration-500">
        <div className="w-24 h-24 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
          <Icon name="CheckCircle" size={48} />
        </div>
        <Poppins
          text={t('form.successTitle')}
          tag="h3"
          size="24|30"
          weight="bold"
          className="mb-4 text-gray-800"
        />
        <Poppins
          text={t('form.successMessage')}
          tag="p"
          size="16|20"
          color="textSecondary"
          className="mb-10 max-w-sm mx-auto"
        />
        <button
          onClick={() => {
            setIsSent(false);
            setForm({ email: '', subject: '', message: '' });
            setCvFile(null);
          }}
          className="bg-primary text-white px-10 py-4 rounded-2xl font-bold shadow-xl shadow-primary/30 hover:bg-primary-light transition-all active:scale-95"
        >
          {t('form.sendAgain')}
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-50 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] rounded-[2.5rem] p-8 md:p-12 transition-transform duration-500 hover:shadow-[0_30px_70px_-10px_rgba(0,0,0,0.15)]">
      <Poppins
        text={t('form.title')}
        tag="h3"
        size="24|30"
        weight="bold"
        className="mb-10 text-gray-800"
      />

      <form onSubmit={handleSubmit} className="flex flex-col gap-7">
        {/* EMAIL */}
        <div className="flex flex-col gap-1">
          <InputWrapper
            icon="Mail"
            label={t('form.email')}
            isFocused={focusedField === 'email'}
            hasValue={form.email}
          >
            <input
              required
              type="email"
              value={form.email}
              onFocus={() => setFocusedField('email')}
              onBlur={() => setFocusedField(null)}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className={clsx(inputClass, fieldErrors.email && 'border-red-500')}
              placeholder=" "
              disabled={isSubmitting}
            />
          </InputWrapper>
          {fieldErrors.email && (
            <span className="text-xs text-red-500 ml-4">{fieldErrors.email[0]}</span>
          )}
        </div>

        {/* SUBJECT */}
        <div className="flex flex-col gap-1">
          <InputWrapper
            icon="Tag"
            label={t('form.subject')}
            isFocused={focusedField === 'subject'}
            hasValue={form.subject}
          >
            <select
              required
              value={form.subject}
              onFocus={() => setFocusedField('subject')}
              onBlur={() => setFocusedField(null)}
              onChange={(e) => setForm({ ...form, subject: e.target.value })}
              className={clsx(
                inputClass,
                'appearance-none cursor-pointer',
                fieldErrors.subject && 'border-red-500'
              )}
              disabled={isSubmitting}
            >
              <option value="" disabled hidden></option>
              <option value="Soporte Técnico">{t('form.options.support')}</option>
              <option value="Oportunidades de Empleo">{t('form.options.driver')}</option>
              <option value="Otro">{t('form.options.other')}</option>
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
              <Icon name="ChevronDown" size={20} />
            </div>
          </InputWrapper>
          {fieldErrors.subject && (
            <span className="text-xs text-red-500 ml-4">{fieldErrors.subject[0]}</span>
          )}
        </div>

        {/* CV UPLOAD (Conditional) */}
        {form.subject === 'Oportunidades de Empleo' && (
          <div className="flex flex-col gap-1 animate-in slide-in-from-top-2 duration-300">
            <label className="text-sm font-semibold text-gray-700 ml-4 mb-2 flex items-center gap-2">
              <Icon name="IdCard" size={16} className="text-primary" />
              Adjuntar CV (PDF)
            </label>
            <div className="relative group">
              <input
                type="file"
                required
                accept=".pdf"
                onChange={(e) => setCvFile(e.target.files[0])}
                className="hidden"
                id="cv-upload"
              />
              <label
                htmlFor="cv-upload"
                className={clsx(
                  'w-full flex items-center gap-4 px-12 py-4 bg-gray-50/50 border border-gray-100 rounded-2xl cursor-pointer hover:bg-white hover:border-primary transition-all duration-300',
                  fieldErrors.cv && 'border-red-500'
                )}
              >
                <Icon
                  name="Upload"
                  size={20}
                  className={cvFile ? 'text-green-500' : 'text-gray-400'}
                />
                <span className={cvFile ? 'text-gray-800' : 'text-gray-400'}>
                  {cvFile ? cvFile.name : 'Seleccionar archivo PDF (máx. 5MB)'}
                </span>
              </label>
            </div>
            {fieldErrors.cv && (
              <span className="text-xs text-red-500 ml-4 mt-1">{fieldErrors.cv[0]}</span>
            )}
          </div>
        )}

        {/* MESSAGE */}
        <div className="flex flex-col gap-1">
          <InputWrapper
            icon="MessageSquare"
            label={t('form.message')}
            isFocused={focusedField === 'message'}
            hasValue={form.message}
            isTextarea={true}
          >
            <textarea
              required
              value={form.message}
              onFocus={() => setFocusedField('message')}
              onBlur={() => setFocusedField(null)}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className={clsx(
                inputClass,
                'h-44 pt-5 resize-none',
                fieldErrors.message && 'border-red-500'
              )}
              placeholder=" "
              disabled={isSubmitting}
            />
          </InputWrapper>
          {fieldErrors.message && (
            <span className="text-xs text-red-500 ml-4">{fieldErrors.message[0]}</span>
          )}
        </div>

        {errorMessage && (
          <div className="bg-red-50 text-red-500 p-4 rounded-xl text-sm font-medium animate-fadeIn flex items-center gap-3">
            <Icon name="AlertCircle" size={18} />
            {errorMessage}
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="group w-full bg-primary hover:bg-primary-light text-white py-4 rounded-2xl font-bold shadow-xl shadow-primary/30 transition-all duration-300 active:scale-[0.97] flex items-center justify-center gap-3 mt-2 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              <Poppins text={t('form.send')} tag="span" weight="bold" color="white" />
              <Icon
                name="Send"
                size={20}
                className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
              />
            </>
          )}
        </button>
      </form>
    </div>
  );
}
