const bcrypt = require('bcrypt');
const mysql = require('mysql2/promise');
require('dotenv').config();

async function createAdmin() {
    try {
        // Kết nối database
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        });

        console.log('Đã kết nối MySQL');

        // Thông tin admin mới
        const username = 'admin';
        const password = 'admin123';
        const hashedPassword = await bcrypt.hash(password, 10);

        // Tạo admin
        const [result] = await connection.execute(
            `INSERT INTO users (username, password, name, birthday, sex, address, email, phone, role_user, ban) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                username,
                hashedPassword,
                'Administrator',
                '1990-01-01',
                'Nam',
                'Hà Nội',
                'admin@jeepbicycle.com',
                '0123456789',
                2, // role_user = 2 (admin)
                0  // ban = 0 (không bị khóa)
            ]
        );

        console.log('\n✅ Tạo tài khoản admin thành công!');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('Username: admin');
        console.log('Password: admin123');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

        await connection.end();
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            console.log('\n⚠️  Username "admin" đã tồn tại!');
            console.log('Hãy thử reset password hoặc dùng username khác.\n');
        } else {
            console.error('Lỗi:', error.message);
        }
    }
}

createAdmin();
