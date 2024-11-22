const express = require('express');
const router = express.Router();
const serverController = require('../controllers/user_controller');
const { ensureAuthenticated, ensureAdmin } = require('../middlewares/auth');

router.post('/add-user', serverController.add_user);
router.post('/log', serverController.login_user);
router.get('/list-user', ensureAuthenticated, serverController.list_user);


module.exports = router;
