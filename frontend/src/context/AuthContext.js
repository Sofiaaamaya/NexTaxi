// src/context/AuthContext.js — CORREGIDO (usa token, no cookies)
'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import {
  login as loginFn,
  register as registerFn,
  logout as logoutFn,
  getUser,
  googleLogin as googleLoginFn,
} from '@/lib/auth';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  // Inicialización inmediata para evitar parpadeos y errores de "Forbidden"
  const [user, setUser] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = getUser();
      const token = sessionStorage.getItem('token');
      // Si no hay token, no hay usuario (evita estados inconsistentes)
      return token ? stored : null;
    }
    return null;
  });

  useEffect(() => {
    // Escuchar cambios en otras pestañas o recargas
    const handleStorageChange = () => {
      const storedUser = getUser();
      const token = sessionStorage.getItem('token');
      setUser(token ? storedUser : null);
    };

    window.addEventListener('storage', handleStorageChange);

    // Logout automático opcional al cerrar si se desea ser estricto con sessionStorage
    // sessionStorage ya se borra al cerrar la pestaña, pero podemos forzar el estado
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const login = async ({ email, password }) => {
    try {
      const data = await loginFn({ email, password });
      if (data.token) {
        setUser(data.user);
        return { success: true };
      }
      return {
        success: false,
        error: data.data?.error || data.data?.message || 'Error al iniciar sesión',
      };
    } catch {
      return { success: false, error: 'Error de conexión' };
    }
  };

  const register = async (form) => {
    try {
      const data = await registerFn(form);

      // Si data.error existe, es porque apiFetch detectó un 422, 401, 500, etc.
      if (data?.error) {
        return {
          success: false,
          errors: data.data?.errors, // Aquí están los campos en rojo { email: [...], nombre: [...] }
          error: data.data?.error || data.data?.message || 'Error en el servidor',
        };
      }

      // Si todo salió bien y tenemos token
      if (data?.token) {
        setUser(data.user);
        return { success: true };
      }

      return { success: false, error: 'Respuesta inesperada del servidor' };
    } catch {
      return { success: false, error: 'Error crítico en el cliente' };
    }
  };

  const googleLogin = async (token) => {
    try {
      const data = await googleLoginFn(token);
      if (data.token) {
        setUser(data.user);
        return { success: true };
      }
      return {
        success: false,
        error: data.data?.error || data.data?.message || 'Error al iniciar sesión con Google',
      };
    } catch {
      return { success: false, error: 'Error de conexión' };
    }
  };

  const logout = () => {
    logoutFn();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, googleLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
