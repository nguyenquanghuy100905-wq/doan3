const bcrypt = require('bcrypt');
const mysql = require('mysql2/promise');
require('dotenv').config();

async function createUser() {
    try {
        // Kết nối database
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        });

        console.log('Đã kết nối MySQL');

        // Thông tin user mới
        const username = 'user01';
        const password = 'user123';
        const hashedPassword = await bcrypt.hash(password, 10);

        // Tạo user
        const [result] = await connection.execute(
            `INSERT INTO users (username, password, name, birthday, sex, address, email, phone, role_user, ban) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                username,
                hashedPassword,
                'Nguyễn Văn A',
                '2000-05-15',
                'Nam',
                'Hà Nội',
                'user01@gmail.com',
                '0987654321',
                1, // role_user = 1 (user thường)
                0  // ban = 0 (không bị khóa)
            ]
        );

        console.log('\n✅ Tạo tài khoản user thành công!');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('Username: user01');
        console.log('Password: user123');
        console.log('Role: User (role_user = 1)');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

        await connection.end();
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            console.log('\n⚠️  Username "user01" đã tồn tại!');
            console.log('Hãy thử username khác hoặc đăng nhập với tài khoản này.\n');
        } else {
            console.error('Lỗi:', error.message);
        }
    }
}

createUser();
