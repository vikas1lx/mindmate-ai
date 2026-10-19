/**
 * aiResponses.js
 * Placeholder AI response generator.
 * Replace `generateResponse` with a real LLM API call (OpenAI, Gemini, etc.)
 *
 * Each mode has 2-3 pre-written sample responses so the demo works offline.
 */

// ─── Sample responses per topic ─────────────────────────────────────────────
const SAMPLE_RESPONSES = {
  'low-motivation': [
    {
      empathy: "I can feel the heaviness in your words — that stuck, drained feeling is real and it's exhausting.",
      understanding: "Low motivation often comes from emotional depletion, not laziness. Your mind and body are asking for a moment of kindness before pushing forward.",
      steps: [
        "Start with the tiniest possible action — open the document, pick up the pen.",
        "Use the 2-minute rule: commit to just 2 minutes of work, then you can stop.",
        "Remove one visible distraction from your space right now.",
        "Put on background lo-fi music — it signals 'work mode' to your brain.",
      ],
      todayAction: "Set a 10-minute timer and work on just one small task. That's your win for today.",
    },
    {
      empathy: "Feeling unmotivated doesn't make you weak — it makes you human. Be gentle with yourself right now.",
      understanding: "When we're overwhelmed by big goals, our brain shuts down to protect us. The solution is making things smaller, not pushing harder.",
      steps: [
        "Write down the one smallest next action for your main task.",
        "Celebrate micro-wins: ticking even one tiny box releases dopamine.",
        "Take a 10-minute walk before starting — movement changes mood faster than anything.",
        "Tell someone your plan for today — accountability doubles follow-through.",
      ],
      todayAction: "Text one friend: 'I'm going to do [one small thing] today.' Then do it.",
    },
  ],
  'exam-stress': [
    {
      empathy: "The pressure you're feeling is real — and it shows how much you care. That caring is actually a strength.",
      understanding: "Exam anxiety often comes from trying to hold too much uncertainty at once. Let's convert that vague fear into a concrete plan.",
      steps: [
        "List all your upcoming exams on one page with dates.",
        "Pick the highest-priority exam and identify the 3 most important topics.",
        "Study in 25-minute focused blocks with 5-minute breaks.",
        "Before bed, review only summaries — not new material.",
      ],
      todayAction: "Make that exam list right now. Just getting it out of your head and onto paper will reduce anxiety significantly.",
    },
    {
      empathy: "I hear you. Exam season feels like the whole world is watching — and that weight is genuinely heavy.",
      understanding: "Your brain under stress learns less efficiently. The most important exam prep you can do is also manage your nervous system.",
      steps: [
        "Practice box breathing for 4 minutes before studying.",
        "Teach the topic to an imaginary student — this is the most effective revision method.",
        "Sleep 7-8 hours before the exam; memory consolidates during sleep.",
        "Eat a protein-rich breakfast on exam day — it stabilizes blood sugar and focus.",
      ],
      todayAction: "Pick one chapter. Teach it out loud to yourself or a wall. You'll be surprised how much you know.",
    },
  ],
  'loneliness': [
    {
      empathy: "Loneliness is one of the most painful human feelings — and you're not alone in feeling alone. That sounds contradictory, but it's true.",
      understanding: "Loneliness isn't about how many people are around you — it's about feeling truly seen and heard. That's a deep human need, and it's valid.",
      steps: [
        "Send one message to someone you haven't spoken to in a while.",
        "Join one community around something you love — it could be online.",
        "Practice being a good friend to yourself today.",
        "Volunteer somewhere local — service is a powerful antidote to isolation.",
      ],
      todayAction: "Send one genuine message to someone today. Not a meme — a real 'I've been thinking of you.'",
    },
  ],
  'general': [
    {
      empathy: "Thank you for sharing this with me. What you're feeling is valid, and I'm here to support you through it.",
      understanding: "Every challenge we face has layers — emotional, practical, and sometimes physical. It's okay to feel overwhelmed when multiple things pile up at once.",
      steps: [
        "Take a moment to breathe and acknowledge what you're going through.",
        "Identify the one thing that feels most urgent right now.",
        "Break that thing into the smallest possible first step.",
        "Reach out to one person in your life who makes you feel safe.",
        "Be kind to yourself — you are doing better than you think.",
      ],
      todayAction: "Write down three things that are going okay right now, no matter how small. This rewires your focus toward what's working.",
    },
    {
      empathy: "I hear you, and I want you to know that reaching out — even to an AI — takes courage. That courage is already inside you.",
      understanding: "Sometimes our minds create problems that feel bigger than they are, and sometimes our problems are genuinely hard. Either way, you deserve support.",
      steps: [
        "Journal for 5 minutes about exactly what's bothering you.",
        "Ask yourself: Is this in my control? If yes, what's one action I can take?",
        "Move your body — even a 5-minute walk shifts your emotional state.",
        "Set a timer: allow yourself to feel the emotion fully for 10 minutes, then redirect.",
        "Connect with one person today, even just a brief check-in.",
      ],
      todayAction: "Do one tiny act of self-care that you've been putting off: sleep earlier, eat something nourishing, or take a real break.",
    },
    {
      empathy: "Your feelings matter. The fact that you're seeking support shows real self-awareness and strength.",
      understanding: "Difficult moments are not permanent, even when they feel endless. Your nervous system is responding to real stress — and it can be regulated.",
      steps: [
        "Ground yourself: name 5 things you can see right now.",
        "Drink a glass of water — dehydration amplifies negative emotions.",
        "Write the problem clearly: often, naming it reduces its power.",
        "Think of one person who believes in you. What would they say right now?",
        "Take one small action today — not to fix everything, just to move forward an inch.",
      ],
      todayAction: "Text or call one person who makes you feel better. Just say hi. Connection is medicine.",
    },
  ],
};

