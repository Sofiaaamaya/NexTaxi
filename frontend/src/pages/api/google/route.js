export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { origin, destination } = req.body;
  try {
    const backendRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/google/route`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ origin, destination }),
    });
    const data = await backendRes.json();
    res.status(backendRes.status).json(data);
  } catch (e) {
    res.status(500).json({ error: 'Error en el proxy de ruta' });
  }
}
