const mysql = require('mysql2/promise');
require('dotenv').config();

async function updateToPhoneData() {
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        });

        console.log('✅ Đã kết nối MySQL\n');

        // Xóa dữ liệu cũ
        console.log('🔄 Đang xóa dữ liệu cũ...');
        await connection.execute('SET FOREIGN_KEY_CHECKS = 0');
        await connection.execute('TRUNCATE TABLE imageproducts');
        await connection.execute('TRUNCATE TABLE products');
        await connection.execute('TRUNCATE TABLE categories');
        await connection.execute('TRUNCATE TABLE types');
        await connection.execute('SET FOREIGN_KEY_CHECKS = 1');
        console.log('✅ Đã xóa dữ liệu cũ\n');

        // 1. Thêm Categories về điện thoại
        console.log('📁 Đang thêm categories điện thoại...');
        const categories = [
            ['iPhone', 'Điện thoại Apple iPhone'],
            ['Samsung', 'Điện thoại Samsung Galaxy'],
            ['Xiaomi', 'Điện thoại Xiaomi'],
            ['OPPO', 'Điện thoại OPPO'],
            ['Vivo', 'Điện thoại Vivo'],
            ['Realme', 'Điện thoại Realme'],
            ['Nokia', 'Điện thoại Nokia']
        ];

        for (const [name, desc] of categories) {
            await connection.execute(
                'INSERT INTO categories (name, description) VALUES (?, ?)',
                [name, desc]
            );
        }
        console.log('✅ Đã thêm categories\n');

        // 2. Thêm Types
        console.log('📋 Đang thêm types...');
        const types = ['Flagship', 'Tầm trung', 'Giá rẻ', 'Gaming', 'Camera'];
        
        for (const type of types) {
            await connection.execute(
                'INSERT INTO types (name) VALUES (?)',
                [type]
            );
        }
        console.log('✅ Đã thêm types\n');

        // 3. Thêm Products điện thoại
        console.log('📦 Đang thêm sản phẩm điện thoại...');
        const products = [
            {
                name: 'iPhone 15 Pro Max',
                category_id: 1,
                type_id: 1,
                newprice: 29990000,
                oldprice: 34990000,
                material: 'Khung Titan, mặt lưng kính',
                size: '6.7 inch',
                weight: '221g',
                color: 'Titan Tự Nhiên, Titan Xanh, Titan Trắng, Titan Đen',
                quantity: 25
            },
            {
                name: 'iPhone 14 Pro',
                category_id: 1,
                type_id: 1,
                newprice: 24990000,
                oldprice: 27990000,
                material: 'Khung thép, mặt lưng kính',
                size: '6.1 inch',
                weight: '206g',
                color: 'Tím, Vàng, Bạc, Đen',
                quantity: 30
            },
            {
                name: 'Samsung Galaxy S24 Ultra',
                category_id: 2,
                type_id: 1,
                newprice: 26990000,
                oldprice: 29990000,
                material: 'Khung Titan, mặt lưng kính',
                size: '6.8 inch',
                weight: '232g',
                color: 'Titan Xám, Titan Tím, Titan Vàng, Titan Đen',
                quantity: 20
            },
            {
                name: 'Samsung Galaxy A55 5G',
                category_id: 2,
                type_id: 2,
                newprice: 9990000,
                oldprice: 11990000,
                material: 'Khung kim loại, mặt lưng kính',
                size: '6.6 inch',
                weight: '213g',
                color: 'Xanh Navy, Xanh Lá, Tím',
                quantity: 40
            },
            {
                name: 'Xiaomi 14 Ultra',
                category_id: 3,
                type_id: 1,
                newprice: 24990000,
                oldprice: 27990000,
                material: 'Khung kim loại, mặt lưng da',
                size: '6.73 inch',
                weight: '219g',
                color: 'Đen, Trắng',
                quantity: 15
            },
            {
                name: 'Xiaomi Redmi Note 13 Pro',
                category_id: 3,
                type_id: 2,
                newprice: 7490000,
                oldprice: 8990000,
                material: 'Khung nhựa, mặt lưng kính',
                size: '6.67 inch',
                weight: '199g',
                color: 'Đen, Tím, Xanh',
                quantity: 50
            },
            {
                name: 'OPPO Find X7 Ultra',
                category_id: 4,
                type_id: 1,
                newprice: 22990000,
                oldprice: 25990000,
                material: 'Khung kim loại, mặt lưng kính',
                size: '6.82 inch',
                weight: '221g',
                color: 'Đen, Xanh',
                quantity: 18
            },
            {
                name: 'OPPO Reno11 5G',
                category_id: 4,
                type_id: 2,
                newprice: 9990000,
                oldprice: 11490000,
                material: 'Khung nhựa, mặt lưng kính',
                size: '6.7 inch',
                weight: '184g',
                color: 'Xanh, Xám, Tím',
                quantity: 35
            },
            {
                name: 'Vivo V30 Pro 5G',
                category_id: 5,
                type_id: 2,
                newprice: 12990000,
                oldprice: 14990000,
                material: 'Khung kim loại, mặt lưng kính',
                size: '6.78 inch',
                weight: '188g',
                color: 'Đen, Xanh, Tím',
                quantity: 28
            },
            {
                name: 'Realme 12 Pro+ 5G',
                category_id: 6,
                type_id: 2,
                newprice: 8990000,
                oldprice: 10490000,
                material: 'Khung nhựa, mặt lưng da',
                size: '6.7 inch',
                weight: '196g',
                color: 'Xanh, Cam',
                quantity: 32
            },
            {
                name: 'iPhone 13',
                category_id: 1,
                type_id: 2,
                newprice: 15990000,
                oldprice: 18990000,
                material: 'Khung nhôm, mặt lưng kính',
                size: '6.1 inch',
                weight: '174g',
                color: 'Hồng, Xanh, Đen, Trắng, Đỏ',
                quantity: 45
            },
            {
                name: 'Samsung Galaxy Z Flip5',
                category_id: 2,
                type_id: 1,
                newprice: 19990000,
                oldprice: 22990000,
                material: 'Khung nhôm, mặt lưng kính',
                size: '6.7 inch',
                weight: '187g',
                color: 'Tím, Xanh, Kem, Xám',
                quantity: 22
            },
            {
                name: 'Xiaomi 13T Pro',
                category_id: 3,
                type_id: 2,
                newprice: 11990000,
                oldprice: 13990000,
                material: 'Khung kim loại, mặt lưng kính',
                size: '6.67 inch',
                weight: '200g',
                color: 'Đen, Xanh',
                quantity: 38
            },
            {
                name: 'OPPO A78 5G',
                category_id: 4,
                type_id: 3,
                newprice: 5990000,
                oldprice: 6990000,
                material: 'Khung nhựa, mặt lưng nhựa',
                size: '6.56 inch',
                weight: '188g',
                color: 'Đen, Tím',
                quantity: 55
            },
            {
                name: 'Nokia G60 5G',
                category_id: 7,
                type_id: 3,
                newprice: 4990000,
                oldprice: 5990000,
                material: 'Khung nhựa tái chế, mặt lưng nhựa',
                size: '6.58 inch',
                weight: '190g',
                color: 'Đen, Xanh',
                quantity: 42
            }
        ];

        for (const product of products) {
            const [result] = await connection.execute(
                `INSERT INTO products (category_id, type_id, name, newprice, oldprice, material, size, weight, color, quantity)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [
                    product.category_id,
                    product.type_id,
                    product.name,
                    product.newprice,
                    product.oldprice,
                    product.material,
                    product.size,
                    product.weight,
                    product.color,
                    product.quantity
                ]
            );

            // Thêm ảnh mẫu cho mỗi sản phẩm
            const productId = result.insertId;
            await connection.execute(
                'INSERT INTO imageproducts (product_id, image_path) VALUES (?, ?)',
                [productId, '/public/images/default.jpeg']
            );
        }
        console.log('✅ Đã thêm 15 sản phẩm điện thoại\n');

        // Kiểm tra kết quả
        const [products_count] = await connection.execute('SELECT COUNT(*) as total FROM products');
        const [categories_count] = await connection.execute('SELECT COUNT(*) as total FROM categories');
        const [images_count] = await connection.execute('SELECT COUNT(*) as total FROM imageproducts');

        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('📊 Thống kê dữ liệu điện thoại:');
        console.log(`   📱 Sản phẩm: ${products_count[0].total}`);
        console.log(`   📁 Categories: ${categories_count[0].total}`);
        console.log(`   🖼️  Ảnh sản phẩm: ${images_count[0].total}`);
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

        console.log('✅ Hoàn tất!\n');
        console.log('👉 Tiếp theo:');
        console.log('   1. Restart backend (Ctrl+C rồi npm start)');
        console.log('   2. Reload trang web (F5)\n');

        await connection.end();
    } catch (error) {
        console.error('❌ Lỗi:', error.message);
    }
}

updateToPhoneData();
