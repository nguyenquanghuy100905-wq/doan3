const mysql = require('mysql2/promise');
require('dotenv').config();

async function fixRemainingProcedures() {
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        });

        console.log('✅ Đã kết nối MySQL\n');

        // 1. getAllFeedbacks
        console.log('Tạo getAllFeedbacks...');
        await connection.query('DROP PROCEDURE IF EXISTS getAllFeedbacks');
        await connection.query(`
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
        `);
        console.log('✅ getAllFeedbacks\n');

        // 2. getFeedbacksByIdProduct
        console.log('Tạo getFeedbacksByIdProduct...');
        await connection.query('DROP PROCEDURE IF EXISTS getFeedbacksByIdProduct');
        await connection.query(`
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
        `);
        console.log('✅ getFeedbacksByIdProduct\n');

        // 3. getAllBanners
        console.log('Tạo getAllBanners...');
        await connection.query('DROP PROCEDURE IF EXISTS getAllBanners');
        await connection.query(`
            CREATE PROCEDURE getAllBanners()
            BEGIN
                SELECT * FROM banners ORDER BY created_at DESC;
            END
        `);
        console.log('✅ getAllBanners\n');

        // 4. getAllTypes
        console.log('Tạo getAllTypes...');
        await connection.query('DROP PROCEDURE IF EXISTS getAllTypes');
        await connection.query(`
            CREATE PROCEDURE getAllTypes()
            BEGIN
                SELECT * FROM types;
            END
        `);
        console.log('✅ getAllTypes\n');

        // 5. getAllUsers
        console.log('Tạo getAllUsers...');
        await connection.query('DROP PROCEDURE IF EXISTS getAllUsers');
        await connection.query(`
            CREATE PROCEDURE getAllUsers()
            BEGIN
                SELECT id, username, name, birthday, sex, address, email, phone, image, role_user, ban, created_at, updated_at
                FROM users;
            END
        `);
        console.log('✅ getAllUsers\n');

        // 6. getAllOrders
        console.log('Tạo getAllOrders...');
        await connection.query('DROP PROCEDURE IF EXISTS getAllOrders');
        await connection.query(`
            CREATE PROCEDURE getAllOrders()
            BEGIN
                SELECT o.*, 
                    u.name AS user_name,
                    pm.name AS payment_method_name
                FROM orders o
                LEFT JOIN users u ON o.user_id = u.id
                LEFT JOIN paymentmethods pm ON o.payment_method_id = pm.id
                ORDER BY o.created_at DESC;
            END
        `);
        console.log('✅ getAllOrders\n');

        // 7. getOrdersByIdUser
        console.log('Tạo getOrdersByIdUser...');
        await connection.query('DROP PROCEDURE IF EXISTS getOrdersByIdUser');
        await connection.query(`
            CREATE PROCEDURE getOrdersByIdUser(IN userId INT)
            BEGIN
                SELECT o.*, 
                    u.name AS user_name,
                    pm.name AS payment_method_name
                FROM orders o
                LEFT JOIN users u ON o.user_id = u.id
                LEFT JOIN paymentmethods pm ON o.payment_method_id = pm.id
                WHERE o.user_id = userId
                ORDER BY o.created_at DESC;
            END
        `);
        console.log('✅ getOrdersByIdUser\n');

        // 8. getAllPaymentMethods
        console.log('Tạo getAllPaymentMethods...');
        await connection.query('DROP PROCEDURE IF EXISTS getAllPaymentMethods');
        await connection.query(`
            CREATE PROCEDURE getAllPaymentMethods()
            BEGIN
                SELECT * FROM paymentmethods;
            END
        `);
        console.log('✅ getAllPaymentMethods\n');

        // 9. getAllContacts
        console.log('Tạo getAllContacts...');
        await connection.query('DROP PROCEDURE IF EXISTS getAllContacts');
        await connection.query(`
            CREATE PROCEDURE getAllContacts()
            BEGIN
                SELECT * FROM contacts ORDER BY created_at DESC;
            END
        `);
        console.log('✅ getAllContacts\n');

        // 10. getAllNews
        console.log('Tạo getAllNews...');
        await connection.query('DROP PROCEDURE IF EXISTS getAllNews');
        await connection.query(`
            CREATE PROCEDURE getAllNews()
            BEGIN
                SELECT * FROM news ORDER BY created_at DESC;
            END
        `);
        console.log('✅ getAllNews\n');

        // 11. LocSanPhamDanhGiaCao
        console.log('Tạo LocSanPhamDanhGiaCao...');
        await connection.query('DROP PROCEDURE IF EXISTS LocSanPhamDanhGiaCao');
        await connection.query(`
            CREATE PROCEDURE LocSanPhamDanhGiaCao()
            BEGIN
                SELECT pr.*, 
                    ct.name AS category_name,
                    tp.name AS type_name,
                    GROUP_CONCAT(img.image_path) AS images,
                    COALESCE(AVG(fb.star), 0) AS avg_rating
                FROM products pr
                LEFT JOIN categories ct ON pr.category_id = ct.id
                LEFT JOIN types tp ON pr.type_id = tp.id
                LEFT JOIN imageproducts img ON pr.id = img.product_id
                LEFT JOIN feedbacks fb ON pr.id = fb.product_id
                GROUP BY pr.id, ct.name, tp.name
                ORDER BY avg_rating DESC;
            END
        `);
        console.log('✅ LocSanPhamDanhGiaCao\n');

        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('✅ Đã tạo xong tất cả procedures còn thiếu!');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

        await connection.end();
    } catch (error) {
        console.error('❌ Lỗi:', error.message);
    }
}

fixRemainingProcedures();
