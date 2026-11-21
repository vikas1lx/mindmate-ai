// Vercel serverless function: POST /api/chat
// Uses the Google Gemini API. The key stays on the server (env var GEMINI_API_KEY),
// never in the browser. Optional env var GEMINI_MODEL overrides the model.

const MODEL = process.env.GEMINI_MODEL || 'gemini-3.5-flash-lite';

const SYSTEM_PROMPT = `You are MindMate, a warm, calm AI wellness companion for students in India.
- Reply to the SPECIFIC problem the user describes. Never give a generic reply.
- Keep it short: 3-5 sentences, plain friendly language. Simple English is fine; mirror the user's language if they write in Hindi/Hinglish.
- Structure: one line of real empathy, one useful insight, one small practical step they can do today, then one gentle follow-up question.
- You are not a doctor or therapist. Do not diagnose or give medical advice.
- If the user mentions self-harm, suicide, or being in danger, respond with care and share Tele-MANAS 14416 (24/7, toll-free) and encourage reaching a trusted person.
- If a focus topic is provided, keep it in mind but follow what the user actually says.`;

// Gemini needs roles "user" / "model", starting with "user" and alternating.
function cleanMessages(raw) {
  const out = [];
  for (const m of (Array.isArray(raw) ? raw : []).slice(-12)) {
    const role = m?.role === 'ai' || m?.role === 'assistant' || m?.role === 'model' ? 'model' : 'user';
    const text = String(m?.text ?? m?.content ?? '').slice(0, 2000).trim();
    if (!text) continue;
    if (!out.length && role !== 'user') continue; // must start with user
    if (out.length && out[out.length - 1].role === role) {
      out[out.length - 1].parts[0].text += `\n${text}`; // merge same-role neighbours
    } else {
      out.push({ role, parts: [{ text }] });
    }
  }
  return out;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'Server is missing GEMINI_API_KEY' });

  const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {};
  const contents = cleanMessages(body.messages);
  if (!contents.length || contents[contents.length - 1].role !== 'user') {
    return res.status(400).json({ error: 'Send at least one user message' });
  }

  const topic = String(body.topic || '').slice(0, 80);
  const system = topic ? `${SYSTEM_PROMPT}\n\nFocus topic chosen by the user: ${topic}` : SYSTEM_PROMPT;

  try {
    const r = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(MODEL)}:generateContent`,
      {
        method: 'POST',
        headers: { 'content-type': 'application/json', 'x-goog-api-key': apiKey },
        body: JSON.stringify({ system_instruction: { parts: [{ text: system }] }, contents }),
      },
    );

    if (!r.ok) {
      const detail = await r.text();
      console.error('Gemini API error', r.status, detail);
      return res.status(502).json({ error: 'AI service error' });
    }

    const data = await r.json();
    const parts = data?.candidates?.[0]?.content?.parts || [];
    const reply = parts.map((p) => p.text || '').join('').trim();
    if (!reply) return res.status(502).json({ error: 'Empty AI reply' });
    return res.status(200).json({ reply });
  } catch (err) {
    console.error('Chat function failed', err);
    return res.status(500).json({ error: 'Something went wrong' });
  }
}
