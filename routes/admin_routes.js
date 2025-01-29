const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin_controller');
const {ensureAdmin } = require('../middlewares/auth');

router.get('/list-all', ensureAdmin, adminController.list_all_users)
router.post('/add-item', ensureAdmin, adminController.add_item)
router.post('/add-tag', ensureAdmin, adminController.add_tag)
router.post('/add-avaliacao', ensureAdmin, adminController.add_avaliacao);

module.exports = router;
