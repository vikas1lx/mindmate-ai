// Vercel serverless function: POST /api/chat
// Keeps the API key on the server (env var ANTHROPIC_API_KEY), never in the browser.

const MODEL = 'claude-haiku-5-5';

const SYSTEM_PROMPT = `You are MindMate, a warm, calm AI wellness companion for students in India.
- Reply to the SPECIFIC problem the user describes. Never give a generic reply.
- Keep it short: 3-5 sentences, plain friendly language. Simple English is fine; mirror the user's language if they write in Hindi/Hinglish.
- Structure: one line of real empathy, one useful insight, one small practical step they can do today, then one gentle follow-up question.
- You are not a doctor or therapist. Do not diagnose or give medical advice.
- If the user mentions self-harm, suicide, or being in danger, respond with care and share Tele-MANAS 14416 (24/7, toll-free) and encourage reaching a trusted person.
- If the focus topic is provided, keep it in mind but follow what the user actually says.`;

// Anthropic needs: starts with "user", roles alternate. Clean the history to fit.
function cleanMessages(raw) {
  const out = [];
  for (const m of (Array.isArray(raw) ? raw : []).slice(-12)) {
    const role = m?.role === 'ai' || m?.role === 'assistant' ? 'assistant' : 'user';
    const content = String(m?.text ?? m?.content ?? '').slice(0, 2000).trim();
    if (!content) continue;
    if (!out.length && role !== 'user') continue; // must start with user
    if (out.length && out[out.length - 1].role === role) {
      out[out.length - 1].content += `\n${content}`; // merge same-role neighbours
    } else {
      out.push({ role, content });
    }
  }
  return out;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'Server is missing ANTHROPIC_API_KEY' });

  const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {};
  const messages = cleanMessages(body.messages);
  if (!messages.length || messages[messages.length - 1].role !== 'user') {
    return res.status(400).json({ error: 'Send at least one user message' });
  }

  const topic = String(body.topic || '').slice(0, 80);
  const system = topic ? `${SYSTEM_PROMPT}\n\nFocus topic chosen by the user: ${topic}` : SYSTEM_PROMPT;

  try {
    const r = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({ model: MODEL, max_tokens: 400, system, messages }),
    });

    if (!r.ok) {
      const detail = await r.text();
      console.error('Anthropic API error', r.status, detail);
      return res.status(502).json({ error: 'AI service error' });
    }

    const data = await r.json();
    const reply = (data.content || []).filter((b) => b.type === 'text').map((b) => b.text).join('\n').trim();
    if (!reply) return res.status(502).json({ error: 'Empty AI reply' });
    return res.status(200).json({ reply });
  } catch (err) {
    console.error('Chat function failed', err);
    return res.status(500).json({ error: 'Something went wrong' });
  }
}
