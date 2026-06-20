import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
  FileText,
  Briefcase,
  FolderKanban,
  MessageSquare,
  TrendingUp,
  Clock,
  ExternalLink,
  User,
  Mail,
  Calendar,
  Sun,
  Moon,
  Loader2,
  ArrowRight,
} from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

const API = import.meta.env.VITE_API_URL || '/api';

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return { text: 'Good Morning', icon: Sun };
  if (hour < 17) return { text: 'Good Afternoon', icon: Sun };
  return { text: 'Good Evening', icon: Moon };
}

const cardConfigs = [
  {
    label: 'Total Blogs',
    icon: FileText,
    endpoint: '/blogs?limit=1',
    color: '#6366f1',
    bgGlow: 'rgba(99,102,241,0.15)',
    link: '/admin/blogs',
    countKey: 'total',
  },
  {
    label: 'Active Services',
    icon: Briefcase,
    endpoint: '/services?status=active',
    color: '#a855f7',
    bgGlow: 'rgba(168,85,247,0.15)',
    link: '/admin/services',
    countKey: 'total',
  },
  {
    label: 'Portfolio Items',
    icon: FolderKanban,
    endpoint: '/portfolio?limit=1',
    color: '#06b6d4',
    bgGlow: 'rgba(6,182,212,0.15)',
    link: '/admin/portfolio',
    countKey: 'total',
  },
  {
    label: 'New Messages',
    icon: MessageSquare,
    endpoint: '/contact?status=new&limit=1',
    color: '#f59e0b',
    bgGlow: 'rgba(245,158,11,0.15)',
    link: '/admin/messages',
    countKey: 'total',
  },
];

