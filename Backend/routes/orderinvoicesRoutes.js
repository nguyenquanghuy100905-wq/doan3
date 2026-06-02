var express = require('express');
var router = express.Router();
const orderinvoices = require('../controllers/ctrlOrderinvoices');
router.get('/getAllOrderinvoices', orderinvoices.getAllOrderinvoices);
router.get('/getOrderinvoicesById', orderinvoices.getOrderinvoicesById);
router.post('/createOrderinvoices', orderinvoices.createOrderinvoices);
router.put('/updateOrderinvoices', orderinvoices.updateOrderinvoices);
router.delete('/deleteOrderinvoices', orderinvoices.deleteOrderinvoices);
module.exports = router;
