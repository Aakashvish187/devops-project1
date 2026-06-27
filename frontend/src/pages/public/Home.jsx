import { useEffect, useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import {
  ArrowRight,
  Monitor,
  Brain,
  TrendingUp,
  Palette,
  Smartphone,
  Star,
  CheckCircle,
  Users,
  ChevronRight,
  MessageCircle,
  Calendar,
  Tag,
  ExternalLink,
  Zap,
  Shield,
  Globe,
  Cpu,
  BarChart3,
  Sparkles,
  Quote,
} from 'lucide-react';
import api from '../../services/api';

/* ─────────────────────────────────────────────
   Animation Variants
───────────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 48, filter: 'blur(4px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } },
};
const fadeIn = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};
const stagger = { visible: { transition: { staggerChildren: 0.1 } } };
const staggerSlow = { visible: { transition: { staggerChildren: 0.15 } } };

/* ─────────────────────────────────────────────
   Animated Counter
───────────────────────────────────────────── */
function useCounter(target, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const numericTarget = parseFloat(String(target).replace(/[^0-9.]/g, ''));
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * numericTarget));
      if (progress < 1) requestAnimationFrame(step);
      else setCount(numericTarget);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

function AnimatedCounter({ target, duration, start, isDecimal }) {
  const count = useCounter(target, duration, start);
  if (isDecimal) return <>{(count / 10).toFixed(1)}</>;
  return <>{count}</>;
}

/* ─────────────────────────────────────────────
   Service Icon Map
───────────────────────────────────────────── */
const SERVICE_ICONS = { monitor: Monitor, brain: Brain, trending: TrendingUp, palette: Palette, smartphone: Smartphone };
const FALLBACK_ICONS = [Monitor, Brain, TrendingUp, Palette, Smartphone];
const SERVICE_COLORS = [
  { from: 'rgba(59,130,246,0.18)', to: 'rgba(34,211,238,0.1)', border: 'rgba(59,130,246,0.35)', icon: '#60A5FA', glow: 'rgba(59,130,246,0.25)' },
  { from: 'rgba(139,92,246,0.18)', to: 'rgba(59,130,246,0.1)', border: 'rgba(139,92,246,0.35)', icon: '#A78BFA', glow: 'rgba(139,92,246,0.25)' },
  { from: 'rgba(34,211,238,0.18)', to: 'rgba(59,130,246,0.1)', border: 'rgba(34,211,238,0.35)', icon: '#22D3EE', glow: 'rgba(34,211,238,0.25)' },
  { from: 'rgba(244,114,182,0.18)', to: 'rgba(139,92,246,0.1)', border: 'rgba(244,114,182,0.35)', icon: '#F472B6', glow: 'rgba(244,114,182,0.25)' },
  { from: 'rgba(251,191,36,0.18)', to: 'rgba(245,158,11,0.1)', border: 'rgba(251,191,36,0.35)', icon: '#FBBF24', glow: 'rgba(251,191,36,0.2)' },
  { from: 'rgba(52,211,153,0.18)', to: 'rgba(16,185,129,0.1)', border: 'rgba(52,211,153,0.35)', icon: '#34D399', glow: 'rgba(52,211,153,0.25)' },
];

