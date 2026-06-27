import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  X,
  ChevronDown,
  Globe,
  Zap,
  TrendingUp,
  Palette,
  Smartphone,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

const servicesDropdown = [
  {
    label: 'AI Website Dev',
    href: '/services/ai-website-development',
    icon: Globe,
    desc: 'Intelligent, conversion-focused websites',
    color: 'from-blue-500/20 to-cyan-500/20',
    iconColor: 'text-blue-400',
  },
  {
    label: 'AI Automation',
    href: '/services/ai-automation',
    icon: Zap,
    desc: 'Streamline workflows with AI agents',
    color: 'from-yellow-500/20 to-orange-500/20',
    iconColor: 'text-yellow-400',
  },
  {
    label: 'SEO & Growth',
    href: '/services/seo-growth',
    icon: TrendingUp,
    desc: 'Dominate search & scale revenue',
    color: 'from-green-500/20 to-emerald-500/20',
    iconColor: 'text-green-400',
  },
  {
    label: 'Branding',
    href: '/services/branding',
    icon: Palette,
    desc: 'Memorable identities that convert',
    color: 'from-pink-500/20 to-rose-500/20',
    iconColor: 'text-pink-400',
  },
  {
    label: 'App Dev',
    href: '/services/app-development',
    icon: Smartphone,
    desc: 'Cross-platform mobile & web apps',
    color: 'from-purple-500/20 to-violet-500/20',
    iconColor: 'text-purple-400',
  },
];

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services', dropdown: servicesDropdown },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Team', href: '/team' },
  { label: 'Blog', href: '/blog' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const location = useLocation();
  const dropdownRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setServicesOpen(false);
    setMobileServicesOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setServicesOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const isActive = (href) => {
    if (href === '/') return location.pathname === '/';
    return location.pathname.startsWith(href);
  };

  const handleMouseEnterServices = () => {
    clearTimeout(timeoutRef.current);
    setServicesOpen(true);
  };

  const handleMouseLeaveServices = () => {
    timeoutRef.current = setTimeout(() => setServicesOpen(false), 180);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50"
        style={{ paddingTop: scrolled ? '0' : '1rem', transition: 'padding 0.4s ease' }}
      >
        <div
          className={`mx-auto transition-all duration-500 ${
            scrolled
              ? 'max-w-full rounded-none px-4 sm:px-6 lg:px-12 py-0'
              : 'max-w-7xl rounded-2xl px-4 sm:px-6 lg:px-8 py-0 mx-4 lg:mx-auto'
          }`}
          style={{
            background: scrolled
              ? 'rgba(5, 8, 22, 0.92)'
              : 'rgba(11, 16, 32, 0.75)',
            backdropFilter: 'blur(28px)',
            WebkitBackdropFilter: 'blur(28px)',
            borderBottom: scrolled ? '1px solid rgba(255,255,255,0.07)' : '1px solid rgba(255,255,255,0.1)',
            boxShadow: scrolled
              ? '0 8px 40px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.04)'
              : '0 4px 32px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.08)',
          }}
        >
          <div className="flex items-center justify-between h-16 lg:h-[68px]">
            {/* ── Logo ── */}
            <Link to="/" className="flex items-center gap-3 group flex-shrink-0">
              <img
                src="/images/logo.png"
                alt="LACSO HUB"
                className="h-10 md:h-12 w-auto object-contain transition-all duration-300 group-hover:scale-105"
                style={{ filter: 'drop-shadow(0 0 12px rgba(99,102,241,0.4))' }}
              />
            </Link>

            {/* ── Desktop Nav ── */}
            <div className="hidden lg:flex items-center gap-0.5">
              {navLinks.map((link) =>
                link.dropdown ? (
                  <div
                    key={link.label}
                    ref={dropdownRef}
                    className="relative"
                    onMouseEnter={handleMouseEnterServices}
                    onMouseLeave={handleMouseLeaveServices}
                  >
                    <button
                      onClick={() => setServicesOpen((v) => !v)}
                      className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                        isActive(link.href)
                          ? 'text-blue-400 bg-blue-500/10'
                          : 'text-white/65 hover:text-white hover:bg-white/[0.06]'
                      }`}
                    >
                      {link.label}
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-300 ${
                          servicesOpen ? 'rotate-180 text-blue-400' : ''
                        }`}
                      />
                    </button>

                    <AnimatePresence>
                      {servicesOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.96 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.96 }}
                          transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                          className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-80 rounded-2xl overflow-hidden"
                          style={{
                            background: 'rgba(11, 16, 32, 0.97)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            backdropFilter: 'blur(40px)',
                            boxShadow: '0 24px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04)',
                          }}
                          onMouseEnter={handleMouseEnterServices}
                          onMouseLeave={handleMouseLeaveServices}
                        >
                          {/* Top accent line */}
                          <div className="h-px w-full bg-gradient-to-r from-transparent via-blue-500/60 to-transparent" />
                          <div className="p-2.5 space-y-0.5">
                            {servicesDropdown.map((item) => {
                              const Icon = item.icon;
                              return (
                                <Link
                                  key={item.href}
                                  to={item.href}
                                  className="flex items-start gap-3.5 p-3 rounded-xl hover:bg-white/[0.06] group/item transition-all duration-200"
                                >
                                  <div
                                    className={`w-9 h-9 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center flex-shrink-0 transition-all duration-200 group-hover/item:scale-110`}
                                    style={{ border: '1px solid rgba(255,255,255,0.08)' }}
                                  >
                                    <Icon className={`w-4 h-4 ${item.iconColor}`} />
                                  </div>
                                  <div className="pt-0.5">
                                    <div className="text-sm font-semibold text-white/90 group-hover/item:text-white transition-colors">
                                      {item.label}
                                    </div>
                                    <div className="text-xs text-white/40 mt-0.5">{item.desc}</div>
                                  </div>
                                </Link>
                              );
                            })}
                          </div>
                          <div className="px-3 pb-3">
                            <Link
                              to="/services"
                              className="flex items-center justify-center gap-2 text-xs font-semibold text-blue-400 hover:text-blue-300 py-2.5 rounded-xl border border-blue-500/20 hover:bg-blue-500/10 transition-all duration-200"
                            >
                              View All Services <ArrowRight className="w-3 h-3" />
                            </Link>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    key={link.href}
                    to={link.href}
                    className={`relative px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                      isActive(link.href)
                        ? 'text-blue-400 bg-blue-500/10'
                        : 'text-white/65 hover:text-white hover:bg-white/[0.06]'
                    }`}
                  >
                    {link.label}
                    {isActive(link.href) && (
                      <motion.div
                        layoutId="activeLink"
                        className="absolute bottom-1 left-1/2 -translate-x-1/2 w-3.5 h-0.5 rounded-full"
                        style={{ background: 'linear-gradient(90deg, #60A5FA, #A78BFA)' }}
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                )
              )}
            </div>

            {/* ── CTA Button ── */}
            <div className="hidden lg:block">
              <Link
                to="/contact"
                className="relative inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white overflow-hidden group transition-all duration-300"
                style={{
                  background: 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 50%, #3B82F6 100%)',
                  backgroundSize: '200% auto',
                  boxShadow: '0 0 20px rgba(99,102,241,0.35)',
                  animation: 'shimmer-bg 4s linear infinite',
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <Sparkles className="w-4 h-4 relative z-10" />
                <span className="relative z-10">Get Started</span>
              </Link>
            </div>

            {/* ── Mobile Hamburger ── */}
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="lg:hidden relative w-10 h-10 flex items-center justify-center rounded-xl text-white/70 hover:text-white transition-all duration-200"
              style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.1)',
              }}
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              <AnimatePresence mode="wait">
                {mobileOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <X className="w-5 h-5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Menu className="w-5 h-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* ── Mobile Menu ── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-40 lg:hidden"
              style={{ background: 'rgba(5,8,22,0.7)', backdropFilter: 'blur(8px)' }}
              onClick={() => setMobileOpen(false)}
            />

            {/* Slide-in panel */}
            <motion.div
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 32 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-80 lg:hidden overflow-y-auto"
              style={{
                background: 'rgba(11, 16, 32, 0.98)',
                borderLeft: '1px solid rgba(255,255,255,0.08)',
                backdropFilter: 'blur(40px)',
                boxShadow: '-20px 0 80px rgba(0,0,0,0.6)',
              }}
            >
              {/* Panel Header */}
              <div
                className="flex items-center justify-between p-5"
                style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}
              >
                <Link
                  to="/"
                  className="flex items-center gap-2.5"
                  onClick={() => setMobileOpen(false)}
                >
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center"
                    style={{ background: 'linear-gradient(135deg, #3B82F6, #8B5CF6, #22D3EE)' }}
                  >
                    <Sparkles className="w-4.5 h-4.5 text-white" />
                  </div>
                  <span
                    className="text-lg font-bold"
                    style={{
                      background: 'linear-gradient(135deg, #60A5FA, #A78BFA, #22D3EE)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    LACSO HUB
                  </span>
                </Link>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-all"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Nav Links */}
              <div className="p-4 space-y-1">
                {navLinks.map((link, i) =>
                  link.dropdown ? (
                    <div key={link.label}>
                      <button
                        onClick={() => setMobileServicesOpen((v) => !v)}
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                          isActive(link.href)
                            ? 'text-blue-400 bg-blue-500/10'
                            : 'text-white/65 hover:text-white hover:bg-white/[0.06]'
                        }`}
                      >
                        {link.label}
                        <ChevronDown
                          className={`w-4 h-4 transition-transform duration-200 ${
                            mobileServicesOpen ? 'rotate-180 text-blue-400' : ''
                          }`}
                        />
                      </button>
                      <AnimatePresence>
                        {mobileServicesOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.28, ease: 'easeInOut' }}
                            className="overflow-hidden ml-4 mt-1 space-y-1 border-l pl-4"
                            style={{ borderColor: 'rgba(59,130,246,0.2)' }}
                          >
                            {servicesDropdown.map((item) => {
                              const Icon = item.icon;
                              return (
                                <Link
                                  key={item.href}
                                  to={item.href}
                                  onClick={() => setMobileOpen(false)}
                                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/[0.06] text-white/50 hover:text-white transition-all duration-200"
                                >
                                  <Icon className={`w-4 h-4 ${item.iconColor} flex-shrink-0`} />
                                  <span className="text-sm">{item.label}</span>
                                </Link>
                              );
                            })}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <motion.div
                      key={link.href}
                      initial={{ x: 20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: i * 0.05, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <Link
                        to={link.href}
                        onClick={() => setMobileOpen(false)}
                        className={`flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                          isActive(link.href)
                            ? 'text-blue-400 bg-blue-500/10 border border-blue-500/20'
                            : 'text-white/65 hover:text-white hover:bg-white/[0.06]'
                        }`}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  )
                )}
              </div>

              {/* Mobile CTA */}
              <div className="p-4 mt-2">
                <Link
                  to="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl text-white font-semibold text-sm transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                  style={{
                    background: 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 50%, #3B82F6 100%)',
                    backgroundSize: '200% auto',
                    boxShadow: '0 0 20px rgba(99,102,241,0.4)',
                    animation: 'shimmer-bg 4s linear infinite',
                  }}
                >
                  <Sparkles className="w-4 h-4" />
                  Get Started Free
                </Link>
              </div>

              {/* Bottom gradient accent */}
              <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
                style={{ background: 'linear-gradient(to top, rgba(59,130,246,0.08), transparent)' }} />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
