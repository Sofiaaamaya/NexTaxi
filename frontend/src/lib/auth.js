import { apiFetch } from "./api";

// LOGIN
export async function login(email, password) {
  const data = await apiFetch("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

  if (data.token) {
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
  }

  return data;
}

// REGISTER
export async function register(nombre, email, password, password_confirmation) {
  return apiFetch("/auth/register", {
    method: "POST",
    body: JSON.stringify({
      nombre,
      email,
      password,
      password_confirmation,
    }),
  });
}

// LOGOUT
export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
}

// USER
export function getUser() {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
}

// AUTH CHECK
export function isAuthenticated() {
  return !!localStorage.getItem("token");
}