const db = require('../config/db');

class Paymentmethods{
	static async getAllPaymentmethods() {
		const [result] = await db.query('SELECT * FROM paymentmethods');
		return result;
	}

	static async getPaymentmethodsById(id) {
		const [result] = await db.execute('SELECT * FROM paymentmethods WHERE id = ?', [id]);
		return result[0];
	}

	static async createPaymentmethods(name, img_payment, description) {
		const [result] = await db.execute('INSERT INTO paymentmethods (name, img_payment, description) VALUES (?, ?, ?)', [ name, img_payment, description ]);
		return result.insertId;
	}

	static async updatePaymentmethods(id, name, img_payment, description) {
		const [result] = await db.execute('UPDATE paymentmethods SET name = ?, img_payment = ?, description = ? WHERE id = ?', [name, img_payment, description, id]);
		return result.affectedRows > 0;
	}

	static async deletePaymentmethods(id) {
		const [result] = await db.execute('DELETE FROM paymentmethods WHERE id = ?', [id]);
		return result.affectedRows > 0;
	}

};

module.exports = Paymentmethods;
