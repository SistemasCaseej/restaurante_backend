const express = require('express');
const router = express.Router();
const userController = require('../controllers/user_controller');
const { ensureAuthenticated, ensureAdmin } = require('../middlewares/auth');

router.post('/add-user', userController.add_user);
router.post('/log', userController.login_user);
router.get('/list-user', ensureAuthenticated, userController.list_user);
router.get('/list-all', ensureAdmin, userController.list_all_users)

module.exports = router;
