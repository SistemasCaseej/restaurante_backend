const express = require('express');
const router = express.Router();
const userController = require('../controllers/auth_user_controller');
const { ensureAuthenticated} = require('../middlewares/auth');

router.get('/list-user', ensureAuthenticated, userController.list_user);

module.exports = router;
