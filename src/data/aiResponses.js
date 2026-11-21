/**
 * aiResponses.js
 * AI Response Generation & Safety Engine.
 * - Detects crisis/self-harm keywords
 * - Provides realistic, highly empathetic structured responses
 * - Connects to ChatPanel
 */
import { SUPPORT_MODES } from './supportModes';

// ─── Crisis keyword detection (Safety requirement) ──────────────────────────
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
  'cutting myself',
  'no reason to live',
  'cannot go on',
  'can not go on',
  "can't go on",
  'not worth living',
  'disappear forever',
  'overdose',
  'end it all',
  'hanging myself',
  'jump off',
  'slit my wrist',
  'take my life',
  'better off dead',
  'nobody would miss me',
];

export function detectCrisis(text) {
  if (!text || typeof text !== 'string') return false;
  const lower = text.toLowerCase().trim();
  return CRISIS_KEYWORDS.some(kw => lower.includes(kw));
}

// ─── Structured response generator ──────────────────────────────────────────
const MODE_RESPONSES = {
  'exam-stress': {
    empathy: "I hear the exhaustion and pressure in your voice. Exam season often tricks us into believing our entire future depends on a single week.",
    understanding: "When working memory is flooded with fear of failure, studying feels like trying to run underwater. Regulating your physiological state comes before cramming.",
    steps: [
      "Put away the full syllabus and write down only 2 high-yield concepts to review next.",
      "Use 25-minute Pomodoro sprints with 5-minute movement breaks (do not look at social media).",
      "Explain the summary of the topic out loud to yourself as if teaching a beginner.",
      "Ensure you get at least 6.5 hours of sleep before tomorrow; retention crystallizes during sleep.",
    ],
    todayAction: "Stop studying 45 minutes before sleep tonight. Drink warm water, dim the lights, and let your brain integrate what you learned.",
  },
  'sleep-trouble': {
    empathy: "Lying awake while the clock ticks into the early morning hours is uniquely frustrating and lonely.",
    understanding: "Insomnia is usually your sympathetic nervous system staying on guard. The harder you 'try' to force sleep, the more elusive it becomes.",
    steps: [
      "Get out of bed if you have been tossing for over 20 minutes; sit in low light and read a physical book.",
      "Practice 4-7-8 breathing: Inhale 4s, hold 7s, exhale 8s for 4 full cycles.",
      "Write a 'brain dump' on a physical pad of paper to park tomorrow's chores outside your head.",
      "Drop room temperature or open a window slightly; cooler temperatures trigger melatonin release.",
    ],
    todayAction: "Place your phone across the room or outside your bedroom tonight so you don't check the time when waking up.",
  },
  'overthinking': {
    empathy: "Your brain is spinning high-speed loops right now trying to protect you, but it's leaving you mentally depleted.",
    understanding: "Thoughts are cognitive events, not verified facts. Catastrophizing is your imagination assuming the worst possibility will automatically occur.",
    steps: [
      "Name the pattern: 'My mind is running the catastrophic scenario again.'",
      "Do the 5-4-3-2-1 grounding exercise to pull focus from mental simulations into your physical senses.",
      "Ask yourself: 'Can I take a physical action on this right now, or is it outside my current control?'",
      "Give yourself a 10-minute 'worry appointment' tomorrow afternoon, and defer non-urgent worries until then.",
    ],
    todayAction: "Splash cold water on your face and take 10 slow, full belly breaths right now to interrupt the feedback loop.",
  },
  'panic-attack': {
    empathy: "I am right here with you. Take a slow breath. What you are experiencing is intense, but you are not in danger and you are going to be okay.",
    understanding: "A panic attack is a temporary adrenaline wave. It peaks within minutes and naturally subsides as your body metabolizes the stress hormones.",
    steps: [
      "Plant both feet firmly onto the ground and feel the floor supporting your weight.",
      "Take a physiological sigh: two quick sniffs through your nose, then one long slow exhale through your mouth.",
      "Focus your eyes on 3 physical items in the room and name their colors out loud.",
      "Remind yourself: 'This is just adrenaline. It feels scary, but it cannot harm me. It will pass soon.'",
    ],
    todayAction: "Stay in your safe position, keep breathing slowly, and remember that Tele-MANAS (14416) is available 24/7 if you want a calm human voice.",
  },
  'loneliness': {
    empathy: "Feeling isolated or unseen is one of the heaviest emotions a human can carry. Your feelings are completely real and valid.",
    understanding: "Loneliness doesn't mean you are broken or unwanted; it is your social nervous system signaling a craving for genuine safety and connection.",
    steps: [
      "Acknowledge the feeling without shame: 'I am experiencing loneliness, and that is a normal human experience.'",
      "Send a small, low-pressure message to one acquaintance or old friend ('Hey, saw this and thought of you, hope you're having a good week!').",
      "Spend an hour in a shared space like a local library, cafe, or park to benefit from passive human presence.",
      "Treat yourself with the warmth you wish someone else would offer: a warm shower, nutritious meal, and gentle rest.",
    ],
    todayAction: "Write down 3 moments in your life where you felt connected and valued. Connection will return to your life again.",
  },
  'heartbreak': {
    empathy: "I am so sorry you are going through this pain. Heartbreak registers in the brain with the same intensity as physical trauma.",
    understanding: "Your body is essentially going through neurochemical withdrawal from emotional attachment. Grieving the future you envisioned is painful and messy.",
    steps: [
      "Allow yourself to feel the sadness or cry without judging yourself for 'taking too long'.",
      "Commit to zero contact for 30 days: no checking social profiles, old photos, or typing unsent messages.",
      "Call or sit with a friend who allows you to vent without trying to offer toxic positivity.",
      "Engage in physical movement: a brisk walk or light workout helps release the somatic grief stored in your body.",
    ],
    todayAction: "Drink a large glass of water, eat a comforting meal, and rest. Surviving today is a complete victory.",
  },
};

