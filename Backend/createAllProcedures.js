const mysql = require('mysql2/promise');
require('dotenv').config();

async function createAllProcedures() {
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        });

        console.log('✅ Đã kết nối MySQL\n');
        console.log('🔄 Đang tạo TẤT CẢ stored procedures...\n');

        const procedures = {
            'getAllFeedbacks': `
                CREATE PROCEDURE getAllFeedbacks()
                BEGIN
                    SELECT fb.*, 
                        u.name AS user_name,
                        u.image AS user_image,
                        p.name AS product_name
                    FROM feedbacks fb
                    LEFT JOIN users u ON fb.user_id = u.id
                    LEFT JOIN products p ON fb.product_id = p.id
                    ORDER BY fb.created_at DESC;
                END
            `,
            'getFeedbacksById': `
                CREATE PROCEDURE getFeedbacksById(IN feedbackId INT)
                BEGIN
                    SELECT fb.*, 
                        u.name AS user_name,
                        u.image AS user_image,
                        p.name AS product_name
                    FROM feedbacks fb
                    LEFT JOIN users u ON fb.user_id = u.id
                    LEFT JOIN products p ON fb.product_id = p.id
                    WHERE fb.id = feedbackId;
                END
            `,
            'getFeedbacksByIdUser': `
                CREATE PROCEDURE getFeedbacksByIdUser(IN userId INT)
                BEGIN
                    SELECT fb.*, 
                        u.name AS user_name,
                        u.image AS user_image,
                        p.name AS product_name
                    FROM feedbacks fb
                    LEFT JOIN users u ON fb.user_id = u.id
                    LEFT JOIN products p ON fb.product_id = p.id
                    WHERE fb.user_id = userId
                    ORDER BY fb.created_at DESC;
                END
            `,
            'getFeedbacksByIdProduct': `
                CREATE PROCEDURE getFeedbacksByIdProduct(IN productId INT)
                BEGIN
                    SELECT fb.*, 
                        u.name AS user_name,
                        u.image AS user_image,
                        p.name AS product_name
                    FROM feedbacks fb
                    LEFT JOIN users u ON fb.user_id = u.id
                    LEFT JOIN products p ON fb.product_id = p.id
                    WHERE fb.product_id = productId
                    ORDER BY fb.created_at DESC;
                END
            `,
            'getCountFeedbackByIdProduct': `
                CREATE PROCEDURE getCountFeedbackByIdProduct(IN productId INT)
                BEGIN
                    SELECT 
                        star,
                        COUNT(*) as count
                    FROM feedbacks
                    WHERE product_id = productId
                    GROUP BY star
                    ORDER BY star DESC;
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

        console.log('👉 Restart backend (Ctrl+C rồi npm start) và reload trang web!\n');

    } catch (error) {
        console.error('❌ Lỗi:', error.message);
    }
}

createAllProcedures();
