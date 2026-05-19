import { apiFetch } from './api';

export async function login({ email, password }) {
  const data = await apiFetch('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });

  if (data.token) {
    sessionStorage.setItem('token', data.token);
    sessionStorage.setItem('user', JSON.stringify(data.user));
  }

  return data;
}

export async function register(formData) {
  const data = await apiFetch('/auth/register', {
    method: 'POST',
    body: JSON.stringify(formData),
  });

  if (data.token) {
    sessionStorage.setItem('token', data.token);
    sessionStorage.setItem('user', JSON.stringify(data.user));
  }

  return data;
}

export async function googleLogin(token) {
  const data = await apiFetch('/auth/google', {
    method: 'POST',
    body: JSON.stringify({ token }),
  });

  if (data.token) {
    sessionStorage.setItem('token', data.token);
    sessionStorage.setItem('user', JSON.stringify(data.user));
  }

  return data;
}

export function logout() {
  sessionStorage.removeItem('token');
  sessionStorage.removeItem('user');
}

export function getUser() {
  const user = sessionStorage.getItem('user');
  return user ? JSON.parse(user) : null;
}

export function isAuthenticated() {
  return !!sessionStorage.getItem('token');
}
