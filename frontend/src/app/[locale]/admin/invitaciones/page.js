'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { apiFetch } from '@/lib/api';
import Poppins from '@/components/ui/Poppins';
import TitleComponent from '@/components/common/TitleComponent';
import Icon from '@/components/icons/Icon';

export default function InvitationsPage() {
  const t = useTranslations('adminInvitations');
  const [email, setEmail] = useState('');
  const [rol, setRol] = useState('conductor');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: '', type: '' });

    const res = await apiFetch('/admin/invitar', {
      method: 'POST',
      body: JSON.stringify({ email, rol }),
    });

    setLoading(false);

    if (res.error) {
      setMessage({ 
        text: res.data?.message || t('error'), 
        type: 'error' 
      });
    } else {
      setMessage({ text: t('success'), type: 'success' });
      setEmail('');
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <TitleComponent 
        title={t('title')} 
        subtitle={t('subtitle')} 
        align="left"
      />

      <div className="mt-8 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">{t('emailLabel')}</label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <Icon name="Mail" size={20} />
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all"
                placeholder="ejemplo@correo.com"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">{t('roleLabel')}</label>
            <div className="grid grid-cols-3 gap-3">
              {['admin', 'gerente', 'conductor'].map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRol(r)}
                  className={`py-3 px-4 rounded-xl border text-sm font-medium transition-all ${
                    rol === r
                      ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20'
                      : 'bg-white border-gray-100 text-gray-500 hover:border-primary/30'
                  }`}
                >
                  {t(`roles.${r}`)}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary hover:bg-primary-dark text-white py-4 rounded-xl font-bold shadow-lg shadow-primary/25 transition-all active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-70 mt-4"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <Icon name="Send" size={18} />
                <Poppins text={t('sendButton')} tag="span" weight="medium" color="white" />
              </>
            )}
          </button>

          {message.text && (
            <div className={`p-4 rounded-xl text-sm font-medium flex items-center gap-3 ${
              message.type === 'success' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
            }`}>
              <Icon name={message.type === 'success' ? 'CheckCircle' : 'AlertCircle'} size={20} />
              {message.text}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
