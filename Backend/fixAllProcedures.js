const mysql = require('mysql2/promise');
require('dotenv').config();

async function fixAllProcedures() {
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        });

        console.log('✅ Đã kết nối MySQL\n');

        // 1. getAllCategories
        console.log('Tạo getAllCategories...');
        await connection.query('DROP PROCEDURE IF EXISTS getAllCategories');
        await connection.query(`
            CREATE PROCEDURE getAllCategories()
            BEGIN
                SELECT * FROM categories;
            END
        `);
        console.log('✅ getAllCategories\n');

        // 2. getAllProducts
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

        // 3. getProductById
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

        // 4. getProductsIdCategory
        console.log('Tạo getProductsIdCategory...');
        await connection.query('DROP PROCEDURE IF EXISTS getProductsIdCategory');
        await connection.query(`
            CREATE PROCEDURE getProductsIdCategory(IN categoryId INT)
            BEGIN
                SELECT pr.*, 
                    ct.name AS category_name,
                    tp.name AS type_name,
                    GROUP_CONCAT(img.image_path) AS images
                FROM products pr
                LEFT JOIN categories ct ON pr.category_id = ct.id
                LEFT JOIN types tp ON pr.type_id = tp.id
                LEFT JOIN imageproducts img ON pr.id = img.product_id
                WHERE pr.category_id = categoryId
                GROUP BY pr.id, ct.name, tp.name;
            END
        `);
        console.log('✅ getProductsIdCategory\n');

        // 5. LocSanPhamMoiNhat
        console.log('Tạo LocSanPhamMoiNhat...');
        await connection.query('DROP PROCEDURE IF EXISTS LocSanPhamMoiNhat');
        await connection.query(`
            CREATE PROCEDURE LocSanPhamMoiNhat()
            BEGIN
                SELECT pr.*, 
                    ct.name AS category_name,
                    tp.name AS type_name,
                    GROUP_CONCAT(img.image_path) AS images
                FROM products pr
                LEFT JOIN categories ct ON pr.category_id = ct.id
                LEFT JOIN types tp ON pr.type_id = tp.id
                LEFT JOIN imageproducts img ON pr.id = img.product_id
                GROUP BY pr.id, ct.name, tp.name
                ORDER BY pr.created_at DESC;
            END
        `);
        console.log('✅ LocSanPhamMoiNhat\n');

        // 6. LocSanPhamTheoGiaTuThapDenCao
        console.log('Tạo LocSanPhamTheoGiaTuThapDenCao...');
        await connection.query('DROP PROCEDURE IF EXISTS LocSanPhamTheoGiaTuThapDenCao');
        await connection.query(`
            CREATE PROCEDURE LocSanPhamTheoGiaTuThapDenCao()
            BEGIN
                SELECT pr.*, 
                    ct.name AS category_name,
                    tp.name AS type_name,
                    GROUP_CONCAT(img.image_path) AS images
                FROM products pr
                LEFT JOIN categories ct ON pr.category_id = ct.id
                LEFT JOIN types tp ON pr.type_id = tp.id
                LEFT JOIN imageproducts img ON pr.id = img.product_id
                GROUP BY pr.id, ct.name, tp.name
                ORDER BY pr.newprice ASC;
            END
        `);
        console.log('✅ LocSanPhamTheoGiaTuThapDenCao\n');

        // 7. LocSanPhamTheoGiaTuCaoDenThap
        console.log('Tạo LocSanPhamTheoGiaTuCaoDenThap...');
        await connection.query('DROP PROCEDURE IF EXISTS LocSanPhamTheoGiaTuCaoDenThap');
        await connection.query(`
            CREATE PROCEDURE LocSanPhamTheoGiaTuCaoDenThap()
            BEGIN
                SELECT pr.*, 
                    ct.name AS category_name,
                    tp.name AS type_name,
                    GROUP_CONCAT(img.image_path) AS images
                FROM products pr
                LEFT JOIN categories ct ON pr.category_id = ct.id
                LEFT JOIN types tp ON pr.type_id = tp.id
                LEFT JOIN imageproducts img ON pr.id = img.product_id
                GROUP BY pr.id, ct.name, tp.name
                ORDER BY pr.newprice DESC;
            END
        `);
        console.log('✅ LocSanPhamTheoGiaTuCaoDenThap\n');

        // 8. addProductToCart
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

        // 9. getCartByUserId
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

        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('✅ Đã tạo xong tất cả procedures!');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

        await connection.end();
    } catch (error) {
        console.error('❌ Lỗi:', error.message);
    }
}

fixAllProcedures();
