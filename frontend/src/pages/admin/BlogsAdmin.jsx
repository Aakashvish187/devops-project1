import { useEffect, useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import {
  Plus,
  Search,
  Edit3,
  Trash2,
  FileText,
  Calendar,
  Tag,
  Loader2,
  AlertCircle,
  CheckCircle,
  X,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

const API = import.meta.env.VITE_API_URL || '/api';

function StatusBadge({ status }) {
  const map = {
    published: { bg: 'rgba(34,197,94,0.12)', color: '#4ade80', label: 'Published' },
    draft: { bg: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.4)', label: 'Draft' },
    archived: { bg: 'rgba(245,158,11,0.10)', color: '#fbbf24', label: 'Archived' },
  };
  const s = map[status] || map.draft;
  return (
    <span
      className="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium"
      style={{ background: s.bg, color: s.color }}
    >
      {s.label}
    </span>
  );
}

function Toast({ message, type, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20, x: '-50%' }}
      animate={{ opacity: 1, y: 0, x: '-50%' }}
      exit={{ opacity: 0, y: -20, x: '-50%' }}
      className="fixed top-5 left-1/2 z-50 flex items-center gap-3 px-5 py-3 rounded-xl shadow-2xl"
      style={{
        background: type === 'error' ? 'rgba(239,68,68,0.12)' : 'rgba(34,197,94,0.12)',
        border: `1px solid ${type === 'error' ? 'rgba(239,68,68,0.3)' : 'rgba(34,197,94,0.3)'}`,
        backdropFilter: 'blur(16px)',
        minWidth: 280,
      }}
    >
      {type === 'error' ? (
        <AlertCircle size={16} className="text-red-400 flex-shrink-0" />
      ) : (
        <CheckCircle size={16} className="text-green-400 flex-shrink-0" />
      )}
      <span className="text-sm text-white">{message}</span>
      <button onClick={onClose} className="ml-auto" style={{ color: 'rgba(255,255,255,0.4)' }}>
        <X size={14} />
      </button>
    </motion.div>
  );
}

