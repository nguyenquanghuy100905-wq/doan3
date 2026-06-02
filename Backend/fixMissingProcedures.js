const mysql = require('mysql2/promise');
require('dotenv').config();

async function fixProcedures() {
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        });

        console.log('✅ Đã kết nối MySQL\n');

        // 1. getAllProducts
        console.log('Tạo getAllProducts...');
        await connection.query('DROP PROCEDURE IF EXISTS getAllProducts');
        await connection.query(`
            CREATE PROCEDURE getAllProducts()
            BEGIN
                SELECT pr.*, 
                    ct.name AS category_name,
                    tp.name AS type_name,
                    GROUP_CONCAT(img.image_path) AS images
                FROM products pr
                LEFT JOIN categories ct ON pr.category_id = ct.id
                LEFT JOIN types tp ON pr.type_id = tp.id
                LEFT JOIN imageproducts img ON pr.id = img.product_id
                GROUP BY pr.id, ct.name, tp.name;
            END
        `);
        console.log('✅ getAllProducts\n');

        // 2. getProductById
        console.log('Tạo getProductById...');
        await connection.query('DROP PROCEDURE IF EXISTS getProductById');
        await connection.query(`
            CREATE PROCEDURE getProductById(IN productId INT)
            BEGIN
                SELECT pr.*, 
                    ct.name AS category_name,
                    tp.name AS type_name,
                    GROUP_CONCAT(img.image_path) AS images
                FROM products pr
                LEFT JOIN categories ct ON pr.category_id = ct.id
                LEFT JOIN types tp ON pr.type_id = tp.id
                LEFT JOIN imageproducts img ON pr.id = img.product_id
                WHERE pr.id = productId
                GROUP BY pr.id, ct.name, tp.name;
            END
        `);
        console.log('✅ getProductById\n');

        // 3. addProductToCart
        console.log('Tạo addProductToCart...');
        await connection.query('DROP PROCEDURE IF EXISTS addProductToCart');
        await connection.query(`
            CREATE PROCEDURE addProductToCart(IN userId INT, IN productId INT, IN newquantity INT)
            BEGIN
                DECLARE cartId INT;
                DECLARE existingQuantity INT DEFAULT 0;
                DECLARE productPrice DECIMAL(10,2);
                
                SELECT id INTO cartId FROM cart WHERE user_id = userId LIMIT 1;
                
                IF cartId IS NULL THEN
                    INSERT INTO cart (user_id, total) VALUES (userId, 0);
                    SET cartId = LAST_INSERT_ID();
                END IF;
                
                SELECT quantity INTO existingQuantity 
                FROM cartdetails 
                WHERE cart_id = cartId AND product_id = productId;
                
                SELECT newprice INTO productPrice FROM products WHERE id = productId;
                
                IF existingQuantity > 0 THEN
                    UPDATE cartdetails 
                    SET quantity = quantity + newquantity,
                        subtotal = (quantity + newquantity) * productPrice
                    WHERE cart_id = cartId AND product_id = productId;
                ELSE
                    INSERT INTO cartdetails (cart_id, product_id, quantity, subtotal)
                    VALUES (cartId, productId, newquantity, newquantity * productPrice);
                END IF;
                
                UPDATE cart 
                SET total = (SELECT SUM(subtotal) FROM cartdetails WHERE cart_id = cartId)
                WHERE id = cartId;
            END
        `);
        console.log('✅ addProductToCart\n');

        // 4. deleteProductFromCart
        console.log('Tạo deleteProductFromCart...');
        await connection.query('DROP PROCEDURE IF EXISTS deleteProductFromCart');
        await connection.query(`
            CREATE PROCEDURE deleteProductFromCart(IN userId INT, IN productId INT)
            BEGIN
                DECLARE cartId INT;
                
                SELECT id INTO cartId FROM cart WHERE user_id = userId LIMIT 1;
                
                IF cartId IS NOT NULL THEN
                    DELETE FROM cartdetails 
                    WHERE cart_id = cartId AND product_id = productId;
                    
                    UPDATE cart 
                    SET total = (SELECT COALESCE(SUM(subtotal), 0) FROM cartdetails WHERE cart_id = cartId)
                    WHERE id = cartId;
                END IF;
            END
        `);
        console.log('✅ deleteProductFromCart\n');

        // 5. getCartByUserId
        console.log('Tạo getCartByUserId...');
        await connection.query('DROP PROCEDURE IF EXISTS getCartByUserId');
        await connection.query(`
            CREATE PROCEDURE getCartByUserId(IN userId INT)
            BEGIN
                SELECT cd.*, pr.name, pr.newprice, pr.oldprice,
                    GROUP_CONCAT(img.image_path) AS images
                FROM cart c
                INNER JOIN cartdetails cd ON c.id = cd.cart_id
                INNER JOIN products pr ON cd.product_id = pr.id
                LEFT JOIN imageproducts img ON pr.id = img.product_id
                WHERE c.user_id = userId
                GROUP BY cd.id, pr.id;
            END
        `);
        console.log('✅ getCartByUserId\n');

        // 6. UpdateCartQuantity
        console.log('Tạo UpdateCartQuantity...');
        await connection.query('DROP PROCEDURE IF EXISTS UpdateCartQuantity');
        await connection.query(`
            CREATE PROCEDURE UpdateCartQuantity(IN userId INT, IN productId INT, IN newQuantity INT)
            BEGIN
                DECLARE cartId INT;
                DECLARE productPrice DECIMAL(10,2);
                
                SELECT id INTO cartId FROM cart WHERE user_id = userId LIMIT 1;
                SELECT newprice INTO productPrice FROM products WHERE id = productId;
                
                IF cartId IS NOT NULL THEN
                    UPDATE cartdetails 
                    SET quantity = newQuantity,
                        subtotal = newQuantity * productPrice
                    WHERE cart_id = cartId AND product_id = productId;
                    
                    UPDATE cart 
                    SET total = (SELECT SUM(subtotal) FROM cartdetails WHERE cart_id = cartId)
                    WHERE id = cartId;
                END IF;
            END
        `);
        console.log('✅ UpdateCartQuantity\n');

        // 7. ThongKeDonHangTheoThang
        console.log('Tạo ThongKeDonHangTheoThang...');
        await connection.query('DROP PROCEDURE IF EXISTS ThongKeDonHangTheoThang');
        await connection.query(`
            CREATE PROCEDURE ThongKeDonHangTheoThang()
            BEGIN
                SELECT 
                    MONTH(created_at) AS month,
                    YEAR(created_at) AS year,
                    COUNT(*) AS total_orders,
                    SUM(total) AS total_revenue
                FROM orders
                GROUP BY YEAR(created_at), MONTH(created_at)
                ORDER BY year DESC, month DESC;
            END
        `);
        console.log('✅ ThongKeDonHangTheoThang\n');

        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('✅ Đã tạo xong tất cả procedures!');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

        await connection.end();
    } catch (error) {
        console.error('❌ Lỗi:', error.message);
    }
}

fixProcedures();
