const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const errorHandler = require('./middleware/error.middleware');

const app = express();

// ── Security
app.use(helmet({ crossOriginResourcePolicy: false }));
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}));

// ── Parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ── Logging
if (process.env.NODE_ENV !== 'test') app.use(morgan('dev'));

// ── Health check
app.get('/api/health', (req, res) => res.json({ success: true, message: 'LACSO HUB API Running 🚀' }));

// ── Routes
app.use('/api/auth',         require('./routes/auth.routes'));
app.use('/api/blogs',        require('./routes/blog.routes'));
app.use('/api/services',     require('./routes/service.routes'));
app.use('/api/portfolio',    require('./routes/portfolio.routes'));
app.use('/api/testimonials', require('./routes/testimonial.routes'));
app.use('/api/team',         require('./routes/team.routes'));
app.use('/api/pricing',      require('./routes/pricing.routes'));
app.use('/api/contact',      require('./routes/contact.routes'));
app.use('/api/ai',           require('./routes/ai.routes'));
app.use('/api/settings',     require('./routes/settings.routes'));

// ── 404
app.use((req, res) => res.status(404).json({ success: false, message: 'Route not found' }));

// ── Global error handler
app.use(errorHandler);

module.exports = app;
