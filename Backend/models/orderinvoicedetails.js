const db = require('../config/db');

class Orderinvoicedetails{
	static async getAllOrderinvoicedetails() {
		const [result] = await db.query('SELECT * FROM orderinvoicedetails');
		return result;
	}

	static async getOrderinvoicedetailsById(id) {
		const [result] = await db.execute('SELECT * FROM orderinvoicedetails WHERE id = ?', [id]);
		return result[0];
	}

	static async createOrderinvoicedetails(order_invoice_id, order_id, subtotal) {
		const [result] = await db.execute('INSERT INTO orderinvoicedetails (order_invoice_id, order_id, subtotal) VALUES (?, ?, ?)', [ order_invoice_id, order_id, subtotal ]);
		return result.insertId;
	}

	static async updateOrderinvoicedetails(id, order_invoice_id, order_id, subtotal) {
		const [result] = await db.execute('UPDATE orderinvoicedetails SET order_invoice_id = ?, order_id = ?, subtotal = ? WHERE id = ?', [order_invoice_id, order_id, subtotal, id]);
		return result.affectedRows > 0;
	}

	static async deleteOrderinvoicedetails(id) {
		const [result] = await db.execute('DELETE FROM orderinvoicedetails WHERE id = ?', [id]);
		return result.affectedRows > 0;
	}

};

module.exports = Orderinvoicedetails;
