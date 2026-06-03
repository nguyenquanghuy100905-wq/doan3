const db = require('../config/db');

class Detailnews{
	static async getAllDetailnews() {
		const [result] = await db.query('SELECT * FROM detailnews');
		return result;
	}

	static async getDetailnewsById(id) {
		const [result] = await db.execute('SELECT * FROM detailnews WHERE id = ?', [id]);
		return result[0];
	}

	static async getDetailnewsByNewsId(news_id) {
		const [result] = await db.execute('SELECT * FROM detailnews WHERE news_id = ?', [news_id]);
		return result;
	}

	static async createDetailnews(news_id, content) {
		const [result] = await db.execute('INSERT INTO detailnews (news_id, content) VALUES (?, ?)', [ news_id, content ]);
		return result.insertId;
	}

	static async updateDetailnews(id, news_id, content) {
		const [result] = await db.execute('UPDATE detailnews SET news_id = ?, content = ? WHERE id = ?', [news_id, content, id]);
		return result.affectedRows > 0;
	}

	static async deleteDetailnews(id) {
		const [result] = await db.execute('DELETE FROM detailnews WHERE id = ?', [id]);
		return result.affectedRows > 0;
	}

};

module.exports = Detailnews;
