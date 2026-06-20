const router = require('express').Router();
const c = require('../controllers/blog.controller');
const { verifyToken } = require('../middleware/auth.middleware');

// Optional auth middleware – passes user if token present, else continues
const optionalAuth = (req, res, next) => {
  const h = req.headers.authorization;
  if (h && h.startsWith('Bearer ')) {
    const jwt = require('jsonwebtoken');
    try { req.user = jwt.verify(h.split(' ')[1], process.env.JWT_SECRET); } catch (_) {}
  }
  next();
};

router.get('/', optionalAuth, c.getAll);
router.get('/:slug', c.getOne);
router.post('/', verifyToken, c.create);
router.put('/:id', verifyToken, c.update);
router.delete('/:id', verifyToken, c.remove);

module.exports = router;
