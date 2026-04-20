'use client';

import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    token: null,
    user: null,
  });

  // Cargar sesión desde localStorage al iniciar
  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    if (token && user) {
      setAuthState({
        isAuthenticated: true,
        token,
        user: JSON.parse(user),
      });
    }
  }, []);

  // LOGIN
  const login = ({ token, user }) => {
    setAuthState({
      isAuthenticated: true,
      token,
      user,
    });

    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  };

  // LOGOUT
  const logout = () => {
    setAuthState({
      isAuthenticated: false,
      token: null,
      user: null,
    });

    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
