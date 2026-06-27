import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Check, X, ArrowRight, ChevronDown, Sparkles, Zap, Shield, Star } from 'lucide-react';
import api from '../../services/api';

const fadeUp = {
  hidden: { opacity: 0, y: 36, filter: 'blur(4px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};
const stagger = { visible: { transition: { staggerChildren: 0.12 } } };

const DEFAULT_PLANS = [
  {
    _id: '1',
    title: 'Starter Website',
    price: '₹6,999',
    priceNote: 'One-time payment',
    description: 'Best for small businesses starting their digital presence.',
    features: [
      { text: 'AI optimized website', included: true },
      { text: 'Up to 5 pages', included: true },
      { text: 'Mobile responsive design', included: true },
      { text: 'Basic SEO setup', included: true },
      { text: 'Contact form integration', included: true },
      { text: '1 month support', included: true },
      { text: 'Custom AI-powered CMS', included: false },
      { text: 'WhatsApp chatbot', included: false },
    ],
    ctaText: 'Start Project',
    ctaUrl: '/contact?plan=starter',
    badge: '',
    isHighlight: false,
    accent: 'rgba(59,130,246,0.3)',
    accentGlow: 'rgba(59,130,246,0.1)',
    icon: Shield,
    iconColor: '#60A5FA',
  },
  {
    _id: '2',
    title: 'Growth Website',
    price: '₹16,999',
    priceNote: 'One-time payment',
    description: 'Best for growing businesses needing automation and SEO growth.',
    features: [
      { text: 'Everything in Starter', included: true },
      { text: 'AI powered CMS', included: true },
      { text: 'WhatsApp chatbot', included: true },
      { text: 'Blog system', included: true },
      { text: 'SEO architecture setup', included: true },
      { text: 'Lead capture system', included: true },
      { text: '3 months support', included: true },
      { text: 'Custom AI training', included: false },
    ],
    ctaText: 'Launch Growth Plan',
    ctaUrl: '/contact?plan=growth',
    badge: 'Most Popular',
    isHighlight: true,
    accent: 'rgba(139,92,246,0.5)',
    accentGlow: 'rgba(139,92,246,0.18)',
    icon: Zap,
    iconColor: '#A78BFA',
  },
  {
    _id: '3',
    title: 'AI Business Platform',
    price: '₹50,000+',
    priceNote: 'Custom Quote',
    description: 'Full AI digital infrastructure for serious businesses.',
    features: [
      { text: 'Custom AI website system', included: true },
      { text: 'Automation workflows', included: true },
      { text: 'CRM integration', included: true },
      { text: 'AI chatbot training', included: true },
      { text: 'Advanced analytics', included: true },
      { text: 'Custom backend CMS', included: true },
      { text: 'API integrations', included: true },
      { text: 'Priority support', included: true },
    ],
    ctaText: 'Book Strategy Call',
    ctaUrl: '/contact?plan=platform',
    badge: 'Enterprise',
    isHighlight: false,
    accent: 'rgba(34,211,238,0.3)',
    accentGlow: 'rgba(34,211,238,0.08)',
    icon: Sparkles,
    iconColor: '#22D3EE',
  },
];

const faqs = [
  { q: 'How long does a website project take?', a: 'Starter websites: 5-7 days. Growth websites: 10-14 days. AI Business Platforms: 4-8 weeks depending on complexity and custom features required.' },
  { q: 'Do you offer EMI or payment plans?', a: 'Yes! We offer flexible payment plans for Growth and Platform tiers. 50% upfront, 50% on delivery — or custom arrangements for larger projects.' },
  { q: 'What happens after delivery?', a: 'Every plan includes support. Starter gets 1 month, Growth gets 3 months, Platform gets priority ongoing support. We also offer annual maintenance packages.' },
  { q: 'Can I upgrade my plan later?', a: 'Absolutely. Many clients start with Starter and upgrade as they grow. We credit your previous investment towards the upgrade.' },
  { q: 'Do you work with international clients?', a: 'Yes! We work with clients across India, UAE, UK, USA, Canada, and Australia. We accept international payments via bank transfer and online gateways.' },
];

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="rounded-2xl overflow-hidden transition-all duration-300"
      style={{
        background: 'rgba(16,24,39,0.6)',
        border: open ? '1px solid rgba(99,102,241,0.3)' : '1px solid rgba(255,255,255,0.07)',
        backdropFilter: 'blur(20px)',
        boxShadow: open ? '0 4px 24px rgba(99,102,241,0.1)' : 'none',
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 text-left transition-all duration-200"
        aria-expanded={open}
      >
        <span className="font-semibold text-white pr-4 text-sm leading-relaxed">{q}</span>
        <ChevronDown
          size={18}
          className="flex-shrink-0 transition-transform duration-300"
          style={{ color: '#A78BFA', transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>
              {a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Pricing() {
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });
  const plansRef = useRef(null);
  const plansInView = useInView(plansRef, { once: true, margin: '-80px' });
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/pricing')
      .then(r => setPlans(r.data?.plans || r.data || []))
      .catch(() => setPlans(DEFAULT_PLANS))
      .finally(() => setLoading(false));
  }, []);

  const displayPlans = plans.length > 0 ? plans : DEFAULT_PLANS;

  return (
    <>
      <Helmet>
        <title>Pricing — Transparent Plans | LACSO HUB</title>
        <meta name="description" content="No hidden fees, no surprises. Choose from our Starter, Growth, or AI Business Platform plans with transparent, honest pricing." />
      </Helmet>

      <div className="min-h-screen" style={{ background: '#050816' }}>

        {/* ── Hero ── */}
        <section ref={heroRef} className="relative pt-44 pb-24 px-6 hero-grid overflow-hidden">
          <div className="pointer-events-none absolute inset-0">
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.14) 0%, transparent 70%)', filter: 'blur(80px)' }}
            />
          </div>

          <div className="max-w-4xl mx-auto text-center relative z-10">
            <motion.div variants={stagger} initial="hidden" animate={heroInView ? 'visible' : 'hidden'}>
              <motion.div variants={fadeUp} className="flex justify-center mb-6">
                <span className="section-tag">
                  <Star size={14} />
                  Transparent Pricing
                </span>
              </motion.div>
              <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl font-black mb-6">
                Honest Prices,
                <br />
                <span className="gradient-text">Extraordinary Value</span>
              </motion.h1>
              <motion.p
                variants={fadeUp}
                className="text-xl max-w-xl mx-auto"
                style={{ color: 'rgba(255,255,255,0.5)' }}
              >
                No hidden fees. No surprises. Just exceptional work at fair prices that deliver real ROI.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* ── Pricing Cards ── */}
        <section ref={plansRef} className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            {loading ? (
              <div className="grid md:grid-cols-3 gap-6">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="rounded-2xl h-[500px] animate-pulse" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }} />
                ))}
              </div>
            ) : (
              <motion.div
                variants={stagger}
                initial="hidden"
                animate={plansInView ? 'visible' : 'hidden'}
                className="grid md:grid-cols-3 gap-6 items-stretch"
              >
                {displayPlans.map((plan, i) => {
                  const planData = DEFAULT_PLANS[i] || DEFAULT_PLANS[0];
                  const Icon = planData.icon || Sparkles;
                  const iconColor = planData.iconColor || '#A78BFA';
                  const accent = planData.accent || plan.accent || 'rgba(99,102,241,0.35)';
                  const accentGlow = planData.accentGlow || plan.accentGlow || 'rgba(99,102,241,0.08)';

                  return (
                    <motion.div
                      key={plan._id || i}
                      variants={fadeUp}
                      className="relative rounded-2xl p-8 flex flex-col transition-all duration-500"
                      style={{
                        background: plan.isHighlight
                          ? `linear-gradient(135deg, ${accentGlow} 0%, rgba(16,24,39,0.8) 100%)`
                          : 'rgba(16,24,39,0.7)',
                        border: plan.isHighlight ? `1px solid ${accent}` : '1px solid rgba(255,255,255,0.07)',
                        backdropFilter: 'blur(24px)',
                        boxShadow: plan.isHighlight
                          ? `0 0 60px ${accentGlow}, 0 20px 80px rgba(0,0,0,0.5)`
                          : '0 8px 40px rgba(0,0,0,0.3)',
                        transform: plan.isHighlight ? 'scale(1.03)' : 'scale(1)',
                      }}
                    >
                      {/* Badge */}
                      {plan.badge && (
                        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                          <span
                            className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-white"
                            style={{
                              background: plan.isHighlight
                                ? 'linear-gradient(135deg, #8B5CF6, #3B82F6)'
                                : 'rgba(255,255,255,0.1)',
                              boxShadow: plan.isHighlight ? '0 4px 16px rgba(139,92,246,0.4)' : 'none',
                            }}
                          >
                            {plan.badge}
                          </span>
                        </div>
                      )}

                      {/* Icon */}
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                        style={{
                          background: `rgba(255,255,255,0.05)`,
                          border: `1px solid ${accent}`,
                        }}
                      >
                        <Icon size={22} style={{ color: iconColor }} />
                      </div>

                      {/* Title + Desc */}
                      <h3 className="text-xl font-black text-white mb-2">{plan.title}</h3>
                      <p className="text-sm mb-6 leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)' }}>
                        {plan.description}
                      </p>

                      {/* Price */}
                      <div className="mb-8">
                        <div
                          className="text-4xl font-black mb-1"
                          style={{
                            background: plan.isHighlight
                              ? 'linear-gradient(135deg, #A78BFA, #60A5FA)'
                              : 'linear-gradient(135deg, #ffffff, rgba(255,255,255,0.8))',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                          }}
                        >
                          {plan.price}
                        </div>
                        <div className="text-sm" style={{ color: 'rgba(255,255,255,0.35)' }}>{plan.priceNote}</div>
                      </div>

                      {/* Divider */}
                      <div className="h-px w-full mb-6" style={{ background: 'rgba(255,255,255,0.06)' }} />

                      {/* Features */}
                      <div className="space-y-3 mb-8 flex-1">
                        {(plan.features || []).map((f, j) => (
                          <div key={j} className="flex items-center gap-3">
                            {f.included ? (
                              <div
                                className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                                style={{ background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.3)' }}
                              >
                                <Check size={11} style={{ color: '#34D399' }} />
                              </div>
                            ) : (
                              <div
                                className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}
                              >
                                <X size={11} style={{ color: 'rgba(255,255,255,0.2)' }} />
                              </div>
                            )}
                            <span
                              className="text-sm"
                              style={{ color: f.included ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.25)' }}
                            >
                              {f.text}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* CTA */}
                      <Link
                        to={plan.ctaUrl || '/contact'}
                        className="flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                        style={
                          plan.isHighlight
                            ? {
                                background: 'linear-gradient(135deg, #8B5CF6, #3B82F6)',
                                color: '#fff',
                                boxShadow: '0 4px 20px rgba(139,92,246,0.4)',
                              }
                            : {
                                background: 'rgba(255,255,255,0.05)',
                                border: `1px solid ${accent}`,
                                color: iconColor,
                              }
                        }
                        onMouseEnter={(e) => {
                          if (!plan.isHighlight) {
                            e.currentTarget.style.background = `rgba(255,255,255,0.08)`;
                            e.currentTarget.style.boxShadow = `0 4px 20px ${accentGlow}`;
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!plan.isHighlight) {
                            e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                            e.currentTarget.style.boxShadow = 'none';
                          }
                        }}
                      >
                        {plan.ctaText || 'Get Started'} <ArrowRight size={16} />
                      </Link>
                    </motion.div>
                  );
                })}
              </motion.div>
            )}

            {/* Custom CTA */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={plansInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-12 rounded-2xl p-8 text-center"
              style={{
                background: 'rgba(16,24,39,0.7)',
                border: '1px solid rgba(139,92,246,0.25)',
                backdropFilter: 'blur(24px)',
                boxShadow: '0 0 40px rgba(139,92,246,0.08)',
              }}
            >
              <h3 className="text-2xl font-black mb-3">
                Need a{' '}
                <span className="gradient-text">Custom Solution?</span>
              </h3>
              <p className="mb-8 max-w-md mx-auto" style={{ color: 'rgba(255,255,255,0.5)' }}>
                Enterprise clients with unique requirements — let's build something tailor-made for your business.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/contact" className="btn-primary">
                  Book Strategy Call <ArrowRight size={16} />
                </Link>
                <a
                  href="https://wa.me/918866371807"
                  target="_blank"
                  rel="noreferrer"
                  className="btn-outline"
                >
                  WhatsApp Us
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="py-20 px-6">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-14"
            >
              <h2 className="text-3xl md:text-5xl font-black">
                Frequently Asked{' '}
                <span className="gradient-text">Questions</span>
              </h2>
            </motion.div>
            <div className="space-y-3">
              {faqs.map((f) => <FAQItem key={f.q} {...f} />)}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
