const mysql = require('mysql2/promise');
require('dotenv').config();

async function createThongKeProcedures() {
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        });

        console.log('✅ Đã kết nối MySQL\n');
        console.log('🔄 Đang tạo stored procedures cho thống kê...\n');

        const procedures = {
            'ThongKeProductByType': `
                CREATE PROCEDURE ThongKeProductByType()
                BEGIN
                    SELECT 
                        t.name AS type_name,
                        COUNT(p.id) AS quantity_product
                    FROM types t
                    LEFT JOIN products p ON t.id = p.type_id
                    GROUP BY t.id, t.name
                    ORDER BY quantity_product DESC;
                END
            `,
            'ThongKeDonHangTheoThang': `
                CREATE PROCEDURE ThongKeDonHangTheoThang()
                BEGIN
                    SELECT 
                        MONTH(created_at) AS month,
                        YEAR(created_at) AS year,
                        COUNT(*) AS total_orders,
                        SUM(total) AS total_revenue
                    FROM orders
                    WHERE YEAR(created_at) = YEAR(CURDATE())
                    GROUP BY YEAR(created_at), MONTH(created_at)
                    ORDER BY YEAR(created_at), MONTH(created_at);
                END
            `,
            'ThongKeSanPhamBanChay': `
                CREATE PROCEDURE ThongKeSanPhamBanChay(IN limitCount INT)
                BEGIN
                    SELECT 
                        p.id,
                        p.name AS product_name,
                        (SELECT img.image_path FROM imageproducts img WHERE img.product_id = p.id LIMIT 1) AS product_image,
                        p.newprice AS price,
                        COALESCE(SUM(od.quantity), 0) AS total_sold,
                        COALESCE(SUM(od.subtotal), 0) AS total_revenue
                    FROM products p
                    LEFT JOIN orderdetails od ON p.id = od.product_id
                    GROUP BY p.id, p.name, p.newprice
                    ORDER BY total_sold DESC
                    LIMIT limitCount;
                END
            `
        };

        let count = 0;
        for (const [name, sql] of Object.entries(procedures)) {
            try {
                await connection.query(`DROP PROCEDURE IF EXISTS ${name}`);
                await connection.query(sql);
                console.log(`✅ ${name}`);
                count++;
            } catch (error) {
                console.log(`❌ ${name}: ${error.message}`);
            }
        }

        console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
        console.log(`✅ Đã tạo ${count}/${Object.keys(procedures).length} procedures`);
        console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`);

        await connection.end();

        console.log('👉 Procedures đã được tạo! Reload lại trang web!\n');

    } catch (error) {
        console.error('❌ Lỗi:', error.message);
    }
}

createThongKeProcedures();
