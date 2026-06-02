var express = require('express');
var router = express.Router();
const types = require('../controllers/ctrlTypes');
router.get('/getAllTypes', types.getAllTypes);
router.get('/getTypesById', types.getTypesById);
router.post('/createTypes', types.createTypes);
router.put('/updateTypes', types.updateTypes);
router.delete('/deleteTypes', types.deleteTypes);
module.exports = router;
