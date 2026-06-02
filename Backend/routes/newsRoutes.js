var express = require('express');
var router = express.Router();
const news = require('../controllers/ctrlNews');
router.get('/getAllNews', news.getAllNews);
router.get('/getNewsById', news.getNewsById);
router.post('/createNews', news.createNews);
router.put('/updateNews', news.updateNews);
router.delete('/deleteNews', news.deleteNews);
module.exports = router;
