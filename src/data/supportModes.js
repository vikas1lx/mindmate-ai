/**
 * supportModes.js
 * Comprehensive registry of the 20 Problem Modes for MindMate AI.
 * Each mode features:
 * - Category (Study, Mind, Relationships, Life)
 * - Custom blue/cyan glow palette
 * - Short check-in question
 * - 2-3 Guided tools (Interactive breathing/grounding, reflective journaling, quick tips)
 * - Keywords for intelligent search/NLP matching
 * - Counselor note with local helpline references (Tele-MANAS 14416 / iCall)
 */

export const CATEGORIES = ['All', 'Study', 'Mind', 'Relationships', 'Life'];

export const LEVEL_LABELS = {
  1: { label: 'Level 1 – Mild', color: 'emerald', bg: 'bg-emerald-500', text: 'text-emerald-300', border: 'border-emerald-500/40' },
  2: { label: 'Level 2 – Moderate', color: 'amber', bg: 'bg-amber-500', text: 'text-amber-300', border: 'border-amber-500/40' },
  3: { label: 'Level 3 – Serious', color: 'rose', bg: 'bg-rose-500', text: 'text-rose-300', border: 'border-rose-500/40' },
};

export const SUPPORT_MODES = [
  // ────────────────────────────────────────────────────────
  // 1. Exam Stress
  // ────────────────────────────────────────────────────────
  {
    id: 'exam-stress',
    title: 'Exam Stress',
    category: 'Study',
    emoji: '📚',
    tag: 'Moderate',
    level: 2,
    description: 'Syllabus panic, blank mind fears, and deadline pressure.',
    glowColor: '#3B82F6', // Blue
    borderGlow: 'hover:border-blue-400 hover:shadow-[0_0_30px_rgba(59,130,246,0.35)]',
    accentGrad: 'from-blue-600 via-indigo-600 to-cyan-500',
    checkInQuestion: 'What is weighing heaviest right now — unstudied chapters, fear of failing, or running out of time?',
    tools: {
      breathing: {
        name: 'Box Breathing (Exam Reset)',
        type: 'box',
        inhale: 4,
        hold: 4,
        exhale: 4,
        holdAfter: 4,
        instructions: '4s Inhale → 4s Hold → 4s Exhale → 4s Rest. Lower adrenaline and stabilize working memory in 2 minutes.',
      },
      journaling: {
        prompt: 'What are the top 3 high-yield topics I can realistically review today instead of worrying about the whole syllabus?',
        placeholder: 'List 3 topics or notes you can conquer in the next 45 minutes…',
      },
      quickTips: [
        'Break study time into 25-minute Pomodoro sprints with zero notifications.',
        'Teach difficult concepts out loud to an empty room to verify true comprehension.',
        'Never pull an all-nighter before exam morning; rapid eye movement sleep solidifies memory retrieval.',
      ],
    },
    counselorNote: 'If test anxiety triggers physical paralysis or panic, talk to a mentor or call Tele-MANAS (14416) for calming student counseling.',
    keywords: ['exam', 'test', 'syllabus', 'marks', 'grade', 'revision', 'study', 'studying', 'papers', 'midterms', 'finals', 'cheating fear', 'blank mind'],
  },

  // ────────────────────────────────────────────────────────
  // 2. Sleep Trouble
  // ────────────────────────────────────────────────────────
  {
    id: 'sleep-trouble',
    title: 'Sleep Trouble',
    category: 'Mind',
    emoji: '🌙',
    tag: 'Mild',
    level: 1,
    description: 'Tossing and turning, racing thoughts at 3 AM, or insomnia.',
    glowColor: '#38BDF8', // Sky
    borderGlow: 'hover:border-sky-400 hover:shadow-[0_0_30px_rgba(56,189,248,0.35)]',
    accentGrad: 'from-sky-600 via-blue-600 to-indigo-700',
    checkInQuestion: 'Is your body restless, or is your mind replaying conversations and tomorrow’s tasks?',
    tools: {
      breathing: {
        name: '4-7-8 Parasympathetic Sedation',
        type: '478',
        inhale: 4,
        hold: 7,
        exhale: 8,
        instructions: 'Inhale through nose 4s, gently hold 7s, long smooth exhale through mouth 8s. Signal safety to your nervous system.',
      },
      journaling: {
        prompt: 'Do a brain dump: What worries can I officially schedule to handle tomorrow at 10 AM so I can sleep right now?',
        placeholder: 'Write out everything buzzing in your brain to park it outside your head…',
      },
      quickTips: [
        'Move your smartphone out of arm reach and dim all ambient overhead lights.',
        'If awake for more than 20 minutes, get out of bed and sit in dim light with a physical book.',
        'Keep room cool (~19°C); core body temperature must drop to initiate deep delta sleep.',
      ],
    },
    counselorNote: 'Chronic insomnia lasting over 3 weeks is often an underlying anxiety marker. Consider speaking with a doctor or counselor.',
    keywords: ['sleep', 'cant sleep', "can't sleep", 'insomnia', 'awake', 'night', 'tired', 'restless', 'nightmare', 'tossing', 'bedtime', '3am'],
  },

  // ────────────────────────────────────────────────────────
  // 3. Overthinking
  // ────────────────────────────────────────────────────────
  {
    id: 'overthinking',
    title: 'Overthinking',
    category: 'Mind',
    emoji: '🌀',
    tag: 'Mild',
    level: 1,
    description: 'Mental loops, worst-case scenarios, and analysis paralysis.',
    glowColor: '#22D3EE', // Cyan
    borderGlow: 'hover:border-cyan-400 hover:shadow-[0_0_30px_rgba(34,211,238,0.35)]',
    accentGrad: 'from-cyan-600 via-teal-600 to-blue-700',
    checkInQuestion: 'Are you trying to solve a problem that hasn’t happened yet, or dissecting something in the past that cannot be changed?',
    tools: {
      breathing: {
        name: '5-4-3-2-1 Sensory Grounding',
        type: 'grounding',
        inhale: 4,
        hold: 2,
        exhale: 4,
        instructions: 'Identify 5 objects you see, 4 textures you can touch, 3 sounds you hear, 2 scents, and 1 taste.',
      },
      journaling: {
        prompt: 'Draw a circle in your mind: What 1 single factor is truly inside my control today? Everything else goes outside the circle.',
        placeholder: 'Things I control vs things I cannot control…',
      },
      quickTips: [
        'Name the thought loop: "My brain is telling me the catastrophizing story again."',
        'Ask yourself: "Will this detail matter in 6 months?" If not, release its urgency.',
        'Splash cold water on your temples to stimulate the vagus nerve and break the thought spin.',
      ],
    },
    counselorNote: 'Overthinking is your brain attempting to build armor. When it paralyzes your day, speaking with a professional helps create mental boundaries.',
    keywords: ['overthinking', 'loop', 'racing thoughts', 'worry', 'scenarios', 'analyzing', 'paralysis', 'what if', 'ruminating', 'obsessing'],
  },

  // ────────────────────────────────────────────────────────
  // 4. Family Problems
  // ────────────────────────────────────────────────────────
  {
    id: 'family-problems',
    title: 'Family Problems',
    category: 'Relationships',
    emoji: '🏠',
    tag: 'Serious',
    level: 3,
    description: 'High expectations, misunderstandings, conflict, or toxic household tension.',
    glowColor: '#60A5FA', // Blue-light
    borderGlow: 'hover:border-blue-400 hover:shadow-[0_0_30px_rgba(96,165,250,0.35)]',
    accentGrad: 'from-blue-600 via-indigo-700 to-slate-800',
    checkInQuestion: 'Do you feel unheard, emotionally unsafe, or suffocated by expectations at home right now?',
    tools: {
      breathing: {
        name: 'Boundary Anchor Breathing',
        type: 'coherent',
        inhale: 5,
        hold: 1,
        exhale: 5,
        instructions: 'Slow 5s inhale, gentle 5s exhale. Reclaim your internal space even if external room is crowded.',
      },
      journaling: {
        prompt: 'Unsent Letter: Write exactly how you feel to a family member without filtering, purely to unburden your chest.',
        placeholder: 'Dear… what I never get to say out loud is…',
      },
      quickTips: [
        'Use "Gray Rock" mode during high tension: respond neutrally without emotional fuel.',
        'Step outside for a 15-minute walk or put on noise-cancelling headphones to create physical distance.',
        'Remember that their expectations reflect their generation and conditioning, not your intrinsic worth.',
      ],
    },
    counselorNote: 'Family toxicity and domestic tension can feel isolating. Tele-MANAS (14416) or iCall (9152987821) provide free confidential guidance.',
    keywords: ['family', 'parents', 'father', 'mother', 'mom', 'dad', 'brother', 'sister', 'household', 'relatives', 'expectations', 'arguing', 'shouting'],
  },

  // ────────────────────────────────────────────────────────
  // 5. Not Feeling Good
  // ────────────────────────────────────────────────────────
  {
    id: 'not-feeling-good',
    title: 'Not Feeling Good',
    category: 'Mind',
    emoji: '🌧️',
    tag: 'Mild',
    level: 1,
    description: 'Unexplained heaviness, low mood, numbness, or just an "off" day.',
    glowColor: '#818CF8', // Indigo
    borderGlow: 'hover:border-indigo-400 hover:shadow-[0_0_30px_rgba(129,140,248,0.35)]',
    accentGrad: 'from-indigo-600 via-blue-600 to-cyan-700',
    checkInQuestion: 'Are you physically drained, emotionally depleted, or just carrying a quiet weight today?',
    tools: {
      breathing: {
        name: 'Compassionate Sigh',
        type: 'sigh',
        inhale: 3,
        hold: 1,
        exhale: 6,
        instructions: 'Take a deep double-inhale through nose, followed by a long audible sigh through mouth. Relieves chest pressure.',
      },
      journaling: {
        prompt: 'What is one tiny kind thing my body or mind needs right now (a glass of water, a blanket, silence, a snack)?',
        placeholder: 'Right now, what would give me 5% more comfort?',
      },
      quickTips: [
        'You don\'t have to diagnose the exact reason why you feel off today; allow yourself to just rest.',
        'Drink a tall glass of cool water and wash your face with warm water.',
        'Lower your expectations for today from 100% to 30%. Surviving is enough.',
      ],
    },
    counselorNote: 'Prolonged low mood for more than two weeks warrants a kind check-in with a healthcare provider or Tele-MANAS (14416).',
    keywords: ['not feeling good', 'feeling low', 'bad mood', 'sad', 'down', 'gloomy', 'numb', 'empty', 'heavy', 'crying', 'unhappy', 'off'],
  },

  // ────────────────────────────────────────────────────────
  // 6. Money Problems
  // ────────────────────────────────────────────────────────
  {
    id: 'money-problems',
    title: 'Money Problems',
    category: 'Life',
    emoji: '💸',
    tag: 'Moderate',
    level: 2,
    description: 'Financial strain, debt anxiety, unexpected bills, and pocket stress.',
    glowColor: '#34D399', // Emerald/Mint
    borderGlow: 'hover:border-emerald-400 hover:shadow-[0_0_30px_rgba(52,211,153,0.35)]',
    accentGrad: 'from-emerald-600 via-teal-700 to-slate-900',
    checkInQuestion: 'Are you overwhelmed by an immediate due expense, or anxious about long-term financial security?',
    tools: {
      breathing: {
        name: 'Clarity Box Rhythm',
        type: 'box',
        inhale: 4,
        hold: 4,
        exhale: 4,
        holdAfter: 4,
        instructions: 'Slow breathing reduces financial panic so logic can take the wheel over adrenaline.',
      },
      journaling: {
        prompt: 'Separate the math from the fear: What is the exact number of my essential expense this week, and what is 1 action I can take today?',
        placeholder: 'Essential costs vs non-urgent costs…',
      },
      quickTips: [
        'Write numbers down on paper; ambiguity magnifies financial fear by 10x.',
        'Cancel or pause non-essential digital subscriptions for the next 30 days.',
        'Reach out to trusted friends or family for transparent communication rather than suffering in secrecy.',
      ],
    },
    counselorNote: 'Financial distress is a leading cause of severe acute anxiety. You are not defined by your bank account balance.',
    keywords: ['money', 'finance', 'debt', 'bills', 'broke', 'rent', 'fees', 'loan', 'cost', 'expensive', 'rupees', 'salary', 'savings'],
  },

  // ────────────────────────────────────────────────────────
  // 7. Anxiety
  // ────────────────────────────────────────────────────────
  {
    id: 'anxiety',
    title: 'Anxiety',
    category: 'Mind',
    emoji: '⚡',
    tag: 'Moderate',
    level: 2,
    description: 'Chest tightness, racing pulse, impending dread, and hypervigilance.',
    glowColor: '#22D3EE', // Cyan
    borderGlow: 'hover:border-cyan-400 hover:shadow-[0_0_30px_rgba(34,211,238,0.35)]',
    accentGrad: 'from-cyan-600 via-blue-600 to-indigo-800',
    checkInQuestion: 'Where are you feeling anxiety in your body right now — chest, stomach, throat, or shoulders?',
    tools: {
      breathing: {
        name: 'Cadence Heart-Rate Lowering',
        type: 'cadence',
        inhale: 4,
        hold: 2,
        exhale: 6,
        instructions: 'Extend your exhale longer than your inhale. This physically commands the heart rate to decelerate.',
      },
      journaling: {
        prompt: 'Reality Testing: What is the worst-case scenario, what is the best-case, and what is the realistic most likely outcome?',
        placeholder: 'Worst: ... Best: ... Most likely: ...',
      },
      quickTips: [
        'Unclench your jaw, drop your shoulders away from your ears, and release your stomach muscles.',
        'Limit caffeine immediately; coffee and energy drinks mimic the fight-or-flight hormone response.',
        'Hold an ice cube in your palm; intense cold shocks the nervous system out of mental alarm.',
      ],
    },
    counselorNote: 'If anxiety is constant and prevents everyday routines, free counseling at Tele-MANAS (14416) is available 24/7.',
    keywords: ['anxiety', 'anxious', 'scared', 'nervous', 'panic', 'shaking', 'heart racing', 'dread', 'tense', 'jitters', 'uneasy', 'fear'],
  },

  // ────────────────────────────────────────────────────────
  // 8. Panic Attack (quick calm)
  // ────────────────────────────────────────────────────────
  {
    id: 'panic-attack',
    title: 'Panic Attack (quick calm)',
    category: 'Mind',
    emoji: '🫀',
    tag: 'Serious',
    level: 3,
    description: 'Rapid heartbeat, shortness of breath, dizziness, and intense terror.',
    glowColor: '#F43F5E', // Rose/Crimson
    borderGlow: 'hover:border-rose-400 hover:shadow-[0_0_30px_rgba(244,63,94,0.4)]',
    accentGrad: 'from-rose-600 via-pink-700 to-indigo-900',
    checkInQuestion: 'Look around you right now: Are you seated in a physically safe place where you can feel your feet on the floor?',
    tools: {
      breathing: {
        name: 'Emergency Physiological Sigh',
        type: 'sigh',
        inhale: 3,
        hold: 1,
        exhale: 6,
        instructions: 'Inhale through nose, top it off with a second quick sniff, then exhale slowly for 6 seconds. Repeat 5 times.',
      },
      journaling: {
        prompt: 'Anchor Affirmation: Remind yourself out loud: "This is a surge of adrenaline. It is uncomfortable, but it is not dangerous, and it will peak and pass in minutes."',
        placeholder: 'Type this affirmation to anchor your fingers: "I am safe right now. This will pass."',
      },
      quickTips: [
        'Plant both feet flat on the ground and press your hands firmly together or against your knees.',
        'Focus your vision on 3 red or blue items in your room to tether your brain to reality.',
        'Remember: A panic attack rarely lasts longer than 10 to 15 minutes. It is already winding down.',
      ],
    },
    counselorNote: 'You are safe. If you need a calm human voice right this second, call Tele-MANAS immediately at 14416 (toll-free 24/7).',
    keywords: ['panic attack', 'panic', 'cant breathe', "can't breathe", 'heart attack feeling', 'dying feeling', 'hyperventilating', 'chest pain', 'terror'],
  },

  // ────────────────────────────────────────────────────────
  // 9. Loneliness
  // ────────────────────────────────────────────────────────
  {
    id: 'loneliness',
    title: 'Loneliness',
    category: 'Relationships',
    emoji: '🫂',
    tag: 'Serious',
    level: 3,
    description: 'Feeling disconnected, misunderstood, or like no one truly knows you.',
    glowColor: '#6366F1', // Indigo
    borderGlow: 'hover:border-indigo-400 hover:shadow-[0_0_30px_rgba(99,102,241,0.35)]',
    accentGrad: 'from-indigo-600 via-purple-700 to-slate-900',
    checkInQuestion: 'Are you isolated physically, or surrounded by people while feeling completely unseen inside?',
    tools: {
      breathing: {
        name: 'Heart-Hand Coherence',
        type: 'heart',
        inhale: 4,
        hold: 2,
        exhale: 4,
        instructions: 'Place your hand over the center of your chest. Breathe warmth and steady presence into your own palm.',
      },
      journaling: {
        prompt: 'Who is one person (even from your past or an acquaintance) who has treated you with genuine kindness? Write a simple 5-word message you could send them.',
        placeholder: 'e.g. "Hey! Saw this and thought of you, hope you\'re doing well."',
      },
      quickTips: [
        'Close social media feeds: passive scrolling through highlight reels deepens the false sense of exclusion.',
        'Step outside to a local cafe, park, or library; ambient social presence reduces biological isolation markers.',
        'MindMate AI is always here to listen whenever you need a safe, judgment-free conversation.',
      ],
    },
    counselorNote: 'Chronic loneliness is as physically taxing as smoking. Connecting with a counselor on iCall (9152987821) can open a supportive bridge.',
    keywords: ['lonely', 'loneliness', 'alone', 'no friends', 'isolated', 'nobody', 'left out', 'unloved', 'abandoned', 'empty room'],
  },

  // ────────────────────────────────────────────────────────
  // 10. Heartbreak
  // ────────────────────────────────────────────────────────
  {
    id: 'heartbreak',
    title: 'Heartbreak',
    category: 'Relationships',
    emoji: '💔',
    tag: 'Serious',
    level: 3,
    description: 'Breakup grief, rejection, emotional detachment, and missing someone intensely.',
    glowColor: '#FB7185', // Rose
    borderGlow: 'hover:border-rose-400 hover:shadow-[0_0_30px_rgba(251,113,133,0.35)]',
    accentGrad: 'from-rose-600 via-pink-700 to-indigo-950',
    checkInQuestion: 'Are you fighting the urge to check their profile, or blaming yourself for how things unfolded?',
    tools: {
      breathing: {
        name: 'Grief Release Rhythm',
        type: 'release',
        inhale: 4,
        hold: 2,
        exhale: 6,
        instructions: 'Allow yourself to cry or sigh without resistance. Suppressing heartache stores it in your body.',
      },
      journaling: {
        prompt: 'What did I lose in this relationship, but more importantly, what parts of myself am I now free to reclaim?',
        placeholder: 'Things I gave away vs things I am reclaiming…',
      },
      quickTips: [
        'Institute a strict 30-day "No Contact" rule to allow the neurological dopamine addiction to recalibrate.',
        'Do not make permanent decisions or send late-night messages between 11 PM and 6 AM.',
        'Lean on two trusted friends; schedule quick check-ins so you don\'t sit alone in silent rumination.',
      ],
    },
    counselorNote: 'Romantic loss activates the same neural pain centers as physical injury. Be immensely gentle with yourself today.',
    keywords: ['heartbreak', 'breakup', 'broken heart', 'ex', 'cheated', 'dumped', 'rejection', 'miss him', 'miss her', 'unrequited', 'crying over someone'],
  },

  // ────────────────────────────────────────────────────────
  // 11. Career Confusion
  // ────────────────────────────────────────────────────────
  {
    id: 'career-confusion',
    title: 'Career Confusion',
    category: 'Study',
    emoji: '🧭',
    tag: 'Moderate',
    level: 2,
    description: 'Uncertain career direction, resume rejections, degree doubts, and future dread.',
    glowColor: '#38BDF8', // Sky
    borderGlow: 'hover:border-sky-400 hover:shadow-[0_0_30px_rgba(56,189,248,0.35)]',
    accentGrad: 'from-sky-600 via-blue-600 to-indigo-800',
    checkInQuestion: 'Are you unsure what path suits you, or exhausted by constant interview rejections and comparison?',
    tools: {
      breathing: {
        name: 'Focus & Confidence Breath',
        type: 'box',
        inhale: 4,
        hold: 4,
        exhale: 4,
        holdAfter: 4,
        instructions: 'Clear mental fog before sending applications or making career decisions.',
      },
      journaling: {
        prompt: 'If prestige and parental expectations didn\'t exist, what kind of problems would I actually enjoy solving daily?',
        placeholder: 'Skills I enjoy using and topics that spark my curiosity…',
      },
      quickTips: [
        'Career paths are rarely straight lines; most accomplished people pivoted multiple times in their 20s and 30s.',
        'Reach out to one person currently doing a role you find interesting for a 15-minute informational interview.',
        'Focus on building 1 marketable skill this month rather than trying to fix the next 40 years of your life today.',
      ],
    },
    counselorNote: 'Career anxiety is extremely common. Talking with a career counselor or mentor can convert foggy dread into an actionable roadmap.',
    keywords: ['career', 'job', 'interview', 'unemployed', 'placement', 'resume', 'internship', 'future', 'degree', 'confused about career', 'directionless'],
  },

  // ────────────────────────────────────────────────────────
  // 12. Low Motivation
  // ────────────────────────────────────────────────────────
  {
    id: 'low-motivation',
    title: 'Low Motivation',
    category: 'Study',
    emoji: '😴',
    tag: 'Mild',
    level: 1,
    description: 'Stuck in inertia, heavy limbs, zero drive, and feeling drained.',
    glowColor: '#22D3EE', // Cyan
    borderGlow: 'hover:border-cyan-400 hover:shadow-[0_0_30px_rgba(34,211,238,0.35)]',
    accentGrad: 'from-cyan-600 via-blue-600 to-teal-800',
    checkInQuestion: 'Are you truly lazy (unlikely), or is your battery running on 5% after weeks of mental exhaustion?',
    tools: {
      breathing: {
        name: 'Energizing Kapalabhati Light',
        type: 'energize',
        inhale: 3,
        hold: 1,
        exhale: 2,
        instructions: 'Short rhythmic breaths to bring oxygen into sluggish morning brain cells.',
      },
      journaling: {
        prompt: 'The 2-Minute Micro Action: What is the single absolute smallest step I can take right now that requires zero willpower?',
        placeholder: 'e.g. Open the laptop, or drink 1 glass of cold water…',
      },
      quickTips: [
        'Action precedes motivation, not the other way around. Commit to only 120 seconds of work.',
        'Change your physical environment: move from bed to a desk or a brightly lit balcony.',
        'Celebrate finishing even one tiny micro-task to kickstart a dopamine feedback loop.',
      ],
    },
    counselorNote: 'Persistent zero motivation can be a sign of functional depression. Reach out to Tele-MANAS (14416) if this lasts for weeks.',
    keywords: ['motivation', 'unmotivated', 'lazy', 'tired', 'cant start', "can't start", 'no energy', 'drained', 'sluggish', 'bed all day', 'zero drive'],
  },

  // ────────────────────────────────────────────────────────
  // 13. Procrastination
  // ────────────────────────────────────────────────────────
  {
    id: 'procrastination',
    title: 'Procrastination',
    category: 'Study',
    emoji: '⏳',
    tag: 'Mild',
    level: 1,
    description: 'Doom-scrolling, delaying important tasks, guilt spirals, and last-minute panic.',
    glowColor: '#F59E0B', // Amber
    borderGlow: 'hover:border-amber-400 hover:shadow-[0_0_30px_rgba(245,158,11,0.35)]',
    accentGrad: 'from-amber-600 via-orange-600 to-indigo-800',
    checkInQuestion: 'Are you delaying this task because it\'s boring, or because you fear doing it imperfectly?',
    tools: {
      breathing: {
        name: '5-4-3-2-1 Ignition Breath',
        type: 'countdown',
        inhale: 4,
        hold: 2,
        exhale: 4,
        instructions: 'Inhale clarity. On the exhale, count down 5-4-3-2-1 and physically launch into your task without second-guessing.',
      },
      journaling: {
        prompt: 'Give yourself permission to make a "garbage first draft". Write down how liberating it is to produce rough imperfect work first.',
        placeholder: 'I will write an ugly, imperfect version for the next 10 minutes…',
      },
      quickTips: [
        'Put phone on airplane mode and place it inside a drawer in another room.',
        'Use the "10-minute rule": tell yourself you can quit after 10 minutes if you still want to.',
        'Pair your difficult task with a pleasant stimulus, like a favorite playlist or hot cup of tea.',
      ],
    },
    counselorNote: 'Procrastination is an emotional regulation problem, not a character flaw. Forgiving yourself immediately reduces future delays.',
    keywords: ['procrastination', 'procrastinating', 'delaying', 'scrolling', 'reels', 'youtube', 'avoiding', 'putting off', 'last minute', 'guilt'],
  },

  // ────────────────────────────────────────────────────────
  // 14. Burnout
  // ────────────────────────────────────────────────────────
  {
    id: 'burnout',
    title: 'Burnout',
    category: 'Mind',
    emoji: '🔥',
    tag: 'Serious',
    level: 3,
    description: 'Deep physical and emotional exhaustion, cynicism, and feeling completely spent.',
    glowColor: '#EF4444', // Red
    borderGlow: 'hover:border-red-400 hover:shadow-[0_0_30px_rgba(239,68,68,0.35)]',
    accentGrad: 'from-red-600 via-rose-700 to-slate-900',
    checkInQuestion: 'Has rest stopped restoring your energy, leaving you feeling emotionally numb or constantly irritable?',
    tools: {
      breathing: {
        name: 'Restorative Grounding Rest',
        type: 'deeprest',
        inhale: 4,
        hold: 4,
        exhale: 8,
        instructions: 'Long, deep exhales trigger the brainstem to down-regulate prolonged cortisol output.',
      },
      journaling: {
        prompt: 'What commitments or people-pleasing duties am I carrying right now that I need to drop or say "no" to this week?',
        placeholder: 'Things I must stop carrying to save my health…',
      },
      quickTips: [
        'Schedule unconditional non-productive rest: time where you do not need to self-improve or learn.',
        'Establish hard work boundaries: turn off email and work notifications after 7 PM.',
        'Prioritize nutrition, hydration, and sleep before attempting to tackle work backlogs.',
      ],
    },
    counselorNote: 'Burnout is a systemic collapse of nervous system reserves. Consider taking medical leave or speaking with a licensed therapist.',
    keywords: ['burnout', 'burnt out', 'exhausted', 'overworked', 'running on empty', 'depleted', 'cynical', 'cant care', "can't care", 'done with everything'],
  },

  // ────────────────────────────────────────────────────────
  // 15. Self-Doubt
  // ────────────────────────────────────────────────────────
  {
    id: 'self-doubt',
    title: 'Self-Doubt',
    category: 'Mind',
    emoji: '🪞',
    tag: 'Mild',
    level: 1,
    description: 'Imposter syndrome, feeling not good enough, and harsh inner criticism.',
    glowColor: '#A78BFA', // Violet
    borderGlow: 'hover:border-violet-400 hover:shadow-[0_0_30px_rgba(167,139,250,0.35)]',
    accentGrad: 'from-violet-600 via-indigo-600 to-cyan-700',
    checkInQuestion: 'Would you ever speak to someone you love with the harsh, cruel words your inner critic is saying to you?',
    tools: {
      breathing: {
        name: 'Self-Kindness Breathing',
        type: 'compassion',
        inhale: 4,
        hold: 2,
        exhale: 5,
        instructions: 'Inhale self-acceptance. Exhale the need for outside approval.',
      },
      journaling: {
        prompt: 'Fact-Check: Write 3 difficult obstacles you previously overcame that proved your capability and resilience in the past.',
        placeholder: '3 times I doubted myself before and still came through…',
      },
      quickTips: [
        'Imposter feelings mean you are stepping into a higher room of growth, not that you are a fraud.',
        'Keep a "wins folder" or note with positive feedback and compliments you received.',
        'Replace "I don\'t know how to do this" with "I am still learning how to do this."',
      ],
    },
    counselorNote: 'Persistent self-loathing often stems from childhood patterns. A counselor can help untangle your authentic self from harsh criticism.',
    keywords: ['self-doubt', 'self doubt', 'imposter', 'not good enough', 'failure', 'loser', 'hate myself', 'ugly', 'stupid', 'unqualified'],
  },

  // ────────────────────────────────────────────────────────
  // 16. Anger
  // ────────────────────────────────────────────────────────
  {
    id: 'anger',
    title: 'Anger',
    category: 'Mind',
    emoji: '🌋',
    tag: 'Moderate',
    level: 2,
    description: 'Boiling frustration, rage, impulsive urges, and feeling unfairly treated.',
    glowColor: '#F97316', // Orange
    borderGlow: 'hover:border-orange-400 hover:shadow-[0_0_30px_rgba(249,115,22,0.35)]',
    accentGrad: 'from-orange-600 via-red-600 to-slate-900',
    checkInQuestion: 'What core boundary or value of yours was violated that made this anger flare up?',
    tools: {
      breathing: {
        name: 'Cooling Breath (Sitali / Cold Exhale)',
        type: 'cooling',
        inhale: 4,
        hold: 2,
        exhale: 6,
        instructions: 'Inhale through mouth like sipping through a straw. Exhale hot tension through nose.',
      },
      journaling: {
        prompt: 'Rage Dump (Burn after writing): Write down every raw, angry thought without filtering so the poison leaves your nervous system.',
        placeholder: 'I am furious because…',
      },
      quickTips: [
        'Step away from the conversation or chat immediately; implement a mandatory 20-minute cooling cooldown.',
        'Channel physical energy: do 20 pushups, sprint for 2 minutes, or punch a firm pillow.',
        'Run cold water over your wrists and forearms to stimulate the mammalian dive reflex.',
      ],
    },
    counselorNote: 'Anger is valid information, but aggressive outbursts can damage relationships. Learn emotional regulation with a counselor.',
    keywords: ['anger', 'angry', 'mad', 'furious', 'rage', 'pissed', 'irritated', 'frustrated', 'screaming', 'argument', 'unfair'],
  },

  // ────────────────────────────────────────────────────────
  // 17. Friendship Issues
  // ────────────────────────────────────────────────────────
  {
    id: 'friendship-issues',
    title: 'Friendship Issues',
    category: 'Relationships',
    emoji: '👥',
    tag: 'Mild',
    level: 1,
    description: 'Drifting apart, group gossip, exclusion, and broken trust.',
    glowColor: '#38BDF8', // Sky
    borderGlow: 'hover:border-sky-400 hover:shadow-[0_0_30px_rgba(56,189,248,0.35)]',
    accentGrad: 'from-sky-600 via-blue-600 to-indigo-800',
    checkInQuestion: 'Are you experiencing a genuine misunderstanding that can be talked out, or a pattern of one-sided effort?',
    tools: {
      breathing: {
        name: 'Equanimity Breath',
        type: 'balance',
        inhale: 4,
        hold: 2,
        exhale: 4,
        instructions: 'Breathe into your spine. Anchor your self-respect regardless of group dynamics.',
      },
      journaling: {
        prompt: 'If I communicate my boundary with clarity rather than passive-aggressive silence, what exact words would I use?',
        placeholder: 'e.g. "Hey, when that happened yesterday, it hurt my feelings because…"',
      },
      quickTips: [
        'Friendships evolve through seasons; someone growing in a different direction does not invalidate your bond.',
        'Never resolve a friendship conflict over text; tone gets misinterpreted 70% of the time. Call or meet.',
        'Invest in relationships that energize you rather than spending all your mental space on those who exclude you.',
      ],
    },
    counselorNote: 'Social exclusion activates deep rejection distress. A counselor can help you cultivate reciprocal friendships.',
    keywords: ['friend', 'friends', 'friendship', 'group', 'gossip', 'left out', 'excluded', 'drifting', 'best friend', 'fight with friend'],
  },

  // ────────────────────────────────────────────────────────
  // 18. Homesickness
  // ────────────────────────────────────────────────────────
  {
    id: 'homesickness',
    title: 'Homesickness',
    category: 'Life',
    emoji: '🏡',
    tag: 'Mild',
    level: 1,
    description: 'Missing family food, college hostel loneliness, and feeling out of place.',
    glowColor: '#34D399', // Mint
    borderGlow: 'hover:border-emerald-400 hover:shadow-[0_0_30px_rgba(52,211,153,0.35)]',
    accentGrad: 'from-emerald-600 via-teal-700 to-blue-900',
    checkInQuestion: 'Are you missing familiar faces, the comfort of your room, or feeling overwhelmed by a new city and campus?',
    tools: {
      breathing: {
        name: 'Warmth Nostril Breathing',
        type: 'grounding',
        inhale: 4,
        hold: 2,
        exhale: 4,
        instructions: 'Slow, rhythmic inhales. Feel the temperature of air grounding you in this present chapter.',
      },
      journaling: {
        prompt: 'What is 1 familiar ritual from home I can bring into my current room today (a favorite song, tea, calling mom, photos)?',
        placeholder: 'My comfort ritual for tonight…',
      },
      quickTips: [
        'Call home for a brief 15-minute voice call rather than staying isolated in your hostel bed.',
        'Explore your local neighborhood: find one favorite tea stall, corner cafe, or park bench to claim as yours.',
        'Remember that homesickness peaks in the first 6 weeks of any transition and gradually dissipates.',
      ],
    },
    counselorNote: 'Hostel and transition depression is very real for university students. Campus counseling centers and Tele-MANAS (14416) are here to support.',
    keywords: ['homesick', 'homesickness', 'hostel', 'missing home', 'missing mom', 'new city', 'college hostel', 'alone in room', 'relocation'],
  },

  // ────────────────────────────────────────────────────────
  // 19. Social Pressure / Comparison
  // ────────────────────────────────────────────────────────
  {
    id: 'social-pressure',
    title: 'Social Pressure / Comparison',
    category: 'Relationships',
    emoji: '🎭',
    tag: 'Moderate',
    level: 2,
    description: 'LinkedIn envy, Instagram FOMO, peer success benchmarks, and feeling left behind.',
    glowColor: '#22D3EE', // Cyan
    borderGlow: 'hover:border-cyan-400 hover:shadow-[0_0_30px_rgba(34,211,238,0.35)]',
    accentGrad: 'from-cyan-600 via-indigo-600 to-slate-900',
    checkInQuestion: 'Are you comparing your messy behind-the-scenes reality to someone else’s curated, edited highlight reel?',
    tools: {
      breathing: {
        name: 'Sovereignty Breath',
        type: 'box',
        inhale: 4,
        hold: 4,
        exhale: 4,
        holdAfter: 4,
        instructions: 'Center your mind. Your path is your own timeline.',
      },
      journaling: {
        prompt: 'What does a successful, peaceful life look like according to my genuine values, rather than society\'s checklist?',
        placeholder: 'My personal definition of a good life is…',
      },
      quickTips: [
        'Temporarily mute or unfollow accounts that trigger competitive feelings or inadequacy.',
        'Remember: you don\'t know anyone\'s full story, sacrifices, mental health, or parental safety nets behind their posts.',
        'Direct that envy into curiosity: what specifically about their achievement triggers you, and is it something you want to pursue?',
      ],
    },
    counselorNote: 'Comparison culture robs your peace. Speak with a mentor or counselor to build confidence rooted in your personal strengths.',
    keywords: ['comparison', 'comparing', 'linkedin', 'instagram', 'fomo', 'falling behind', 'everyone is ahead', 'peer pressure', 'package', 'salary comparison'],
  },

  // ────────────────────────────────────────────────────────
  // 20. Grief & Loss
  // ────────────────────────────────────────────────────────
  {
    id: 'grief-loss',
    title: 'Grief & Loss',
    category: 'Life',
    emoji: '🕊️',
    tag: 'Serious',
    level: 3,
    description: 'Bereavement, losing a loved one or pet, major life transitions, and profound sorrow.',
    glowColor: '#60A5FA', // Blue
    borderGlow: 'hover:border-blue-400 hover:shadow-[0_0_30px_rgba(96,165,250,0.4)]',
    accentGrad: 'from-blue-600 via-indigo-700 to-slate-950',
    checkInQuestion: 'Is the grief hitting you in sudden waves today, or sitting like a heavy, quiet ache in your chest?',
    tools: {
      breathing: {
        name: 'Gentle Ocean Breath',
        type: 'ocean',
        inhale: 4,
        hold: 2,
        exhale: 6,
        instructions: 'Breathe like gentle ocean waves rolling onto the shore. Grief comes in waves; allow each wave to crest and recede.',
      },
      journaling: {
        prompt: 'Write a memory or lesson from this person or phase that you will carry forward in your heart forever.',
        placeholder: 'What I honor and remember is…',
      },
      quickTips: [
        'There is no timeline for grief. Do not let anyone tell you that you should be "over it" by now.',
        'Focus on the foundational basics: drink water, eat a warm meal, and rest your eyes even if you cannot sleep.',
        'Accept help from people around you when they offer simple chores or food.',
      ],
    },
    counselorNote: 'Grief can feel unbearable when carried in silence. Reach out to Tele-MANAS (14416) or iCall (9152987821) for compassionate grief support.',
    keywords: ['grief', 'loss', 'death', 'died', 'passed away', 'funeral', 'miss them', 'mourning', 'bereavement', 'lost someone', 'pet died'],
  },
];

/**
 * Match user query to the best 1-3 modes using keyword and token overlap
 */
export function matchQueryToModes(query) {
  if (!query || typeof query !== 'string') return [];
  const normalized = query.toLowerCase().trim();
  if (normalized.length === 0) return [];

  const queryWords = normalized.split(/\s+/).filter(w => w.length > 2);

  const scored = SUPPORT_MODES.map(mode => {
    let score = 0;
    const titleLower = mode.title.toLowerCase();
    const descLower = mode.description.toLowerCase();

    // Direct title phrase match
    if (normalized.includes(titleLower) || titleLower.includes(normalized)) {
      score += 50;
    }

    // Keyword exact phrase matches
    mode.keywords.forEach(kw => {
      if (normalized.includes(kw)) {
        score += 30;
      }
    });

    // Token overlap matches
    queryWords.forEach(word => {
      if (titleLower.includes(word)) score += 15;
      if (descLower.includes(word)) score += 8;
      mode.keywords.forEach(kw => {
        if (kw.includes(word)) score += 10;
      });
    });

    return { mode, score };
  });

  const matches = scored
    .filter(item => item.score > 8)
    .sort((a, b) => b.score - a.score)
    .map(item => item.mode);

  return matches.slice(0, 3);
}
