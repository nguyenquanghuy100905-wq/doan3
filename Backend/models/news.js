const db = require('../config/db');

class News{
	static async getAllNews() {
		const [result] = await db.query('SELECT * FROM news');
		return result;
	}

	static async getNewsById(id) {
		const [result] = await db.execute('SELECT * FROM news WHERE id = ?', [id]);
		return result[0];
	}

	static async createNews(title, content, image_path) {
		const [result] = await db.execute('INSERT INTO news (title, content, image_path) VALUES (?, ?, ?)', [ title, content, image_path ]);
		return result.insertId;
	}

	static async updateNews(id, title, content, image_path) {
		const [result] = await db.execute('UPDATE news SET title = ?, content = ?, image_path = ? WHERE id = ?', [title, content, image_path, id]);
		return result.affectedRows > 0;
	}

	static async deleteNews(id) {
		const [result] = await db.execute('DELETE FROM news WHERE id = ?', [id]);
		return result.affectedRows > 0;
	}

};

module.exports = News;
