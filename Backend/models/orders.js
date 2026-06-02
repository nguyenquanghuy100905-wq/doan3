const db = require('../config/db');

function processOrderItems(items) {
	if (!items) return [];
	items.forEach(item => {
		let imgArr = [];
		if (item.image) {
			if (Array.isArray(item.image)) {
				imgArr = item.image;
			} else if (typeof item.image === 'string') {
				try {
					imgArr = JSON.parse(item.image);
				} catch (e) {
					imgArr = item.image.split(',');
				}
			}
		} else if (item.images) {
			if (Array.isArray(item.images)) {
				imgArr = item.images;
			} else if (typeof item.images === 'string') {
				try {
					imgArr = JSON.parse(item.images);
				} catch (e) {
					imgArr = item.images.split(',');
				}
			}
		}
		// Filter out null or undefined values from JSON_ARRAYAGG
		imgArr = (imgArr || []).filter(img => img !== null && img !== undefined);
		item.image = imgArr;
		item.images = imgArr;
	});
	return items;
}

class Orders {
	static async getAllOrders() {
		const [result] = await db.query('call getAllOrders()');
		return processOrderItems(result[0]);
	}

	static async getOrdersById(id) {
		const [result] = await db.execute('call getOrdersById(?)', [id]);
		return processOrderItems(result[0]);
	}
	static async getOrdersByIdUser(id) {
		const [result] = await db.execute('call getOrdersByIdUser(?)', [id]);
		return processOrderItems(result[0]);
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
