const mysql = require('mysql2/promise');
require('dotenv').config();

async function addSampleData() {
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        });

        console.log('✅ Đã kết nối MySQL\n');

        // 1. Thêm Categories
        console.log('📁 Đang thêm categories...');
        const categories = [
            ['Xe địa hình', 'Xe đạp chuyên dụng cho địa hình gồ ghề'],
            ['Xe đường phố', 'Xe đạp phù hợp đi lại trong thành phố'],
            ['Xe trẻ em', 'Xe dành cho trẻ nhỏ'],
            ['Xe thể thao', 'Xe đạp thể thao tốc độ'],
            ['Xe touring', 'Xe đạp đường dài']
        ];

        for (const [name, desc] of categories) {
            await connection.execute(
                'INSERT IGNORE INTO categories (name, description) VALUES (?, ?)',
                [name, desc]
            );
        }
        console.log('✅ Đã thêm categories\n');

        // 2. Thêm Types
        console.log('📋 Đang thêm types...');
        const types = ['Mountain Bike', 'Road Bike', 'Hybrid', 'BMX', 'Electric'];
        
        for (const type of types) {
            await connection.execute(
                'INSERT IGNORE INTO types (name) VALUES (?)',
                [type]
            );
        }
        console.log('✅ Đã thêm types\n');

        // 3. Thêm Products
        console.log('📦 Đang thêm products...');
        const products = [
            {
                name: 'Xe đạp địa hình MTB Pro 2024',
                category_id: 1,
                type_id: 1,
                newprice: 8500000,
                oldprice: 10000000,
                material: 'Khung nhôm hợp kim',
                size: 'M, L, XL',
                weight: '13.5kg',
                color: 'Đen, Xanh, Đỏ',
                quantity: 15
            },
            {
                name: 'Xe đạp đường phố City Comfort',
                category_id: 2,
                type_id: 3,
                newprice: 4500000,
                oldprice: 5500000,
                material: 'Khung thép carbon',
                size: 'S, M, L',
                weight: '11kg',
                color: 'Trắng, Xám',
                quantity: 20
            },
            {
                name: 'Xe đạp trẻ em Kids Fun',
                category_id: 3,
                type_id: 4,
                newprice: 2500000,
                oldprice: 3000000,
                material: 'Khung thép',
                size: '12 inch, 16 inch',
                weight: '8kg',
                color: 'Hồng, Xanh dương',
                quantity: 30
            },
            {
                name: 'Xe đạp thể thao Racing Speed',
                category_id: 4,
                type_id: 2,
                newprice: 12000000,
                oldprice: 15000000,
                material: 'Khung carbon fiber',
                size: 'M, L',
                weight: '9kg',
                color: 'Đỏ, Đen',
                quantity: 10
            },
            {
                name: 'Xe đạp touring Adventure Pro',
                category_id: 5,
                type_id: 3,
                newprice: 9500000,
                oldprice: 11000000,
                material: 'Khung nhôm',
                size: 'M, L, XL',
                weight: '12kg',
                color: 'Xanh lá, Cam',
                quantity: 12
            },
            {
                name: 'Xe đạp điện E-Bike Smart',
                category_id: 2,
                type_id: 5,
                newprice: 18000000,
                oldprice: 22000000,
                material: 'Khung nhôm hợp kim',
                size: 'M, L',
                weight: '22kg',
                color: 'Đen, Bạc',
                quantity: 8
            },
            {
                name: 'Xe đạp địa hình Mountain King',
                category_id: 1,
                type_id: 1,
                newprice: 7200000,
                oldprice: 8500000,
                material: 'Khung thép carbon',
                size: 'M, L',
                weight: '14kg',
                color: 'Xanh, Vàng',
                quantity: 18
            },
            {
                name: 'Xe đạp gấp Folding Compact',
                category_id: 2,
                type_id: 3,
                newprice: 5500000,
                oldprice: 6500000,
                material: 'Khung nhôm',
                size: '20 inch',
                weight: '12kg',
                color: 'Đen, Trắng',
                quantity: 25
            },
            {
                name: 'Xe đạp BMX Stunt Pro',
                category_id: 4,
                type_id: 4,
                newprice: 6800000,
                oldprice: 8000000,
                material: 'Khung thép chromoly',
                size: '20 inch',
                weight: '11kg',
                color: 'Đỏ, Xanh',
                quantity: 15
            },
            {
                name: 'Xe đạp nữ Lady Classic',
                category_id: 2,
                type_id: 3,
                newprice: 3800000,
                oldprice: 4500000,
                material: 'Khung thép',
                size: 'S, M',
                weight: '13kg',
                color: 'Hồng, Tím',
                quantity: 22
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
        console.log('✅ Đã thêm 10 sản phẩm\n');

        // 4. Thêm Banners
        console.log('🖼️  Đang thêm banners...');
        const banners = [
            '/public/images/banner1.jpg',
            '/public/images/banner2.png',
            '/public/images/banner3.jpg'
        ];

        for (const banner of banners) {
            await connection.execute(
                'INSERT IGNORE INTO banners (image_path) VALUES (?)',
                [banner]
            );
        }
        console.log('✅ Đã thêm banners\n');

        // 5. Thêm Payment Methods
        console.log('💳 Đang thêm payment methods...');
        const paymentMethods = [
            ['Tiền mặt', 'Thanh toán khi nhận hàng'],
            ['Chuyển khoản', 'Chuyển khoản ngân hàng'],
            ['Ví điện tử', 'MoMo, ZaloPay, VNPay']
        ];

        for (const [name, desc] of paymentMethods) {
            await connection.execute(
                'INSERT IGNORE INTO paymentmethods (name, description) VALUES (?, ?)',
                [name, desc]
            );
        }
        console.log('✅ Đã thêm payment methods\n');

        // Kiểm tra kết quả
        const [products_count] = await connection.execute('SELECT COUNT(*) as total FROM products');
        const [categories_count] = await connection.execute('SELECT COUNT(*) as total FROM categories');
        const [images_count] = await connection.execute('SELECT COUNT(*) as total FROM imageproducts');

        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('📊 Thống kê dữ liệu:');
        console.log(`   📦 Sản phẩm: ${products_count[0].total}`);
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

addSampleData();
