const Team = require('../models/Team.model');

exports.getAll = async (req, res) => {
  try {
    const filter = req.user ? {} : { isActive: true };
    const members = await Team.find(filter).sort({ sortOrder: 1 });
    res.json({ success: true, team: members });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};
exports.create = async (req, res) => {
  try {
    const member = await Team.create(req.body);
    res.status(201).json({ success: true, member });
  } catch (err) { res.status(400).json({ success: false, message: err.message }); }
};
exports.update = async (req, res) => {
  try {
    const member = await Team.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, member });
  } catch (err) { res.status(400).json({ success: false, message: err.message }); }
};
exports.remove = async (req, res) => {
  try {
    await Team.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Deleted' });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};
