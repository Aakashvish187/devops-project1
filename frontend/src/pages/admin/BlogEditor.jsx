import { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import {
  ArrowLeft,
  Save,
  Eye,
  EyeOff,
  Loader2,
  AlertCircle,
  CheckCircle,
  X,
  Tag,
  Hash,
  FileText,
  User,
  Globe,
  AlignLeft,
  Code,
} from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

const API = import.meta.env.VITE_API_URL || '/api';

const CATEGORIES = [
  'Technology', 'Design', 'Marketing', 'Development', 'AI & ML',
  'Business', 'SEO', 'Social Media', 'Branding', 'News', 'Tutorial', 'Other',
];

function Toast({ message, type, onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);
  return (
    <motion.div
      initial={{ opacity: 0, y: -24, x: '-50%' }}
      animate={{ opacity: 1, y: 0, x: '-50%' }}
      exit={{ opacity: 0, y: -24, x: '-50%' }}
      className="fixed top-6 left-1/2 z-50 flex items-center gap-3 px-5 py-3 rounded-xl shadow-2xl"
      style={{
        background: type === 'error' ? 'rgba(239,68,68,0.12)' : 'rgba(34,197,94,0.12)',
        border: `1px solid ${type === 'error' ? 'rgba(239,68,68,0.3)' : 'rgba(34,197,94,0.3)'}`,
        backdropFilter: 'blur(20px)',
        minWidth: 300,
      }}
    >
      {type === 'error' ? (
        <AlertCircle size={16} className="text-red-400 flex-shrink-0" />
      ) : (
        <CheckCircle size={16} className="text-green-400 flex-shrink-0" />
      )}
      <span className="text-sm text-white flex-1">{message}</span>
      <button onClick={onClose} style={{ color: 'rgba(255,255,255,0.4)' }}>
        <X size={14} />
      </button>
    </motion.div>
  );
}

const inputCls = 'w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200';
const inputStyle = {
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.08)',
  color: 'rgba(255,255,255,0.9)',
};
const inputFocusStyle = {
  borderColor: 'rgba(99,102,241,0.55)',
  boxShadow: '0 0 0 3px rgba(99,102,241,0.08)',
};

function FormField({ label, icon: Icon, children, required }) {
  return (
    <div>
      <label className="flex items-center gap-1.5 text-xs font-medium mb-2 uppercase tracking-wide" style={{ color: 'rgba(255,255,255,0.45)' }}>
        {Icon && <Icon size={12} />}
        {label}
        {required && <span className="text-red-400">*</span>}
      </label>
      {children}
    </div>
  );
}

function InputEl({ ...props }) {
  return (
    <input
      className={inputCls}
      style={inputStyle}
      onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
      onBlur={(e) => Object.assign(e.target.style, inputStyle)}
      {...props}
    />
  );
}

function TextareaEl({ rows = 4, ...props }) {
  return (
    <textarea
      rows={rows}
      className={inputCls + ' resize-none'}
      style={{ ...inputStyle, lineHeight: '1.6' }}
      onFocus={(e) => Object.assign(e.target.style, { ...inputStyle, ...inputFocusStyle })}
      onBlur={(e) => Object.assign(e.target.style, inputStyle)}
      {...props}
    />
  );
}

function generateSlug(title) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

const INITIAL_FORM = {
  title: '',
  slug: '',
  category: '',
  author: '',
  tags: '',
  excerpt: '',
  content: '',
  status: 'draft',
  meta_title: '',
  meta_desc: '',
  featured_image: '',
};

