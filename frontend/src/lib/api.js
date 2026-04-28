const API_URL = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000') + '/api';

export async function apiFetch(endpoint, options = {}) {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  try {
    const res = await fetch(API_URL + endpoint, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        ...(token && { Authorization: 'Bearer ' + token }),
        ...options.headers,
      },
    });

    // Intentamos obtener el JSON. Si no es JSON, capturamos el error.
    const data = await res.json();

    if (!res.ok) {
      // Devolvemos un objeto estructurado con el error y el status
      return { error: true, status: res.status, data };
    }

    return data;
  } catch {
    return { error: true, status: 500, data: { message: 'Error de conexión' } };
  }
}
