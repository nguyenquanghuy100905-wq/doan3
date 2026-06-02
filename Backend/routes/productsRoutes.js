var express = require('express');
var router = express.Router();
const uploads = require('../middleware/uploads');
const products = require('../controllers/ctrlProducts');
router.get('/getAllProducts', products.getAllProducts);
router.get('/getProductsById', products.getProductsById);
router.get('/getProductsById', products.getProductsById);
router.get('/getProductByNameAndColor', products.getProductByNameAndColor);
router.post('/createProducts', uploads.array("files",10), products.createProducts);
router.put('/updateProducts', uploads.array("files",10), products.updateProducts);
router.delete('/deleteProducts', products.deleteProducts);
router.get('/locsanphammoinhat', products.locsanphammoinhat);
router.get('/locsanphamtheogiatuthapdencao', products.locsanphamtheogiatuthapdencao);
router.get('/locsanphamtheogiatucaodenthap', products.locsanphamtheogiatucaodenthap);
router.get('/locsanphamdanhgiacao', products.locsanphamdanhgiacao);
router.get('/getProductsIdCategory', products.getProductsByIdCategory);

module.exports = router;
