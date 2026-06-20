import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Globe,
  Zap,
  TrendingUp,
  Palette,
  Smartphone,
  Sparkles,
  Check,
  ArrowRight,
  ArrowLeft,
  Bot,
  BarChart3,
  Code2,
  Megaphone,
  Layers,
  Mail,
  User,
  MessageSquare,
  Send,
  Phone,
  Star,
  ChevronRight,
} from 'lucide-react';
import api from '../../services/api';
import { fallbackServices } from './Services';

const iconMap = {
  Globe,
  Zap,
  TrendingUp,
  Palette,
  Smartphone,
  Bot,
  BarChart3,
  Code2,
  Megaphone,
  Sparkles,
  Layers,
  Star,
};

const gradientMap = {
  'AI & Web': 'from-indigo-500 to-purple-600',
  'SEO & Growth': 'from-emerald-500 to-teal-600',
  Automation: 'from-orange-500 to-red-600',
  Branding: 'from-pink-500 to-rose-600',
  Development: 'from-blue-500 to-cyan-600',
  Default: 'from-indigo-500 to-purple-600',
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

function ContactForm({ serviceTitle }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState('idle');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      await api.post('/contact', { ...form, service: serviceTitle });
      setStatus('success');
      setForm({ name: '', email: '', phone: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent backdrop-blur-sm overflow-hidden p-8"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/60 to-transparent" />
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
            <MessageSquare className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-xl font-bold text-white">Enquire About This Service</h3>
        </div>
        <p className="text-gray-400 text-sm mb-6 ml-13">
          Get a free consultation for{' '}
          <span className="text-indigo-400 font-medium">{serviceTitle}</span>
        </p>

        {status === 'success' ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-emerald-400" />
            </div>
            <p className="text-white font-semibold text-lg">Message Sent!</p>
            <p className="text-gray-400 text-sm mt-1">We'll get back to you within 24 hours.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="text"
                  placeholder="Your name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:border-indigo-500/50 focus:bg-white/8 transition-all duration-200"
                />
              </div>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="email"
                  placeholder="Your email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:border-indigo-500/50 focus:bg-white/8 transition-all duration-200"
                />
              </div>
            </div>
            <div className="relative">
              <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="tel"
                placeholder="Phone (optional)"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:border-indigo-500/50 focus:bg-white/8 transition-all duration-200"
              />
            </div>
            <div>
              <textarea
                placeholder="Tell us about your project..."
                rows={4}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:border-indigo-500/50 focus:bg-white/8 transition-all duration-200 resize-none"
              />
            </div>
            {status === 'error' && (
              <p className="text-red-400 text-sm">Something went wrong. Please try again.</p>
            )}
            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold text-sm hover:shadow-lg hover:shadow-indigo-500/30 transition-all duration-300 hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100"
            >
              {status === 'loading' ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Send Enquiry
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </motion.div>
  );
}

export default function ServiceDetail() {
  const { slug } = useParams();
  const [service, setService] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchService = async () => {
      setLoading(true);
      setError(false);
      try {
        const { data } = await api.get(`/services/${slug}`);
        const svc = data?.service || data?.data || data;
        setService(svc);
        // Fetch related services
        try {
          const relRes = await api.get('/services');
          const all = Array.isArray(relRes.data) ? relRes.data : (relRes.data?.services || []);
          setRelated(all.filter((s) => s.slug !== slug).slice(0, 3));
        } catch {
          setRelated(fallbackServices.filter((s) => s.slug !== slug).slice(0, 3));
        }
      } catch {
        const fallbackSvc = fallbackServices.find((s) => s.slug === slug);
        if (fallbackSvc) {
          setService(fallbackSvc);
          setRelated(fallbackServices.filter((s) => s.slug !== slug).slice(0, 3));
        } else {
          setError(true);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchService();
    window.scrollTo(0, 0);
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#060b18] flex items-center justify-center">
        <div className="w-12 h-12 border-2 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !service) {
    return (
      <div className="min-h-screen bg-[#060b18] flex flex-col items-center justify-center gap-4">
        <p className="text-gray-400 text-xl">Service not found.</p>
        <Link to="/services" className="text-indigo-400 hover:text-indigo-300 flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Back to Services
        </Link>
      </div>
    );
  }

  const IconComponent = iconMap[service.icon] || Sparkles;
  const gradient = gradientMap[service.category] || gradientMap.Default;

  return (
    <div className="min-h-screen bg-[#060b18] text-white overflow-x-hidden">
      {/* ── Hero ── */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
        <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-gradient-to-b ${gradient} opacity-10 blur-3xl rounded-full`} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 text-sm text-gray-500 mb-8"
          >
            <Link to="/" className="hover:text-gray-300 transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link to="/services" className="hover:text-gray-300 transition-colors">Services</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-indigo-400">{service.title}</span>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 text-sm font-medium mb-6"
              >
                <IconComponent className="w-4 h-4" />
                {service.category}
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-tight"
              >
                <span className={`bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}>
                  {service.title}
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="text-lg text-gray-400 leading-relaxed mb-8"
              >
                {service.shortDesc || service.description?.substring(0, 200) + '...'}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="flex flex-wrap gap-4"
              >
                <a
                  href="#contact-form"
                  className={`inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r ${gradient} text-white font-bold hover:shadow-2xl hover:shadow-indigo-500/30 transition-all duration-300 hover:scale-105`}
                >
                  <Sparkles className="w-5 h-5" />
                  Get Started
                </a>
                <Link
                  to="/services"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border border-white/15 bg-white/5 text-gray-300 font-semibold hover:bg-white/10 hover:text-white transition-all duration-300"
                >
                  <ArrowLeft className="w-4 h-4" />
                  All Services
                </Link>
              </motion.div>
            </div>

            {/* Icon display */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex justify-center"
            >
              <div className="relative">
                <div className={`w-64 h-64 rounded-[3rem] bg-gradient-to-br ${gradient} flex items-center justify-center shadow-2xl shadow-indigo-500/30`}>
                  <IconComponent className="w-32 h-32 text-white/90" />
                </div>
                <div className={`absolute inset-0 rounded-[3rem] bg-gradient-to-br ${gradient} blur-2xl opacity-30 -z-10`} />
                {/* Orbiting dots */}
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8 + i * 3, repeat: Infinity, ease: 'linear', delay: i * 2 }}
                    style={{ transformOrigin: '50% 50%' }}
                    className="absolute inset-[-20px]"
                  >
                    <div
                      className={`absolute w-3 h-3 rounded-full bg-gradient-to-br ${gradient} opacity-80`}
                      style={{ top: `${i * 30}%`, right: '-6px' }}
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Description ── */}
      {service.description && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl"
          >
            <h2 className="text-3xl font-bold text-white mb-6">
              About This Service
            </h2>
            <div className="prose prose-invert prose-gray max-w-none text-gray-400 leading-relaxed text-lg">
              {service.description}
            </div>
          </motion.div>
        </section>
      )}

      {/* ── Features Grid ── */}
      {service.features?.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-10"
          >
            <h2 className="text-3xl font-bold text-white mb-3">What's Included</h2>
            <div className={`w-16 h-1 rounded-full bg-gradient-to-r ${gradient}`} />
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {service.features.map((feat, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="flex items-start gap-4 p-5 rounded-2xl border border-white/8 bg-white/[0.03] hover:border-indigo-500/30 hover:bg-white/[0.05] transition-all duration-300 group"
              >
                <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${gradient} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                  <Check className="w-4 h-4 text-white" />
                </div>
                <span className="text-gray-300 text-sm leading-relaxed pt-1">{feat}</span>
              </motion.div>
            ))}
          </motion.div>
        </section>
      )}

      {/* ── Pricing CTA ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className={`relative rounded-3xl overflow-hidden bg-gradient-to-br ${gradient} p-px`}
        >
          <div className="relative rounded-[calc(1.5rem-1px)] bg-[#060b18] p-10 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-5`} />
            <div className="relative">
              <p className="text-gray-400 text-sm mb-1">{service.priceNote || 'Starting from'}</p>
              <p className={`text-5xl font-black bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}>
                {service.price || 'Custom'}
              </p>
            </div>
            <div className="relative flex flex-col sm:flex-row gap-4">
              <a
                href="#contact-form"
                className={`inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r ${gradient} text-white font-bold text-lg hover:shadow-2xl hover:shadow-indigo-500/30 transition-all duration-300 hover:scale-105`}
              >
                <Sparkles className="w-5 h-5" />
                Get Started Today
              </a>
              <Link
                to="/pricing"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-white/15 text-gray-300 font-semibold hover:bg-white/10 hover:text-white transition-all duration-300"
              >
                See All Plans
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── Related Services ── */}
      {related.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-10"
          >
            <h2 className="text-3xl font-bold text-white mb-3">Related Services</h2>
            <div className="w-16 h-1 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500" />
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {related.map((rel) => {
              const RelIcon = iconMap[rel.icon] || Sparkles;
              const relGrad = gradientMap[rel.category] || gradientMap.Default;
              return (
                <motion.div key={rel._id || rel.slug} variants={itemVariants}>
                  <Link
                    to={`/services/${rel.slug}`}
                    className="group block p-6 rounded-2xl border border-white/8 bg-white/[0.03] hover:border-indigo-500/30 hover:bg-white/[0.06] transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${relGrad} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <RelIcon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-white font-bold text-lg mb-2 group-hover:text-indigo-300 transition-colors">
                      {rel.title}
                    </h3>
                    <p className="text-gray-400 text-sm line-clamp-2">{rel.shortDesc}</p>
                    <div className="flex items-center gap-1 mt-4 text-indigo-400 text-sm font-medium group-hover:gap-2 transition-all duration-300">
                      Learn more <ArrowRight className="w-4 h-4" />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </section>
      )}

      {/* ── Contact Form ── */}
      <section id="contact-form" className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <ContactForm serviceTitle={service.title} />
      </section>
    </div>
  );
}
