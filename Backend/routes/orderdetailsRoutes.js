var express = require('express');
var router = express.Router();
const orderdetails = require('../controllers/ctrlOrderdetails');
router.get('/getAllOrderdetails', orderdetails.getAllOrderdetails);
router.get('/getOrderdetailsById', orderdetails.getOrderdetailsById);
router.post('/createOrderdetails', orderdetails.createOrderdetails);
router.put('/updateOrderdetails', orderdetails.updateOrderdetails);
router.delete('/deleteOrderdetails', orderdetails.deleteOrderdetails);
module.exports = router;
