const router = require('express').Router();
const c = require('../controllers/pricing.controller');
const { verifyToken } = require('../middleware/auth.middleware');
const optionalAuth = (req, res, next) => {
  const h = req.headers.authorization;
  if (h?.startsWith('Bearer ')) {
    try { req.user = require('jsonwebtoken').verify(h.split(' ')[1], process.env.JWT_SECRET); } catch (_) {}
  }
  next();
};
router.get('/', optionalAuth, c.getAll);
router.post('/', verifyToken, c.create);
router.put('/:id', verifyToken, c.update);
router.delete('/:id', verifyToken, c.remove);
module.exports = router;
