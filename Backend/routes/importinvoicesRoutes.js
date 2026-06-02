var express = require('express');
var router = express.Router();
const importinvoices = require('../controllers/ctrlImportinvoices');
router.get('/getAllImportinvoices', importinvoices.getAllImportinvoices);
router.get('/getImportinvoicesById', importinvoices.getImportinvoicesById);
router.post('/createImportinvoices', importinvoices.createImportinvoices);
router.put('/updateImportinvoices', importinvoices.updateImportinvoices);
router.delete('/deleteImportinvoices', importinvoices.deleteImportinvoices);
module.exports = router;
