const mysql = require('mysql2/promise');
require('dotenv').config();

async function checkData() {
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        });

        console.log('✅ Đã kết nối MySQL\n');

        // Kiểm tra số lượng products
        const [products] = await connection.execute('SELECT COUNT(*) as total FROM products');
        console.log(`📦 Tổng số sản phẩm: ${products[0].total}`);

        // Kiểm tra stored procedure
        const [procedures] = await connection.execute(
            "SHOW PROCEDURE STATUS WHERE Db = 'Jeepbicycle' AND Name = 'getAllProducts'"
        );
        
        if (procedures.length > 0) {
            console.log('✅ Stored procedure getAllProducts tồn tại');
            
            // Thử gọi stored procedure
            try {
                const [result] = await connection.query('CALL getAllProducts()');
                console.log(`✅ Stored procedure hoạt động, trả về ${result[0].length} sản phẩm\n`);
            } catch (err) {
                console.log('❌ Lỗi khi gọi stored procedure:', err.message, '\n');
            }
        } else {
            console.log('❌ Stored procedure getAllProducts KHÔNG tồn tại\n');
            console.log('👉 Cần import file SQL để tạo stored procedures');
        }

        // Kiểm tra images
        const [images] = await connection.execute('SELECT COUNT(*) as total FROM imageproducts');
        console.log(`🖼️  Tổng số ảnh sản phẩm: ${images[0].total}`);

        await connection.end();
    } catch (error) {
        console.error('❌ Lỗi:', error.message);
    }
}

checkData();
