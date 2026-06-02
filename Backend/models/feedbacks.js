const db = require('../config/db');

class Feedbacks{
	static async getAllFeedbacks() {
		const [result] = await db.query('Call getAllFeedbacks()');
		return result[0];
	}
	static async getFeedbacksById(id) {
		const [result] = await db.execute('Call getFeedbacksById(?)', [id]);
		return result[0];
	}
	static async getFeedbacksByIdUser(id) {
		const [result] = await db.execute('Call getFeedbacksByIdUser(?)', [id]);
		return result[0];
	}
	static async getFeedbacksByIdProduct(id) {
		const [result] = await db.execute('Call getFeedbacksByIdProduct(?)', [id]);
		return result[0];
	}
	static async getCountFeedbackByIdProduct(id) {
		const [result] = await db.execute('Call getCountFeedbackByIdProduct(?)', [id]);
		return result[0];
	}
	static async createFeedbacks(user_id, product_id, star, content, image_path) {
		const [result] = await db.execute('INSERT INTO feedbacks (user_id, product_id, star, content, image_path) VALUES (?, ?, ?, ?, ?)', [ user_id, product_id, star, content, image_path ]);
		return result.insertId;
	}

	static async updateFeedbacks(id, user_id, product_id, star, content, image_path) {
		const [result] = await db.execute('UPDATE feedbacks SET user_id = ?, product_id = ?, star = ?, content = ?, image_path = ? WHERE id = ?', [user_id, product_id, star, content, image_path, id]);
		return result.affectedRows > 0;
	}

	static async deleteFeedbacks(id) {
		const [result] = await db.execute('DELETE FROM feedbacks WHERE id = ?', [id]);
		return result.affectedRows > 0;
	}

};

module.exports = Feedbacks;
