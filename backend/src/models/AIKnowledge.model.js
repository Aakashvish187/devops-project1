const mongoose = require('mongoose');

const AIKnowledgeSchema = new mongoose.Schema({
  keywords: [String],
  content: { type: String, required: true },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
}, { timestamps: true });

AIKnowledgeSchema.index({ keywords: 'text', content: 'text' });

module.exports = mongoose.model('AIKnowledge', AIKnowledgeSchema);
