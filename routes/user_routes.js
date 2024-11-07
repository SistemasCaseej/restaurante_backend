const express = require('express');
const router = express.Router();
const serverController = require('../controllers/servercontroller');

router.get('/', serverController.getServerMessage);
router.post('/add-user', serverController.add_user);
router.get('/lister-user/:nome', serverController.find_user);

module.exports = router;
