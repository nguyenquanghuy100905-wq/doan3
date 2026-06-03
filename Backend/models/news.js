const db = require('../config/db');

class News{
	static async getAllNews() {
		const [result] = await db.query('SELECT * FROM news ORDER BY created_at DESC');
		return result;
	}

	static async getNewsById(id) {
		const [result] = await db.execute('SELECT * FROM news WHERE id = ?', [id]);
		return result[0];
	}

	static async createNews(title, summary, image_path) {
		const [result] = await db.execute('INSERT INTO news (title, summary, image_path) VALUES (?, ?, ?)', [ title, summary, image_path ]);
		return result.insertId;
	}

	static async updateNews(id, title, summary, image_path) {
		const [result] = await db.execute('UPDATE news SET title = ?, summary = ?, image_path = ? WHERE id = ?', [title, summary, image_path, id]);
		return result.affectedRows > 0;
	}

	static async deleteNews(id) {
		const [result] = await db.execute('DELETE FROM news WHERE id = ?', [id]);
		return result.affectedRows > 0;
	}

};

module.exports = News;
