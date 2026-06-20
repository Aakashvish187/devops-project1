const router = require('express').Router();
const c = require('../controllers/settings.controller');
const { verifyToken } = require('../middleware/auth.middleware');
router.get('/', c.getAll);
router.put('/', verifyToken, c.updateMany);
module.exports = router;
