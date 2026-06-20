const AIKnowledge = require('../models/AIKnowledge.model');
const Service = require('../models/Service.model');
const Team = require('../models/Team.model');
const PricingPlan = require('../models/PricingPlan.model');
const Portfolio = require('../models/Portfolio.model');
const Contact = require('../models/Contact.model');
const { OpenAI } = require('openai');

const SITE_URL = process.env.FRONTEND_URL || 'https://lacsohub.in';

const buildBusinessContext = async () => {
  try {
    const services = await Service.find({ isActive: true });
    const team = await Team.find({ isActive: true }).sort('sortOrder');
    const plans = await PricingPlan.find({ isActive: true });
    
    let context = `You are LACSO AI, the official intelligent digital assistant for LACSO HUB (a premier AI-focused digital engineering agency founded by Aakash Vishwakarma and Co-Founder Vidhan Rajvi).
Your goal is to assist visitors, explain services, give pricing, and capture leads.\n\n`;

    context += `[SERVICES]\n`;
    services.forEach(s => {
      context += `- ${s.title}: ${s.shortDesc}. Starting at ₹${s.priceFrom || 0}.\n`;
    });

    context += `\n[TEAM]\n`;
    team.forEach(t => {
      context += `- ${t.name} (${t.title}): ${t.bio}\n`;
    });

    context += `\n[PRICING PLANS]\n`;
    plans.forEach(p => {
      context += `- ${p.title} (${p.price}): ${p.description}\n`;
    });

    context += `\n[INSTRUCTIONS]
1. Be concise, professional, and friendly.
2. If a user asks for a price, quote, or consultation, politely provide the requested info, then ask: "To get a custom quote or connect with our team, please reply with your email address or phone number!"
3. Do NOT invent prices or services that aren't listed above.
4. Format your responses using markdown.`;

    return context;
  } catch (err) {
    console.error('Error building context', err);
    return 'You are LACSO AI, the digital assistant for LACSO HUB.';
  }
};

const extractLeadInfo = (msg) => {
  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
  const phoneRegex = /(\+91[\-\s]?)?[0-9]{10}/;
  
  const emailMatch = msg.match(emailRegex);
  const phoneMatch = msg.match(phoneRegex);
  
  return {
    email: emailMatch ? emailMatch[0] : null,
    phone: phoneMatch ? phoneMatch[0] : null
  };
};

// Phase 1: Local Fallback Algorithm
const fallbackChat = async (msg, contextStr) => {
  const m = msg.toLowerCase();
  let reply = '';

  if (/price|pricing|cost|charge|fees|how much|quote/.test(m)) {
    reply = `Our web development and AI services generally start from ₹6,999, but we offer custom packages tailored to your needs. \n\nTo get a precise quote, **could you please reply with your email address or phone number?** Our team will reach out immediately!`;
  } else if (/service|what do you|offer|build|make/.test(m)) {
    reply = `We specialize in AI Website Development, AI Automation, SEO & Growth, Branding, and Cloud Architecture. \n\nAre you looking to start a specific project?`;
  } else if (/team|founder|aakash|vidhan/.test(m)) {
    reply = `LACSO HUB was founded by **Aakash Vishwakarma** (Founder & AI Digital Architect). Our Cloud Architect & Co-Founder is **Vidhan Rajvi**. We are a team of dedicated digital engineers.`;
  } else if (/contact|whatsapp|reach|call|email/.test(m)) {
    reply = `You can reach us at [lacsohub@gmail.com](mailto:lacsohub@gmail.com) or chat on [WhatsApp](https://wa.me/918866371807).`;
  } else if (/hi|hello|hey|greet/.test(m)) {
    reply = `Hello! I'm the LACSO HUB AI Assistant. How can I help you today? 👋`;
  } else {
    reply = `I'm the automated LACSO HUB assistant. For detailed queries, [chat with our team on WhatsApp](https://wa.me/918866371807) or leave your email/phone number here!`;
  }
  
  return reply;
};

// POST /api/ai/chat
exports.chat = async (req, res) => {
  try {
    const { message } = req.body;
    if (!message || message.trim().length === 0)
      return res.status(400).json({ success: false, message: 'Message is required' });
    if (message.length > 500)
      return res.status(400).json({ success: false, message: 'Message too long' });

    // 1. Lead Capture Check
    const leadInfo = extractLeadInfo(message);
    let leadCaptured = false;
    if (leadInfo.email || leadInfo.phone) {
      await Contact.create({
        name: 'Chatbot Lead',
        email: leadInfo.email || 'no-email@chat.com',
        phone: leadInfo.phone || '',
        message: `Captured via Chatbot. User's exact message: "${message}"`,
        status: 'new',
        ipAddress: req.ip || ''
      });
      leadCaptured = true;
    }

    // If lead was just captured, respond immediately
    if (leadCaptured) {
      return res.json({ 
        success: true, 
        reply: "Thanks! I've saved your contact info. Our team will reach out to you shortly. Is there anything else I can help with?" 
      });
    }

    const contextStr = await buildBusinessContext();
    let reply = '';

    // Phase 2: Try OpenAI
    if (process.env.OPENAI_API_KEY) {
      try {
        const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
        const completion = await openai.chat.completions.create({
          model: "gpt-4o-mini",
          messages: [
            { role: "system", content: contextStr },
            { role: "user", content: message }
          ],
          max_tokens: 150,
          temperature: 0.7,
        });
        reply = completion.choices[0].message.content;
      } catch (aiErr) {
        console.error('OpenAI Error:', aiErr.message);
        // Fallback gracefully
        reply = await fallbackChat(message, contextStr);
      }
    } else {
      // Phase 1: Local Fallback
      reply = await fallbackChat(message, contextStr);
    }

    res.json({ success: true, reply });
  } catch (err) {
    console.error('Chat Error:', err);
    // Ultimate Failsafe
    res.json({ 
      success: true, 
      reply: `I'm having a little trouble connecting to my brain right now, but you can always reach us directly on [WhatsApp](https://wa.me/918866371807)!` 
    });
  }
};

exports.getKB = async (req, res) => {
  try {
    const entries = await AIKnowledge.find().sort({ createdAt: -1 });
    res.json({ success: true, entries });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

exports.createKB = async (req, res) => {
  try {
    const entry = await AIKnowledge.create(req.body);
    res.status(201).json({ success: true, entry });
  } catch (err) { res.status(400).json({ success: false, message: err.message }); }
};

exports.updateKB = async (req, res) => {
  try {
    const entry = await AIKnowledge.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, entry });
  } catch (err) { res.status(400).json({ success: false, message: err.message }); }
};

exports.deleteKB = async (req, res) => {
  try {
    await AIKnowledge.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Deleted' });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};
