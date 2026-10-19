/**
 * LandingPage.jsx
 * Full landing page: Hero → Features → How It Works → Team → Footer
 */
import { motion } from 'framer-motion';
import { Brain, BarChart2, MessageCircle, Shield, Zap, Heart, Users, Star, ArrowRight, CheckCircle } from 'lucide-react';

// ─── Scroll-reveal animation variant ─────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

// ─── Features data ────────────────────────────────────────────────────────────
const FEATURES = [
  { icon: Brain, color: 'violet', title: 'AI-Powered Support', desc: "Get empathetic, personalized responses to whatever you're going through \u2014 anytime, anywhere." },
  { icon: BarChart2, color: 'emerald', title: 'Mood Analytics', desc: 'Visual charts and trends help you understand your emotional patterns over time.' },
  { icon: Shield, color: 'blue', title: 'Private & Secure', desc: 'All your data stays on your device. We never share or sell your emotional data.' },
  { icon: MessageCircle, color: 'purple', title: 'Guided Conversations', desc: '10 specialized support modes for everything from exam stress to family issues.' },
  { icon: Zap, color: 'amber', title: 'Instant Relief', desc: 'Breathing exercises, grounding techniques, and quick wins always one tap away.' },
  { icon: Heart, color: 'rose', title: 'Crisis Support', desc: 'Gentle detection of distress signs with immediate connection to real helplines.' },
];

const STEPS = [
  { n: '01', title: 'Log your mood', desc: 'Take 30 seconds to check in with yourself using our emoji mood tracker.' },
  { n: '02', title: 'Discover patterns', desc: 'See how sleep, stress, and daily events affect your emotional wellbeing.' },
  { n: '03', title: 'Choose your support', desc: 'Pick a mode that matches what you\'re feeling, from mild to serious.' },
  { n: '04', title: 'Talk it through', desc: 'Chat with MindMate AI for step-by-step guidance and practical exercises.' },
];

const TEAM = [
  { name: 'Aarav Mehta', role: 'AI & Backend', emoji: '🧑‍💻', color: 'violet' },
  { name: 'Priya Sharma', role: 'UX & Design', emoji: '👩‍🎨', color: 'emerald' },
  { name: 'Rohan Das', role: 'Frontend Dev', emoji: '👨‍🔬', color: 'blue' },
  { name: 'Nisha Patel', role: 'Mental Health Advisor', emoji: '👩‍⚕️', color: 'rose' },
];

const TESTIMONIALS = [
  { quote: "MindMate helped me recognize that my 3 AM anxiety spirals were always tied to exam deadlines. That awareness alone was life-changing.", name: "Arjun, 20", emoji: "😊" },
  { quote: "The breathing exercises work. I used the 4-7-8 technique before my presentation and actually felt my heart rate slow down.", name: "Divya, 23", emoji: "🌟" },
  { quote: "Just having something to talk to at midnight when I didn't want to wake anyone up — it mattered more than I expected.", name: "Karan, 21", emoji: "💙" },
];

const colorMap = {
  violet: 'bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400',
  emerald: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400',
  blue: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
  purple: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400',
  amber: 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400',
  rose: 'bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400',
};