export default function BlogEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useAuthStore();
  const isEdit = Boolean(id && id !== 'new');

  const [form, setForm] = useState(INITIAL_FORM);
  const [slugManual, setSlugManual] = useState(false);
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);
  const [preview, setPreview] = useState(false);
  const contentRef = useRef(null);

  const showToast = (message, type = 'success') => setToast({ message, type });

  // Fetch blog if editing
  useEffect(() => {
    if (!isEdit) return;
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`${API}/blogs/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = res.data?.data || res.data;
        setForm({
          title: data.title || '',
          slug: data.slug || '',
          category: data.category || '',
          author: data.author || '',
          tags: Array.isArray(data.tags) ? data.tags.join(', ') : data.tags || '',
          excerpt: data.excerpt || '',
          content: data.content || '',
          status: data.status || 'draft',
          meta_title: data.meta_title || data.seo?.meta_title || '',
          meta_desc: data.meta_desc || data.seo?.meta_description || '',
          featured_image: data.featured_image || data.featuredImage || '',
        });
        setSlugManual(true);
      } catch (err) {
        showToast(err?.response?.data?.message || 'Failed to load blog', 'error');
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id, isEdit, token]);

  const handleChange = (field, value) => {
    setForm((prev) => {
      const next = { ...prev, [field]: value };
      if (field === 'title' && !slugManual) {
        next.slug = generateSlug(value);
      }
      if (field === 'title' && !next.meta_title) {
        next.meta_title = value;
      }
      return next;
    });
  };

  const handleSlugChange = (val) => {
    setSlugManual(true);
    handleChange('slug', val);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) {
      showToast('Title is required', 'error');
      return;
    }
    if (!form.content.trim()) {
      showToast('Content is required', 'error');
      return;
    }
    setSaving(true);
    try {
      const payload = {
        ...form,
        tags: form.tags
          .split(',')
          .map((t) => t.trim())
          .filter(Boolean),
        slug: form.slug || generateSlug(form.title),
      };
      if (isEdit) {
        await axios.put(`${API}/blogs/${id}`, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
        showToast('Blog updated successfully!');
      } else {
        await axios.post(`${API}/blogs`, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
        showToast('Blog created successfully!');
        setTimeout(() => navigate('/admin/blogs'), 1500);
      }
    } catch (err) {
      showToast(err?.response?.data?.message || 'Failed to save blog', 'error');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen" style={{ background: '#0a0e1a' }}>
        <Loader2 size={28} className="animate-spin" style={{ color: '#818cf8' }} />
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 lg:p-8" style={{ background: '#0a0e1a' }}>
      <AnimatePresence>
        {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      </AnimatePresence>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-8 flex-wrap gap-4"
      >
        <div className="flex items-center gap-3">
          <Link
            to="/admin/blogs"
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm transition-all"
            style={{ background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.5)' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'white')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}
          >
            <ArrowLeft size={16} />
            Back to Blogs
          </Link>
          <div className="h-5 w-px" style={{ background: 'rgba(255,255,255,0.1)' }} />
          <h1 className="text-xl font-bold text-white">{isEdit ? 'Edit Blog Post' : 'New Blog Post'}</h1>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setPreview((v) => !v)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm transition-all"
            style={{
              background: preview ? 'rgba(99,102,241,0.15)' : 'rgba(255,255,255,0.05)',
              color: preview ? '#818cf8' : 'rgba(255,255,255,0.5)',
              border: preview ? '1px solid rgba(99,102,241,0.3)' : '1px solid transparent',
            }}
          >
            {preview ? <EyeOff size={15} /> : <Eye size={15} />}
            {preview ? 'Edit' : 'Preview'}
          </button>
          <button
            onClick={handleSubmit}
            disabled={saving}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all"
            style={{
              background: saving ? 'rgba(99,102,241,0.5)' : 'linear-gradient(135deg, #6366f1, #a855f7)',
              boxShadow: saving ? 'none' : '0 6px 20px rgba(99,102,241,0.3)',
              cursor: saving ? 'not-allowed' : 'pointer',
            }}
          >
            {saving ? <Loader2 size={15} className="animate-spin" /> : <Save size={15} />}
            {saving ? 'Saving...' : isEdit ? 'Update Blog' : 'Publish'}
          </button>
        </div>
      </motion.div>

      {preview ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="max-w-3xl mx-auto rounded-2xl p-8 border"
          style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.08)' }}
        >
          {form.featured_image && (
            <img src={form.featured_image} alt="Featured" className="w-full h-48 object-cover rounded-xl mb-6" />
          )}
          <div className="flex items-center gap-2 mb-3">
            {form.category && (
              <span className="text-xs px-2.5 py-1 rounded-full" style={{ background: 'rgba(99,102,241,0.15)', color: '#818cf8' }}>
                {form.category}
              </span>
            )}
            <span
              className="text-xs px-2.5 py-1 rounded-full"
              style={
                form.status === 'published'
                  ? { background: 'rgba(34,197,94,0.12)', color: '#4ade80' }
                  : { background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.4)' }
              }
            >
              {form.status}
            </span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-3">{form.title || 'Untitled'}</h1>
          {form.author && <p className="text-sm mb-1" style={{ color: 'rgba(255,255,255,0.4)' }}>By {form.author}</p>}
          {form.excerpt && <p className="text-base mb-6 italic" style={{ color: 'rgba(255,255,255,0.5)' }}>{form.excerpt}</p>}
          <div
            className="prose prose-invert max-w-none text-sm leading-relaxed"
            style={{ color: 'rgba(255,255,255,0.7)' }}
            dangerouslySetInnerHTML={{ __html: form.content }}
          />
          {form.tags && (
            <div className="flex flex-wrap gap-2 mt-6">
              {form.tags.split(',').map((t) => t.trim()).filter(Boolean).map((tag) => (
                <span key={tag} className="text-xs px-2.5 py-1 rounded-full" style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.5)' }}>
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Main Column */}
            <div className="xl:col-span-2 space-y-5">
              {/* Title */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 }}
                className="rounded-2xl p-5 border space-y-4"
                style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.07)' }}
              >
                <FormField label="Title" icon={FileText} required>
                  <InputEl
                    type="text"
                    value={form.title}
                    onChange={(e) => handleChange('title', e.target.value)}
                    placeholder="Enter an engaging blog title..."
                    className={inputCls + ' text-lg font-semibold'}
                    style={{ ...inputStyle, fontSize: '1.1rem' }}
                  />
                </FormField>
                <FormField label="Slug (URL)" icon={Hash}>
                  <div className="flex items-center gap-2">
                    <span className="text-xs px-3 py-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)', color: 'rgba(255,255,255,0.3)', border: '1px solid rgba(255,255,255,0.06)', whiteSpace: 'nowrap' }}>
                      /blog/
                    </span>
                    <InputEl
                      type="text"
                      value={form.slug}
                      onChange={(e) => handleSlugChange(e.target.value)}
                      placeholder="auto-generated-from-title"
                    />
                  </div>
                </FormField>
              </motion.div>

              {/* Excerpt */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 }}
                className="rounded-2xl p-5 border"
                style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.07)' }}
              >
                <FormField label="Excerpt" icon={AlignLeft}>
                  <TextareaEl
                    rows={3}
                    value={form.excerpt}
                    onChange={(e) => handleChange('excerpt', e.target.value)}
                    placeholder="Write a short summary of this post (shown in blog listing)..."
                  />
                  <p className="text-xs mt-1.5" style={{ color: 'rgba(255,255,255,0.2)' }}>
                    {form.excerpt.length} / 300 characters recommended
                  </p>
                </FormField>
              </motion.div>

              {/* Content */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="rounded-2xl p-5 border"
                style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.07)' }}
              >
                <div className="flex items-center justify-between mb-2">
                  <label className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide" style={{ color: 'rgba(255,255,255,0.45)' }}>
                    <Code size={12} />
                    Content (HTML supported) <span className="text-red-400">*</span>
                  </label>
                  <span className="text-xs" style={{ color: 'rgba(255,255,255,0.2)' }}>
                    {form.content.length} chars
                  </span>
                </div>
                <textarea
                  ref={contentRef}
                  rows={18}
                  value={form.content}
                  onChange={(e) => handleChange('content', e.target.value)}
                  placeholder="Write your blog content here... HTML tags are supported for rich formatting."
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none font-mono"
                  style={{
                    background: 'rgba(0,0,0,0.25)',
                    border: '1px solid rgba(255,255,255,0.07)',
                    color: 'rgba(255,255,255,0.85)',
                    lineHeight: '1.7',
                    letterSpacing: '0.01em',
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = 'rgba(99,102,241,0.4)';
                    e.target.style.boxShadow = '0 0 0 3px rgba(99,102,241,0.06)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(255,255,255,0.07)';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </motion.div>

              {/* SEO */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.12 }}
                className="rounded-2xl p-5 border space-y-4"
                style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.07)' }}
              >
                <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                  <Globe size={15} style={{ color: '#818cf8' }} />
                  SEO Settings
                </h3>
                <FormField label="Meta Title">
                  <InputEl
                    type="text"
                    value={form.meta_title}
                    onChange={(e) => handleChange('meta_title', e.target.value)}
                    placeholder="SEO title for search engines..."
                    maxLength={70}
                  />
                  <p className="text-xs mt-1.5" style={{ color: form.meta_title.length > 60 ? '#fbbf24' : 'rgba(255,255,255,0.2)' }}>
                    {form.meta_title.length}/70 — Recommended: ≤60
                  </p>
                </FormField>
                <FormField label="Meta Description">
                  <TextareaEl
                    rows={2}
                    value={form.meta_desc}
                    onChange={(e) => handleChange('meta_desc', e.target.value)}
                    placeholder="SEO description shown in search results..."
                    maxLength={165}
                  />
                  <p className="text-xs mt-1.5" style={{ color: form.meta_desc.length > 155 ? '#fbbf24' : 'rgba(255,255,255,0.2)' }}>
                    {form.meta_desc.length}/165 — Recommended: ≤155
                  </p>
                </FormField>
              </motion.div>
            </div>

            {/* Sidebar Column */}
            <div className="space-y-5">
              {/* Publish Settings */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.07 }}
                className="rounded-2xl p-5 border space-y-4"
                style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.07)' }}
              >
                <h3 className="text-sm font-semibold text-white">Publish Settings</h3>

                <FormField label="Status">
                  <select
                    value={form.status}
                    onChange={(e) => handleChange('status', e.target.value)}
                    className={inputCls}
                    style={{ ...inputStyle, cursor: 'pointer' }}
                    onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
                    onBlur={(e) => Object.assign(e.target.style, inputStyle)}
                  >
                    <option value="draft" style={{ background: '#0d1120' }}>Draft</option>
                    <option value="published" style={{ background: '#0d1120' }}>Published</option>
                    <option value="archived" style={{ background: '#0d1120' }}>Archived</option>
                  </select>
                </FormField>

                <FormField label="Author" icon={User}>
                  <InputEl
                    type="text"
                    value={form.author}
                    onChange={(e) => handleChange('author', e.target.value)}
                    placeholder="Author name..."
                  />
                </FormField>

                <button
                  type="submit"
                  disabled={saving}
                  className="w-full py-3 rounded-xl text-sm font-semibold text-white flex items-center justify-center gap-2 transition-all"
                  style={{
                    background: saving ? 'rgba(99,102,241,0.4)' : 'linear-gradient(135deg, #6366f1, #a855f7)',
                    boxShadow: saving ? 'none' : '0 6px 20px rgba(99,102,241,0.25)',
                    cursor: saving ? 'not-allowed' : 'pointer',
                  }}
                >
                  {saving ? <Loader2 size={15} className="animate-spin" /> : <Save size={15} />}
                  {saving ? 'Saving...' : isEdit ? 'Update Blog' : 'Create Blog'}
                </button>
              </motion.div>

              {/* Category & Tags */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.09 }}
                className="rounded-2xl p-5 border space-y-4"
                style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.07)' }}
              >
                <h3 className="text-sm font-semibold text-white">Categorization</h3>

                <FormField label="Category">
                  <select
                    value={form.category}
                    onChange={(e) => handleChange('category', e.target.value)}
                    className={inputCls}
                    style={{ ...inputStyle, cursor: 'pointer' }}
                    onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
                    onBlur={(e) => Object.assign(e.target.style, inputStyle)}
                  >
                    <option value="" style={{ background: '#0d1120' }}>Select a category</option>
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c} style={{ background: '#0d1120' }}>{c}</option>
                    ))}
                  </select>
                </FormField>

                <FormField label="Tags" icon={Tag}>
                  <InputEl
                    type="text"
                    value={form.tags}
                    onChange={(e) => handleChange('tags', e.target.value)}
                    placeholder="react, nextjs, tailwind..."
                  />
                  <p className="text-xs mt-1.5" style={{ color: 'rgba(255,255,255,0.2)' }}>
                    Separate tags with commas
                  </p>
                  {form.tags && (
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {form.tags.split(',').map((t) => t.trim()).filter(Boolean).map((tag) => (
                        <span key={tag} className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'rgba(99,102,241,0.12)', color: '#818cf8' }}>
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </FormField>
              </motion.div>

              {/* Featured Image */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.11 }}
                className="rounded-2xl p-5 border space-y-4"
                style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.07)' }}
              >
                <h3 className="text-sm font-semibold text-white">Featured Image</h3>
                <FormField label="Image URL">
                  <InputEl
                    type="url"
                    value={form.featured_image}
                    onChange={(e) => handleChange('featured_image', e.target.value)}
                    placeholder="https://example.com/image.jpg"
                  />
                </FormField>
                {form.featured_image && (
                  <img
                    src={form.featured_image}
                    alt="Preview"
                    className="w-full h-32 object-cover rounded-xl"
                    onError={(e) => (e.target.style.display = 'none')}
                  />
                )}
              </motion.div>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
