const express = require('express');
const router = express.Router();
const serverController = require('../controllers/servercontroller');

router.get('/', serverController.getServerMessage);

module.exports = router;
