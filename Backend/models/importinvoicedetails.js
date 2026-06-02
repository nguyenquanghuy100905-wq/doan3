const db = require('../config/db');

class Importinvoicedetails{
	static async getAllImportinvoicedetails() {
		const [result] = await db.query('SELECT * FROM importinvoicedetails');
		return result;
	}

	static async getImportinvoicedetailsById(id) {
		const [result] = await db.execute('SELECT * FROM importinvoicedetails WHERE id = ?', [id]);
		return result[0];
	}

	static async createImportinvoicedetails(import_invoice_id, product_id, quantity, unit_price, subtotal) {
		const [result] = await db.execute('INSERT INTO importinvoicedetails (import_invoice_id, product_id, quantity, unit_price, subtotal) VALUES (?, ?, ?, ?, ?)', [ import_invoice_id, product_id, quantity, unit_price, subtotal ]);
		return result.insertId;
	}

	static async updateImportinvoicedetails(id, import_invoice_id, product_id, quantity, unit_price, subtotal) {
		const [result] = await db.execute('UPDATE importinvoicedetails SET import_invoice_id = ?, product_id = ?, quantity = ?, unit_price = ?, subtotal = ? WHERE id = ?', [import_invoice_id, product_id, quantity, unit_price, subtotal, id]);
		return result.affectedRows > 0;
	}

	static async deleteImportinvoicedetails(id) {
		const [result] = await db.execute('DELETE FROM importinvoicedetails WHERE id = ?', [id]);
		return result.affectedRows > 0;
	}

};

module.exports = Importinvoicedetails;
