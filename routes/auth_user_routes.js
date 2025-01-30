const express = require('express');
const router = express.Router();
const userController = require('../controllers/auth_user_controller');
const { ensureAuthenticated} = require('../middlewares/auth');

router.get('/list-user', ensureAuthenticated, userController.list_user);
router.post('/add-avaliacao', ensureAuthenticated, adminController.add_avaliacao);

module.exports = router;
