import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, Brain, Target, Handshake, Eye, Zap, Sparkles } from 'lucide-react';
import api from '../../services/api';

const fadeUp = {
  hidden: { opacity: 0, y: 40, filter: 'blur(4px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};
const stagger = { visible: { transition: { staggerChildren: 0.12 } } };

const values = [
  {
    icon: Brain,
    title: 'Intelligence-First',
    desc: 'Every solution we build leverages AI to deliver results that were previously impossible.',
    color: '#60A5FA',
    glow: 'rgba(59,130,246,0.2)',
    bg: 'rgba(59,130,246,0.08)',
    border: 'rgba(59,130,246,0.2)',
  },
  {
    icon: Target,
    title: 'Results-Obsessed',
    desc: 'We measure everything. If it does not move the needle, we do not do it.',
    color: '#A78BFA',
    glow: 'rgba(139,92,246,0.2)',
    bg: 'rgba(139,92,246,0.08)',
    border: 'rgba(139,92,246,0.2)',
  },
  {
    icon: Eye,
    title: 'Radical Transparency',
    desc: 'You will always know exactly what we are doing and why. No black boxes.',
    color: '#22D3EE',
    glow: 'rgba(34,211,238,0.2)',
    bg: 'rgba(34,211,238,0.08)',
    border: 'rgba(34,211,238,0.2)',
  },
  {
    icon: Handshake,
    title: 'Long-term Partnership',
    desc: 'We think in decades, not projects. Your growth is our growth.',
    color: '#34D399',
    glow: 'rgba(52,211,153,0.2)',
    bg: 'rgba(52,211,153,0.08)',
    border: 'rgba(52,211,153,0.2)',
  },
];

export default function About() {
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });
  const teamRef = useRef(null);
  const teamInView = useInView(teamRef, { once: true, margin: '-100px' });
  const valuesRef = useRef(null);
  const valuesInView = useInView(valuesRef, { once: true, margin: '-100px' });
  const [team, setTeam] = useState([]);

  useEffect(() => {
    api.get('/team').then(r => setTeam(r.data?.team || r.data || [])).catch(() => setTeam([
      { _id: '1', name: 'Aakash Vishwakarma', image: '/images/founder.png', title: 'Founder', role: 'founder', bio: 'Highly skilled with deep knowledge in AI systems, automation, full-stack development, growth strategy, and digital architecture. Visionary leader driving LACSO HUB innovation.', focus: 'AI Systems, Automation, Full-Stack Dev, Growth Strategy', sortOrder: 1 },
      { _id: '2', name: 'Vidhan Rajvi', image: '/images/vidhan.png', title: 'Cloud Architect & DevOps Engineer', role: 'co-founder', bio: 'Cloud infrastructure maestro and DevOps architect designing highly available and infinitely scalable systems.', focus: 'AWS, Kubernetes, Docker, DevOps, CI/CD', sortOrder: 2 },
    ]));
  }, []);

  return (
    <>
      <Helmet>
        <title>About LACSO HUB — AI-Powered Digital Agency</title>
        <meta name="description" content="Learn about LACSO HUB — an AI-first digital growth ecosystem. Founded by Aakash Vishwakarma and Vidhan Rajvi to make enterprise-grade digital infrastructure accessible." />
      </Helmet>

      <div className="min-h-screen" style={{ background: '#050816' }}>

        {/* ── Hero ── */}
        <section ref={heroRef} className="relative pt-44 pb-28 px-6 overflow-hidden hero-grid">
          <div className="pointer-events-none absolute inset-0">
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)', filter: 'blur(80px)' }}
            />
          </div>

          <div className="max-w-4xl mx-auto text-center relative z-10">
            <motion.div variants={stagger} initial="hidden" animate={heroInView ? 'visible' : 'hidden'}>
              <motion.div variants={fadeUp} className="flex justify-center mb-6">
                <span className="section-tag">
                  <Sparkles size={14} /> Our Story
                </span>
              </motion.div>
              <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl font-black mb-6">
                Intelligence-First.
                <br />
                <span className="gradient-text">Results-Obsessed.</span>
              </motion.h1>
              <motion.p
                variants={fadeUp}
                className="text-xl max-w-2xl mx-auto leading-relaxed"
                style={{ color: 'rgba(255,255,255,0.5)' }}
              >
                We are not a traditional digital agency. We are an AI-first digital growth ecosystem built for businesses that want to dominate — not just participate.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* ── Mission ── */}
        <section className="py-28 px-6 relative overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at center, rgba(99,102,241,0.04) 0%, transparent 70%)' }}
          />

          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center relative z-10">
            {/* Left: Story */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
              <motion.span variants={fadeUp} className="section-tag mb-5 inline-block">
                Our Mission
              </motion.span>
              <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-black mb-6">
                Built to Make{' '}
                <span className="gradient-text">AI Accessible</span>
              </motion.h2>

              <motion.div
                variants={fadeUp}
                className="relative rounded-3xl p-8 md:p-10 overflow-hidden group transition-all duration-500"
                style={{
                  background: 'linear-gradient(135deg, rgba(59,130,246,0.08) 0%, rgba(16,24,39,0.8) 100%)',
                  border: '1px solid rgba(59,130,246,0.2)',
                  backdropFilter: 'blur(20px)',
                }}
                whileHover={{ borderColor: 'rgba(59,130,246,0.4)', boxShadow: '0 0 40px rgba(59,130,246,0.1)' }}
              >
                <div
                  className="absolute top-0 right-0 w-64 h-64 rounded-full pointer-events-none"
                  style={{ background: 'rgba(59,130,246,0.06)', filter: 'blur(50px)' }}
                />

                <h3 className="text-2xl font-bold text-white mb-5 relative z-10 flex items-center gap-3">
                  <div
                    className="w-1.5 h-8 rounded-full"
                    style={{ background: 'linear-gradient(180deg, #60A5FA, #A78BFA)' }}
                  />
                  Our Origins
                </h3>

                <div className="space-y-4 relative z-10">
                  <p className="leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)' }}>
                    Founded by Aakash Vishwakarma, LACSO HUB was built on a simple premise: enterprise-grade digital infrastructure should be accessible to ambitious businesses of all sizes. What started as an AI-focused development firm rapidly evolved into a full-spectrum digital engineering agency.
                  </p>
                  <p className="leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)' }}>
                    With Co-Founder Vidhan Rajvi driving our robust cloud architecture and DevOps operations, we don't just build websites; we architect highly available, scalable, and secure digital ecosystems that power unprecedented growth.
                  </p>
                </div>
              </motion.div>
            </motion.div>

            {/* Right: Stats Grid */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
              className="grid grid-cols-2 gap-4 md:gap-5"
            >
              {[
                { n: '50+', l: 'Projects Delivered', color: '#60A5FA', glow: 'rgba(59,130,246,0.15)' },
                { n: '340%', l: 'Avg Revenue Growth', color: '#A78BFA', glow: 'rgba(139,92,246,0.15)' },
                { n: 'Dec 2025', l: 'Founded', color: '#F472B6', glow: 'rgba(244,114,182,0.12)' },
                { n: '4.9★', l: 'Client Rating', color: '#34D399', glow: 'rgba(52,211,153,0.15)' },
              ].map(({ n, l, color, glow }) => (
                <motion.div
                  key={l}
                  variants={fadeUp}
                  className="relative rounded-2xl p-6 md:p-8 text-center overflow-hidden group transition-all duration-400"
                  style={{
                    background: 'rgba(16,24,39,0.6)',
                    border: '1px solid rgba(255,255,255,0.07)',
                    backdropFilter: 'blur(20px)',
                  }}
                  whileHover={{
                    y: -6,
                    borderColor: `${color}40`,
                    boxShadow: `0 12px 40px rgba(0,0,0,0.3), 0 0 30px ${glow}`,
                    transition: { duration: 0.3 },
                  }}
                >
                  <div
                    className="text-4xl md:text-5xl font-black mb-3"
                    style={{ color }}
                  >
                    {n}
                  </div>
                  <div className="text-sm font-medium" style={{ color: 'rgba(255,255,255,0.45)' }}>{l}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── Values ── */}
        <section
          ref={valuesRef}
          className="py-28 px-6"
          style={{ background: 'linear-gradient(180deg, #050816 0%, #0B1020 50%, #050816 100%)' }}
        >
          <div className="max-w-6xl mx-auto">
            <motion.div
              variants={stagger}
              initial="hidden"
              animate={valuesInView ? 'visible' : 'hidden'}
              className="text-center mb-16"
            >
              <motion.div variants={fadeUp} className="flex justify-center mb-5">
                <span className="section-tag">
                  <Zap size={14} /> Our Values
                </span>
              </motion.div>
              <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-black">
                How We <span className="gradient-text">Operate</span>
              </motion.h2>
            </motion.div>

            <motion.div
              variants={stagger}
              initial="hidden"
              animate={valuesInView ? 'visible' : 'hidden'}
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-5"
            >
              {values.map(({ icon: Icon, title, desc, color, glow, bg, border }) => (
                <motion.div
                  key={title}
                  variants={fadeUp}
                  className="rounded-2xl p-6 text-center transition-all duration-500"
                  style={{
                    background: 'rgba(16,24,39,0.6)',
                    border: '1px solid rgba(255,255,255,0.07)',
                    backdropFilter: 'blur(20px)',
                  }}
                  whileHover={{
                    y: -6,
                    borderColor: border,
                    boxShadow: `0 16px 50px rgba(0,0,0,0.4), 0 0 30px ${glow}`,
                    transition: { duration: 0.3 },
                  }}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-5 transition-all duration-300"
                    style={{ background: bg, border: `1px solid ${border}` }}
                  >
                    <Icon size={22} style={{ color }} />
                  </div>
                  <h3 className="font-bold text-white mb-2.5">{title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)' }}>{desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── Team ── */}
        <section ref={teamRef} className="py-28 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              variants={stagger}
              initial="hidden"
              animate={teamInView ? 'visible' : 'hidden'}
              className="text-center mb-16"
            >
              <motion.div variants={fadeUp} className="flex justify-center mb-5">
                <span className="section-tag">The Team</span>
              </motion.div>
              <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-black">
                The Minds{' '}
                <span className="gradient-text">Behind the Magic</span>
              </motion.h2>
            </motion.div>

            <motion.div
              variants={stagger}
              initial="hidden"
              animate={teamInView ? 'visible' : 'hidden'}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {team.map((m, idx) => (
                <motion.div
                  key={m._id}
                  variants={fadeUp}
                  className="rounded-2xl p-7 text-center transition-all duration-500"
                  style={{
                    background: m.role === 'founder'
                      ? 'linear-gradient(135deg, rgba(59,130,246,0.08) 0%, rgba(16,24,39,0.8) 100%)'
                      : 'rgba(16,24,39,0.6)',
                    border: m.role === 'founder'
                      ? '1px solid rgba(59,130,246,0.3)'
                      : '1px solid rgba(255,255,255,0.07)',
                    backdropFilter: 'blur(24px)',
                    boxShadow: m.role === 'founder' ? '0 0 40px rgba(59,130,246,0.08)' : 'none',
                  }}
                  whileHover={{
                    y: -6,
                    boxShadow: '0 20px 60px rgba(0,0,0,0.4), 0 0 40px rgba(99,102,241,0.12)',
                    transition: { duration: 0.3 },
                  }}
                >
                  {m.role === 'founder' && (
                    <div
                      className="text-xs font-bold uppercase tracking-[0.15em] mb-4"
                      style={{ color: '#60A5FA' }}
                    >
                      Founder & CEO
                    </div>
                  )}
                  {m.role === 'co-founder' && (
                    <div
                      className="text-xs font-bold uppercase tracking-[0.15em] mb-4"
                      style={{ color: '#A78BFA' }}
                    >
                      Co-Founder
                    </div>
                  )}

                  {m.image ? (
                    <img
                      src={m.image}
                      alt={m.name}
                      className="w-20 h-20 rounded-2xl object-cover mx-auto mb-5 transition-transform duration-400 hover:scale-105"
                      style={{ border: '2px solid rgba(99,102,241,0.3)' }}
                    />
                  ) : (
                    <div
                      className="w-20 h-20 rounded-2xl flex items-center justify-center text-white text-3xl font-black mx-auto mb-5"
                      style={{
                        background: idx % 2 === 0
                          ? 'linear-gradient(135deg, #3B82F6, #8B5CF6)'
                          : 'linear-gradient(135deg, #8B5CF6, #22D3EE)',
                        boxShadow: idx % 2 === 0
                          ? '0 8px 24px rgba(59,130,246,0.35)'
                          : '0 8px 24px rgba(139,92,246,0.35)',
                      }}
                    >
                      {m.name.charAt(0)}
                    </div>
                  )}

                  <h3 className="font-bold text-white text-lg mb-1">{m.name}</h3>
                  <div className="text-sm font-semibold mb-4" style={{ color: '#93C5FD' }}>{m.title}</div>
                  <p className="text-sm leading-relaxed mb-4" style={{ color: 'rgba(255,255,255,0.45)' }}>{m.bio}</p>

                  {m.focus && (
                    <p className="text-xs" style={{ color: 'rgba(255,255,255,0.25)' }}>{m.focus}</p>
                  )}
                  {m.linkedin && (
                    <a
                      href={m.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 mt-4 text-xs font-semibold transition-colors duration-200"
                      style={{ color: '#60A5FA' }}
                      onMouseEnter={(e) => { e.currentTarget.style.color = '#93C5FD'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = '#60A5FA'; }}
                    >
                      LinkedIn →
                    </a>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="py-28 px-6">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="rounded-3xl p-12 relative overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(59,130,246,0.1) 0%, rgba(139,92,246,0.08) 50%, rgba(34,211,238,0.06) 100%)',
                border: '1px solid rgba(99,102,241,0.25)',
                backdropFilter: 'blur(24px)',
              }}
            >
              <div className="absolute inset-x-0 top-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(99,102,241,0.5), transparent)' }} />
              <h2 className="text-3xl md:text-5xl font-black mb-4">
                Ready to{' '}
                <span className="gradient-text">Transform</span>
                {' '}Your Business?
              </h2>
              <p className="mb-8 max-w-md mx-auto" style={{ color: 'rgba(255,255,255,0.5)' }}>
                Join the businesses already growing with LACSO HUB's AI-powered ecosystem.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/contact" className="btn-primary">
                  Start Your Project <ArrowRight size={16} />
                </Link>
                <a href="https://wa.me/918866371807" target="_blank" rel="noreferrer" className="btn-outline">
                  Chat on WhatsApp
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}