export const DEFAULT_RESPONSE = {
  empathy: "Thank you for reaching out and sharing what is on your mind. Acknowledging that things feel heavy is a genuine sign of emotional awareness.",
  understanding: "When several challenges intersect, our nervous system gets overloaded and even minor obstacles feel insurmountable. Let's break things down into manageable pieces.",
  steps: [
    "Take 3 slow, deep diaphragmatic breaths right now to ground your physical tension.",
    "Identify the single most pressing item and separate what you can control from what you cannot.",
    "Pick one tiny, tangible next step that takes under 5 minutes to complete.",
    "Speak kindly to yourself: you don't have to resolve your entire life today.",
  ],
  todayAction: "Take a break from screens for 20 minutes, drink water, and do one small act of care for your body.",
};

export async function generateResponse(prompt, modeId = null) {
  // Curated mode cards stay local; free-text problems go to Gemini first.
  if (!modeId) {
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ structured: true, messages: [{ role: 'user', text: prompt }] }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data?.structured) return data.structured;
      }
    } catch {
      // API down / not set up: fall through to the built-in replies below
    }
  }

  // Simulate natural brief latency for thoughtful feel
  await new Promise(resolve => setTimeout(resolve, 900 + Math.random() * 600));

  if (modeId && MODE_RESPONSES[modeId]) {
    return { ...MODE_RESPONSES[modeId] };
  }

  // Check if prompt matches any mode keywords
  for (const [key, resp] of Object.entries(MODE_RESPONSES)) {
    if (prompt.toLowerCase().includes(key.replace('-', ' '))) {
      return { ...resp };
    }
  }

  return { ...DEFAULT_RESPONSE };
}

// ─── Chat replies (context-aware) ───────────────────────────────────────────
const CRISIS_REPLY =
  "I want to make sure you are safe. Please know your life matters and support is available right now. You can call Tele-MANAS toll-free at 14416 (24/7) or iCall at 9152987821. I am an AI and cannot replace real human care, but professionals are ready to help you.";

