const mongoose = require('mongoose');

const TeamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  title: String,
  role: { type: String, enum: ['founder', 'co-founder', 'team'], default: 'team' },
  bio: String,
  education: String,
  focus: String,
  linkedin: String,
  image: String,
  sortOrder: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
}, { timestamps: true });

module.exports = mongoose.model('Team', TeamSchema);
