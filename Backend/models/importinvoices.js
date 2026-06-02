const db = require('../config/db');

class Importinvoices{
	static async getAllImportinvoices() {
		const [result] = await db.query('SELECT * FROM importinvoices');
		return result;
	}

	static async getImportinvoicesById(id) {
		const [result] = await db.execute('SELECT * FROM importinvoices WHERE id = ?', [id]);
		return result[0];
	}

	static async createImportinvoices(supplier_name, total_amount, note) {
		const [result] = await db.execute('INSERT INTO importinvoices (supplier_name, total_amount, note) VALUES (?, ?, ?)', [ supplier_name, total_amount, note ]);
		return result.insertId;
	}

	static async updateImportinvoices(id, supplier_name, total_amount, note) {
		const [result] = await db.execute('UPDATE importinvoices SET supplier_name = ?, total_amount = ?, note = ? WHERE id = ?', [supplier_name, total_amount, note, id]);
		return result.affectedRows > 0;
	}

	static async deleteImportinvoices(id) {
		const [result] = await db.execute('DELETE FROM importinvoices WHERE id = ?', [id]);
		return result.affectedRows > 0;
	}

};

module.exports = Importinvoices;
