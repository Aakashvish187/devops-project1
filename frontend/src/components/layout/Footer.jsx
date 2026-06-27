import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Mail,
  Phone,
  MapPin,
  Sparkles,
  ArrowRight,
  MessageCircle,
  CheckCircle,
} from 'lucide-react';

const Instagram = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);
const Twitter = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);
const Linkedin = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);
const Youtube = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
  </svg>
);

const companyLinks = [
  { label: 'About Us', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Our Team', href: '/team' },
  { label: 'Blog', href: '/blog' },
  { label: 'Pricing', href: '/pricing' },
];

const serviceLinks = [
  { label: 'AI Website Dev', href: '/services/ai-website-development' },
  { label: 'AI Automation', href: '/services/ai-automation' },
  { label: 'SEO & Growth', href: '/services/seo-growth' },
  { label: 'Branding', href: '/services/branding' },
  { label: 'App Development', href: '/services/app-development' },
];

const socialLinks = [
  {
    label: 'Instagram',
    href: 'https://instagram.com/lacsohub',
    icon: Instagram,
    hoverStyle: { color: '#F472B6', borderColor: 'rgba(244,114,182,0.4)', background: 'rgba(244,114,182,0.08)' },
  },
  {
    label: 'Twitter',
    href: 'https://twitter.com/lacsohub',
    icon: Twitter,
    hoverStyle: { color: '#38BDF8', borderColor: 'rgba(56,189,248,0.4)', background: 'rgba(56,189,248,0.08)' },
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/company/lacsohub',
    icon: Linkedin,
    hoverStyle: { color: '#60A5FA', borderColor: 'rgba(96,165,250,0.4)', background: 'rgba(96,165,250,0.08)' },
  },
  {
    label: 'YouTube',
    href: 'https://youtube.com/@lacsohub',
    icon: Youtube,
    hoverStyle: { color: '#F87171', borderColor: 'rgba(248,113,113,0.4)', background: 'rgba(248,113,113,0.08)' },
  },
];

const contactInfo = [
  { icon: Mail, label: 'lacsohub@gmail.com', href: 'mailto:lacsohub@gmail.com' },
  { icon: Phone, label: '+91 88663 71807', href: 'tel:+918866371807' },
  { icon: MapPin, label: 'Ahmedabad, Gujarat, India', href: 'https://maps.google.com/?q=Ahmedabad,Gujarat,India' },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

export default function Footer() {
  return (
    <footer
      className="relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0B1020 0%, #050816 100%)' }}
    >
      {/* Top gradient divider */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(59,130,246,0.5) 25%, rgba(139,92,246,0.5) 50%, rgba(34,211,238,0.4) 75%, transparent 100%)' }}
      />

      {/* Background orbs */}
      <div className="absolute top-0 left-1/4 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%)', filter: 'blur(60px)' }} />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 70%)', filter: 'blur(60px)' }} />

      {/* Dot grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(99,102,241,0.06) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-8">

        {/* ── Main Grid ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 pb-14"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}
        >
          {/* Column 1 — Brand */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <Link to="/" className="flex items-center mb-6 inline-block group">
              <img
                src="/images/logo.png"
                alt="LACSO HUB"
                className="h-12 md:h-14 w-auto object-contain transition-all duration-300 group-hover:scale-105"
                style={{ filter: 'drop-shadow(0 0 10px rgba(99,102,241,0.35))' }}
              />
            </Link>

            <p className="text-sm leading-relaxed mb-4" style={{ color: 'rgba(255,255,255,0.45)', maxWidth: '260px' }}>
              AI-Powered Digital Growth Ecosystem. We build brands, automate growth, and engineer digital experiences that convert.
            </p>

            {/* Status Badge */}
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6 text-xs font-semibold"
              style={{
                background: 'rgba(16,185,129,0.1)',
                border: '1px solid rgba(16,185,129,0.25)',
                color: '#34D399',
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              All Systems Operational
            </div>

            {/* Social Links */}
            <div className="flex gap-2">
              {socialLinks.map(({ label, href, icon: Icon, hoverStyle }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 flex items-center justify-center rounded-xl transition-all duration-300"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    color: 'rgba(255,255,255,0.4)',
                  }}
                  onMouseEnter={(e) => {
                    Object.assign(e.currentTarget.style, hoverStyle);
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'rgba(255,255,255,0.4)';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                    e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                  }}
                >
                  <Icon />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Column 2 — Company */}
          <motion.div variants={itemVariants}>
            <h3
              className="text-xs font-bold uppercase tracking-[0.15em] mb-6"
              style={{ color: 'rgba(255,255,255,0.35)' }}
            >
              Company
            </h3>
            <ul className="space-y-3">
              {companyLinks.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    to={href}
                    className="group flex items-center gap-2 text-sm transition-colors duration-200"
                    style={{ color: 'rgba(255,255,255,0.5)' }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = '#ffffff'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.5)'; }}
                  >
                    <ArrowRight className="w-3 h-3 text-blue-500 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 flex-shrink-0" />
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
            <h3
              className="text-xs font-bold uppercase tracking-[0.15em] mb-6"
              style={{ color: 'rgba(255,255,255,0.35)' }}
            >
              Services
            </h3>
            <ul className="space-y-3">
              {serviceLinks.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    to={href}
                    className="group flex items-center gap-2 text-sm transition-colors duration-200"
                    style={{ color: 'rgba(255,255,255,0.5)' }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = '#ffffff'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.5)'; }}
                  >
                    <ArrowRight className="w-3 h-3 text-purple-500 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 flex-shrink-0" />
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
            <h3
              className="text-xs font-bold uppercase tracking-[0.15em] mb-6"
              style={{ color: 'rgba(255,255,255,0.35)' }}
            >
              Contact
            </h3>
            <ul className="space-y-4 mb-6">
              {contactInfo.map(({ icon: Icon, label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    className="flex items-start gap-3 text-sm group transition-colors duration-200"
                    style={{ color: 'rgba(255,255,255,0.45)' }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.85)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.45)'; }}
                  >
                    <span
                      className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-200 mt-0.5"
                      style={{
                        background: 'rgba(59,130,246,0.1)',
                        border: '1px solid rgba(59,130,246,0.18)',
                      }}
                    >
                      <Icon className="w-3.5 h-3.5 text-blue-400" />
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
              className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-white text-sm font-semibold w-full justify-center transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              style={{
                background: 'linear-gradient(135deg, #22C55E, #16A34A)',
                boxShadow: '0 4px 20px rgba(34,197,94,0.35)',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 8px 30px rgba(34,197,94,0.55)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 4px 20px rgba(34,197,94,0.35)'; }}
            >
              <MessageCircle className="w-4 h-4" />
              Chat on WhatsApp
            </a>
          </motion.div>
        </motion.div>

        {/* ── Bottom Bar ── */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-5">
          <p className="text-xs text-center sm:text-left" style={{ color: 'rgba(255,255,255,0.25)' }}>
            © 2026{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #60A5FA, #A78BFA)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: 600,
              }}
            >
              LACSO HUB
            </span>
            . All rights reserved. Built with ♥ in India.
          </p>

          <div className="flex items-center gap-6">
            {[
              { label: 'Privacy Policy', href: '/privacy' },
              { label: 'Terms of Service', href: '/terms' },
              { label: 'Sitemap', href: '/sitemap' },
            ].map(({ label, href }) => (
              <Link
                key={href}
                to={href}
                className="text-xs transition-colors duration-200"
                style={{ color: 'rgba(255,255,255,0.25)' }}
                onMouseEnter={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.6)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.25)'; }}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
