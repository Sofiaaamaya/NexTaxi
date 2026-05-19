'use client';

import { useState, useRef, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import Poppins from '@/components/ui/Poppins';
import Icon from '@/components/icons/Icon';
import Image from 'next/image';
import { apiFetch } from '@/lib/api';

const ReadOnlyField = ({ label, value, icon }) => (
  <div className="flex flex-col gap-2">
    <label className="text-sm font-medium text-gray-500 flex items-center gap-2">
      {icon && <Icon name={icon} size={16} />}
      {label}
    </label>
    <div className="bg-gray-50 border border-gray-100 px-4 py-3 rounded-xl text-gray-700 font-medium">
      {value || '—'}
    </div>
  </div>
);

export default function ProfileView() {
  const { user, setUser } = useAuth();
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [passLoading, setPassLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !user) return null;

  const handlePhotoChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);
    setMessage(null);
    setError(null);

    const formData = new FormData();
    formData.append('foto_perfil', file);

    try {
      const token = sessionStorage.getItem('token');
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/perfil`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
          },
          body: formData,
        }
      );

      const data = await res.json();

      if (res.ok) {
        // Actualizamos el usuario en el contexto
        const updatedUser = { ...user, foto_perfil: data.user.foto_perfil };
        if (typeof setUser === 'function') {
          setUser(updatedUser);
        }
        sessionStorage.setItem('user', JSON.stringify(updatedUser));
        setMessage('Foto de perfil actualizada correctamente');
      } else {
        setError(data.message || 'Error al actualizar la foto');
      }
    } catch (err) {
      setError('Error de conexión al subir la imagen');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    setPassLoading(true);
    setMessage(null);
    setError(null);

    try {
      const res = await apiFetch('/auth/forgot-password', {
        method: 'POST',
        body: JSON.stringify({ email: user.email }),
      });

      if (!res.error) {
        setMessage('Se ha enviado un correo para restablecer tu contraseña');
      } else {
        setError(res.data?.error || res.data?.message || 'Error al solicitar cambio de contraseña');
      }
    } catch (err) {
      setError('Error de conexión');
    } finally {
      setPassLoading(false);
    }
  };

  const profileImageUrl = user.foto_perfil
    ? `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/storage/${user.foto_perfil}`
    : '/images/imagen_perfil.webp';

  return (
    <div className="max-w-4xl mx-auto space-y-8 p-4 md:p-8">
      <div className="flex flex-col gap-2">
        <Poppins text="Mi perfil" tag="h1" size="24|32" weight="bold" />
        <Poppins
          text="Gestiona tu información personal y configuración de cuenta"
          color="textSecondary"
        />
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden p-8">
        {/* Alertas */}
        {message && (
          <div className="mb-6 bg-green-50 text-green-600 p-4 rounded-xl border border-green-100 flex items-center gap-3 animate-in fade-in">
            <Icon name="CheckCircle" size={20} />
            <Poppins text={message} size="14" weight="medium" />
          </div>
        )}
        {error && (
          <div className="mb-6 bg-red-50 text-red-600 p-4 rounded-xl border border-red-100 flex items-center gap-3 animate-in fade-in">
            <Icon name="AlertCircle" size={20} />
            <Poppins text={error} size="14" weight="medium" />
          </div>
        )}

        <div className="flex flex-col md:flex-row gap-12 items-start">
          {/* Avatar Section */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative group">
              <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-gray-50 shadow-md relative">
                <Image
                  src={profileImageUrl}
                  alt={user.nombre}
                  fill
                  sizes="(max-width: 768px) 160px, 160px"
                  className="object-cover"
                  unoptimized={!!user.foto_perfil}
                />
                {loading && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <div className="w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                  </div>
                )}
              </div>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-1 right-1 bg-primary text-white p-3 rounded-full shadow-lg hover:bg-primary-dark transition-colors active:scale-95"
                title="Cambiar foto"
              >
                <Icon name="Camera" size={20} />
              </button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handlePhotoChange}
                accept="image/*"
                className="hidden"
              />
            </div>
            <Poppins text="Foto de perfil" weight="medium" size="14" />
          </div>

          {/* Form Section (Read Only) */}
          <div className="flex-1 w-full grid grid-cols-1 md:grid-cols-2 gap-6">
            <ReadOnlyField label="Nombre completo" value={user.nombre} icon="User" />
            <ReadOnlyField label="Correo electrónico" value={user.email} icon="Mail" />
            <ReadOnlyField label="Teléfono" value={user.telefono} icon="Phone" />
            <ReadOnlyField label="Rol del sistema" value={user.rol?.toUpperCase()} icon="Shield" />

            <div className="md:col-span-2 pt-6 border-t border-gray-100 mt-4">
              <div className="flex flex-col gap-4">
                <div className="flex flex-col">
                  <Poppins text="Seguridad" weight="bold" size="18" />
                  <Poppins text="Gestiona el acceso a tu cuenta" size="14" color="textSecondary" />
                </div>

                <div className="flex items-center justify-between bg-gray-50 p-6 rounded-2xl border border-gray-100">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-primary shadow-sm">
                      <Icon name="Lock" size={24} />
                    </div>
                    <div>
                      <Poppins text="Contraseña" weight="semibold" />
                      <Poppins
                        text="Cambia tu contraseña periódicamente"
                        size="12"
                        color="textSecondary"
                      />
                    </div>
                  </div>

                  <button
                    onClick={handleForgotPassword}
                    disabled={passLoading}
                    className="bg-white border border-gray-200 px-6 py-2.5 rounded-xl font-bold text-primary hover:bg-primary hover:text-white hover:border-primary transition-all flex items-center gap-2 disabled:opacity-50"
                  >
                    {passLoading ? (
                      <div className="w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                    ) : (
                      'Cambiar contraseña'
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
