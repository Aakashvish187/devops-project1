const Contact = require('../models/Contact.model');
const nodemailer = require('nodemailer');

const sendNotification = async (data) => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) return;
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
    });
    await transporter.sendMail({
      from: `"LACSO HUB" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: `🔥 New Lead: ${data.name} — ${data.serviceInterest || 'General Inquiry'}`,
      html: `
        <h2>New Contact Submission</h2>
        <p><b>Name:</b> ${data.name}</p>
        <p><b>Email:</b> ${data.email}</p>
        <p><b>Phone:</b> ${data.phone || 'N/A'}</p>
        <p><b>Company:</b> ${data.company || 'N/A'}</p>
        <p><b>Service:</b> ${data.serviceInterest || 'N/A'}</p>
        <p><b>Budget:</b> ${data.budget || 'N/A'}</p>
        <p><b>Message:</b> ${data.message}</p>
      `,
    });
  } catch (e) { console.error('Email error:', e.message); }
};

// POST /api/contact
exports.submit = async (req, res) => {
  try {
    const { name, email, phone, company, serviceInterest, budget, message } = req.body;
    if (!name || !email || !message)
      return res.status(400).json({ success: false, message: 'Name, email, and message are required' });

    const contact = await Contact.create({
      name, email, phone, company, serviceInterest, budget, message,
      ipAddress: req.ip,
    });
    await sendNotification(contact);
    res.status(201).json({ success: true, message: 'Message sent successfully! We will get back to you shortly.' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET /api/contact [Admin]
exports.getAll = async (req, res) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const filter = status ? { status } : {};
    const total = await Contact.countDocuments(filter);
    const contacts = await Contact.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));
    res.json({ success: true, contacts, total });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

// PUT /api/contact/:id [Admin]
exports.updateStatus = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    res.json({ success: true, contact });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

// DELETE /api/contact/:id [Admin]
exports.remove = async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Deleted' });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};