function StatCard({ config, token }) {
  const [count, setCount] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const res = await axios.get(`${API}${config.endpoint}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = res.data;
        const value =
          data?.total ?? data?.count ?? data?.pagination?.total ?? (Array.isArray(data) ? data.length : null);
        setCount(value ?? '—');
      } catch {
        setCount('—');
      } finally {
        setLoading(false);
      }
    };
    fetchCount();
  }, [config.endpoint, token]);

  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
    >
      <Link
        to={config.link}
        className="block rounded-2xl p-5 border transition-all duration-300 group"
        style={{
          background: 'rgba(255,255,255,0.04)',
          borderColor: 'rgba(255,255,255,0.07)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = config.color + '40';
          e.currentTarget.style.boxShadow = `0 8px 32px ${config.bgGlow}`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
          e.currentTarget.style.boxShadow = 'none';
        }}
      >
        <div className="flex items-start justify-between mb-4">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center"
            style={{ background: config.bgGlow, border: `1px solid ${config.color}30` }}
          >
            <Icon size={20} style={{ color: config.color }} />
          </div>
          <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: config.color, marginTop: 4 }} />
        </div>
        <div>
          {loading ? (
            <Loader2 size={22} className="animate-spin mb-1" style={{ color: config.color }} />
          ) : (
            <p className="text-3xl font-bold text-white mb-0.5">{count}</p>
          )}
          <p className="text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>
            {config.label}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}

function StatusBadge({ status }) {
  const styles = {
    new: { bg: 'rgba(99,102,241,0.15)', color: '#818cf8', label: 'New' },
    read: { bg: 'rgba(34,197,94,0.12)', color: '#4ade80', label: 'Read' },
    replied: { bg: 'rgba(6,182,212,0.12)', color: '#22d3ee', label: 'Replied' },
    archived: { bg: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.35)', label: 'Archived' },
  };
  const s = styles[status] || styles.new;
  return (
    <span
      className="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium"
      style={{ background: s.bg, color: s.color }}
    >
      {s.label}
    </span>
  );
}

export default function Dashboard() {
  const { token } = useAuthStore();
  const greeting = getGreeting();
  const GreetIcon = greeting.icon;

  const [messages, setMessages] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [loadingMessages, setLoadingMessages] = useState(true);
  const [loadingBlogs, setLoadingBlogs] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get(`${API}/contact?limit=5`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = res.data;
        setMessages(Array.isArray(data) ? data : data?.data || data?.messages || []);
      } catch {
        setMessages([]);
      } finally {
        setLoadingMessages(false);
      }
    };
    const fetchBlogs = async () => {
      try {
        const res = await axios.get(`${API}/blogs?limit=5`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = res.data;
        setBlogs(Array.isArray(data) ? data : data?.data || data?.blogs || []);
      } catch {
        setBlogs([]);
      } finally {
        setLoadingBlogs(false);
      }
    };
    fetchMessages();
    fetchBlogs();
  }, [token]);

  const containerVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="p-6 lg:p-8 space-y-8 min-h-screen" style={{ background: '#0a0e1a' }}>
      {/* Greeting */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="flex items-center gap-3 mb-1">
          <GreetIcon size={22} className="text-yellow-400" />
          <h1 className="text-2xl lg:text-3xl font-bold text-white">
            {greeting.text},{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #818cf8, #a855f7)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Aakash
            </span>{' '}
            <span className="font-mono text-base" style={{ color: 'rgba(255,255,255,0.25)' }}>
              f44b
            </span>
          </h1>
        </div>
        <p className="text-sm" style={{ color: 'rgba(255,255,255,0.35)' }}>
          {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </motion.div>

      {/* Stat Cards */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4"
      >
        {cardConfigs.map((config, i) => (
          <motion.div key={config.label} variants={itemVariants} transition={{ delay: i * 0.06 }}>
            <StatCard config={config} token={token} />
          </motion.div>
        ))}
      </motion.div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Recent Messages */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-2xl border"
          style={{
            background: 'rgba(255,255,255,0.03)',
            borderColor: 'rgba(255,255,255,0.07)',
          }}
        >
          <div
            className="flex items-center justify-between px-5 py-4 border-b"
            style={{ borderColor: 'rgba(255,255,255,0.06)' }}
          >
            <div className="flex items-center gap-2">
              <MessageSquare size={17} style={{ color: '#f59e0b' }} />
              <h2 className="text-sm font-semibold text-white">Recent Messages</h2>
            </div>
            <Link
              to="/admin/messages"
              className="text-xs flex items-center gap-1 transition-colors"
              style={{ color: 'rgba(255,255,255,0.35)' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#818cf8')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.35)')}
            >
              View all <ExternalLink size={11} />
            </Link>
          </div>

          {loadingMessages ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 size={20} className="animate-spin" style={{ color: 'rgba(255,255,255,0.3)' }} />
            </div>
          ) : messages.length === 0 ? (
            <div className="flex items-center justify-center py-12 text-sm" style={{ color: 'rgba(255,255,255,0.25)' }}>
              No messages yet
            </div>
          ) : (
            <div className="divide-y" style={{ borderColor: 'rgba(255,255,255,0.04)' }}>
              {messages.map((msg, i) => (
                <motion.div
                  key={msg._id || i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.35 + i * 0.05 }}
                  className="px-5 py-3.5 flex items-start gap-3"
                >
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: 'rgba(245,158,11,0.12)' }}
                  >
                    <User size={14} style={{ color: '#f59e0b' }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-0.5">
                      <p className="text-sm font-medium text-white truncate">{msg.name || 'Anonymous'}</p>
                      <StatusBadge status={msg.status || 'new'} />
                    </div>
                    <p className="text-xs truncate" style={{ color: 'rgba(255,255,255,0.4)' }}>
                      <Mail size={10} className="inline mr-1 mb-0.5" />
                      {msg.email}
                    </p>
                    {msg.message && (
                      <p className="text-xs mt-1 line-clamp-1" style={{ color: 'rgba(255,255,255,0.3)' }}>
                        {msg.message}
                      </p>
                    )}
                  </div>
                  <div className="text-xs flex-shrink-0 mt-0.5" style={{ color: 'rgba(255,255,255,0.2)' }}>
                    <Calendar size={10} className="inline mr-1 mb-0.5" />
                    {msg.createdAt ? new Date(msg.createdAt).toLocaleDateString() : '—'}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Recent Blog Posts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="rounded-2xl border"
          style={{
            background: 'rgba(255,255,255,0.03)',
            borderColor: 'rgba(255,255,255,0.07)',
          }}
        >
          <div
            className="flex items-center justify-between px-5 py-4 border-b"
            style={{ borderColor: 'rgba(255,255,255,0.06)' }}
          >
            <div className="flex items-center gap-2">
              <FileText size={17} style={{ color: '#818cf8' }} />
              <h2 className="text-sm font-semibold text-white">Recent Blog Posts</h2>
            </div>
            <Link
              to="/admin/blogs"
              className="text-xs flex items-center gap-1 transition-colors"
              style={{ color: 'rgba(255,255,255,0.35)' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#818cf8')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.35)')}
            >
              View all <ExternalLink size={11} />
            </Link>
          </div>

          {loadingBlogs ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 size={20} className="animate-spin" style={{ color: 'rgba(255,255,255,0.3)' }} />
            </div>
          ) : blogs.length === 0 ? (
            <div className="flex items-center justify-center py-12 text-sm" style={{ color: 'rgba(255,255,255,0.25)' }}>
              No blog posts yet
            </div>
          ) : (
            <div className="divide-y" style={{ borderColor: 'rgba(255,255,255,0.04)' }}>
              {blogs.map((blog, i) => (
                <motion.div
                  key={blog._id || i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 + i * 0.05 }}
                  className="px-5 py-3.5 flex items-start gap-3 group"
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: 'rgba(99,102,241,0.12)' }}
                  >
                    <TrendingUp size={14} style={{ color: '#818cf8' }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-0.5">
                      <Link
                        to={`/admin/blogs/${blog._id}/edit`}
                        className="text-sm font-medium text-white truncate group-hover:text-indigo-400 transition-colors"
                      >
                        {blog.title}
                      </Link>
                      <span
                        className="inline-block px-2 py-0.5 rounded-full text-xs font-medium flex-shrink-0"
                        style={
                          blog.status === 'published'
                            ? { background: 'rgba(34,197,94,0.12)', color: '#4ade80' }
                            : { background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.35)' }
                        }
                      >
                        {blog.status || 'draft'}
                      </span>
                    </div>
                    <p className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>
                      {blog.category && (
                        <span className="mr-2" style={{ color: '#818cf8' }}>
                          #{blog.category}
                        </span>
                      )}
                      <Clock size={10} className="inline mr-1 mb-0.5" />
                      {blog.createdAt ? new Date(blog.createdAt).toLocaleDateString() : '—'}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>

      {/* Quick actions bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="flex flex-wrap gap-3"
      >
        {[
          { label: 'New Blog Post', to: '/admin/blogs/new', color: '#6366f1' },
          { label: 'View Messages', to: '/admin/messages', color: '#f59e0b' },
          { label: 'Site Settings', to: '/admin/settings', color: '#a855f7' },
        ].map((action) => (
          <Link
            key={action.to}
            to={action.to}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200"
            style={{
              background: `${action.color}15`,
              color: action.color,
              border: `1px solid ${action.color}25`,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = `${action.color}25`;
              e.currentTarget.style.borderColor = `${action.color}50`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = `${action.color}15`;
              e.currentTarget.style.borderColor = `${action.color}25`;
            }}
          >
            <ArrowRight size={14} />
            {action.label}
          </Link>
        ))}
      </motion.div>
    </div>
  );
}
