'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();
const API_URL = "http://localhost:8000/api";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        localStorage.removeItem("user");
      }
    }
  }, []);

  // LOGIN
  const login = async ({ email, password }) => {
    try {
      const res = await fetch(`${API_URL}/auth/login`, { 
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json", 
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok && data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        setUser(data.user);
        return { success: true };
      }

      return { success: false, error: data.message || "Credenciales incorrectas" };

    } catch (err) {
      return { success: false, error: "Error de conexión" };
    }
  };

  // REGISTER
  const register = async (form) => {
    const url = `${API_URL}/auth/register`;
    console.log("Enviando a:", url); // <--- MIRA ESTO EN LA CONSOLA DEL NAVEGADOR

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json", // Indispensable para que Laravel no use sesiones
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        if (data.token) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          setUser(data.user);
        }
        return { success: true, data };
      }

      return { success: false, errors: data.errors || data.message };

    } catch (err) {
      return { success: false, error: "Error de conexión" };
    }
  };

  // LOGOUT
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
};
