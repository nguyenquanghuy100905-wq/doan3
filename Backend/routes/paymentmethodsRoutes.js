var express = require('express');
var router = express.Router();
const paymentmethods = require('../controllers/ctrlPaymentmethods');
router.get('/getAllPaymentmethods', paymentmethods.getAllPaymentmethods);
router.get('/getPaymentmethodsById', paymentmethods.getPaymentmethodsById);
router.post('/createPaymentmethods', paymentmethods.createPaymentmethods);
router.put('/updatePaymentmethods', paymentmethods.updatePaymentmethods);
router.delete('/deletePaymentmethods', paymentmethods.deletePaymentmethods);
module.exports = router;
