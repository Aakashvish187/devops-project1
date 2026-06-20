const mongoose = require('mongoose');

const PortfolioSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  clientName: String,
  industry: String,
  serviceType: String,
  category: String,
  challenge: String,
  solution: String,
  results: [String],
  beforeMetric: String,
  afterMetric: String,
  coverImage: String,
  gallery: [String],
  link: String,
  isFeatured: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  sortOrder: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Portfolio', PortfolioSchema);