// ─── Crisis keyword detection ────────────────────────────────────────────────
const CRISIS_KEYWORDS = [
  'kill myself',
  'end my life',
  'suicide',
  'suicidal',
  'want to die',
  'self harm',
  'self-harm',
  'hurt myself',
  'cut myself',
  'no reason to live',
  'cannot go on',
  'not worth living',
  'disappear forever',
  'overdose',
  'end it all',
];

export function detectCrisis(text) {
  const lower = text.toLowerCase();
  return CRISIS_KEYWORDS.some(kw => lower.includes(kw));
}

// ─── Main response generator ─────────────────────────────────────────────────
/**
 * generateResponse(prompt, modeId?)
 *
 * Returns a structured response object:
 * { empathy, understanding, steps[], todayAction }
 *
 * TODO: Replace the body of this function with a real LLM API call:
 *
 * const response = await fetch('https://api.openai.com/v1/chat/completions', {
 *   method: 'POST',
 *   headers: { 'Authorization': `Bearer ${YOUR_API_KEY}`, 'Content-Type': 'application/json' },
 *   body: JSON.stringify({
 *     model: 'gpt-4o',
 *     messages: [
 *       { role: 'system', content: SYSTEM_PROMPT },
 *       { role: 'user', content: prompt }
 *     ]
 *   })
 * });
 * const data = await response.json();
 * return parseStructuredResponse(data.choices[0].message.content);
 */
export async function generateResponse(prompt, modeId = null) {
  // Simulate network latency for a realistic demo
  await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000));

  // Pick from mode-specific responses if available, else use general pool
  const pool = SAMPLE_RESPONSES[modeId] || SAMPLE_RESPONSES['general'];
  const response = pool[Math.floor(Math.random() * pool.length)];

  return { ...response };
}

// ─── Chat reply generator (for the chat panel) ───────────────────────────────
const CHAT_REPLIES = [
  "That sounds really tough. Can you tell me more about when this feeling started?",
  "I hear you. What part of this feels most overwhelming right now?",
  "You're not alone in this. Have you been able to talk to anyone else about it?",
  "That makes a lot of sense given what you're going through. What would feel like a small step forward?",
  "Thank you for sharing that with me. How long have you been carrying this?",
  "It takes real courage to talk about this. What does your gut tell you about what you need right now?",
  "I'm here with you. Would it help to try a quick breathing exercise together?",
  "That sounds exhausting. Please be kind to yourself — you're dealing with a lot.",
  "What's one thing, however small, that made you smile this week?",
  "You deserve support. Have you considered speaking with a counselor? iCall (9152987821) is free and confidential.",
];

export async function generateChatReply(message) {
  await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 700));
  return CHAT_REPLIES[Math.floor(Math.random() * CHAT_REPLIES.length)];
}