const pick = (arr, avoid = []) => {
  const fresh = arr.filter((x) => !avoid.includes(x));
  const pool = fresh.length ? fresh : arr;
  return pool[Math.floor(Math.random() * pool.length)];
};

const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const hasTerm = (text, term) => new RegExp(`(^|[^a-z0-9])${escapeRe(term)}([^a-z0-9]|$)`, 'i').test(text);

// Score every mode against the text. Multi-word phrases count more than single words.
function scoreModes(text) {
  const lower = text.toLowerCase();
  return SUPPORT_MODES.map((mode) => {
    let score = 0;
    mode.keywords.forEach((kw) => {
      if (hasTerm(lower, kw.toLowerCase())) score += kw.includes(' ') ? 6 : 3;
    });
    if (hasTerm(lower, mode.title.toLowerCase())) score += 8;
    return { mode, score };
  })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score);
}

function findModeByTopic(topic) {
  if (!topic) return null;
  const t = topic.toLowerCase();
  return (
    SUPPORT_MODES.find((m) => m.title.toLowerCase() === t || m.id === t) ||
    SUPPORT_MODES.find((m) => t.includes(m.title.toLowerCase())) ||
    null
  );
}

// Detect mode: current message first, then the focus topic, then recent user messages.
function detectMode(message, topic, history) {
  const direct = scoreModes(message);
  if (direct.length) return direct[0].mode;
  const fromTopic = findModeByTopic(topic);
  if (fromTopic) return fromTopic;
  const recentUser = history.filter((m) => m.role === 'user').slice(-3).reverse();
  for (const m of recentUser) {
    const s = scoreModes(m.text);
    if (s.length) return s[0].mode;
  }
  return null;
}

