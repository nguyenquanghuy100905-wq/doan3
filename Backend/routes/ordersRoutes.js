var express = require('express');
var router = express.Router();
const orders = require('../controllers/ctrlOrders');
router.get('/getAllOrders', orders.getAllOrders);
router.get('/getOrdersById', orders.getOrdersById);
router.get('/getOrdersByIdUser', orders.getOrdersByIdUser);
router.post('/createOrders', orders.createOrders);
router.put('/updateOrders', orders.updateOrders);
router.delete('/deleteOrders', orders.deleteOrders);
router.post('/sendOrder', orders.sendOrder)
module.exports = router;
