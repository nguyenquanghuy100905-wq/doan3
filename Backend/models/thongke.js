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
}

module.exports = ThongKe;
