var express = require('express');
var router = express.Router();
const orderinvoicedetails = require('../controllers/ctrlOrderinvoicedetails');
router.get('/getAllOrderinvoicedetails', orderinvoicedetails.getAllOrderinvoicedetails);
router.get('/getOrderinvoicedetailsById', orderinvoicedetails.getOrderinvoicedetailsById);
router.post('/createOrderinvoicedetails', orderinvoicedetails.createOrderinvoicedetails);
router.put('/updateOrderinvoicedetails', orderinvoicedetails.updateOrderinvoicedetails);
router.delete('/deleteOrderinvoicedetails', orderinvoicedetails.deleteOrderinvoicedetails);
module.exports = router;
