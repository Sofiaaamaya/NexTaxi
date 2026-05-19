import { NextResponse } from 'next/server';

const SYSTEM_PROMPT = `Eres un asistente virtual de taxi para la isla de Lanzarote...`;

export async function POST(req) {
  const { messages } = await req.json();

  const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...messages],
      max_tokens: 200,
      temperature: 0.5,
    }),
  });

  const data = await res.json();
  const reply = data.choices?.[0]?.message?.content ?? '';
  return NextResponse.json({ reply });
}
