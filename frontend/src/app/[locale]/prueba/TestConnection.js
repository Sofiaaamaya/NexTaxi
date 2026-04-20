'use client';
import { useEffect } from "react";

export default function TestConnection() {
  useEffect(() => {
    const testConnection = async () => {
      try {
        const res = await fetch('http://localhost:8000/api/ping');
        const data = await res.json();
        console.log('Respuesta del backend:', data);
      } catch (error) {
        console.error('Error conectando al backend:', error);
      }
    };

    testConnection();
  }, []);

  return <p>Conectando...</p>;
}
