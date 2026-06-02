const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

async function importProcedures() {
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            multipleStatements: true
        });

        console.log('✅ Đã kết nối MySQL\n');

        // Đọc file SQL
        const sqlFile = path.join(__dirname, '../db/exports.sql');
        let sql = fs.readFileSync(sqlFile, 'utf8');

        console.log('📂 Đang xử lý và import stored procedures...\n');

        // Loại bỏ các dòng comment và DELIMITER
        sql = sql
            .replace(/\/\*!50003.*?\*\/\s*;/gs, '') // Xóa MySQL comments
            .replace(/DELIMITER\s+;;/gi, '') // Xóa DELIMITER ;;
            .replace(/DELIMITER\s+;/gi, '') // Xóa DELIMITER ;
            .replace(/;;\s*$/gm, ';') // Thay ;; thành ;
            .replace(/^--.*$/gm, '') // Xóa comment --
            .replace(/^\s*[\r\n]/gm, ''); // Xóa dòng trống

        // Tách các stored procedures
        const procedures = sql.match(/CREATE\s+DEFINER.*?END\s*;/gis);

        if (!procedures || procedures.length === 0) {
            console.log('❌ Không tìm thấy stored procedures trong file');
            await connection.end();
            return;
        }

        console.log(`📋 Tìm thấy ${procedures.length} stored procedures\n`);

        let successCount = 0;
        let errorCount = 0;

        for (let i = 0; i < procedures.length; i++) {
            let proc = procedures[i];
            
            // Lấy tên procedure
            const nameMatch = proc.match(/PROCEDURE\s+`?(\w+)`?/i);
            const procName = nameMatch ? nameMatch[1] : `Procedure ${i + 1}`;

            try {
                // Drop procedure nếu đã tồn tại
                await connection.query(`DROP PROCEDURE IF EXISTS ${procName}`);
                
                // Tạo procedure mới
                await connection.query(proc);
                
                console.log(`✅ ${procName}`);
                successCount++;
            } catch (error) {
                console.log(`❌ ${procName}: ${error.message}`);
                errorCount++;
            }
        }

        console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
        console.log(`✅ Thành công: ${successCount}`);
        console.log(`❌ Lỗi: ${errorCount}`);
        console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`);

        await connection.end();
    } catch (error) {
        console.error('❌ Lỗi:', error.message);
    }
}

importProcedures();