function DeleteModal({ blog, onConfirm, onCancel, loading }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(6px)' }}
    >
      <motion.div
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.92, opacity: 0 }}
        className="rounded-2xl p-6 w-full max-w-sm border"
        style={{ background: '#0d1120', borderColor: 'rgba(255,255,255,0.1)' }}
      >
        <div className="flex items-center gap-3 mb-4">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: 'rgba(239,68,68,0.12)' }}
          >
            <Trash2 size={18} className="text-red-400" />
          </div>
          <div>
            <h3 className="text-white font-semibold">Delete Blog Post</h3>
            <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
              This action cannot be undone
            </p>
          </div>
        </div>
        <p className="text-sm mb-5" style={{ color: 'rgba(255,255,255,0.6)' }}>
          Are you sure you want to delete{' '}
          <span className="text-white font-medium">"{blog?.title}"</span>?
        </p>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 py-2.5 rounded-xl text-sm font-medium transition-all"
            style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.6)' }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.1)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.06)')}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 py-2.5 rounded-xl text-sm font-medium text-white flex items-center justify-center gap-2 transition-all"
            style={{ background: loading ? 'rgba(239,68,68,0.4)' : 'rgba(239,68,68,0.8)' }}
          >
            {loading ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
            Delete
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function BlogsAdmin() {
  const navigate = useNavigate();
  const { token } = useAuthStore();

  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const LIMIT = 10;

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const fetchBlogs = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ limit: LIMIT, page });
      if (search) params.append('search', search);
      const res = await axios.get(`${API}/blogs?${params}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = res.data;
      const list = Array.isArray(data) ? data : data?.data || data?.blogs || [];
      setBlogs(list);
      const total = data?.total ?? list.length;
      setTotalPages(Math.max(1, Math.ceil(total / LIMIT)));
    } catch (err) {
      showToast(err?.response?.data?.message || 'Failed to fetch blogs', 'error');
    } finally {
      setLoading(false);
    }
  }, [token, page, search]);

  useEffect(() => {
    const timer = setTimeout(() => fetchBlogs(), search ? 400 : 0);
    return () => clearTimeout(timer);
  }, [fetchBlogs, search]);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleteLoading(true);
    try {
      await axios.delete(`${API}/blogs/${deleteTarget._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      showToast(`"${deleteTarget.title}" deleted successfully`);
      setDeleteTarget(null);
      fetchBlogs();
    } catch (err) {
      showToast(err?.response?.data?.message || 'Failed to delete blog', 'error');
    } finally {
      setDeleteLoading(false);
    }
  };

  const filteredBlogs = search
    ? blogs.filter(
        (b) =>
          b.title?.toLowerCase().includes(search.toLowerCase()) ||
          b.category?.toLowerCase().includes(search.toLowerCase())
      )
    : blogs;

  return (
    <div className="p-6 lg:p-8 min-h-screen" style={{ background: '#0a0e1a' }}>
      {/* Toast */}
      <AnimatePresence>
        {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      </AnimatePresence>

      {/* Delete Modal */}
      <AnimatePresence>
        {deleteTarget && (
          <DeleteModal
            blog={deleteTarget}
            onConfirm={handleDelete}
            onCancel={() => setDeleteTarget(null)}
            loading={deleteLoading}
          />
        )}
      </AnimatePresence>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8"
      >
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Blog Posts</h1>
          <p className="text-sm" style={{ color: 'rgba(255,255,255,0.35)' }}>
            Manage all blog articles and drafts
          </p>
        </div>
        <Link
          to="/admin/blogs/new"
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-200 self-start sm:self-auto"
          style={{
            background: 'linear-gradient(135deg, #6366f1, #a855f7)',
            boxShadow: '0 6px 20px rgba(99,102,241,0.3)',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.boxShadow = '0 8px 28px rgba(99,102,241,0.45)')}
          onMouseLeave={(e) => (e.currentTarget.style.boxShadow = '0 6px 20px rgba(99,102,241,0.3)')}
        >
          <Plus size={17} />
          New Blog Post
        </Link>
      </motion.div>

      {/* Search */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="relative mb-6"
      >
        <Search
          size={16}
          className="absolute left-4 top-1/2 -translate-y-1/2"
          style={{ color: 'rgba(255,255,255,0.3)' }}
        />
        <input
          type="text"
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          placeholder="Search blogs by title or category..."
          className="w-full pl-11 pr-4 py-3 rounded-xl text-sm outline-none transition-all duration-200"
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
            color: 'rgba(255,255,255,0.9)',
            maxWidth: 400,
          }}
          onFocus={(e) => {
            e.target.style.borderColor = 'rgba(99,102,241,0.5)';
            e.target.style.boxShadow = '0 0 0 3px rgba(99,102,241,0.08)';
          }}
          onBlur={(e) => {
            e.target.style.borderColor = 'rgba(255,255,255,0.08)';
            e.target.style.boxShadow = 'none';
          }}
        />
        {search && (
          <button
            onClick={() => setSearch('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 max-w-[400px]"
            style={{ color: 'rgba(255,255,255,0.3)', right: 'calc(100% - 385px)' }}
          >
            <X size={14} />
          </button>
        )}
      </motion.div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="rounded-2xl border overflow-hidden"
        style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.07)' }}
      >
        {/* Table Header */}
        <div
          className="grid grid-cols-12 gap-4 px-5 py-3 border-b text-xs font-medium uppercase tracking-wider"
          style={{ borderColor: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.3)' }}
        >
          <div className="col-span-5">Title</div>
          <div className="col-span-2">Category</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-2">Date</div>
          <div className="col-span-1 text-right">Actions</div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 size={22} className="animate-spin" style={{ color: 'rgba(255,255,255,0.3)' }} />
          </div>
        ) : filteredBlogs.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <FileText size={32} style={{ color: 'rgba(255,255,255,0.1)' }} />
            <p className="text-sm" style={{ color: 'rgba(255,255,255,0.25)' }}>
              {search ? 'No blogs match your search' : 'No blog posts yet'}
            </p>
            {!search && (
              <Link
                to="/admin/blogs/new"
                className="text-xs mt-1 px-4 py-2 rounded-xl"
                style={{ background: 'rgba(99,102,241,0.15)', color: '#818cf8' }}
              >
                Create your first blog
              </Link>
            )}
          </div>
        ) : (
          <div className="divide-y" style={{ borderColor: 'rgba(255,255,255,0.04)' }}>
            <AnimatePresence>
              {filteredBlogs.map((blog, i) => (
                <motion.div
                  key={blog._id || i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className="grid grid-cols-12 gap-4 px-5 py-4 items-center group transition-colors"
                  onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.02)')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                >
                  {/* Title */}
                  <div className="col-span-5 flex items-center gap-3 min-w-0">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: 'rgba(99,102,241,0.1)' }}
                    >
                      <FileText size={14} style={{ color: '#818cf8' }} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-white truncate">{blog.title}</p>
                      {blog.slug && (
                        <p className="text-xs truncate" style={{ color: 'rgba(255,255,255,0.25)' }}>
                          /{blog.slug}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Category */}
                  <div className="col-span-2">
                    {blog.category ? (
                      <span className="flex items-center gap-1 text-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>
                        <Tag size={11} />
                        {blog.category}
                      </span>
                    ) : (
                      <span style={{ color: 'rgba(255,255,255,0.2)' }}>—</span>
                    )}
                  </div>

                  {/* Status */}
                  <div className="col-span-2">
                    <StatusBadge status={blog.status || 'draft'} />
                  </div>

                  {/* Date */}
                  <div className="col-span-2 flex items-center gap-1.5 text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>
                    <Calendar size={11} />
                    {blog.createdAt ? new Date(blog.createdAt).toLocaleDateString() : '—'}
                  </div>

                  {/* Actions */}
                  <div className="col-span-1 flex items-center justify-end gap-2">
                    <button
                      onClick={() => navigate(`/admin/blogs/${blog._id}/edit`)}
                      className="p-1.5 rounded-lg transition-all"
                      style={{ color: 'rgba(255,255,255,0.35)' }}
                      title="Edit"
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = '#818cf8';
                        e.currentTarget.style.background = 'rgba(99,102,241,0.12)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = 'rgba(255,255,255,0.35)';
                        e.currentTarget.style.background = 'transparent';
                      }}
                    >
                      <Edit3 size={15} />
                    </button>
                    <button
                      onClick={() => setDeleteTarget(blog)}
                      className="p-1.5 rounded-lg transition-all"
                      style={{ color: 'rgba(255,255,255,0.35)' }}
                      title="Delete"
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = '#f87171';
                        e.currentTarget.style.background = 'rgba(239,68,68,0.1)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = 'rgba(255,255,255,0.35)';
                        e.currentTarget.style.background = 'transparent';
                      }}
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div
            className="flex items-center justify-between px-5 py-3 border-t"
            style={{ borderColor: 'rgba(255,255,255,0.06)' }}
          >
            <p className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>
              Page {page} of {totalPages}
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="p-1.5 rounded-lg transition-all disabled:opacity-30"
                style={{ background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.6)' }}
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="p-1.5 rounded-lg transition-all disabled:opacity-30"
                style={{ background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.6)' }}
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
