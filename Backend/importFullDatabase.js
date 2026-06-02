const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

async function importDatabase() {
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            multipleStatements: true
        });

        console.log('✅ Đã kết nối MySQL\n');

        // Drop và tạo lại database
        console.log('🔄 Đang reset database...');
        await connection.query('DROP DATABASE IF EXISTS Jeepbicycle');
        await connection.query('CREATE DATABASE Jeepbicycle');
        await connection.query('USE Jeepbicycle');
        console.log('✅ Database đã được reset\n');

        // Import file SQL chính
        const sqlFile = path.join(__dirname, '../db/exports.sql');
        
        if (!fs.existsSync(sqlFile)) {
            console.log('❌ Không tìm thấy file exports.sql');
            await connection.end();
            return;
        }

        console.log('📂 Đang import dữ liệu từ exports.sql...');
        console.log('⏳ Quá trình này có thể mất vài phút...\n');

        let sql = fs.readFileSync(sqlFile, 'utf8');

        // Xử lý SQL: loại bỏ DELIMITER và các comment
        sql = sql
            .replace(/\/\*!50003.*?\*\/\s*;/gs, '')
            .replace(/DELIMITER\s+;;/gi, '')
            .replace(/DELIMITER\s+;/gi, '')
            .replace(/;;\s*$/gm, ';')
            .replace(/^--.*$/gm, '')
            .split(';')
            .filter(stmt => stmt.trim().length > 0);

        let successCount = 0;
        let errorCount = 0;

        for (let i = 0; i < sql.length; i++) {
            const statement = sql[i].trim();
            if (statement.length === 0) continue;

            try {
                await connection.query(statement);
                successCount++;
                
                // Hiển thị progress mỗi 50 statements
                if (successCount % 50 === 0) {
                    console.log(`⏳ Đã xử lý ${successCount} statements...`);
                }
            } catch (error) {
                errorCount++;
                // Chỉ log lỗi quan trọng
                if (!error.message.includes('already exists') && 
                    !error.message.includes('Duplicate entry')) {
                    console.log(`⚠️  Lỗi: ${error.message.substring(0, 100)}`);
                }
            }
        }

        console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log(`✅ Thành công: ${successCount} statements`);
        console.log(`⚠️  Bỏ qua: ${errorCount} statements`);
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

        // Kiểm tra kết quả
        await connection.query('USE Jeepbicycle');
        
        const [products] = await connection.execute('SELECT COUNT(*) as total FROM products');
        const [users] = await connection.execute('SELECT COUNT(*) as total FROM users');
        const [categories] = await connection.execute('SELECT COUNT(*) as total FROM categories');
        const [images] = await connection.execute('SELECT COUNT(*) as total FROM imageproducts');

        console.log('📊 Thống kê dữ liệu:');
        console.log(`   📦 Sản phẩm: ${products[0].total}`);
        console.log(`   👤 Users: ${users[0].total}`);
        console.log(`   📁 Categories: ${categories[0].total}`);
        console.log(`   🖼️  Ảnh sản phẩm: ${images[0].total}\n`);

        await connection.end();

        console.log('✅ Import hoàn tất!');
        console.log('\n👉 Tiếp theo:');
        console.log('   1. Chạy: node fixMissingProcedures.js');
        console.log('   2. Chạy: node createAdmin.js');
        console.log('   3. Restart backend (Ctrl+C rồi npm start)\n');

    } catch (error) {
        console.error('❌ Lỗi:', error.message);
    }
}

importDatabase();
