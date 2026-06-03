const mysql = require('mysql2/promise');
require('dotenv').config();

async function updateUserIdOrders() {
    let connection;
    try {
        connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        });

        console.log('Kết nối database thành công!');

        // Cập nhật user_id từ 1 sang 2 cho đơn hàng năm 2026
        const [result] = await connection.query(
            'UPDATE orders SET user_id = 2 WHERE user_id = 1 AND created_at >= "2026-01-01"'
        );
        
        console.log(`✅ Đã cập nhật ${result.affectedRows} đơn hàng sang user_id = 2 (user01)`);

    } catch (error) {
        console.error('❌ Lỗi:', error.message);
    } finally {
        if (connection) {
            await connection.end();
            console.log('Đã đóng kết nối database.');
        }
    }
}

updateUserIdOrders();
