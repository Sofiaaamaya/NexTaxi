// src/lib/auth.js — CORREGIDO
import { apiFetch } from './api';

export async function login(email, password) {
  const data = await apiFetch('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });

  if (data.token) {
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
  }

  return data;
}

export async function register(nombre, email, password, password_confirmation) {
  const data = await apiFetch('/auth/register', {
    method: 'POST',
    body: JSON.stringify({ nombre, email, password, password_confirmation }),
  });

  // ✅ ESTO FALTABA — guardar el token tras el registro igual que en login
  if (data.token) {
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
  }

  return data;
}

export function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
}

export function getUser() {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
}

export function isAuthenticated() {
  return !!localStorage.getItem('token');
}
