var express = require('express');
var router = express.Router();
const detailnews = require('../controllers/ctrlDetailnews');
router.get('/getAllDetailnews', detailnews.getAllDetailnews);
router.get('/getDetailnewsById', detailnews.getDetailnewsById);
router.post('/createDetailnews', detailnews.createDetailnews);
router.put('/updateDetailnews', detailnews.updateDetailnews);
router.delete('/deleteDetailnews', detailnews.deleteDetailnews);
module.exports = router;
