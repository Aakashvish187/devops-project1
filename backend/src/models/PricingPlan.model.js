const mongoose = require('mongoose');

const PricingPlanSchema = new mongoose.Schema({
  planKey: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  subtitle: String,
  price: String,
  priceNote: String,
  description: String,
  features: [{ text: String, included: Boolean }],
  ctaText: String,
  ctaUrl: String,
  badge: String,
  isHighlight: { type: Boolean, default: false },
  sortOrder: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('PricingPlan', PricingPlanSchema);
