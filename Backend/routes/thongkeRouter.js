var express = require('express');
var router = express.Router();
const thongke = require('../controllers/ctrlThongKe');

router.get('/ThongKeProductByType', thongke.ThongKeProductByType);
router.get('/ThongKeDonHangTheoThang', thongke.ThongKeDonHangTheoThang);
module.exports = router;