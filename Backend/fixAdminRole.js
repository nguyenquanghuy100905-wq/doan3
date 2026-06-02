const mysql = require('mysql2/promise');
require('dotenv').config();

async function fixAdminRole() {
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        });

        console.log('Đã kết nối MySQL');

        // Sửa role của tài khoản admin
        const [result] = await connection.execute(
            `UPDATE users SET role_user = 2 WHERE username = 'admin'`
        );

        if (result.affectedRows > 0) {
            console.log('\n✅ Đã sửa role của tài khoản admin thành công!');
            console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
            console.log('Username: admin');
            console.log('Password: admin123');
            console.log('Role: Admin (role_user = 2)');
            console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
        } else {
            console.log('\n⚠️  Không tìm thấy tài khoản admin!');
            console.log('Hãy chạy: node createAdmin.js để tạo tài khoản mới.\n');
        }

        await connection.end();
    } catch (error) {
        console.error('Lỗi:', error.message);
    }
}

fixAdminRole();
