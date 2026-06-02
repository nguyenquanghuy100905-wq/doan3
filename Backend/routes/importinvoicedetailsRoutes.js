var express = require('express');
var router = express.Router();
const importinvoicedetails = require('../controllers/ctrlImportinvoicedetails');
router.get('/getAllImportinvoicedetails', importinvoicedetails.getAllImportinvoicedetails);
router.get('/getImportinvoicedetailsById', importinvoicedetails.getImportinvoicedetailsById);
router.post('/createImportinvoicedetails', importinvoicedetails.createImportinvoicedetails);
router.put('/updateImportinvoicedetails', importinvoicedetails.updateImportinvoicedetails);
router.delete('/deleteImportinvoicedetails', importinvoicedetails.deleteImportinvoicedetails);
module.exports = router;
