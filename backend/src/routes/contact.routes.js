const router = require('express').Router();
const rateLimit = require('express-rate-limit');
const c = require('../controllers/contact.controller');
const { verifyToken } = require('../middleware/auth.middleware');

const limiter = rateLimit({ windowMs: 60 * 60 * 1000, max: 5, message: { success: false, message: 'Too many submissions, try again later.' } });

router.post('/', limiter, c.submit);
router.get('/', verifyToken, c.getAll);
router.put('/:id', verifyToken, c.updateStatus);
router.delete('/:id', verifyToken, c.remove);
module.exports = router;
