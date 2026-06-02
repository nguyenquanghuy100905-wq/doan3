var express = require('express');
var router = express.Router();
const cart = require('../controllers/ctrlCart');
router.get('/getAllCart', cart.getAllCart);
router.post('/createCart', cart.createCart);
router.put('/updateCart', cart.updateCart);
router.delete('/deleteCart', cart.deleteCart);
module.exports = router;
