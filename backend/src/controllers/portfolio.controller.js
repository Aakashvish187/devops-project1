const Portfolio = require('../models/Portfolio.model');

exports.getAll = async (req, res) => {
  try {
    const filter = req.user ? {} : { isActive: true, status: 'active' };
    const { category } = req.query;
    if (category) filter.category = category;
    const items = await Portfolio.find(filter).sort({ sortOrder: 1, createdAt: -1 });
    res.json({ success: true, portfolio: items });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

exports.getOne = async (req, res) => {
  try {
    const item = await Portfolio.findOne({ slug: req.params.slug });
    if (!item) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, portfolio: item });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

exports.create = async (req, res) => {
  try {
    const item = await Portfolio.create(req.body);
    res.status(201).json({ success: true, portfolio: item });
  } catch (err) { res.status(400).json({ success: false, message: err.message }); }
};

exports.update = async (req, res) => {
  try {
    const item = await Portfolio.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!item) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, portfolio: item });
  } catch (err) { res.status(400).json({ success: false, message: err.message }); }
};

exports.remove = async (req, res) => {
  try {
    await Portfolio.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Deleted' });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};
