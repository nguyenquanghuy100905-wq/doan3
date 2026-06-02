const ThongKe = require('../models/thongke')

exports.ThongKeProductByType = async (req, res) => {
    try {
        const data = await ThongKe.ThongKeProductByType();
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}
exports.ThongKeDonHangTheoThang = async (req, res) => {
    try {
        const data = await ThongKe.ThongKeDonHangTheoThang();
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}
exports.ThongKeSanPhamBanChay = async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 10;
        const data = await ThongKe.ThongKeSanPhamBanChay(limit);
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}
