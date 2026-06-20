const router = require('express').Router();
const rateLimit = require('express-rate-limit');
const c = require('../controllers/ai.controller');
const { verifyToken } = require('../middleware/auth.middleware');

const chatLimiter = rateLimit({ windowMs: 60 * 60 * 1000, max: 60, message: { success: false, message: 'Too many messages. Try again in an hour.' } });

router.post('/chat', chatLimiter, c.chat);
router.get('/kb', verifyToken, c.getKB);
router.post('/kb', verifyToken, c.createKB);
router.put('/kb/:id', verifyToken, c.updateKB);
router.delete('/kb/:id', verifyToken, c.deleteKB);
module.exports = router;
