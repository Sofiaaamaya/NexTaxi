'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Cargar usuario al iniciar
  useEffect(() => {
    checkUser();
  }, []);

  // Obtener cookie CSRF
  const csrf = () =>
    fetch(`${API_URL}/sanctum/csrf-cookie`, {
      method: "GET",
      credentials: "include",
    });

  // Verificar usuario logueado
  const checkUser = async () => {
    try {
      const res = await fetch(`${API_URL}/api/auth/me`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Accept": "application/json",
        },
      });

      if (res.ok) {
        const data = await res.json();
        setUser(data);
      }
    } catch (e) {}
  };

  // LOGIN
  const login = async ({ email, password }) => {
    await csrf();

    const res = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      credentials: "include",
      headers: { 
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      await checkUser();
      return { success: true };
    }

    const data = await res.json();
    return { success: false, error: data.message || data.error };
  };

  // REGISTER
  const register = async (form) => {
    await csrf();

    const res = await fetch(`${API_URL}/api/auth/register`, {
      method: "POST",
      credentials: "include",
      headers: { 
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (res.ok) {
      await checkUser();
      return { success: true };
    }

    return { success: false, error: data.message || data.error || "Error en el registro" };
  };

  // LOGOUT
  const logout = async () => {
    await fetch(`${API_URL}/api/auth/logout`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Accept": "application/json",
      },
    });

    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
