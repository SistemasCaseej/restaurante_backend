const express = require('express');
const router = express.Router();
const serverController = require('../controllers/itemcontroller');

router.post('/add-item', serverController.add_Item);
router.get('/listar-item/:item', serverController.find_Item);



module.exports = router;
