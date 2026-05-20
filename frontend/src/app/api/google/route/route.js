export async function POST(request) {
  try {
    const { origin, destination } = await request.json();

    const backendRes = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/google/route`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ origin, destination }),
      }
    );

    const data = await backendRes.json();

    return new Response(JSON.stringify(data), {
      status: backendRes.status,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Error en el proxy de ruta' }),
      { status: 500 }
    );
  }
}
