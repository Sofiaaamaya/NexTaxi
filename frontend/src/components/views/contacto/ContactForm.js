'use client';

import { useState } from 'react';
import Poppins from '@/components/ui/Poppins';
import Icon from '@/components/icons/Icon';

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
  const [focusedField, setFocusedField] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const mailtoUrl = `mailto:soporte@://nextaxi.com{encodeURIComponent(form.subject)}&body=${encodeURIComponent(`De: ${form.email}\n\nMensaje:\n${form.message}`)}`;
    window.location.href = mailtoUrl;
  };

  const inputClass =
    'w-full pl-12 pr-4 py-4 bg-gray-50/50 border border-gray-100 rounded-2xl outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary focus:bg-white transition-all duration-300';

  return (
    /* AQUÍ ESTÁ LA SOMBRA MEJORADA */
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
            className={inputClass}
            placeholder=" "
          />
        </InputWrapper>

        {/* SUBJECT */}
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
            className={`${inputClass} appearance-none cursor-pointer`}
          >
            <option value="" disabled hidden></option>
            <option value="Soporte Técnico">Soporte Técnico</option>
            <option value="Oportunidades de Empleo">Quiero ser conductor</option>
            <option value="Otro">Otro asunto</option>
          </select>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
            <Icon name="ChevronDown" size={20} />
          </div>
        </InputWrapper>

        {/* MESSAGE */}
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
            className={`${inputClass} h-44 pt-5 resize-none`}
            placeholder=" "
          />
        </InputWrapper>

        <button
          type="submit"
          className="group w-full bg-primary hover:bg-primary-light text-white py-4 rounded-2xl font-bold shadow-xl shadow-primary/30 transition-all duration-300 active:scale-[0.97] flex items-center justify-center gap-3 mt-2"
        >
          <Poppins text={t('form.send')} tag="span" weight="bold" color="white" />
          <Icon
            name="Send"
            size={20}
            className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
          />
        </button>
      </form>
    </div>
  );
}
