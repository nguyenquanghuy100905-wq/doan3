const db = require('../config/db');

class Orderinvoices{
	static async getAllOrderinvoices() {
		const [result] = await db.query('SELECT * FROM orderinvoices');
		return result;
	}

	static async getOrderinvoicesById(id) {
		const [result] = await db.execute('SELECT * FROM orderinvoices WHERE id = ?', [id]);
		return result[0];
	}

	static async createOrderinvoices(user_id, total_amount, pay, status, note, payment_method_id) {
		const [result] = await db.execute('INSERT INTO orderinvoices (user_id, total_amount, pay, status, note, payment_method_id) VALUES (?, ?, ?, ?, ?, ?)', [ user_id, total_amount, pay, status, note, payment_method_id ]);
		return result.insertId;
	}

	static async updateOrderinvoices(id, user_id, total_amount, pay, status, note, payment_method_id) {
		const [result] = await db.execute('UPDATE orderinvoices SET user_id = ?, total_amount = ?, pay = ?, status = ?, note = ?, payment_method_id = ? WHERE id = ?', [user_id, total_amount, pay, status, note, payment_method_id, id]);
		return result.affectedRows > 0;
	}

	static async deleteOrderinvoices(id) {
		const [result] = await db.execute('DELETE FROM orderinvoices WHERE id = ?', [id]);
		return result.affectedRows > 0;
	}

};

module.exports = Orderinvoices;
