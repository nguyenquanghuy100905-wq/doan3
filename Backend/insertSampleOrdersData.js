const mysql = require('mysql2/promise');
require('dotenv').config();
const fs = require('fs');
const path = require('path');

async function insertSampleOrders() {
    let connection;
    try {
        // Tạo kết nối
        connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            multipleStatements: true
        });

        console.log('Kết nối database thành công!');

        // Đọc file SQL
        const sqlFile = path.join(__dirname, 'insertSampleOrders.sql');
        const sql = fs.readFileSync(sqlFile, 'utf8');

        // Thực thi SQL
        await connection.query(sql);
        
        console.log('✅ Đã insert thành công dữ liệu đơn hàng mẫu cho 12 tháng!');
        console.log('📊 Bạn có thể xem thống kê trên dashboard ngay bây giờ.');

    } catch (error) {
        console.error('❌ Lỗi:', error.message);
    } finally {
        if (connection) {
            await connection.end();
            console.log('Đã đóng kết nối database.');
        }
    }
}

insertSampleOrders();
