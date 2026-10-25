/**
 * LandingPage.jsx
 * Redesigned 3D Dark Premium Experience:
 * - Hero with slowly rotating navy neural-orb in Three.js WebGL
 * - Mouse parallax & starfield particle depth background
 * - 3D glass cards with glowing edges on hover
 * - Staggered Framer Motion entrance animations
 * - Preserves Features, How It Works, Testimonials, Team, and Footer
 */
import { motion } from 'framer-motion';
import { Brain, BarChart2, MessageCircle, Shield, Zap, Heart, Users, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import NeuralOrb from './3d/NeuralOrb';
import Card3DTilt from './3d/Card3DTilt';

const fadeUp = {
  hidden: { opacity: 0, y: 35 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const FEATURES = [
  { icon: Brain, color: '#22D3EE', title: '20 Guided Problem Modes', desc: 'Targeted support modes with interactive breathing, reflection prompts, and quick relief tools.' },
  { icon: BarChart2, color: '#3B82F6', title: 'Mood & Sleep Analytics', desc: 'Visual charts and correlation maps that reveal what lifts or drains your mental energy.' },
  { icon: Shield, color: '#38BDF8', title: '100% Private & On-Device', desc: 'Zero trackers. Your emotional check-ins remain exclusively on your device.' },
  { icon: MessageCircle, color: '#818CF8', title: 'Context-Aware AI Chat', desc: 'Empathetic conversation preloaded with your active problem mode whenever you need to talk.' },
  { icon: Zap, color: '#F59E0B', title: 'Instant Relief Sprints', desc: 'Box breathing, 4-7-8 cycles, and sensory grounding tools always one tap away.' },
  { icon: Heart, color: '#F43F5E', title: 'Proactive Crisis Shield', desc: 'Automatic detection of crisis language with immediate connection to 24/7 helplines.' },
];

const STEPS = [
  { n: '01', title: 'Describe or Pick', desc: 'Type your feeling in plain words or choose from 20 dedicated problem cards.' },
  { n: '02', title: 'Targeted Calming Tools', desc: 'Engage with step-by-step breathing timers and prompt reflections built for that exact state.' },
  { n: '03', title: 'Converse With MindMate', desc: 'Explore deeper thoughts with structured AI responses whenever you need gentle guidance.' },
  { n: '04', title: 'Track Your Baseline', desc: 'Observe how sleep, energy, and daily triggers connect over 7 and 30 day trends.' },
];

const TESTIMONIALS = [
  { quote: "Having 20 specific modes instead of a generic chatbot made all the difference. The Box Breathing tool before exams became my secret ritual.", name: "Aarav, 21", emoji: "⚡" },
  { quote: "The dark 3D visuals are stunning. When you open it at 2 AM, it feels calm, premium, and gentle on the eyes.", name: "Meera, 23", emoji: "🌙" },
  { quote: "The fact that it immediately offered Tele-MANAS during a tough week gave me huge respect for the safety standards here.", name: "Rohan, 20", emoji: "💙" },
];

const TEAM = [
  { name: 'Aarav Mehta', role: 'AI & Systems', emoji: '🧑‍💻', color: '#22D3EE' },
  { name: 'Priya Sharma', role: 'UX & 3D Spatial Design', emoji: '👩‍🎨', color: '#3B82F6' },
  { name: 'Rohan Das', role: 'Frontend Architecture', emoji: '👨‍🔬', color: '#38BDF8' },
  { name: 'Dr. Nisha Patel', role: 'Psychosocial Advisor', emoji: '👩‍⚕️', color: '#818CF8' },
];

export default function LandingPage({ setPage }) {
  return (
    <div className="relative text-[#E6EDFF] overflow-x-hidden">
      {/* ── HERO SECTION WITH 3D ROTATING NEURAL ORB ──────────────── */}
      <section id="hero" className="min-h-screen flex items-center justify-center pt-24 pb-20 relative overflow-hidden">
        {/* Soft background ambient radial glows */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-gradient-to-tr from-[#1D4ED8]/20 via-[#22D3EE]/15 to-transparent rounded-full blur-[110px] pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-6 items-center">
            {/* Left Hero Content */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="lg:col-span-7 text-center lg:text-left space-y-6"
            >
              <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-cyan-400/40 text-cyan-300 text-xs sm:text-sm font-semibold shadow-[0_0_20px_rgba(34,211,238,0.25)]">
                <Sparkles size={15} className="text-cyan-400 animate-spin-slow" />
                <span>Next-Gen 3D Mental Wellness Companion</span>
              </motion.div>

              <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.15]">
                A calmer mind,{' '}
                <span className="gradient-text">sculpted in 3D</span>
              </motion.h1>

              <motion.p variants={fadeUp} className="text-base sm:text-lg md:text-xl text-[#8FA3C7] max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
                Navigate exam stress, burnout, overthinking, and life challenges with an ultra-responsive 3D interface, 20 guided problem modes, and empathetic AI support.
              </motion.p>

              <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <button
                  onClick={() => {
                    setPage('dashboard');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 text-white font-bold text-base shadow-[0_0_25px_rgba(34,211,238,0.4)] hover:shadow-[0_0_35px_rgba(34,211,238,0.6)] hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2.5 group"
                >
                  <span>Explore 20 Problem Modes</span>
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>

                <a
                  href="#features"
                  className="w-full sm:w-auto px-7 py-4 rounded-2xl glass-card text-[#E6EDFF] hover:text-white font-semibold text-base hover:border-cyan-400/50 hover:bg-[#0F1D3D]/90 transition-all text-center"
                >
                  Explore 3D Features
                </a>
              </motion.div>

              {/* Trust Indicators */}
              <motion.div variants={fadeUp} className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs sm:text-sm text-[#8FA3C7]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-cyan-400" />
                  <span>Free to Use</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-cyan-400" />
                  <span>100% Private (No Sign Up)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-cyan-400" />
                  <span>Tele-MANAS Integrated</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Hero: Three.js 3D Neural Orb */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="lg:col-span-5 flex items-center justify-center relative"
            >
              <div className="relative w-full max-w-[420px] aspect-square flex items-center justify-center">
                {/* 3D WebGL Neural Orb Component */}
                <NeuralOrb />

                {/* Floating ambient stats chips around orb */}
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -top-2 right-4 glass-card px-3.5 py-2 rounded-xl text-xs font-semibold text-cyan-300 border border-cyan-400/30 shadow-[0_0_20px_rgba(34,211,238,0.25)] flex items-center gap-2 pointer-events-none"
                >
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                  <span>20 Problem Modes</span>
                </motion.div>

                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                  className="absolute -bottom-2 left-4 glass-card px-3.5 py-2 rounded-xl text-xs font-semibold text-blue-300 border border-blue-400/30 shadow-[0_0_20px_rgba(59,130,246,0.25)] flex items-center gap-2 pointer-events-none"
                >
                  <span>🌙 4-7-8 Breathing & Grounding</span>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── FEATURES SECTION (3D TILT CARDS) ───────────────────────── */}
      <section id="features" className="py-24 relative z-10 border-t border-[#3B82F6]/15 bg-[#050B1A]/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <p className="text-xs font-bold uppercase tracking-widest text-cyan-400">
              Architecture of Calm
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white">
              Built for depth, privacy, and speed
            </h2>
            <p className="text-sm sm:text-base text-[#8FA3C7]">
              Every component is engineered with WCAG AA contrast, 60fps hardware acceleration, and psychological science.
            </p>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={staggerContainer}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {FEATURES.map(({ icon: Icon, color, title, desc }) => (
              <motion.div key={title} variants={fadeUp} className="h-full">
                <Card3DTilt
                  glowColor={color}
                  ariaLabel={title}
                  className="p-7 h-full flex flex-col justify-between"
                >
                  <div>
                    <div
                      className="w-13 h-13 rounded-2xl flex items-center justify-center mb-5 shadow-lg"
                      style={{
                        background: 'rgba(15, 29, 61, 0.9)',
                        border: `1px solid ${color}66`,
                        boxShadow: `0 0 20px ${color}33`,
                      }}
                    >
                      <Icon size={24} style={{ color }} />
                    </div>
                    <h3 className="font-bold text-lg text-white mb-2">{title}</h3>
                    <p className="text-sm text-[#8FA3C7] leading-relaxed">{desc}</p>
                  </div>
                  <div className="mt-6 flex items-center gap-1.5 text-xs font-semibold text-cyan-300">
                    <span>Learn how it helps</span>
                    <ArrowRight size={13} />
                  </div>
                </Card3DTilt>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── HOW IT WORKS ───────────────────────────────────────────── */}
      <section id="how-it-works" className="py-24 relative z-10 border-t border-[#3B82F6]/15 bg-[#0A1630]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <p className="text-xs font-bold uppercase tracking-widest text-cyan-400">
              Smooth Progression
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white">
              How MindMate AI works
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {STEPS.map((step, idx) => (
              <motion.div
                key={step.n}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="glass-card p-6 rounded-2xl relative overflow-hidden group hover:border-cyan-400/50 transition-colors"
              >
                <div className="text-3xl font-extrabold text-cyan-400/40 mb-3 group-hover:text-cyan-400 transition-colors font-mono">
                  {step.n}
                </div>
                <h3 className="font-bold text-lg text-white mb-2">{step.title}</h3>
                <p className="text-xs sm:text-sm text-[#8FA3C7] leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ───────────────────────────────────────────── */}
      <section className="py-24 relative z-10 border-t border-[#3B82F6]/15 bg-[#050B1A]/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Real reflections from early users
            </h2>
            <p className="text-sm text-[#8FA3C7]">Support that feels genuine, private, and grounded.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="glass-card p-6 sm:p-7 rounded-2xl flex flex-col justify-between">
                <div>
                  <span className="text-2xl mb-3 block">{t.emoji}</span>
                  <p className="text-sm text-[#E6EDFF]/90 italic leading-relaxed mb-4">
                    "{t.quote}"
                  </p>
                </div>
                <p className="text-xs font-semibold text-cyan-300">— {t.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEAM SECTION ───────────────────────────────────────────── */}
      <section id="team" className="py-24 relative z-10 border-t border-[#3B82F6]/15 bg-[#0A1630]/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <div className="inline-flex items-center gap-2 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
              <Users size={15} />
              <span>Dedicated Creators</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Built with care for young minds
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {TEAM.map((member) => (
              <div key={member.name} className="glass-card p-6 rounded-2xl text-center group hover:border-cyan-400/40 transition-all">
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">{member.emoji}</div>
                <h3 className="font-bold text-base text-white">{member.name}</h3>
                <p className="text-xs text-[#8FA3C7] mt-0.5">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA BANNER ──────────────────────────────────────── */}
      <section className="py-20 relative z-10 bg-gradient-to-r from-blue-900/60 via-[#0A1630] to-cyan-900/40 border-t border-[#3B82F6]/25">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white">
            Ready to find clarity right now?
          </h2>
          <p className="text-base sm:text-lg text-[#8FA3C7] max-w-xl mx-auto">
            No signup. No personal data collected. Just pick what is on your mind and let MindMate guide your breathing and thoughts.
          </p>
          <button
            onClick={() => {
              setPage('dashboard');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-base shadow-[0_0_30px_rgba(34,211,238,0.5)] hover:scale-105 active:scale-95 transition-all inline-flex items-center gap-2"
          >
            <span>Launch MindMate Dashboard</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────────────── */}
      <footer className="bg-[#050B1A] border-t border-[#3B82F6]/20 py-12 text-[#8FA3C7] text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-400 flex items-center justify-center text-white">
                <Brain size={16} />
              </div>
              <span className="font-extrabold text-base text-white">MindMate AI</span>
            </div>
            <p className="text-center md:text-left max-w-xl text-[#8FA3C7] leading-relaxed">
              ⚠️ <strong className="text-white">Medical Disclaimer:</strong> MindMate AI is supportive, not a replacement for professional care. If you are experiencing suicidal thoughts or severe distress, please call <strong className="text-cyan-300">Tele-MANAS (14416)</strong> or <strong className="text-cyan-300">iCall (9152987821)</strong>.
            </p>
            <div className="text-center md:text-right">
              <p className="text-slate-500">© 2026 MindMate AI · Hackathon Edition</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
