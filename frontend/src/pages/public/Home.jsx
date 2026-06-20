import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
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
} from 'lucide-react';
import api from '../../services/api';

/* ─── Animation Variants ──────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } },
};
const stagger = {
  visible: { transition: { staggerChildren: 0.12 } },
};
const staggerSlow = {
  visible: { transition: { staggerChildren: 0.18 } },
};

/* ─── Animated Counter Hook & Component ────────────── */
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
  if (isDecimal) {
    return <>{(count / 10).toFixed(1)}</>;
  }
  return <>{count}</>;
}

/* ─── Service Icon Map ───────────────────────────── */
const SERVICE_ICONS = {
  monitor: Monitor,
  brain: Brain,
  trending: TrendingUp,
  palette: Palette,
  smartphone: Smartphone,
};
const FALLBACK_ICONS = [Monitor, Brain, TrendingUp, Palette, Smartphone];

/* ════════════════════════════════════════════════════
   HERO SECTION
════════════════════════════════════════════════════ */
function HeroSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  const stats = [
    { label: 'Projects Delivered', value: 50, suffix: '+', prefix: '' },
    { label: 'Avg Revenue Growth', value: 340, suffix: '%', prefix: '' },
    { label: 'Client Rating', value: 49, displayTarget: 4.9, suffix: '★', prefix: '', isDecimal: true },
    { label: 'Founded', value: null, display: 'Dec 2025' },
  ];

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex flex-col justify-center items-center hero-grid overflow-hidden"
    >
      {/* Background orbs (removed float animation for performance) */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute -top-20 -left-20 w-96 h-96 rounded-full opacity-10"
          style={{
            background: 'radial-gradient(circle, #6366f1 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
        <div
          className="absolute top-1/3 -right-24 w-80 h-80 rounded-full opacity-10"
          style={{
            background: 'radial-gradient(circle, #a855f7 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
        <div
          className="absolute bottom-10 left-1/3 w-72 h-72 rounded-full opacity-10"
          style={{
            background: 'radial-gradient(circle, #ec4899 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
        <div
          className="absolute top-20 right-1/4 w-48 h-48 rounded-full opacity-10"
          style={{
            background: 'radial-gradient(circle, #06b6d4 0%, transparent 70%)',
            filter: 'blur(50px)',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center pt-32 pb-20">
        <motion.div variants={stagger} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
          {/* Badge */}
          <motion.div variants={fadeUp} className="mb-6 flex justify-center">
            <span className="section-tag">
              <Zap size={14} />
              AI-Powered Digital Agency · Est. Dec 2025
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeUp}
            className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-[1.02] tracking-tight"
          >
            <span className="gradient-text text-shadow">LacsoHub</span> — AI Powered
            <br />
            Digital Growth Platform
          </motion.h1>

          {/* Subtext */}
          <motion.p
            variants={fadeUp}
            className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            LacsoHub engineers high-performance AI websites, automation systems, and digital growth engines that scale businesses faster.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-4 mb-16">
            <Link to="/contact" className="btn-primary text-base px-8 py-4">
              Start Your Project <ArrowRight size={18} />
            </Link>
            <Link to="/portfolio" className="btn-outline text-base px-8 py-4">
              View Our Work <ExternalLink size={16} />
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={stagger}
            className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/[0.06] rounded-2xl overflow-hidden border border-white/[0.08]"
          >
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                variants={fadeUp}
                className="bg-[#0a0e1a] px-6 py-6 text-center group hover:bg-indigo-500/5 transition-colors duration-300"
              >
                <div className="stat-number mb-1">
                  {stat.value === null ? (
                    stat.display
                  ) : (
                    <>
                      {stat.prefix}
                      <AnimatedCounter
                        target={stat.value}
                        duration={2000}
                        start={inView}
                        isDecimal={stat.isDecimal}
                      />
                      {stat.suffix}
                    </>
                  )}
                </div>
                <div className="text-xs text-white/40 font-medium uppercase tracking-wider">
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
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-white/30 text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-px h-8 bg-gradient-to-b from-indigo-500 to-transparent"
        />
      </motion.div>
    </section>
  );
}

/* ════════════════════════════════════════════════════
   SERVICES SECTION
════════════════════════════════════════════════════ */
function ServicesSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
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
    const IconComp = SERVICE_ICONS[key] || FALLBACK_ICONS[idx % FALLBACK_ICONS.length];
    return IconComp;
  };

  return (
    <section ref={ref} className="py-28 px-6 relative overflow-hidden">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-5"
        style={{ background: 'radial-gradient(circle, #6366f1 0%, transparent 70%)', filter: 'blur(80px)' }} />

      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center mb-16"
        >
          <motion.div variants={fadeUp} className="flex justify-center mb-4">
            <span className="section-tag">Our Services</span>
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-4xl md:text-6xl font-black mb-4">
            Everything You Need to{' '}
            <span className="gradient-text">Dominate Digitally</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-white/50 text-lg max-w-xl mx-auto">
            From first click to loyal customer — we cover every touchpoint of your digital presence.
          </motion.p>
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="glass-card animate-pulse h-56 bg-white/[0.03]" />
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
              return (
                <motion.div key={svc._id || i} variants={fadeUp}>
                  <Link
                    to={`/services/${svc.slug || svc._id}`}
                    className="glass-card flex flex-col h-full group cursor-pointer block"
                  >
                    {/* Icon */}
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-600/20 border border-indigo-500/20 flex items-center justify-center mb-4 group-hover:border-indigo-500/50 group-hover:shadow-lg group-hover:shadow-indigo-500/20 transition-all duration-300">
                      <Icon size={22} className="text-indigo-400" />
                    </div>
                    {/* Title */}
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-indigo-300 transition-colors">
                      {svc.title}
                    </h3>
                    {/* Desc */}
                    <p className="text-white/50 text-sm leading-relaxed flex-1 mb-4">
                      {svc.shortDesc || svc.description}
                    </p>
                    {/* Price + Arrow */}
                    <div className="flex items-center justify-between pt-4 border-t border-white/[0.06]">
                      <span className="text-indigo-400 font-semibold text-sm">
                        ₹{svc.startingPrice || svc.price || 'X,XXX'} onwards
                      </span>
                      <ChevronRight
                        size={16}
                        className="text-white/30 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all duration-300"
                      />
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
          className="text-center mt-12"
        >
          <Link to="/services" className="btn-outline">
            Explore All Services <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════
   PORTFOLIO SECTION
════════════════════════════════════════════════════ */
function PortfolioSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const [portfolio, setPortfolio] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get('/portfolio')
      .then((r) => setPortfolio(r.data?.data || r.data || []))
      .catch(() =>
        setPortfolio([
          {
            _id: '1',
            clientName: 'GrowthEdge SaaS',
            category: 'Web + Automation',
            featured: true,
            challenge: 'Outdated website losing 70% of leads at the first touchpoint.',
            results: ['340% increase in qualified leads', 'Reduced sales cycle by 45%', '₹18L additional MRR in 3 months'],
            beforeMetric: { label: 'Conversion Rate', value: '1.2%' },
            afterMetric: { label: 'Conversion Rate', value: '8.7%' },
          },
          {
            _id: '2',
            clientName: 'NexaRetail',
            category: 'E-commerce + AI',
            featured: false,
            challenge: 'Manual inventory and fulfillment operations burning cash and team time.',
            results: ['68% reduction in manual ops', 'Saved 120+ hrs/month', 'ROI within 45 days'],
            beforeMetric: { label: 'Order Processing Time', value: '4.5 hrs' },
            afterMetric: { label: 'Order Processing Time', value: '22 min' },
          },
          {
            _id: '3',
            clientName: 'UrbanNest Realty',
            category: 'Brand + Digital',
            featured: false,
            challenge: 'Zero digital presence in a hypercompetitive local real estate market.',
            results: ['#1 Google rank in 6 weeks', '220% rise in property inquiries', '3 premium deals closed via organic traffic'],
            beforeMetric: { label: 'Monthly Inquiries', value: '12' },
            afterMetric: { label: 'Monthly Inquiries', value: '89' },
          },
        ])
      )
      .finally(() => setLoading(false));
  }, []);

  return (
    <section ref={ref} className="py-28 px-6 bg-gradient-to-b from-[#0a0e1a] via-[#0d1224] to-[#0a0e1a] relative overflow-hidden">
      {/* Decorative border line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent" />

      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center mb-16"
        >
          <motion.div variants={fadeUp} className="flex justify-center mb-4">
            <span className="section-tag">Case Studies</span>
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-4xl md:text-6xl font-black mb-4">
            Results That{' '}
            <span className="gradient-text">Speak Louder</span>
            {' '}Than Promises
          </motion.h2>
          <motion.p variants={fadeUp} className="text-white/50 text-lg max-w-xl mx-auto">
            Real clients. Real numbers. Real transformation.
          </motion.p>
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="glass-card animate-pulse h-80 bg-white/[0.03]" />
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
                className={`relative rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl flex flex-col ${
                  item.featured
                    ? 'border-purple-500/50 bg-purple-500/5 hover:shadow-purple-500/20'
                    : 'border-white/[0.08] bg-white/[0.03] hover:border-indigo-500/30 hover:shadow-indigo-500/10'
                }`}
              >
                {item.featured && (
                  <div className="absolute -top-3 left-6">
                    <span className="px-3 py-1 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white text-xs font-bold uppercase tracking-wider">
                      Featured
                    </span>
                  </div>
                )}

                {/* Category */}
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-medium">
                    {item.category}
                  </span>
                </div>

                {/* Client */}
                <h3 className="text-xl font-bold text-white mb-3">{item.clientName}</h3>

                {/* Challenge */}
                <p className="text-white/50 text-sm leading-relaxed mb-5 flex-1">
                  <span className="text-white/30 uppercase text-xs tracking-wider block mb-1">Challenge</span>
                  {item.challenge}
                </p>

                {/* Results */}
                <div className="space-y-2 mb-5">
                  {(item.results || []).slice(0, 3).map((r, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm">
                      <CheckCircle size={14} className="text-green-400 flex-shrink-0 mt-0.5" />
                      <span className="text-white/70">{r}</span>
                    </div>
                  ))}
                </div>

                {/* Before / After */}
                {item.beforeMetric && item.afterMetric && (
                  <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/[0.06]">
                    <div className="text-center bg-red-500/5 border border-red-500/10 rounded-xl p-3">
                      <div className="text-xs text-white/30 uppercase tracking-wider mb-1">Before</div>
                      <div className="font-bold text-red-400">{item.beforeMetric.value}</div>
                      <div className="text-xs text-white/40">{item.beforeMetric.label}</div>
                    </div>
                    <div className="text-center bg-green-500/5 border border-green-500/10 rounded-xl p-3">
                      <div className="text-xs text-white/30 uppercase tracking-wider mb-1">After</div>
                      <div className="font-bold text-green-400">{item.afterMetric.value}</div>
                      <div className="text-xs text-white/40">{item.afterMetric.label}</div>
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
          className="text-center mt-12"
        >
          <Link to="/portfolio" className="btn-outline">
            View All Case Studies <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════
   TESTIMONIALS SECTION
════════════════════════════════════════════════════ */
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
          { _id: '1', name: 'Rahul Mehta', role: 'CEO, GrowthEdge', rating: 5, quote: 'LACSO HUB completely transformed our digital presence. The AI automation they built saved us 120 hours a month and the website conversions tripled within 6 weeks. Absolutely phenomenal work.' },
          { _id: '2', name: 'Neha Sharma', role: 'Founder, NexaRetail', rating: 5, quote: 'What impressed me most was the speed and quality. They delivered a fully functional e-commerce system with AI inventory management in just 3 weeks. Best investment I\'ve made for my business.' },
          { _id: '3', name: 'Vikram Joshi', role: 'Director, UrbanNest', rating: 5, quote: 'We went from zero online presence to ranking #1 on Google in 6 weeks. The inquiries started flowing immediately. LACSO HUB\'s results-obsessed approach is exactly what we needed.' },
          { _id: '4', name: 'Ananya Patel', role: 'CMO, TechBridge', rating: 5, quote: 'Their team understood our vision immediately and delivered a product that exceeded every expectation. The attention to detail in both design and functionality is world-class.' },
          { _id: '5', name: 'Suresh Kumar', role: 'MD, Pinnacle Ventures', rating: 5, quote: 'Radical transparency and real results. They showed us exactly what they were doing and why. The ROI was evident within the first month. Highly recommended.' },
        ])
      )
      .finally(() => setLoading(false));
  }, []);

  return (
    <section ref={ref} className="py-28 px-6 relative overflow-hidden">
      <div className="pointer-events-none absolute top-0 right-0 w-96 h-96 rounded-full opacity-5"
        style={{ background: 'radial-gradient(circle, #a855f7 0%, transparent 70%)', filter: 'blur(80px)' }} />

      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center mb-16"
        >
          <motion.div variants={fadeUp} className="flex justify-center mb-4">
            <span className="section-tag">Testimonials</span>
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-4xl md:text-6xl font-black mb-4">
            What Our{' '}
            <span className="gradient-text">Clients Say</span>
          </motion.h2>
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="glass-card animate-pulse h-48 bg-white/[0.03]" />
            ))}
          </div>
        ) : (
          <motion.div
            variants={staggerSlow}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {testimonials.map((t) => (
              <motion.div
                key={t._id}
                variants={fadeUp}
                className="glass-card flex flex-col gap-4 group"
              >
                {/* Stars */}
                <div className="flex gap-1">
                  {[...Array(t.rating || 5)].map((_, i) => (
                    <Star key={i} size={14} className="text-yellow-400 fill-yellow-400" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-white/70 text-sm leading-relaxed flex-1 italic">
                  "{t.quote}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-3 pt-4 border-t border-white/[0.06]">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    {(t.name || 'A').charAt(0)}
                  </div>
                  <div>
                    <div className="text-white font-semibold text-sm">{t.name}</div>
                    <div className="text-white/40 text-xs">{t.role}</div>
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

/* ════════════════════════════════════════════════════
   TEAM PREVIEW SECTION
════════════════════════════════════════════════════ */
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
          { _id: '2', name: 'Vidhan Rajvi', image: '/images/vidhan.png', role: 'Cloud Architect & DevOps Engineer', bio: 'Cloud infrastructure maestro and DevOps architect. Vidhan designs highly available, secure, and infinitely scalable systems that power enterprise applications.', expertise: ['AWS', 'Docker', 'Kubernetes'] },
        ])
      )
      .finally(() => setLoading(false));
  }, []);

  return (
    <section ref={ref} className="py-28 px-6 bg-gradient-to-b from-[#0a0e1a] via-[#0d1224] to-[#0a0e1a] relative">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />

      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center mb-16"
        >
          <motion.div variants={fadeUp} className="flex justify-center mb-4">
            <span className="section-tag">
              <Users size={14} />
              Our Team
            </span>
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-black mb-4">
            The Minds Behind{' '}
            <span className="gradient-text">Your Growth</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-white/50 text-lg max-w-xl mx-auto">
            A tight-knit team of builders, strategists, and creatives obsessed with your results.
          </motion.p>
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="glass-card animate-pulse h-64 bg-white/[0.03]" />
            ))}
          </div>
        ) : (
          <motion.div
            variants={staggerSlow}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {team.slice(0, 3).map((member) => (
              <motion.div
                key={member._id}
                variants={fadeUp}
                className="glass-card text-center group"
              >
                {/* Avatar */}
                <div className="mx-auto w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-3xl font-black mb-4 group-hover:scale-105 transition-transform duration-300">
                  {(member.name || 'A').charAt(0)}
                </div>
                <h3 className="text-lg font-bold text-white mb-1">{member.name}</h3>
                <div className="text-indigo-400 text-sm font-medium mb-3">{member.role}</div>
                <p className="text-white/50 text-sm leading-relaxed mb-4">{member.bio}</p>
                {/* Expertise tags */}
                <div className="flex flex-wrap justify-center gap-2">
                  {(member.expertise || []).slice(0, 3).map((tag, i) => (
                    <span key={i} className="px-2 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs">
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
          className="text-center mt-12"
        >
          <Link to="/team" className="btn-outline">
            Meet the Full Team <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════
   BLOG PREVIEW SECTION
════════════════════════════════════════════════════ */
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
          { _id: '1', slug: 'ai-automation-2026', category: 'AI & Automation', title: 'How AI Automation Is Replacing Entire Teams in 2026', excerpt: 'Discover the workflow automation patterns that top-performing companies are using to cut costs by 60% while scaling faster than ever.', readTime: '8 min', createdAt: '2026-06-10' },
          { _id: '2', slug: 'conversion-rate-optimization', category: 'Growth Marketing', title: 'The CRO Framework That Tripled Our Client\'s Revenue', excerpt: 'A behind-the-scenes look at the exact conversion optimization process we use to consistently 3x client results in 90 days.', readTime: '6 min', createdAt: '2026-06-05' },
          { _id: '3', slug: 'premium-web-design-principles', category: 'Web Design', title: '7 Design Principles Behind ₹1Cr+ Websites', excerpt: 'What separates a ₹10,000 website from a ₹1Cr brand asset? These 7 principles are the difference between a site and a sales machine.', readTime: '10 min', createdAt: '2026-05-28' },
        ])
      )
      .finally(() => setLoading(false));
  }, []);

  return (
    <section ref={ref} className="py-28 px-6 relative overflow-hidden">
      <div className="pointer-events-none absolute bottom-0 left-0 w-80 h-80 rounded-full opacity-5"
        style={{ background: 'radial-gradient(circle, #6366f1 0%, transparent 70%)', filter: 'blur(70px)' }} />

      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="flex flex-col md:flex-row justify-between items-center mb-16 gap-6"
        >
          <div>
            <motion.div variants={fadeUp} className="mb-4">
              <span className="section-tag">
                <Tag size={14} />
                Insights
              </span>
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
              <div key={i} className="glass-card animate-pulse h-64 bg-white/[0.03]" />
            ))}
          </div>
        ) : (
          <motion.div
            variants={staggerSlow}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {blogs.map((blog) => (
              <motion.div key={blog._id} variants={fadeUp}>
                <Link
                  to={`/blog/${blog.slug || blog._id}`}
                  className="glass-card flex flex-col h-full group block"
                >
                  {/* Category + Date */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-2.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-medium">
                      {blog.category}
                    </span>
                    <div className="flex items-center gap-1.5 text-white/30 text-xs">
                      <Calendar size={11} />
                      {blog.readTime || '5 min'}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-white mb-3 leading-snug group-hover:text-indigo-300 transition-colors">
                    {blog.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-white/50 text-sm leading-relaxed flex-1 mb-4">
                    {blog.excerpt}
                  </p>

                  {/* Read More */}
                  <div className="flex items-center gap-2 text-indigo-400 text-sm font-medium pt-4 border-t border-white/[0.06] group-hover:gap-3 transition-all">
                    Read More <ArrowRight size={14} />
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════
   CTA SECTION
════════════════════════════════════════════════════ */
function CTASection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="py-28 px-6">
      <motion.div
        variants={stagger}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="max-w-5xl mx-auto"
      >
        <motion.div
          variants={fadeIn}
          className="relative rounded-3xl overflow-hidden border border-indigo-500/20 text-center px-8 py-20"
          style={{
            background: 'linear-gradient(135deg, rgba(99,102,241,0.15) 0%, rgba(168,85,247,0.12) 50%, rgba(236,72,153,0.08) 100%)',
          }}
        >
          {/* BG orbs inside CTA */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -top-10 -left-10 w-60 h-60 rounded-full opacity-20"
              style={{ background: 'radial-gradient(circle, #6366f1 0%, transparent 70%)', filter: 'blur(50px)' }} />
            <div className="absolute -bottom-10 -right-10 w-60 h-60 rounded-full opacity-20"
              style={{ background: 'radial-gradient(circle, #a855f7 0%, transparent 70%)', filter: 'blur(50px)' }} />
          </div>

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
            <motion.p variants={fadeUp} className="text-white/60 text-lg max-w-xl mx-auto mb-10">
              Join 50+ businesses that chose LACSO HUB to lead their digital transformation.
              Your competition isn't waiting — neither should you.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-4">
              <Link to="/contact" className="btn-primary text-base px-8 py-4">
                Start Your Project <ArrowRight size={18} />
              </Link>
              <a
                href="https://wa.me/917000000000?text=Hi%20LACSO%20HUB%2C%20I%20want%20to%20discuss%20a%20project"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-white border border-green-500/30 bg-green-500/10 hover:bg-green-500/20 hover:border-green-400/50 transition-all duration-300 hover:scale-105 text-base"
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

/* ════════════════════════════════════════════════════
   HOME PAGE
════════════════════════════════════════════════════ */
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
