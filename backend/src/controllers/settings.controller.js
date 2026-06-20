const SiteSetting = require('../models/SiteSetting.model');

// GET /api/settings
exports.getAll = async (req, res) => {
  try {
    const settings = await SiteSetting.find();
    const map = {};
    settings.forEach(s => { map[s.key] = s.value; });
    res.json({ success: true, settings: map });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

// PUT /api/settings [Admin]
exports.updateMany = async (req, res) => {
  try {
    const updates = req.body; // { key: value, ... }
    const ops = Object.entries(updates).map(([key, value]) => ({
      updateOne: {
        filter: { key },
        update: { $set: { key, value } },
        upsert: true,
      },
    }));
    await SiteSetting.bulkWrite(ops);
    res.json({ success: true, message: 'Settings updated' });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};
