const express = require('express');
const router = express.Router();
const unauth_user_controller = require('../controllers/unauth_user_controller');

router.post('/add-user', unauth_user_controller.add_user);
router.post('/log', unauth_user_controller.login_user);
router.get('/list-itens', unauth_user_controller.list_itens);

module.exports = router;
