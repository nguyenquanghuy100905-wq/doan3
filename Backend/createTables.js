const mysql = require('mysql2/promise');
require('dotenv').config();

async function createTables() {
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            multipleStatements: true
        });

        console.log('✅ Đã kết nối MySQL\n');

        // Tạo database
        console.log('🔄 Tạo database Jeepbicycle...');
        await connection.query('CREATE DATABASE IF NOT EXISTS Jeepbicycle');
        await connection.query('USE Jeepbicycle');
        console.log('✅ Database đã sẵn sàng\n');

        console.log('📋 Đang tạo các bảng...\n');

        // Tạo các bảng
        const tables = [
            // 1. Banners
            `CREATE TABLE IF NOT EXISTS banners (
                id INT PRIMARY KEY AUTO_INCREMENT,
                image_path VARCHAR(255),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )`,

            // 2. Users
            `CREATE TABLE IF NOT EXISTS users (
                id INT PRIMARY KEY AUTO_INCREMENT,
                username VARCHAR(300),
                password VARCHAR(300),
                name VARCHAR(300),
                birthday DATETIME,
                sex VARCHAR(100),
                address VARCHAR(500),
                email VARCHAR(500),
                phone VARCHAR(10),
                image TEXT,
                role_user INT DEFAULT 0,
                ban TINYINT(1) DEFAULT 0,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )`,

            // 3. Categories
            `CREATE TABLE IF NOT EXISTS categories (
                id INT PRIMARY KEY AUTO_INCREMENT,
                name VARCHAR(200),
                description TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )`,

            // 4. Types
            `CREATE TABLE IF NOT EXISTS types (
                id INT PRIMARY KEY AUTO_INCREMENT,
                name VARCHAR(200),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )`,

            // 5. Products
            `CREATE TABLE IF NOT EXISTS products (
                id INT PRIMARY KEY AUTO_INCREMENT,
                category_id INT,
                type_id INT,
                name VARCHAR(300),
                newprice DECIMAL(20,2),
                oldprice DECIMAL(20,2),
                material TEXT,
                size VARCHAR(200),
                weight VARCHAR(200),
                color VARCHAR(200),
                quantity INT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                FOREIGN KEY (category_id) REFERENCES categories(id),
                FOREIGN KEY (type_id) REFERENCES types(id)
            )`,

            // 6. Image Products
            `CREATE TABLE IF NOT EXISTS imageproducts (
                id INT PRIMARY KEY AUTO_INCREMENT,
                product_id INT,
                image_path TEXT,
                FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
            )`,

            // 7. Feedbacks
            `CREATE TABLE IF NOT EXISTS feedbacks (
                id INT PRIMARY KEY AUTO_INCREMENT,
                user_id INT,
                product_id INT,
                star INT,
                content TEXT,
                image_path TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id),
                FOREIGN KEY (product_id) REFERENCES products(id)
            )`,

            // 8. Cart
            `CREATE TABLE IF NOT EXISTS cart (
                id INT PRIMARY KEY AUTO_INCREMENT,
                user_id INT,
                total DECIMAL(20,2),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id)
            )`,

            // 9. Cart Details
            `CREATE TABLE IF NOT EXISTS cartdetails (
                id INT PRIMARY KEY AUTO_INCREMENT,
                cart_id INT,
                product_id INT,
                quantity INT,
                subtotal DECIMAL(10,2),
                FOREIGN KEY (cart_id) REFERENCES cart(id) ON DELETE CASCADE,
                FOREIGN KEY (product_id) REFERENCES products(id)
            )`,

            // 10. Payment Methods
            `CREATE TABLE IF NOT EXISTS paymentmethods (
                id INT PRIMARY KEY AUTO_INCREMENT,
                name VARCHAR(200),
                description TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )`,

            // 11. Orders
            `CREATE TABLE IF NOT EXISTS orders (
                id INT PRIMARY KEY AUTO_INCREMENT,
                user_id INT,
                payment_method_id INT,
                total DECIMAL(20,2),
                status VARCHAR(100),
                shipping_address VARCHAR(500),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id),
                FOREIGN KEY (payment_method_id) REFERENCES paymentmethods(id)
            )`,

            // 12. Order Details
            `CREATE TABLE IF NOT EXISTS orderdetails (
                id INT PRIMARY KEY AUTO_INCREMENT,
                order_id INT,
                product_id INT,
                quantity INT,
                price DECIMAL(10,2),
                subtotal DECIMAL(10,2),
                FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
                FOREIGN KEY (product_id) REFERENCES products(id)
            )`,

            // 13. Contacts
            `CREATE TABLE IF NOT EXISTS contacts (
                id INT PRIMARY KEY AUTO_INCREMENT,
                name VARCHAR(300),
                email VARCHAR(500),
                phone VARCHAR(20),
                message TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )`,

            // 14. Content Types
            `CREATE TABLE IF NOT EXISTS contenttypes (
                id INT PRIMARY KEY AUTO_INCREMENT,
                type_id INT,
                title VARCHAR(300),
                content TEXT,
                image_path VARCHAR(255),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                FOREIGN KEY (type_id) REFERENCES types(id)
            )`,

            // 15. News
            `CREATE TABLE IF NOT EXISTS news (
                id INT PRIMARY KEY AUTO_INCREMENT,
                title VARCHAR(300),
                summary TEXT,
                image_path VARCHAR(255),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )`,

            // 16. Detail News
            `CREATE TABLE IF NOT EXISTS detailnews (
                id INT PRIMARY KEY AUTO_INCREMENT,
                news_id INT,
                content TEXT,
                FOREIGN KEY (news_id) REFERENCES news(id) ON DELETE CASCADE
            )`,

            // 17. Promotions
            `CREATE TABLE IF NOT EXISTS promotions (
                id INT PRIMARY KEY AUTO_INCREMENT,
                code VARCHAR(100),
                discount_percent INT,
                start_date DATE,
                end_date DATE,
                description TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )`
        ];

        for (let i = 0; i < tables.length; i++) {
            await connection.query(tables[i]);
            console.log(`✅ Bảng ${i + 1}/${tables.length} đã tạo`);
        }

        console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('✅ Đã tạo xong tất cả bảng!');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

        await connection.end();

        console.log('👉 Tiếp theo chạy:');
        console.log('   1. node fixMissingProcedures.js');
        console.log('   2. node addSampleData.js');
        console.log('   3. node createAdmin.js\n');

    } catch (error) {
        console.error('❌ Lỗi:', error.message);
    }
}

createTables();
