const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  shortDesc: String,
  fullDesc: String,
  icon: String,
  coverImage: String,
  features: [String],
  priceFrom: Number,
  sortOrder: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
  metaTitle: String,
  metaDesc: String,
  metaKeywords: String,
  ogImage: String,
  faqs: [{ question: String, answer: String }],
}, { timestamps: true });

module.exports = mongoose.model('Service', ServiceSchema);
