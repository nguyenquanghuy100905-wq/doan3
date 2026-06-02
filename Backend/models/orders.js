const db = require('../config/db');

class Orders {
	static async getAllOrders() {
		const [result] = await db.query('call getAllOrder()');
		result[0].forEach(img => {
			img.images = img.images ? img.images.split(",") : [];
		});
		return result[0];
	}

	static async getOrdersById(id) {
		const [result] = await db.execute('call getOrdersById(?)', [id]);
		return result[0];
	}
	static async getOrdersByIdUser(id) {
		const [result] = await db.execute('call getOrdersByIdUser(?)', [id]);
		return result[0];
	}
	static async createOrders(user_id, payment_method_id, promotion_id, status, note, address, total) {
		const [result] = await db.execute('INSERT INTO orders (user_id, payment_method_id, promotion_id, status, note,address,total) VALUES (?, ?, ?, ?,?, ?, ?)', [user_id, payment_method_id, promotion_id, status, note, address, total]);
		return result.insertId;
	}

	static async updateOrders(id, status, address, note) {
		const [result] = await db.execute('UPDATE orders SET status = ?, address=?, note=? WHERE id = ?', [status, address, note, id]);
		return result.affectedRows > 0;
	}

	static async updateTotalOrder(id, total) {
		const [result] = await db.execute('UPDATE orders SET total=? WHERE id = ?', [total, id]);
		return result.affectedRows > 0;
	}

	static async deleteOrders(id) {
		const [result] = await db.execute('DELETE FROM orders WHERE id = ?', [id]);
		return result.affectedRows > 0;
	}

};

module.exports = Orders;
