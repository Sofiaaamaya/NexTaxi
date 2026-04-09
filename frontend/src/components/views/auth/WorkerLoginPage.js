'use client';

import { useTranslations } from 'next-intl';
import TitleComponent from '../../../components/common/TitleComponent';
import Poppins from '../../../components/ui/Poppins';
import Link from 'next/link';
import { useAuth } from '../../../context/AuthContext';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Icon from '../../../components/icons/Icon';

export default function WorkerLoginPage() {
  const t = useTranslations('workerLogin');
  const { login } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('driver');

  const handleSubmit = (e) => {
    e.preventDefault();

    login({
      name: 'Trabajador',
      email,
      role,
    });

    if (role === 'driver') {
      router.push('/driver/dashboard');
    } else if (role === 'supervisor') {
      router.push('/supervisor/dashboard');
    }
  };

  return (
    <section className="mt-20 py-20 max-w-2xl mx-auto rounded-2xl bg-surface border border-border shadow-xl">
      <div className="max-w-md mx-auto px-6">
        <TitleComponent align="left" title={t('title')} subtitle={t('subtitle')} />

        <form onSubmit={handleSubmit} className="mt-10 flex flex-col gap-6">
          {/* Email */}
          <div className="flex flex-col gap-2">
            <Poppins
              text={t('email')}
              tag="label"
              size="14|18"
              color="textPrimary"
              weight="medium"
            />
            <input
              type="email"
              placeholder="empleado@empresa.com"
              className="input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <Poppins
                text={t('password')}
                tag="label"
                size="14|18"
                color="textPrimary"
                weight="medium"
              />
              <Link href="/forgot-password">
                <Poppins
                  text={t('forgot')}
                  tag="span"
                  size="12|16"
                  className="text-primary hover:text-primary-light cursor-pointer"
                />
              </Link>
            </div>

            <input
              type="password"
              placeholder="••••••••"
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Roles */}
          <div className="mt-4">
            <Poppins
              text={t('roleTitle')}
              tag="p"
              size="14|18"
              weight="medium"
              color="textPrimary"
              className="mb-3"
            />

            <div className="grid grid-cols-2 gap-4">
              {/* Conductor */}
              <button
                type="button"
                onClick={() => setRole('driver')}
                className={`
                  py-4 px-4 rounded-xl border flex flex-col items-center gap-2 transition
                  bg-white
                  ${
                    role === 'driver'
                      ? 'border-blue-500 text-blue-600 shadow-sm'
                      : 'border-border hover:bg-background'
                  }
                `}
              >
                <Icon
                  name="Car"
                  size={28}
                  className={role === 'driver' ? 'text-blue-600' : 'text-textSecondary'}
                />
                <Poppins text={t('driver')} tag="span" size="16|20" weight="medium" />
              </button>

              {/* Supervisor */}
              <button
                type="button"
                onClick={() => setRole('supervisor')}
                className={`
                  py-4 px-4 rounded-xl border flex flex-col items-center gap-2 transition
                  bg-white
                  ${
                    role === 'supervisor'
                      ? 'border-blue-500 text-blue-600 shadow-sm'
                      : 'border-border hover:bg-background'
                  }
                `}
              >
                <Icon
                  name="IdCard"
                  size={28}
                  className={role === 'supervisor' ? 'text-blue-600' : 'text-textSecondary'}
                />
                <Poppins text={t('supervisor')} tag="span" size="16|20" weight="medium" />
              </button>
            </div>
          </div>

          {/* Botón principal dinámico */}
          <button
            type="submit"
            className="w-full px-6 py-4 rounded-xl bg-primary text-white hover:bg-primary-light transition mt-6"
          >
            <Poppins
              text={role === 'driver' ? 'Entrar como Conductor' : 'Entrar como Supervisor'}
              tag="span"
              weight="medium"
              color="textWhite"
            />
          </button>
        </form>

        {/* Footer legal */}
        <p className="text-xs text-textSecondary text-center mt-10">{t('legal')}</p>
      </div>
    </section>
  );
}
