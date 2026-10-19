/**
 * supportModes.js
 * Defines all 10 support modes, grouped by severity level.
 * Each mode includes an empathetic message, steps, a quick exercise,
 * and (for Level 3) a counselor suggestion.
 */

export const SUPPORT_MODES = [
  // ────────────────────────────────────────────────────────
  // LEVEL 1 — MILD  (green theme)
  // ────────────────────────────────────────────────────────
  {
    id: 'low-motivation',
    level: 1,
    title: 'Low Motivation',
    emoji: '😴',
    tag: 'Mild',
    color: 'emerald',
    gradient: 'from-emerald-100 to-teal-50 dark:from-emerald-900/30 dark:to-teal-900/20',
    border: 'border-emerald-200 dark:border-emerald-700',
    badge: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300',
    message:
      "It's completely okay to feel unmotivated sometimes. Your body and mind might just be asking for a reset. You're not lazy — you might be running on empty.",
    steps: [
      "Start with the smallest possible action (e.g., open your notebook or drink a glass of water).",
      "Break your task into 15-minute micro-sessions using the Pomodoro technique.",
      "Remove one distraction from your environment right now.",
      "Write down one thing you WILL do in the next 10 minutes — be specific.",
      "Reward yourself with something small after each completed micro-session.",
    ],
    exercise: {
      name: '2-Minute Power Start',
      description:
        "Set a timer for 2 minutes. During those 2 minutes, do ONLY the first step of your task — nothing else. Often, starting is the hardest part. After 2 minutes, you can stop or continue.",
    },
  },
  {
    id: 'overthinking',
    level: 1,
    title: 'Overthinking',
    emoji: '🌀',
    tag: 'Mild',
    color: 'emerald',
    gradient: 'from-emerald-100 to-teal-50 dark:from-emerald-900/30 dark:to-teal-900/20',
    border: 'border-emerald-200 dark:border-emerald-700',
    badge: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300',
    message:
      "Your mind is working overtime because it cares deeply about getting things right. But your thoughts aren't facts — they're just possibilities. Let's slow the loop.",
    steps: [
      "Write down every thought that's swirling in your head — do a complete brain dump onto paper.",
      "Circle only the thoughts you can actually control today.",
      "For each circled thought, write one concrete action you can take.",
      "Set a 'worry window' — 15 minutes today where you're allowed to worry, then close it.",
      "Ground yourself physically: splash cold water on your face or step outside for 5 minutes.",
    ],
    exercise: {
      name: '5-4-3-2-1 Grounding',
      description:
        "Notice 5 things you can SEE, 4 you can TOUCH, 3 you can HEAR, 2 you can SMELL, 1 you can TASTE. This brings your mind back to the present moment.",
    },
  },
  {
    id: 'sleep-trouble',
    level: 1,
    title: 'Sleep Trouble',
    emoji: '🌙',
    tag: 'Mild',
    color: 'emerald',
    gradient: 'from-emerald-100 to-teal-50 dark:from-emerald-900/30 dark:to-teal-900/20',
    border: 'border-emerald-200 dark:border-emerald-700',
    badge: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300',
    message:
      "Poor sleep affects everything — your mood, focus, and resilience. It's not a sign of weakness; it's a signal that your nervous system needs care tonight.",
    steps: [
      "Put your phone in another room or on Do Not Disturb 30 minutes before bed.",
      "Dim all lights and keep the room cool (18-20°C is optimal for sleep).",
      "Write a short 'done list' — 3 things you accomplished today — to quiet the mind.",
      "Try the 4-7-8 breathing exercise below to activate your parasympathetic system.",
      "Keep a consistent wake-up time, even on weekends, to reset your circadian rhythm.",
    ],
    exercise: {
      name: '4-7-8 Breathing',
      description:
        "Inhale quietly through your nose for 4 seconds, hold your breath for 7 seconds, exhale completely through your mouth for 8 seconds. Repeat 4 cycles. This activates your rest-and-digest system.",
    },
  },

  // ────────────────────────────────────────────────────────
  // LEVEL 2 — MODERATE  (amber theme)
  // ────────────────────────────────────────────────────────
  {
    id: 'exam-stress',
    level: 2,
    title: 'Exam Stress',
    emoji: '📚',
    tag: 'Moderate',
    color: 'amber',
    gradient: 'from-amber-100 to-yellow-50 dark:from-amber-900/30 dark:to-yellow-900/20',
    border: 'border-amber-200 dark:border-amber-700',
    badge: 'bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300',
    message:
      "Exam pressure is real and valid. Your worth is NOT defined by a test score. Let's channel that adrenaline into focused, smart preparation.",
    steps: [
      "List ALL your upcoming exams and deadlines on one page — no more holding it in your head.",
      "Use spaced repetition: study a topic, then revisit it after 1 day, 3 days, and 1 week.",
      "Take a 5-minute break every 25 minutes (Pomodoro). During breaks, stretch or walk.",
      "The night before: review summaries only, prepare materials, sleep by 10 PM.",
      "Talk to a classmate or teacher about topics you don't understand — asking is strength.",
    ],
    exercise: {
      name: 'Box Breathing (Exam Calm)',
      description:
        "Inhale for 4 counts, hold for 4 counts, exhale for 4 counts, hold for 4 counts. Repeat 4 times. Use this right before an exam to lower cortisol and sharpen focus.",
    },
  },
  {
    id: 'anger',
    level: 2,
    title: 'Anger',
    emoji: '🔥',
    tag: 'Moderate',
    color: 'amber',
    gradient: 'from-amber-100 to-yellow-50 dark:from-amber-900/30 dark:to-yellow-900/20',
    border: 'border-amber-200 dark:border-amber-700',
    badge: 'bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300',
    message:
      "Anger is a messenger — it's telling you that something important to you has been violated. It's okay to feel it. Let's process it without letting it control you.",
    steps: [
      "Step away from the triggering situation immediately — even 5 minutes helps.",
      "Do 10 slow, deep breaths before responding to anyone or anything.",
      "Write what you feel WITHOUT sending it. Get it all out on paper or a notes app.",
      "Ask yourself: Will this matter in 1 year? — often gives perspective.",
      "When calm, express your feelings using 'I feel...' statements instead of accusations.",
    ],
    exercise: {
      name: 'Cold Water Reset',
      description:
        "Run cold water over your wrists and the back of your neck for 30 seconds. This activates the dive reflex, rapidly slowing your heart rate and calming the stress response.",
    },
  },
  {
    id: 'money-worries',
    level: 2,
    title: 'Money Worries',
    emoji: '💸',
    tag: 'Moderate',
    color: 'amber',
    gradient: 'from-amber-100 to-yellow-50 dark:from-amber-900/30 dark:to-yellow-900/20',
    border: 'border-amber-200 dark:border-amber-700',
    badge: 'bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300',
    message:
      "Financial stress is one of the most stressful things a person can experience. You are not your bank account. Let's make a small, realistic plan today.",
    steps: [
      "Write down your current income and all fixed expenses — clarity reduces anxiety.",
      "Identify one non-essential expense you can pause this month.",
      "Look up one free resource or opportunity (scholarship, part-time work, skill platform).",
      "Talk to one trusted person — financial stress thrives in silence, not in community.",
      "Set a tiny saving goal, even 50 rupees per day. Small wins rebuild confidence.",
    ],
    exercise: {
      name: 'The Worry Box',
      description:
        "Write your financial worry on a piece of paper. Fold it and put it in a box or drawer. Mentally tell yourself: 'I have acknowledged this. I'll open it at 6 PM and address it then.' This separates problem-solving time from anxiety time.",
    },
  },
  {
    id: 'career-confusion',
    level: 2,
    title: 'Career Confusion',
    emoji: '🧭',
    tag: 'Moderate',
    color: 'amber',
    gradient: 'from-amber-100 to-yellow-50 dark:from-amber-900/30 dark:to-yellow-900/20',
    border: 'border-amber-200 dark:border-amber-700',
    badge: 'bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300',
    message:
      "Feeling lost about your career is incredibly common — especially in your 20s. Uncertainty isn't failure; it's an invitation to explore. Let's find some clarity together.",
    steps: [
      "List 5 things you genuinely enjoy doing — even small, silly things count.",
      "Map these to potential fields or roles (e.g. 'I love explaining things' could mean teaching, content, or consulting).",
      "Talk to 2 people in roles that interest you — a 20-min informational interview is powerful.",
      "Take one online course or explore one skill this week, no commitment required.",
      "Remember: most successful people pivoted multiple times. The path is rarely straight.",
    ],
    exercise: {
      name: 'Ikigai Mini-Map',
      description:
        "On a paper, draw 4 overlapping circles labeled: What I Love, What I'm Good At, What the World Needs, and What I Can Be Paid For. Fill in each one honestly. The overlap is your direction.",
    },
  },

  // ────────────────────────────────────────────────────────
  // LEVEL 3 — SERIOUS  (soft red / rose theme)
  // ────────────────────────────────────────────────────────
  {
    id: 'family-problems',
    level: 3,
    title: 'Family Problems',
    emoji: '🏠',
    tag: 'Serious',
    color: 'rose',
    gradient: 'from-rose-100 to-pink-50 dark:from-rose-900/30 dark:to-pink-900/20',
    border: 'border-rose-200 dark:border-rose-700',
    badge: 'bg-rose-100 text-rose-700 dark:bg-rose-900/50 dark:text-rose-300',
    message:
      "Family dynamics can be deeply painful — especially when the people who are supposed to support us are the source of our stress. Your feelings are completely valid.",
    steps: [
      "Create physical or emotional distance when tensions are high — your room, a walk, headphones.",
      "Identify one safe family member or relative you can talk to honestly.",
      "Write an unsent letter to the person causing distress — release the emotion without confrontation.",
      "Focus on what you CAN control: your reactions, your boundaries, your support network.",
      "Consider reaching out to a school counselor or a trusted teacher for outside perspective.",
    ],
    exercise: {
      name: 'Safe Place Visualization',
      description:
        "Close your eyes. Picture a place (real or imaginary) where you feel completely safe. Notice the colors, sounds, and textures there. Breathe slowly and spend 3 minutes there in your mind. Return whenever home feels unsafe.",
    },
    counselorNote:
      "Family struggles can be complex and deeply rooted. Talking to a counselor or therapist isn't a last resort — it's a wise, courageous step. iCall (9152987821) offers free support for young adults.",
  },
  {
    id: 'relationship-problems',
    level: 3,
    title: 'Relationship Problems',
    emoji: '💔',
    tag: 'Serious',
    color: 'rose',
    gradient: 'from-rose-100 to-pink-50 dark:from-rose-900/30 dark:to-pink-900/20',
    border: 'border-rose-200 dark:border-rose-700',
    badge: 'bg-rose-100 text-rose-700 dark:bg-rose-900/50 dark:text-rose-300',
    message:
      "Relationship pain — whether it's a breakup, conflict, or betrayal — is among the most intense emotional pain humans experience. You don't have to process this alone.",
    steps: [
      "Allow yourself to grieve. Suppressing pain prolongs it. Cry, journal, feel it fully.",
      "Don't make major decisions in the first 48 hours of a breakup or conflict — wait for clarity.",
      "Lean on your social support circle. Isolation amplifies heartbreak.",
      "Limit contact with the person temporarily if needed — your healing comes first.",
      "Redirect energy to self-care: sleep, movement, a creative outlet, or a new skill.",
    ],
    exercise: {
      name: 'Self-Compassion Letter',
      description:
        "Write a letter to yourself as if you were writing to a dear friend going through the exact same pain. Use warmth, kindness, and encouragement. Then read it aloud to yourself. This activates the self-compassion system in your brain.",
    },
    counselorNote:
      "If the relationship involved any form of abuse, manipulation, or harm, please reach out to a counselor. iCall (9152987821) or a trusted adult can help you navigate this safely.",
  },
  {
    id: 'loneliness',
    level: 3,
    title: 'Loneliness',
    emoji: '🫂',
    tag: 'Serious',
    color: 'rose',
    gradient: 'from-rose-100 to-pink-50 dark:from-rose-900/30 dark:to-pink-900/20',
    border: 'border-rose-200 dark:border-rose-700',
    badge: 'bg-rose-100 text-rose-700 dark:bg-rose-900/50 dark:text-rose-300',
    message:
      "Loneliness doesn't mean you're unlikable — it means you're human. Even surrounded by people, we can feel deeply alone. This feeling is real and it deserves real attention.",
    steps: [
      "Acknowledge the feeling without judgment: 'I feel lonely, and that's okay.'",
      "Reach out to one person today — a text, a call, even a simple 'hey, thinking of you.'",
      "Join one group activity (online or offline): a club, class, hobby group, or volunteer event.",
      "Practice connection with yourself: take yourself on a date — a walk, a cafe, a movie.",
      "Limit passive social media use (scrolling) — it deepens loneliness. Engage actively instead.",
    ],
    exercise: {
      name: 'Loving-Kindness Meditation (3 min)',
      description:
        "Sit quietly. Breathe. Silently repeat: 'May I be happy. May I be safe. May I be peaceful.' Then extend it: 'May [name of someone I care about] be happy...' Then: 'May all beings be happy.' This combats loneliness by expanding your sense of connection.",
    },
    counselorNote:
      "Persistent loneliness can affect mental and physical health. Please consider speaking with a counselor at Tele-MANAS (14416) — a free, confidential government mental health helpline available 24/7.",
  },
];

export const LEVEL_LABELS = {
  1: { label: 'Level 1 – Mild', color: 'emerald', bg: 'bg-emerald-500', text: 'text-emerald-700 dark:text-emerald-300', border: 'border-emerald-300' },
  2: { label: 'Level 2 – Moderate', color: 'amber', bg: 'bg-amber-500', text: 'text-amber-700 dark:text-amber-300', border: 'border-amber-300' },
  3: { label: 'Level 3 – Serious', color: 'rose', bg: 'bg-rose-500', text: 'text-rose-700 dark:text-rose-300', border: 'border-rose-300' },
};
