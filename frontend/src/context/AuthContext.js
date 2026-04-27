// src/context/AuthContext.js — CORREGIDO (usa token, no cookies)
'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { login as loginFn, register as registerFn, logout as logoutFn, getUser } from '@/lib/auth';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Cargar usuario desde localStorage al montar
    const stored = getUser();
    if (stored) setUser(stored);
  }, []);

  const login = async ({ email, password }) => {
    try {
      const data = await loginFn(email, password);
      if (data.token) {
        setUser(data.user);
        return { success: true };
      }
      return { success: false, error: data.message || 'Error al iniciar sesión' };
    } catch (e) {
      return { success: false, error: 'Error de conexión' };
    }
  };

  const register = async (form) => {
    try {
      const data = await registerFn(
        form.nombre,
        form.email,
        form.password,
        form.password_confirmation
      );

      // Si data.error existe, es porque apiFetch detectó un 422, 401, 500, etc.
      if (data?.error) {
        return {
          success: false,
          errors: data.data.errors, // Aquí están los campos en rojo { email: [...], nombre: [...] }
          message: data.data.message,
        };
      }

      // Si todo salió bien y tenemos token
      if (data?.token) {
        setUser(data.user);
        return { success: true };
      }

      return { success: false, message: 'Respuesta inesperada del servidor' };
    } catch (e) {
      return { success: false, message: 'Error crítico en el cliente' };
    }
  };

  const logout = () => {
    logoutFn();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