/* ═══════════════════════════════════════════════════════
   HERO SECTION
═══════════════════════════════════════════════════════ */
function HeroSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 60, damping: 20 });

  const handleMouseMove = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left - rect.width / 2) / rect.width * 40);
    mouseY.set((e.clientY - rect.top - rect.height / 2) / rect.height * 20);
  }, [mouseX, mouseY]);

  const stats = [
    { label: 'Projects Delivered', value: 50, suffix: '+', prefix: '', isDecimal: false },
    { label: 'Avg Revenue Growth', value: 340, suffix: '%', prefix: '', isDecimal: false },
    { label: 'Client Rating', value: 49, suffix: '★', prefix: '', isDecimal: true },
    { label: 'Founded', value: null, display: 'Dec 2025' },
  ];

  const trustBadges = [
    { icon: Shield, label: 'Trusted by 50+ Businesses' },
    { icon: Globe, label: 'India · UAE · US · UK' },
    { icon: Cpu, label: 'AI-First Architecture' },
  ];

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden hero-grid"
      onMouseMove={handleMouseMove}
    >
      {/* ── Aurora Background Orbs ── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          style={{ x: smoothX, y: smoothY }}
          className="absolute top-0 left-0 w-full h-full"
        >
          <div
            className="absolute -top-24 -left-24 w-[700px] h-[700px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(59,130,246,0.14) 0%, transparent 70%)',
              filter: 'blur(80px)',
            }}
          />
          <div
            className="absolute top-1/3 -right-32 w-[600px] h-[600px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)',
              filter: 'blur(80px)',
              animationDelay: '2s',
            }}
          />
          <div
            className="absolute bottom-0 left-1/3 w-[500px] h-[500px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(34,211,238,0.1) 0%, transparent 70%)',
              filter: 'blur(70px)',
            }}
          />
        </motion.div>

        {/* Floating glowing dots */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${4 + (i % 3) * 3}px`,
              height: `${4 + (i % 3) * 3}px`,
              left: `${10 + i * 11}%`,
              top: `${15 + (i % 5) * 15}%`,
              background: i % 3 === 0 ? '#60A5FA' : i % 3 === 1 ? '#A78BFA' : '#22D3EE',
              boxShadow: `0 0 ${10 + i * 3}px currentColor`,
              opacity: 0.25 + (i % 4) * 0.1,
            }}
            animate={{
              y: [0, -(20 + i * 5), 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 4 + i * 0.8,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.6,
            }}
          />
        ))}
      </div>

      {/* ── Main Content ── */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center pt-36 pb-20">
        <motion.div variants={stagger} initial="hidden" animate={inView ? 'visible' : 'hidden'}>

          {/* Badge */}
          <motion.div variants={fadeUp} className="mb-8 flex justify-center">
            <div
              className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full text-sm font-semibold"
              style={{
                background: 'rgba(59,130,246,0.1)',
                border: '1px solid rgba(99,102,241,0.3)',
                color: '#93C5FD',
                boxShadow: '0 0 24px rgba(59,130,246,0.15)',
              }}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
              <Zap size={13} className="text-blue-400" />
              AI-Powered Digital Agency · Est. Dec 2025
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeUp}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-6 leading-[1.02] tracking-tight"
          >
            <span
              style={{
                background: 'linear-gradient(135deg, #ffffff 0%, rgba(255,255,255,0.92) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              LacsoHub
            </span>
            <br />
            <span className="gradient-text text-shadow">AI-Powered Growth</span>
            <br />
            <span
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.5) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Platform
            </span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            variants={fadeUp}
            className="text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
            style={{ color: 'rgba(255,255,255,0.55)' }}
          >
            LacsoHub engineers{' '}
            <span style={{ color: '#93C5FD', fontWeight: 600 }}>high-performance AI websites</span>,{' '}
            automation systems, and{' '}
            <span style={{ color: '#C4B5FD', fontWeight: 600 }}>digital growth engines</span>{' '}
            that scale businesses exponentially.
          </motion.p>

          {/* Trust Badges */}
          <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-3 mb-10">
            {trustBadges.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: 'rgba(255,255,255,0.6)',
                }}
              >
                <Icon size={12} className="text-blue-400" />
                {label}
              </div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-4 mb-20">
            <Link to="/contact" className="btn-primary text-base px-8 py-4 text-base">
              <Sparkles size={18} />
              Start Your Project
              <ArrowRight size={18} />
            </Link>
            <Link to="/portfolio" className="btn-outline text-base px-8 py-4">
              View Our Work
              <ExternalLink size={16} />
            </Link>
          </motion.div>

          {/* Stats Bar */}
          <motion.div
            variants={stagger}
            className="grid grid-cols-2 md:grid-cols-4 rounded-2xl overflow-hidden"
            style={{
              background: 'rgba(11,16,32,0.8)',
              border: '1px solid rgba(255,255,255,0.08)',
              backdropFilter: 'blur(20px)',
              boxShadow: '0 8px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)',
            }}
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                variants={fadeUp}
                className="group px-6 py-7 text-center border-white/[0.05] transition-all duration-300 relative overflow-hidden"
                style={{
                  borderRight: i < 3 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                }}
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: 'radial-gradient(circle at center, rgba(99,102,241,0.08) 0%, transparent 70%)' }}
                />
                <div className="stat-number mb-1 relative z-10">
                  {stat.value === null ? (
                    <span style={{ fontSize: '2rem', fontWeight: 900 }}>{stat.display}</span>
                  ) : (
                    <>
                      {stat.prefix}
                      <AnimatedCounter
                        target={stat.value}
                        duration={2200}
                        start={inView}
                        isDecimal={stat.isDecimal}
                      />
                      {stat.suffix}
                    </>
                  )}
                </div>
                <div className="text-xs font-medium uppercase tracking-wider relative z-10" style={{ color: 'rgba(255,255,255,0.35)' }}>
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs tracking-[0.2em] uppercase" style={{ color: 'rgba(255,255,255,0.25)' }}>Scroll</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
          className="w-px h-10 rounded-full"
          style={{ background: 'linear-gradient(180deg, #3B82F6, transparent)' }}
        />
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   SERVICES SECTION
═══════════════════════════════════════════════════════ */
function ServicesSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get('/services')
      .then((r) => setServices(r.data?.data || r.data || []))
      .catch(() =>
        setServices([
          { _id: '1', title: 'Web Development', slug: 'web-development', shortDesc: 'Custom, lightning-fast websites built to convert visitors into customers.', icon: 'monitor', startingPrice: '12,000' },
          { _id: '2', title: 'AI Automation', slug: 'ai-automation', shortDesc: 'Intelligent workflows that eliminate repetitive tasks and scale your operations.', icon: 'brain', startingPrice: '18,000' },
          { _id: '3', title: 'Growth Marketing', slug: 'growth-marketing', shortDesc: 'Data-driven strategies that compound your revenue month over month.', icon: 'trending', startingPrice: '10,000' },
          { _id: '4', title: 'Brand & Design', slug: 'brand-design', shortDesc: 'Visual identities that position you as the premium choice in your market.', icon: 'palette', startingPrice: '8,000' },
          { _id: '5', title: 'Mobile Apps', slug: 'mobile-apps', shortDesc: 'Native and cross-platform apps that delight users and drive engagement.', icon: 'smartphone', startingPrice: '25,000' },
        ])
      )
      .finally(() => setLoading(false));
  }, []);

  const getIcon = (svc, idx) => {
    const key = (svc.icon || '').toLowerCase();
    return SERVICE_ICONS[key] || FALLBACK_ICONS[idx % FALLBACK_ICONS.length];
  };

  return (
    <section ref={ref} className="py-32 px-6 relative overflow-hidden">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.05) 0%, transparent 70%)', filter: 'blur(80px)' }} />

      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center mb-20"
        >
          <motion.div variants={fadeUp} className="flex justify-center mb-5">
            <span className="section-tag"><Cpu size={14} /> Our Services</span>
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-4xl md:text-6xl font-black mb-5">
            Everything You Need to{' '}
            <span className="gradient-text">Dominate Digitally</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-lg max-w-xl mx-auto" style={{ color: 'rgba(255,255,255,0.45)' }}>
            From first click to loyal customer — we cover every touchpoint of your digital presence.
          </motion.p>
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="rounded-2xl h-64 animate-pulse" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }} />
            ))}
          </div>
        ) : (
          <motion.div
            variants={staggerSlow}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {services.slice(0, 6).map((svc, i) => {
              const Icon = getIcon(svc, i);
              const colors = SERVICE_COLORS[i % SERVICE_COLORS.length];
              return (
                <motion.div key={svc._id || i} variants={fadeUp}>
                  <Link
                    to={`/services/${svc.slug || svc._id}`}
                    className="flex flex-col h-full group cursor-pointer rounded-2xl p-6 transition-all duration-500 relative overflow-hidden"
                    style={{
                      background: 'rgba(16,24,39,0.6)',
                      border: `1px solid rgba(255,255,255,0.07)`,
                      backdropFilter: 'blur(20px)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = colors.border;
                      e.currentTarget.style.transform = 'translateY(-6px)';
                      e.currentTarget.style.boxShadow = `0 20px 60px rgba(0,0,0,0.4), 0 0 40px ${colors.glow}`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    {/* Hover gradient background */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{ background: `linear-gradient(135deg, ${colors.from} 0%, ${colors.to} 100%)` }}
                    />

                    {/* Icon */}
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110 relative z-10"
                      style={{
                        background: `linear-gradient(135deg, ${colors.from}, rgba(255,255,255,0.03))`,
                        border: `1px solid ${colors.border}`,
                      }}
                    >
                      <Icon size={22} style={{ color: colors.icon }} />
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-white mb-2.5 transition-colors duration-300 group-hover:text-white relative z-10">
                      {svc.title}
                    </h3>

                    {/* Desc */}
                    <p className="text-sm leading-relaxed flex-1 mb-5 relative z-10" style={{ color: 'rgba(255,255,255,0.5)' }}>
                      {svc.shortDesc || svc.description}
                    </p>

                    {/* Footer */}
                    <div
                      className="flex items-center justify-between pt-4 relative z-10"
                      style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
                    >
                      <span className="font-bold text-sm" style={{ color: colors.icon }}>
                        ₹{svc.startingPrice || svc.price || 'X,XXX'} onwards
                      </span>
                      <div className="flex items-center gap-1 text-xs font-semibold transition-all duration-300 group-hover:gap-2" style={{ color: colors.icon }}>
                        Learn More <ArrowRight size={13} />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        )}

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center mt-14"
        >
          <Link to="/services" className="btn-outline">
            Explore All Services <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   PORTFOLIO / CASE STUDIES SECTION
═══════════════════════════════════════════════════════ */
function PortfolioSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [portfolio, setPortfolio] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get('/portfolio')
      .then((r) => setPortfolio(r.data?.data || r.data || []))
      .catch(() =>
        setPortfolio([
          {
            _id: '1', clientName: 'GrowthEdge SaaS', category: 'Web + Automation', featured: true,
            challenge: 'Outdated website losing 70% of leads at the first touchpoint.',
            results: ['340% increase in qualified leads', 'Reduced sales cycle by 45%', '₹18L additional MRR in 3 months'],
            beforeMetric: { label: 'Conversion Rate', value: '1.2%' },
            afterMetric: { label: 'Conversion Rate', value: '8.7%' },
          },
          {
            _id: '2', clientName: 'NexaRetail', category: 'E-commerce + AI', featured: false,
            challenge: 'Manual inventory and fulfillment operations burning cash and team time.',
            results: ['68% reduction in manual ops', 'Saved 120+ hrs/month', 'ROI within 45 days'],
            beforeMetric: { label: 'Order Processing', value: '4.5 hrs' },
            afterMetric: { label: 'Order Processing', value: '22 min' },
          },
          {
            _id: '3', clientName: 'UrbanNest Realty', category: 'Brand + Digital', featured: false,
            challenge: 'Zero digital presence in a hypercompetitive local real estate market.',
            results: ['#1 Google rank in 6 weeks', '220% rise in inquiries', '3 premium deals via organic'],
            beforeMetric: { label: 'Monthly Inquiries', value: '12' },
            afterMetric: { label: 'Monthly Inquiries', value: '89' },
          },
        ])
      )
      .finally(() => setLoading(false));
  }, []);

  return (
    <section
      ref={ref}
      className="py-32 px-6 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #050816 0%, #0B1020 50%, #050816 100%)' }}
    >
      <div className="absolute inset-x-0 top-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(99,102,241,0.3), transparent)' }} />
      <div className="absolute inset-x-0 bottom-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(99,102,241,0.2), transparent)' }} />

      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center mb-20"
        >
          <motion.div variants={fadeUp} className="flex justify-center mb-5">
            <span className="section-tag"><BarChart3 size={14} /> Case Studies</span>
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-4xl md:text-6xl font-black mb-5">
            Results That{' '}
            <span className="gradient-text">Speak Louder</span>
            {' '}Than Promises
          </motion.h2>
          <motion.p variants={fadeUp} className="text-lg max-w-xl mx-auto" style={{ color: 'rgba(255,255,255,0.45)' }}>
            Real clients. Real numbers. Real transformation.
          </motion.p>
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="rounded-2xl h-80 animate-pulse" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }} />
            ))}
          </div>
        ) : (
          <motion.div
            variants={staggerSlow}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          >
            {portfolio.slice(0, 3).map((item) => (
              <motion.div
                key={item._id}
                variants={fadeUp}
                className="relative rounded-2xl p-6 flex flex-col transition-all duration-500 group"
                style={{
                  background: item.featured
                    ? 'linear-gradient(135deg, rgba(139,92,246,0.1) 0%, rgba(59,130,246,0.06) 100%)'
                    : 'rgba(16,24,39,0.6)',
                  border: item.featured ? '1px solid rgba(139,92,246,0.35)' : '1px solid rgba(255,255,255,0.07)',
                  backdropFilter: 'blur(20px)',
                  boxShadow: item.featured ? '0 0 40px rgba(139,92,246,0.15)' : 'none',
                }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
              >
                {item.featured && (
                  <div className="absolute -top-3 left-6">
                    <span
                      className="px-3 py-1 rounded-full text-white text-xs font-bold uppercase tracking-wider"
                      style={{ background: 'linear-gradient(135deg, #8B5CF6, #3B82F6)' }}
                    >
                      ⭐ Featured
                    </span>
                  </div>
                )}

                {/* Category */}
                <div className="flex items-center justify-between mb-4">
                  <span
                    className="px-3 py-1 rounded-full text-xs font-semibold"
                    style={{
                      background: 'rgba(59,130,246,0.1)',
                      border: '1px solid rgba(59,130,246,0.2)',
                      color: '#93C5FD',
                    }}
                  >
                    {item.category}
                  </span>
                </div>

                {/* Client */}
                <h3 className="text-xl font-bold text-white mb-3">{item.clientName}</h3>

                {/* Challenge */}
                <div className="mb-5 flex-1">
                  <span className="text-xs font-semibold uppercase tracking-wider block mb-1.5" style={{ color: 'rgba(255,255,255,0.25)' }}>Challenge</span>
                  <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>{item.challenge}</p>
                </div>

                {/* Results */}
                <div className="space-y-2 mb-5">
                  {(item.results || []).slice(0, 3).map((r, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-sm">
                      <CheckCircle size={14} className="text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span style={{ color: 'rgba(255,255,255,0.7)' }}>{r}</span>
                    </div>
                  ))}
                </div>

                {/* Before / After */}
                {item.beforeMetric && item.afterMetric && (
                  <div className="grid grid-cols-2 gap-3 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                    <div
                      className="text-center rounded-xl p-3"
                      style={{ background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.12)' }}
                    >
                      <div className="text-xs uppercase tracking-wider mb-1" style={{ color: 'rgba(255,255,255,0.3)' }}>Before</div>
                      <div className="font-bold text-red-400">{item.beforeMetric.value}</div>
                      <div className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>{item.beforeMetric.label}</div>
                    </div>
                    <div
                      className="text-center rounded-xl p-3"
                      style={{ background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.14)' }}
                    >
                      <div className="text-xs uppercase tracking-wider mb-1" style={{ color: 'rgba(255,255,255,0.3)' }}>After</div>
                      <div className="font-bold text-emerald-400">{item.afterMetric.value}</div>
                      <div className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>{item.afterMetric.label}</div>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center mt-14"
        >
          <Link to="/portfolio" className="btn-outline">
            View All Case Studies <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   TESTIMONIALS SECTION
═══════════════════════════════════════════════════════ */
function TestimonialsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get('/testimonials')
      .then((r) => setTestimonials(r.data?.data || r.data || []))
      .catch(() =>
        setTestimonials([
          { _id: '1', name: 'Rahul Mehta', role: 'CEO, GrowthEdge', rating: 5, quote: 'LACSO HUB completely transformed our digital presence. The AI automation saved us 120 hours a month and the website conversions tripled within 6 weeks. Absolutely phenomenal work.' },
          { _id: '2', name: 'Neha Sharma', role: 'Founder, NexaRetail', rating: 5, quote: 'What impressed me most was the speed and quality. They delivered a fully functional e-commerce system with AI inventory management in just 3 weeks. Best investment for my business.' },
          { _id: '3', name: 'Vikram Joshi', role: 'Director, UrbanNest', rating: 5, quote: 'We went from zero online presence to ranking #1 on Google in 6 weeks. The inquiries started flowing immediately. LACSO HUB\'s results-obsessed approach is exactly what we needed.' },
          { _id: '4', name: 'Ananya Patel', role: 'CMO, TechBridge', rating: 5, quote: 'Their team understood our vision immediately and delivered a product that exceeded every expectation. The attention to detail in both design and functionality is world-class.' },
          { _id: '5', name: 'Suresh Kumar', role: 'MD, Pinnacle Ventures', rating: 5, quote: 'Radical transparency and real results. They showed us exactly what they were doing and why. The ROI was evident within the first month. Highly recommended to any business.' },
        ])
      )
      .finally(() => setLoading(false));
  }, []);

  const avatarColors = [
    ['#3B82F6', '#8B5CF6'],
    ['#8B5CF6', '#EC4899'],
    ['#06B6D4', '#3B82F6'],
    ['#F59E0B', '#EF4444'],
    ['#10B981', '#06B6D4'],
  ];

  return (
    <section ref={ref} className="py-32 px-6 relative overflow-hidden">
      <div className="pointer-events-none absolute top-0 right-0 w-[500px] h-[500px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 70%)', filter: 'blur(80px)' }} />

      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center mb-20"
        >
          <motion.div variants={fadeUp} className="flex justify-center mb-5">
            <span className="section-tag"><Star size={14} /> Testimonials</span>
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-4xl md:text-6xl font-black mb-5">
            What Our{' '}
            <span className="gradient-text">Clients Say</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-lg" style={{ color: 'rgba(255,255,255,0.4)' }}>
            5.0 ★ average across 50+ projects
          </motion.p>
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="rounded-2xl h-48 animate-pulse" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }} />
            ))}
          </div>
        ) : (
          <motion.div
            variants={staggerSlow}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {testimonials.map((t, idx) => (
              <motion.div
                key={t._id}
                variants={fadeUp}
                className="rounded-2xl p-6 flex flex-col gap-4 group transition-all duration-500 relative overflow-hidden"
                style={{
                  background: 'rgba(16,24,39,0.7)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  backdropFilter: 'blur(20px)',
                }}
                whileHover={{
                  y: -6,
                  borderColor: 'rgba(99,102,241,0.3)',
                  boxShadow: '0 20px 60px rgba(0,0,0,0.4), 0 0 40px rgba(99,102,241,0.1)',
                  transition: { duration: 0.3 },
                }}
              >
                {/* Quote mark decoration */}
                <Quote
                  size={32}
                  className="absolute top-4 right-4 opacity-6"
                  style={{ color: '#A78BFA', opacity: 0.12 }}
                />

                {/* Stars */}
                <div className="flex gap-1">
                  {[...Array(t.rating || 5)].map((_, i) => (
                    <Star key={i} size={14} style={{ color: '#FBBF24', fill: '#FBBF24' }} />
                  ))}
                </div>

                {/* Quote */}
                <p
                  className="text-sm leading-relaxed flex-1 italic"
                  style={{ color: 'rgba(255,255,255,0.65)' }}
                >
                  "{t.quote}"
                </p>

                {/* Author */}
                <div
                  className="flex items-center gap-3 pt-4"
                  style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
                >
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                    style={{ background: `linear-gradient(135deg, ${avatarColors[idx % avatarColors.length][0]}, ${avatarColors[idx % avatarColors.length][1]})` }}
                  >
                    {(t.name || 'A').charAt(0)}
                  </div>
                  <div>
                    <div className="text-white font-semibold text-sm">{t.name}</div>
                    <div className="text-xs" style={{ color: 'rgba(255,255,255,0.38)' }}>{t.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   TEAM PREVIEW
═══════════════════════════════════════════════════════ */
function TeamPreview() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get('/team')
      .then((r) => setTeam(r.data?.data || r.data || []))
      .catch(() =>
        setTeam([
          { _id: '1', name: 'Aakash Vishwakarma', image: '/images/founder.png', role: 'Founder', bio: 'Full-stack developer and AI strategist with a passion for building digital ecosystems that drive real business outcomes.', expertise: ['AI Strategy', 'Full-Stack Dev', 'Growth Hacking'] },
          { _id: '2', name: 'Vidhan Rajvi', image: '/images/vidhan.png', role: 'Cloud Architect & DevOps Engineer', bio: 'Cloud infrastructure maestro and DevOps architect. Vidhan designs highly available, secure, and infinitely scalable systems.', expertise: ['AWS', 'Docker', 'Kubernetes'] },
        ])
      )
      .finally(() => setLoading(false));
  }, []);

  return (
    <section
      ref={ref}
      className="py-32 px-6 relative"
      style={{ background: 'linear-gradient(180deg, #050816 0%, #0B1020 50%, #050816 100%)' }}
    >
      <div className="absolute inset-x-0 top-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(139,92,246,0.3), transparent)' }} />

      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center mb-20"
        >
          <motion.div variants={fadeUp} className="flex justify-center mb-5">
            <span className="section-tag"><Users size={14} /> Our Team</span>
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-black mb-5">
            The Minds Behind{' '}
            <span className="gradient-text">Your Growth</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-lg max-w-xl mx-auto" style={{ color: 'rgba(255,255,255,0.45)' }}>
            A tight-knit team of builders, strategists, and creatives obsessed with your results.
          </motion.p>
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="rounded-2xl h-64 animate-pulse" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }} />
            ))}
          </div>
        ) : (
          <motion.div
            variants={staggerSlow}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {team.slice(0, 3).map((member, idx) => (
              <motion.div
                key={member._id}
                variants={fadeUp}
                className="rounded-2xl p-6 text-center group transition-all duration-500"
                style={{
                  background: 'rgba(16,24,39,0.6)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  backdropFilter: 'blur(20px)',
                }}
                whileHover={{
                  y: -6,
                  borderColor: 'rgba(99,102,241,0.3)',
                  boxShadow: '0 20px 60px rgba(0,0,0,0.4), 0 0 40px rgba(99,102,241,0.1)',
                  transition: { duration: 0.3 },
                }}
              >
                {/* Avatar */}
                <div
                  className="mx-auto w-20 h-20 rounded-2xl flex items-center justify-center text-white text-3xl font-black mb-5 group-hover:scale-110 transition-transform duration-400"
                  style={{
                    background: `linear-gradient(135deg, ${idx % 2 === 0 ? '#3B82F6, #8B5CF6' : '#8B5CF6, #22D3EE'})`,
                    boxShadow: `0 8px 24px ${idx % 2 === 0 ? 'rgba(59,130,246,0.3)' : 'rgba(139,92,246,0.3)'}`,
                  }}
                >
                  {(member.name || 'A').charAt(0)}
                </div>
                <h3 className="text-lg font-bold text-white mb-1">{member.name}</h3>
                <div className="text-sm font-semibold mb-3" style={{ color: '#93C5FD' }}>{member.role}</div>
                <p className="text-sm leading-relaxed mb-4" style={{ color: 'rgba(255,255,255,0.45)' }}>{member.bio}</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {(member.expertise || []).slice(0, 3).map((tag, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-full text-xs font-medium"
                      style={{
                        background: 'rgba(59,130,246,0.1)',
                        border: '1px solid rgba(59,130,246,0.2)',
                        color: '#93C5FD',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center mt-14"
        >
          <Link to="/team" className="btn-outline">
            Meet the Full Team <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   BLOG PREVIEW
═══════════════════════════════════════════════════════ */
function BlogPreview() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get('/blogs?limit=3&sort=-createdAt')
      .then((r) => setBlogs(r.data?.data || r.data || []))
      .catch(() =>
        setBlogs([
          { _id: '1', slug: 'ai-automation-2026', category: 'AI & Automation', title: 'How AI Automation Is Replacing Entire Teams in 2026', excerpt: 'Discover the workflow automation patterns that top companies are using to cut costs by 60% while scaling faster than ever.', readTime: '8 min', createdAt: '2026-06-10' },
          { _id: '2', slug: 'conversion-rate-optimization', category: 'Growth Marketing', title: 'The CRO Framework That Tripled Our Client\'s Revenue', excerpt: 'A behind-the-scenes look at the exact conversion optimization process we use to consistently 3x client results in 90 days.', readTime: '6 min', createdAt: '2026-06-05' },
          { _id: '3', slug: 'premium-web-design-principles', category: 'Web Design', title: '7 Design Principles Behind ₹1Cr+ Websites', excerpt: 'What separates a ₹10,000 website from a ₹1Cr brand asset? These 7 principles are the difference between a site and a sales machine.', readTime: '10 min', createdAt: '2026-05-28' },
        ])
      )
      .finally(() => setLoading(false));
  }, []);

  const categoryColors = {
    'AI & Automation': { bg: 'rgba(59,130,246,0.1)', border: 'rgba(59,130,246,0.2)', text: '#93C5FD' },
    'Growth Marketing': { bg: 'rgba(16,185,129,0.1)', border: 'rgba(16,185,129,0.2)', text: '#6EE7B7' },
    'Web Design': { bg: 'rgba(139,92,246,0.1)', border: 'rgba(139,92,246,0.2)', text: '#C4B5FD' },
  };

  return (
    <section ref={ref} className="py-32 px-6 relative overflow-hidden">
      <div className="pointer-events-none absolute bottom-0 left-0 w-80 h-80 rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.05) 0%, transparent 70%)', filter: 'blur(70px)' }} />

      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="flex flex-col md:flex-row justify-between items-start md:items-center mb-20 gap-6"
        >
          <div>
            <motion.div variants={fadeUp} className="mb-4">
              <span className="section-tag"><Tag size={14} /> Insights</span>
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-black">
              Ideas That Drive{' '}
              <span className="gradient-text">Growth</span>
            </motion.h2>
          </div>
          <motion.div variants={fadeUp}>
            <Link to="/blog" className="btn-outline">
              View All Posts <ArrowRight size={16} />
            </Link>
          </motion.div>
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="rounded-2xl h-64 animate-pulse" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }} />
            ))}
          </div>
        ) : (
          <motion.div
            variants={staggerSlow}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {blogs.map((blog) => {
              const catStyle = categoryColors[blog.category] || { bg: 'rgba(99,102,241,0.1)', border: 'rgba(99,102,241,0.2)', text: '#A78BFA' };
              return (
                <motion.div key={blog._id} variants={fadeUp}>
                  <Link
                    to={`/blog/${blog.slug || blog._id}`}
                    className="flex flex-col h-full rounded-2xl p-6 group block transition-all duration-500"
                    style={{
                      background: 'rgba(16,24,39,0.6)',
                      border: '1px solid rgba(255,255,255,0.07)',
                      backdropFilter: 'blur(20px)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(99,102,241,0.3)';
                      e.currentTarget.style.transform = 'translateY(-6px)';
                      e.currentTarget.style.boxShadow = '0 20px 60px rgba(0,0,0,0.4), 0 0 40px rgba(99,102,241,0.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    {/* Category + Read Time */}
                    <div className="flex items-center justify-between mb-5">
                      <span
                        className="px-2.5 py-1 rounded-full text-xs font-semibold"
                        style={{ background: catStyle.bg, border: `1px solid ${catStyle.border}`, color: catStyle.text }}
                      >
                        {blog.category}
                      </span>
                      <div className="flex items-center gap-1.5 text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>
                        <Calendar size={11} />
                        {blog.readTime || '5 min read'}
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-bold text-white mb-3 leading-snug flex-1 group-hover:text-blue-300 transition-colors duration-300">
                      {blog.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-sm leading-relaxed mb-5" style={{ color: 'rgba(255,255,255,0.45)' }}>
                      {blog.excerpt}
                    </p>

                    {/* Read More */}
                    <div
                      className="flex items-center gap-2 text-sm font-semibold pt-4 transition-all duration-300 group-hover:gap-3"
                      style={{ borderTop: '1px solid rgba(255,255,255,0.06)', color: '#60A5FA' }}
                    >
                      Read Article <ArrowRight size={14} />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   CTA SECTION
═══════════════════════════════════════════════════════ */
function CTASection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="py-32 px-6">
      <motion.div
        variants={stagger}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="max-w-5xl mx-auto"
      >
        <motion.div
          variants={fadeIn}
          className="relative rounded-3xl overflow-hidden text-center px-8 sm:px-16 py-20"
          style={{
            background: 'linear-gradient(135deg, rgba(59,130,246,0.12) 0%, rgba(139,92,246,0.1) 40%, rgba(34,211,238,0.08) 100%)',
            border: '1px solid rgba(99,102,241,0.25)',
          }}
        >
          {/* BG orbs inside CTA */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -top-16 -left-16 w-64 h-64 rounded-full opacity-30"
              style={{ background: 'radial-gradient(circle, #3B82F6 0%, transparent 70%)', filter: 'blur(50px)' }} />
            <div className="absolute -bottom-16 -right-16 w-64 h-64 rounded-full opacity-25"
              style={{ background: 'radial-gradient(circle, #8B5CF6 0%, transparent 70%)', filter: 'blur(50px)' }} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[200px] rounded-full opacity-10"
              style={{ background: 'radial-gradient(circle, #22D3EE 0%, transparent 70%)', filter: 'blur(40px)' }} />
          </div>

          {/* Top gradient line */}
          <div className="absolute top-0 inset-x-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(99,102,241,0.6), transparent)' }} />

          <div className="relative z-10">
            <motion.div variants={fadeUp} className="flex justify-center mb-6">
              <span className="section-tag">
                <Zap size={14} />
                Let's Get Started
              </span>
            </motion.div>

            <motion.h2 variants={fadeUp} className="text-4xl md:text-6xl font-black mb-5">
              Ready to Transform{' '}
              <span className="gradient-text">Your Business?</span>
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="text-lg max-w-xl mx-auto mb-12"
              style={{ color: 'rgba(255,255,255,0.55)' }}
            >
              Join 50+ businesses that chose LACSO HUB to lead their digital transformation.
              Your competition isn't waiting — neither should you.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-4">
              <Link to="/contact" className="btn-primary text-base px-8 py-4">
                <Sparkles size={18} />
                Start Your Project
                <ArrowRight size={18} />
              </Link>
              <a
                href="https://wa.me/917000000000?text=Hi%20LACSO%20HUB%2C%20I%20want%20to%20discuss%20a%20project"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-white text-base transition-all duration-300 hover:scale-[1.03] active:scale-[0.97]"
                style={{
                  background: 'rgba(34,197,94,0.1)',
                  border: '1px solid rgba(34,197,94,0.3)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(34,197,94,0.18)';
                  e.currentTarget.style.borderColor = 'rgba(34,197,94,0.5)';
                  e.currentTarget.style.boxShadow = '0 0 24px rgba(34,197,94,0.25)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(34,197,94,0.1)';
                  e.currentTarget.style.borderColor = 'rgba(34,197,94,0.3)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <MessageCircle size={18} />
                Chat on WhatsApp
              </a>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   HOME PAGE ROOT
═══════════════════════════════════════════════════════ */
export default function Home() {
  return (
    <div className="noise">
      <HeroSection />
      <ServicesSection />
      <PortfolioSection />
      <TestimonialsSection />
      <TeamPreview />
      <BlogPreview />
      <CTASection />
    </div>
  );
}
