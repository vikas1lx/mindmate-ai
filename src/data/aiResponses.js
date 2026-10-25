/**
 * aiResponses.js
 * AI Response Generation & Safety Engine.
 * - Detects crisis/self-harm keywords
 * - Provides realistic, highly empathetic structured responses
 * - Connects to ChatPanel
 */

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

// ─── Chat replies ───────────────────────────────────────────────────────────
const CHAT_RESPONSES = [
  "I hear how much weight you've been carrying with this. What part feels most urgent right now?",
  "Thank you for sharing that with me. It takes real honesty to put feelings into words. How long has this been building up?",
  "That makes complete sense given everything on your plate. What is one small thing that could bring you 5% more peace today?",
  "You are not alone in navigating this. When things feel overwhelming, we can take it one minute at a time. What does your body feel like right now?",
  "I'm listening. Take your time — there is no rush, and no judgment here.",
  "That sounds emotionally draining. Please remember to be gentle with yourself today.",
];

export async function generateChatReply(message) {
  await new Promise(resolve => setTimeout(resolve, 600 + Math.random() * 500));
  
  if (detectCrisis(message)) {
    return "I want to make sure you are safe. Please know your life matters and support is available right now. You can call Tele-MANAS toll-free at 14416 (24/7) or iCall at 9152987821. I am an AI and cannot replace real human care, but professionals are ready to help you.";
  }

  const idx = Math.floor(Math.random() * CHAT_RESPONSES.length);
  return CHAT_RESPONSES[idx];
}
