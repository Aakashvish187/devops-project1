const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true, index: true },
  excerpt: String,
  content: String,
  coverImage: String,
  author: { type: String, default: 'Aakash Vishwakarma' },
  category: String,
  tags: [String],
  views: { type: Number, default: 0 },
  isPublished: { type: Boolean, default: false },
  status: { type: String, enum: ['draft', 'published'], default: 'draft' },
  metaTitle: String,
  metaDesc: String,
  metaKeywords: String,
  ogImage: String,
  faqs: [{ question: String, answer: String }],
  publishedAt: { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model('Blog', BlogSchema);
