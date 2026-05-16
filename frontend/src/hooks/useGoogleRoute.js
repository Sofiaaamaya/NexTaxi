import { useState, useCallback } from 'react';

export function useGoogleRoute(origin, destination) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRoute = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/google/route', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ origin, destination }),
      });
      if (!res.ok) throw new Error('Error obteniendo la ruta');
      const json = await res.json();
      setData(json);
    } catch (err) {
      setError(err.message);
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [origin, destination]);

  return { data, loading, error, fetchRoute };
}