export default function LandingPage({ setPage }) {
  return (
    <div className="overflow-x-hidden">
      {/* ── Hero ────────────────────────────────────────────────── */}
      <section id="hero" className="hero-gradient min-h-screen flex items-center relative overflow-hidden pt-16">
        {/* Decorative blobs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-violet-300/30 dark:bg-violet-700/20 rounded-full blur-3xl blob" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-300/30 dark:bg-emerald-700/20 rounded-full blur-3xl blob" style={{ animationDelay: '3s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-200/20 rounded-full blur-3xl blob" style={{ animationDelay: '5s' }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
              <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300 text-sm font-medium mb-6 border border-violet-200 dark:border-violet-700">
                <Star size={14} className="fill-violet-500 text-violet-500" />
                Built for Minds that Need a Gentle Hand
              </motion.div>

              <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6">
                Your AI companion for a{' '}
                <span className="gradient-text">calmer mind</span>
              </motion.h1>

              <motion.p variants={fadeUp} className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
                MindMate AI helps you understand your emotions, find practical support, 
                and build healthier mental habits — with empathy, privacy, and science.
              </motion.p>

              <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => setPage('dashboard')}
                  className="group flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-white bg-gradient-to-r from-violet-500 to-purple-600 rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all"
                >
                  Try Dashboard Free
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <a
                  href="#features"
                  className="flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-slate-700 dark:text-slate-200 bg-white/70 dark:bg-slate-800/70 backdrop-blur border border-slate-200 dark:border-slate-700 rounded-2xl hover:bg-white dark:hover:bg-slate-800 transition-all"
                >
                  Learn More
                </a>
              </motion.div>

              <motion.div variants={fadeUp} className="mt-12 flex items-center justify-center gap-8 text-sm text-slate-500 dark:text-slate-400">
                {['Free to use', '100% Private', 'No signup needed'].map(item => (
                  <div key={item} className="flex items-center gap-1.5">
                    <CheckCircle size={15} className="text-emerald-500" />
                    {item}
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Features ─────────────────────────────────────────────── */}
      <section id="features" className="py-24 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.p variants={fadeUp} className="text-violet-600 dark:text-violet-400 font-semibold mb-2">Why MindMate?</motion.p>
            <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-bold mb-4 text-slate-800 dark:text-slate-100">
              Everything you need for mental wellness
            </motion.h2>
            <motion.p variants={fadeUp} className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
              Thoughtfully designed features that meet you where you are — on hard days and good ones.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {FEATURES.map(({ icon: Icon, color, title, desc }) => (
              <motion.div
                key={title} variants={fadeUp}
                className="glass-card p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className={`w-11 h-11 rounded-xl ${colorMap[color]} flex items-center justify-center mb-4`}>
                  <Icon size={20} />
                </div>
                <h3 className="font-semibold text-slate-800 dark:text-slate-100 mb-2">{title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── How It Works ─────────────────────────────────────────── */}
      <section id="how-it-works" className="py-24 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.p variants={fadeUp} className="text-violet-600 dark:text-violet-400 font-semibold mb-2">Simple process</motion.p>
            <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-bold mb-4 text-slate-800 dark:text-slate-100">
              How MindMate works
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {STEPS.map((step, i) => (
              <motion.div key={step.n} variants={fadeUp} className="text-center relative">
                {i < STEPS.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-[60%] w-[80%] h-px bg-gradient-to-r from-violet-300 to-transparent dark:from-violet-700" />
                )}
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 text-white font-bold text-lg flex items-center justify-center mx-auto mb-4 shadow-lg">
                  {step.n}
                </div>
                <h3 className="font-semibold text-slate-800 dark:text-slate-100 mb-2">{step.title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Testimonials ─────────────────────────────────────────── */}
      <section className="py-24 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="text-3xl sm:text-4xl font-bold text-center mb-12 text-slate-800 dark:text-slate-100"
          >
            What users say
          </motion.h2>
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
            className="grid md:grid-cols-3 gap-6"
          >
            {TESTIMONIALS.map(t => (
              <motion.div key={t.name} variants={fadeUp} className="glass-card p-6">
                <div className="text-3xl mb-4">{t.emoji}</div>
                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-4 italic">"{t.quote}"</p>
                <p className="font-semibold text-sm text-slate-800 dark:text-slate-200">— {t.name}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Team ─────────────────────────────────────────────────── */}
      <section id="team" className="py-24 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
            className="text-center mb-12"
          >
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 mb-3">
              <Users size={20} className="text-violet-500" />
              <span className="text-violet-600 dark:text-violet-400 font-semibold">Meet the team</span>
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-bold text-slate-800 dark:text-slate-100">
              Built with care by humans
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {TEAM.map(member => (
              <motion.div
                key={member.name} variants={fadeUp}
                className="glass-card p-6 text-center hover:shadow-xl hover:-translate-y-1 transition-all"
              >
                <div className="text-5xl mb-3">{member.emoji}</div>
                <h3 className="font-semibold text-slate-800 dark:text-slate-100">{member.name}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{member.role}</p>
                <div className={`mt-3 inline-block px-3 py-1 rounded-full text-xs font-medium ${colorMap[member.color]}`}>
                  Team Member
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CTA Banner ───────────────────────────────────────────── */}
      <section className="py-20 bg-gradient-to-r from-violet-600 to-purple-700">
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
          className="max-w-3xl mx-auto px-4 text-center"
        >
          <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Your calmer mind is one click away
          </motion.h2>
          <motion.p variants={fadeUp} className="text-violet-200 mb-8 text-lg">
            No sign-up. No judgment. Just support.
          </motion.p>
          <motion.button
            variants={fadeUp}
            onClick={() => setPage('dashboard')}
            className="px-8 py-4 bg-white text-violet-700 font-semibold rounded-2xl shadow-xl hover:scale-105 transition-transform"
          >
            Open MindMate Dashboard →
          </motion.button>
        </motion.div>
      </section>

      {/* ── Footer ───────────────────────────────────────────────── */}
      <footer className="bg-slate-900 dark:bg-black text-slate-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500 to-emerald-400 flex items-center justify-center">
                <Brain size={14} className="text-white" />
              </div>
              <span className="font-bold text-white">MindMate AI</span>
            </div>
            <p className="text-xs text-center text-slate-500 max-w-md">
              ⚠️ <strong className="text-slate-400">Disclaimer:</strong> MindMate AI is not a substitute for professional medical or psychological help.
              If you are in crisis, please contact a local helpline immediately.{' '}
              <strong className="text-slate-300">Tele-MANAS: 14416 · iCall: 9152987821</strong>
            </p>
            <p className="text-xs text-slate-600">© 2026 MindMate AI · Hackathon Project</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
