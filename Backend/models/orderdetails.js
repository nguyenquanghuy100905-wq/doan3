const db = require('../config/db');

class Orderdetails{

	static async getAllOrderdetails() {
		const [result] = await db.query('SELECT * FROM orderdetails');
		return result;
	}

	static async getOrderdetailsById(id) {
		const [result] = await db.execute('SELECT * FROM orderdetails WHERE order_id = ?', [id]);
		return result;
	}

	static async createOrderdetails(order_id, product_id, quantity, subtotal) {
		const [result] = await db.execute('INSERT INTO orderdetails (order_id, product_id, quantity, subtotal) VALUES (?, ?, ?, ?)', [ order_id, product_id, quantity, subtotal ]);
		return result.insertId;
	}

	static async updateOrderdetails(id, order_id, product_id, quantity, subtotal) {
		const [result] = await db.execute('UPDATE orderdetails SET order_id = ?, product_id = ?, quantity = ?, subtotal WHERE id = ?', [order_id, product_id, quantity, subtotal, id]);
		return result.affectedRows > 0;
	}

	static async deleteOrderdetails(id) {
		const [result] = await db.execute('DELETE FROM orderdetails WHERE order_id = ?', [id]);
		return result.affectedRows > 0;
	}

};

module.exports = Orderdetails;
