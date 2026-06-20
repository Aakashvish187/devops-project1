import { useEffect, useState } from 'react';
import { NavLink, useNavigate, useLocation, Outlet } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  FileText,
  Briefcase,
  FolderKanban,
  Users,
  Star,
  DollarSign,
  MessageSquare,
  BookOpen,
  Settings,
  LogOut,
  Zap,
  Menu,
  X,
  ChevronRight,
} from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

const NAV_ITEMS = [
  { label: 'Dashboard', icon: LayoutDashboard, to: '/admin/dashboard' },
  { label: 'Blog', icon: FileText, to: '/admin/blogs' },
  { label: 'Services', icon: Briefcase, to: '/admin/services' },
  { label: 'Portfolio', icon: FolderKanban, to: '/admin/portfolio' },
  { label: 'Team', icon: Users, to: '/admin/team' },
  { label: 'Testimonials', icon: Star, to: '/admin/testimonials' },
  { label: 'Pricing', icon: DollarSign, to: '/admin/pricing' },
  { label: 'Messages', icon: MessageSquare, to: '/admin/messages' },
  { label: 'Knowledge Base', icon: BookOpen, to: '/admin/knowledge-base' },
  { label: 'Settings', icon: Settings, to: '/admin/settings' },
];

const SIDEBAR_WIDTH = 240;

function SidebarContent({ onClose }) {
  const navigate = useNavigate();
  const { logout } = useAuthStore();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/admin/login', { replace: true });
  };

  return (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-5 border-b" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{
            background: 'linear-gradient(135deg, #6366f1, #a855f7)',
            boxShadow: '0 0 20px rgba(99,102,241,0.35)',
          }}
        >
          <Zap size={18} className="text-white" fill="white" />
        </div>
        <div>
          <span
            className="text-base font-bold tracking-wide"
            style={{
              background: 'linear-gradient(135deg, #e2e8f0, #a855f7)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            LACSO HUB
          </span>
          <p className="text-[10px] leading-none mt-0.5" style={{ color: 'rgba(255,255,255,0.3)' }}>
            Admin Panel
          </p>
        </div>
        {onClose && (
          <button onClick={onClose} className="ml-auto" style={{ color: 'rgba(255,255,255,0.3)' }}>
            <X size={18} />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-0.5">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive =
            item.to === '/admin/dashboard'
              ? location.pathname === '/admin/dashboard'
              : location.pathname.startsWith(item.to);
          return (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onClose}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group relative"
              style={
                isActive
                  ? {
                      background: 'rgba(99,102,241,0.15)',
                      color: '#818cf8',
                      border: '1px solid rgba(99,102,241,0.25)',
                    }
                  : {
                      color: 'rgba(255,255,255,0.45)',
                      border: '1px solid transparent',
                    }
              }
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.color = 'rgba(255,255,255,0.8)';
                  e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.color = 'rgba(255,255,255,0.45)';
                  e.currentTarget.style.background = 'transparent';
                }
              }}
            >
              <Icon size={17} />
              <span>{item.label}</span>
              {isActive && <ChevronRight size={14} className="ml-auto" />}
            </NavLink>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-3 border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200"
          style={{ color: 'rgba(239,68,68,0.7)', border: '1px solid transparent' }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#f87171';
            e.currentTarget.style.background = 'rgba(239,68,68,0.08)';
            e.currentTarget.style.borderColor = 'rgba(239,68,68,0.15)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = 'rgba(239,68,68,0.7)';
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.borderColor = 'transparent';
          }}
        >
          <LogOut size={17} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}

export default function AdminLayout() {
  const navigate = useNavigate();
  const { isAuthenticated, token } = useAuthStore();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (!isAuthenticated || !token) {
      navigate('/admin/login', { replace: true });
    }
  }, [isAuthenticated, token, navigate]);

  if (!isAuthenticated || !token) return null;

  return (
    <div className="flex min-h-screen" style={{ background: '#0a0e1a' }}>
      {/* Desktop Sidebar */}
      <aside
        className="hidden lg:flex flex-col flex-shrink-0"
        style={{
          width: SIDEBAR_WIDTH,
          background: 'rgba(255,255,255,0.03)',
          borderRight: '1px solid rgba(255,255,255,0.06)',
          position: 'sticky',
          top: 0,
          height: '100vh',
        }}
      >
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 lg:hidden"
              style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              initial={{ x: -SIDEBAR_WIDTH }}
              animate={{ x: 0 }}
              exit={{ x: -SIDEBAR_WIDTH }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed top-0 left-0 z-50 flex flex-col lg:hidden"
              style={{
                width: SIDEBAR_WIDTH,
                height: '100vh',
                background: '#0d1120',
                borderRight: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              <SidebarContent onClose={() => setMobileOpen(false)} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile header */}
        <div
          className="lg:hidden flex items-center justify-between px-4 py-3 border-b sticky top-0 z-30"
          style={{
            background: 'rgba(10,14,26,0.95)',
            borderColor: 'rgba(255,255,255,0.06)',
            backdropFilter: 'blur(12px)',
          }}
        >
          <button
            onClick={() => setMobileOpen(true)}
            className="p-2 rounded-lg"
            style={{ color: 'rgba(255,255,255,0.6)', background: 'rgba(255,255,255,0.05)' }}
          >
            <Menu size={20} />
          </button>
          <div className="flex items-center gap-2">
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #6366f1, #a855f7)' }}
            >
              <Zap size={14} className="text-white" fill="white" />
            </div>
            <span
              className="font-bold text-sm"
              style={{
                background: 'linear-gradient(135deg, #e2e8f0, #a855f7)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              LACSO HUB
            </span>
          </div>
          <div className="w-10" />
        </div>

        {/* Page content */}
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
