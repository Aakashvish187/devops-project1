import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Mail,
  Phone,
  MapPin,
  Sparkles,
  ArrowRight,
  MessageCircle,
} from 'lucide-react';

const Instagram = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>;
const Twitter = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>;
const Linkedin = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>;
const Youtube = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>;

const companyLinks = [
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Team', href: '/team' },
  { label: 'Blog', href: '/blog' },
  { label: 'Pricing', href: '/pricing' },
];

const serviceLinks = [
  { label: 'AI Website Dev', href: '/services/ai-website-development' },
  { label: 'AI Automation', href: '/services/ai-automation' },
  { label: 'SEO & Growth', href: '/services/seo-growth' },
  { label: 'Branding', href: '/services/branding' },
  { label: 'App Dev', href: '/services/app-development' },
];

const socialLinks = [
  {
    label: 'Instagram',
    href: 'https://instagram.com/lacsohub',
    icon: Instagram,
    color: 'hover:text-pink-400 hover:border-pink-500/40 hover:bg-pink-500/10',
  },
  {
    label: 'Twitter',
    href: 'https://twitter.com/lacsohub',
    icon: Twitter,
    color: 'hover:text-sky-400 hover:border-sky-500/40 hover:bg-sky-500/10',
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/company/lacsohub',
    icon: Linkedin,
    color: 'hover:text-blue-400 hover:border-blue-500/40 hover:bg-blue-500/10',
  },
  {
    label: 'YouTube',
    href: 'https://youtube.com/@lacsohub',
    icon: Youtube,
    color: 'hover:text-red-400 hover:border-red-500/40 hover:bg-red-500/10',
  },
];

const contactInfo = [
  {
    icon: Mail,
    label: 'lacsohub@gmail.com',
    href: 'mailto:lacsohub@gmail.com',
  },
  {
    icon: Phone,
    label: '+91 88663 71807',
    href: 'tel:+918866371807',
  },
  {
    icon: MapPin,
    label: 'Ahmedabad, Gujarat, India',
    href: 'https://maps.google.com/?q=Ahmedabad,Gujarat,India',
  },
];

// Grid dot pattern SVG as data URI background
const gridPatternStyle = {
  backgroundImage: `radial-gradient(circle, rgba(99,102,241,0.08) 1px, transparent 1px)`,
  backgroundSize: '28px 28px',
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export default function Footer() {
  return (
    <footer className="relative bg-[#0d1224] overflow-hidden">
      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 pointer-events-none" style={gridPatternStyle} />

      {/* Top gradient fade */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent" />

      {/* Glow blobs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        {/* Main Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 pb-12 border-b border-white/5"
        >
          {/* Column 1 — Brand */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            {/* Logo */}
            <Link to="/" className="flex items-center group mb-6 inline-block">
              <img src="/images/logo.png" alt="LACSO HUB" className="h-14 md:h-16 w-auto object-contain group-hover:scale-105 transition-transform duration-300" />
            </Link>

            {/* Tagline */}
            <p className="text-sm text-gray-400 leading-relaxed mb-6 max-w-xs">
              AI-Powered Digital Growth Ecosystem. We build brands, automate growth, and engineer digital
              experiences that convert.
            </p>

            {/* Social Links */}
            <div className="flex gap-2.5">
              {socialLinks.map(({ label, href, icon: Icon, color }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className={`w-9 h-9 flex items-center justify-center rounded-lg border border-white/10 bg-white/5 text-gray-400 transition-all duration-300 ${color}`}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Column 2 — Company */}
          <motion.div variants={itemVariants}>
            <h3 className="text-sm font-semibold text-white uppercase tracking-widest mb-5">
              Company
            </h3>
            <ul className="space-y-2.5">
              {companyLinks.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    to={href}
                    className="group flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    <ArrowRight className="w-3 h-3 text-indigo-500 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-200" />
                    <span className="group-hover:translate-x-1 transition-transform duration-200">
                      {label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 3 — Services */}
          <motion.div variants={itemVariants}>
            <h3 className="text-sm font-semibold text-white uppercase tracking-widest mb-5">
              Services
            </h3>
            <ul className="space-y-2.5">
              {serviceLinks.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    to={href}
                    className="group flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    <ArrowRight className="w-3 h-3 text-purple-500 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-200" />
                    <span className="group-hover:translate-x-1 transition-transform duration-200">
                      {label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 4 — Contact */}
          <motion.div variants={itemVariants}>
            <h3 className="text-sm font-semibold text-white uppercase tracking-widest mb-5">
              Contact
            </h3>
            <ul className="space-y-3.5 mb-6">
              {contactInfo.map(({ icon: Icon, label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    className="flex items-start gap-3 text-sm text-gray-400 hover:text-white transition-colors duration-200 group"
                  >
                    <span className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-indigo-500/20 transition-colors duration-200 mt-0.5">
                      <Icon className="w-3.5 h-3.5 text-indigo-400" />
                    </span>
                    <span className="leading-relaxed">{label}</span>
                  </a>
                </li>
              ))}
            </ul>

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/918866371807?text=Hi%20LACSO%20HUB%2C%20I%27m%20interested%20in%20your%20services!"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white text-sm font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-green-500/30 w-full justify-center"
            >
              <MessageCircle className="w-4 h-4" />
              Chat on WhatsApp
            </a>
          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500 text-center sm:text-left">
            © 2026{' '}
            <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent font-medium">
              LACSO HUB
            </span>
            . All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <Link
              to="/privacy"
              className="text-xs text-gray-500 hover:text-gray-300 transition-colors duration-200"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="text-xs text-gray-500 hover:text-gray-300 transition-colors duration-200"
            >
              Terms of Service
            </Link>
            <Link
              to="/sitemap"
              className="text-xs text-gray-500 hover:text-gray-300 transition-colors duration-200"
            >
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
