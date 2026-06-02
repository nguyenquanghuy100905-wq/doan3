const db = require('../config/db');

class Promotions{
	static async getAllPromotions() {
		const [result] = await db.query('SELECT * FROM promotions');
		return result;
	}

	static async getPromotionsById(id) {
		const [result] = await db.execute('SELECT * FROM promotions WHERE id = ?', [id]);
		return result[0];
	}

	static async createPromotions(id,title, description, discount_percentage, start_date, end_date, quantity_promotion, is_active) {
		const [result] = await db.execute('INSERT INTO promotions (id, title, description, discount_percentage, start_date, end_date, quantity_promotion, is_active) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [id, title, description, discount_percentage, start_date, end_date, quantity_promotion, is_active ]);
		return result.insertId;
	}

	static async updatePromotions(id, title, description, discount_percentage, start_date, end_date, quantity_promotion, is_active) {
		const [result] = await db.execute('UPDATE promotions SET title = ?, description = ?, discount_percentage = ?, start_date = ?, end_date = ?, quantity_promotion = ?, is_active = ? WHERE id = ?', [title, description, discount_percentage, start_date, end_date, quantity_promotion, is_active, id]);
		return result.affectedRows > 0;
	}

	static async updateQuantityPromotion(id, quantity_promotion) {
		const [result] = await db.execute('UPDATE promotions SET quantity_promotion = ? WHERE id = ?', [quantity_promotion, id]);
		return result.affectedRows > 0;
	}

	static async deletePromotions(id) {
		const [result] = await db.execute('DELETE FROM promotions WHERE id = ?', [id]);
		return result.affectedRows > 0;
	}
};

module.exports = Promotions;
