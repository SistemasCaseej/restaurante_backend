const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin_controller');
const {ensureAdmin } = require('../middlewares/auth');

router.get('/list-all', ensureAdmin, adminController.list_all_users)
router.get('/list-items', ensureAdmin, adminController.list_all_products)
router.post('/add-item', ensureAdmin, adminController.add_item)
router.get('/edit/:id', ensureAdmin, adminController.edit_item)
router.delete('/delete/:id', ensureAdmin, adminController.delete_item )

module.exports = router;
