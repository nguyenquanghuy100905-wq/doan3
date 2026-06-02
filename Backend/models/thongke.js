const db = require('../config/db');

class ThongKe{
    static async ThongKeProductByType(){
        const [data] = await db.query('call ThongKeProductByType()');
        return data[0];
    }
    static async ThongKeDonHangTheoThang(){
        const [data] = await db.query('call ThongKeDonHangTheoThang()');
        return data[0];
    }
    static async ThongKeSanPhamBanChay(limit = 10){
        const [data] = await db.query('call ThongKeSanPhamBanChay(?)', [limit]);
        return data[0];
    }
}

module.exports = ThongKe;