const GREETING_RE = /^(hi|hii+|hello|hey+|heyy+|yo|namaste|good (morning|afternoon|evening))\b/i;
const THANKS_RE = /\b(thanks|thank you|thx|shukriya|dhanyavaad|helped|feel better)\b/i;
const YES_NO_RE = /^(yes|yeah|yep|no|nope|nah|maybe|ok|okay|hmm+|idk|i don'?t know)[.! ]*$/i;
const ASKS_HELP_RE = /\b(what should i do|what do i do|help me|any (tips|advice|suggestion)|how (do|can) i|suggest|advice)\b/i;

const MODE_OPENERS = {
  'exam-stress': "Exams can make your whole future feel like it hangs on one week.",
  'sleep-trouble': "Being awake while the rest of the world sleeps is lonely and draining.",
  overthinking: "Your mind sounds like it's running the same loop on repeat.",
  'family-problems': "Tension at home is hard because it's the place you're meant to feel safest.",
  'not-feeling-good': "Thank you for admitting you're not feeling okay. That takes honesty.",
  'money-problems': "Money stress follows you everywhere, even into quiet moments.",
  anxiety: "That uneasy, on-edge feeling is exhausting to carry around.",
  'panic-attack': "I'm right here. What you're feeling is intense, but it will pass.",
  loneliness: "Feeling unseen or alone is one of the heaviest things to carry.",
  heartbreak: "I'm sorry. Heartbreak hurts in a very real, physical way.",
  'career-confusion': "Not knowing which direction to take can feel like standing at a crossroads without a map.",
  'low-motivation': "When even starting feels heavy, it's not laziness. Your energy is running low.",
  procrastination: "Avoiding the task usually comes with a lot of guilt on top of it.",
  burnout: "It sounds like you've been running on empty for a while.",
  'self-doubt': "That inner critic can be brutal, and it isn't telling you the truth.",
  anger: "Anger usually means something important felt crossed or ignored.",
  'friendship-issues': "Friend trouble stings because those bonds matter so much.",
  homesickness: "Missing home is love showing up in a new place.",
  'social-pressure': "Comparing yourself to everyone's highlight reel is a rigged game.",
  'grief-loss': "I'm so sorry for your loss. Grief has no timeline.",
};

const GENERIC_OPENERS = [
  "Thank you for telling me that.",
  "I'm glad you said it out loud.",
  "That sounds like a lot to hold.",
  "I'm listening, and there's no judgment here.",
];

const GENERIC_FOLLOWUPS = [
  "Tell me a bit more about what happened. What part is sitting heaviest right now?",
  "When did this start to feel this way?",
  "What would feel like even 5% relief today?",
  "How is your body feeling as you talk about this: tight, tired, restless?",
];

// Pull a short, safe snippet of what the user said so the reply feels heard.
function echoOf(message) {
  const cleaned = message.replace(/\s+/g, ' ').trim();
  if (cleaned.length < 12 || cleaned.length > 140) return '';
  return `You said "${cleaned.replace(/[.!?]+$/, '')}".`;
}

export async function generateChatReply(message, { topic = '', history = [] } = {}) {
  await new Promise((resolve) => setTimeout(resolve, 600 + Math.random() * 500));

  if (detectCrisis(message)) return CRISIS_REPLY;

  const text = message.trim();
  const lastAi = history.filter((m) => m.role === 'ai').slice(-4).map((m) => m.text);
  const userTurns = history.filter((m) => m.role === 'user').length;

  if (GREETING_RE.test(text) && text.split(/\s+/).length <= 4) {
    return pick(
      [
        "Hi 👋 I'm glad you're here. What's been on your mind lately?",
        "Hello! How are you really feeling today?",
      ],
      lastAi,
    );
  }

  if (THANKS_RE.test(text) && !scoreModes(text).length) {
    return pick(
      [
        "I'm really glad that helped. Is there anything else on your mind, or would you like to try a breathing exercise?",
        "Happy to be here with you. Remember to go gently today. Want to talk through anything else?",
      ],
      lastAi,
    );
  }

  const mode = detectMode(text, topic, history);

  // Very short replies like "yes" / "idk": nudge gently, stay in context.
  if (YES_NO_RE.test(text)) {
    const q = mode ? mode.checkInQuestion : null;
    return pick(
      [
        q ? `That's okay, you don't need the perfect words. ${q}` : "That's okay, take your time. What feels closest to what you're going through?",
        "No pressure at all. Even one word about how you feel right now is enough to start.",
      ],
      lastAi,
    );
  }

  // Mode-specific, varied, and tied to what the user actually wrote.
  if (mode) {
    const tips = mode.tools?.quickTips || [];
    const usedTips = lastAi.join(' ');
    const tip = pick(tips.filter((t) => !usedTips.includes(t)).length ? tips.filter((t) => !usedTips.includes(t)) : tips);
    const opener = MODE_OPENERS[mode.id] || pick(GENERIC_OPENERS, lastAi);
    const wantsAdvice = ASKS_HELP_RE.test(text) || userTurns >= 1;

    const parts = [opener];
    if (wantsAdvice && tip) parts.push(`One thing that can help with ${mode.title.toLowerCase()}: ${tip}`);
    const followups = [mode.checkInQuestion, mode.tools?.journaling?.prompt].filter(Boolean);
    const follow = pick(followups, lastAi.map((t) => t.split('\n').pop()));
    if (follow) parts.push(follow);
    if (userTurns >= 3 && mode.counselorNote) parts.push(`Gentle note: ${mode.counselorNote}`);

    return parts.join(' ');
  }

  // No mode matched. Still respond to what was said instead of a canned line.
  const echo = echoOf(text);
  const parts = [pick(GENERIC_OPENERS, lastAi)];
  if (echo) parts.push(echo);
  if (ASKS_HELP_RE.test(text)) {
    parts.push("Let's make it smaller: write down the one thing that matters most right now, then one action that takes under 5 minutes.");
  }
  parts.push(pick(GENERIC_FOLLOWUPS, lastAi));
  return parts.join(' ');
}
