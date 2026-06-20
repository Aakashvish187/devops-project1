import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Globe,
  Zap,
  TrendingUp,
  Palette,
  Smartphone,
  Sparkles,
  Check,
  ArrowRight,
  Filter,
  Layers,
  Star,
  ChevronRight,
  Bot,
  BarChart3,
  Code2,
  Megaphone,
} from 'lucide-react';
import api from '../../services/api';

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

const categoryColors = {
  'AI & Web': 'from-indigo-500 to-purple-600',
  'SEO & Growth': 'from-emerald-500 to-teal-600',
  Automation: 'from-orange-500 to-red-600',
  Branding: 'from-pink-500 to-rose-600',
  Development: 'from-blue-500 to-cyan-600',
  Default: 'from-indigo-500 to-purple-600',
};

export const fallbackServices = [
  {
    _id: '1',
    slug: 'ai-website-development',
    title: 'AI Website Development',
    shortDesc: 'Intelligent, conversion-focused websites powered by AI that drive real business results.',
    icon: 'Globe',
    category: 'AI & Web',
    features: ['Custom AI-powered design', 'Conversion optimization', 'SEO-first architecture', 'CMS integration', '3-month support'],
    price: '₹1,99,999',
    priceNote: 'Starting from',
  },
  {
    _id: '2',
    slug: 'ai-automation',
    title: 'AI Automation',
    shortDesc: 'Streamline your business workflows with intelligent AI agents and automation pipelines.',
    icon: 'Zap',
    category: 'Automation',
    features: ['Custom AI agents', 'Workflow automation', 'CRM integration', 'Analytics dashboard', 'Ongoing optimization'],
    price: '₹1,49,999',
    priceNote: 'Starting from',
  },
  {
    _id: '3',
    slug: 'seo-growth',
    title: 'SEO & Growth',
    shortDesc: 'Dominate search rankings and scale your revenue with data-driven SEO strategies.',
    icon: 'TrendingUp',
    category: 'SEO & Growth',
    features: ['Technical SEO audit', 'Keyword strategy', 'Content optimization', 'Link building', 'Monthly reporting'],
    price: '₹49,999',
    priceNote: 'Per month',
  },
  {
    _id: '4',
    slug: 'branding',
    title: 'Brand Identity',
    shortDesc: 'Memorable identities that convert — from logo design to complete brand systems.',
    icon: 'Palette',
    category: 'Branding',
    features: ['Logo design', 'Brand guidelines', 'Color palette', 'Typography system', 'Brand assets'],
    price: '₹89,999',
    priceNote: 'Starting from',
  },
  {
    _id: '5',
    slug: 'app-development',
    title: 'App Development',
    shortDesc: 'Cross-platform mobile and web applications built for scale and performance.',
    icon: 'Smartphone',
    category: 'Development',
    features: ['React Native / Flutter', 'REST & GraphQL APIs', 'Push notifications', 'App Store submission', '6-month support'],
    price: '₹3,49,999',
    priceNote: 'Starting from',
  },
  {
    _id: '6',
    slug: 'cloud-architecture',
    title: 'Cloud Architecture',
    shortDesc: 'Highly available, secure, and infinitely scalable systems that power enterprise applications.',
    icon: 'Layers',
    category: 'Development',
    features: ['AWS / GCP Setup', 'Docker & Kubernetes', 'CI/CD Pipelines', 'Security Audits', '24/7 Monitoring'],
    price: '₹1,20,000',
    priceNote: 'Per month',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

function ServiceCard({ service, index }) {
  const IconComponent = iconMap[service.icon] || Sparkles;
  const gradient = categoryColors[service.category] || categoryColors.Default;

  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -6, transition: { duration: 0.3 } }}
      className="group relative flex flex-col rounded-2xl border border-white/8 bg-gradient-to-b from-white/[0.04] to-transparent backdrop-blur-sm overflow-hidden hover:border-indigo-500/40 transition-all duration-500 hover:shadow-[0_20px_60px_rgba(99,102,241,0.15)]"
    >
      {/* Top gradient line */}
      <div className={`h-px w-full bg-gradient-to-r from-transparent via-current to-transparent opacity-60`}
        style={{ color: index % 2 === 0 ? '#6366f1' : '#a855f7' }} />

      {/* Glow orb */}
      <div className={`absolute -top-12 -right-12 w-32 h-32 rounded-full bg-gradient-to-br ${gradient} opacity-10 blur-2xl group-hover:opacity-20 transition-opacity duration-500`} />

      <div className="relative p-7 flex flex-col flex-1">
        {/* Icon + Category */}
        <div className="flex items-start justify-between mb-5">
          <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
            <IconComponent className="w-7 h-7 text-white" />
          </div>
          <span className="text-xs font-semibold px-3 py-1 rounded-full border border-white/10 bg-white/5 text-gray-400">
            {service.category}
          </span>
        </div>

        {/* Title & desc */}
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-indigo-300 transition-colors duration-300">
          {service.title}
        </h3>
        <p className="text-sm text-gray-400 leading-relaxed mb-5">
          {service.shortDesc}
        </p>

        {/* Features */}
        <ul className="space-y-2 mb-6 flex-1">
          {(service.features || []).slice(0, 5).map((feat, i) => (
            <li key={i} className="flex items-center gap-2.5 text-sm text-gray-300">
              <div className={`w-4 h-4 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center flex-shrink-0`}>
                <Check className="w-2.5 h-2.5 text-white" />
              </div>
              {feat}
            </li>
          ))}
        </ul>

        {/* Price + CTA */}
        <div className="pt-5 border-t border-white/8">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-xs text-gray-500 mb-0.5">{service.priceNote || 'Starting from'}</p>
              <p className={`text-2xl font-bold bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}>
                {service.price || 'Custom'}
              </p>
            </div>
            <Link
              to={`/services/${service.slug}`}
              className={`group/btn inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r ${gradient} text-white text-sm font-semibold hover:shadow-lg hover:shadow-indigo-500/30 transition-all duration-300 hover:gap-3`}
            >
              Explore
              <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [categories, setCategories] = useState(['All']);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const { data } = await api.get('/services');
        const list = Array.isArray(data) ? data : (data.services || data.data || []);
        setServices(list.length ? list : fallbackServices);
        const cats = ['All', ...new Set(list.map((s) => s.category).filter(Boolean))];
        setCategories(cats.length > 1 ? cats : ['All', 'AI & Web', 'SEO & Growth', 'Automation', 'Branding', 'Development']);
      } catch {
        setServices(fallbackServices);
        setCategories(['All', 'AI & Web', 'SEO & Growth', 'Automation', 'Branding', 'Development']);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  const filtered = activeCategory === 'All'
    ? services
    : services.filter((s) => s.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#060b18] text-white overflow-x-hidden">
      {/* ── Hero ── */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
        {/* Radial glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-radial from-indigo-600/20 via-purple-600/10 to-transparent rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 text-sm font-medium mb-6"
          >
            <Layers className="w-4 h-4" />
            What We Do
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-7xl font-black mb-6 leading-tight"
          >
            <span className="text-white">Our </span>
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Services
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed"
          >
            From AI-powered websites to intelligent automation — we craft digital solutions
            that don't just look great, they{' '}
            <span className="text-indigo-400 font-medium">perform extraordinarily</span>.
          </motion.p>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="mt-12 flex flex-wrap items-center justify-center gap-8"
          >
            {[
              { val: '50+', label: 'Projects Delivered' },
              { val: '98%', label: 'Client Satisfaction' },
              { val: '5+', label: 'Core Services' },
              { val: '3x', label: 'Avg. ROI Increase' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-black bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                  {stat.val}
                </div>
                <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Filter Tabs ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-3"
        >
          <div className="flex items-center gap-2 text-gray-500 mr-2">
            <Filter className="w-4 h-4" />
            <span className="text-sm">Filter:</span>
          </div>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`relative px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === cat
                  ? 'text-white shadow-lg shadow-indigo-500/25'
                  : 'text-gray-400 hover:text-white border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/8'
              }`}
            >
              {activeCategory === cat && (
                <motion.div
                  layoutId="activeCategoryPill"
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-10">{cat}</span>
            </button>
          ))}
        </motion.div>
      </section>

      {/* ── Services Grid ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-28">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-96 rounded-2xl border border-white/8 bg-white/[0.03] animate-pulse"
              />
            ))}
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filtered.map((service, index) => (
                <ServiceCard key={service._id || service.slug} service={service} index={index} />
              ))}
            </motion.div>
          </AnimatePresence>
        )}

        {!loading && filtered.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-24"
          >
            <p className="text-gray-500 text-lg">No services found in this category.</p>
          </motion.div>
        )}
      </section>

      {/* ── Bottom CTA ── */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/20 via-purple-900/20 to-indigo-900/20" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/40 to-transparent" />

        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-3xl sm:text-5xl font-black text-white mb-4">
              Can't find what you need?
            </h2>
            <p className="text-gray-400 text-lg mb-8">
              We craft custom solutions tailored to your unique business needs.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 text-white font-bold text-lg hover:shadow-2xl hover:shadow-indigo-500/40 transition-all duration-300 hover:scale-105"
            >
              <Sparkles className="w-5 h-5" />
              Get a Custom Quote
              <ChevronRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
