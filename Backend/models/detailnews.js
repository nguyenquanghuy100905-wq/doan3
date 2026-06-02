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

	static async createDetailnews(news_id, title_news, content_news) {
		const [result] = await db.execute('INSERT INTO detailnews (news_id, title_news, content_news) VALUES (?, ?, ?)', [ news_id, title_news, content_news ]);
		return result.insertId;
	}

	static async updateDetailnews(id, news_id, title_news, content_news) {
		const [result] = await db.execute('UPDATE detailnews SET news_id = ?, title_news = ?, content_news = ? WHERE id = ?', [news_id, title_news, content_news, id]);
		return result.affectedRows > 0;
	}

	static async deleteDetailnews(id) {
		const [result] = await db.execute('DELETE FROM detailnews WHERE id = ?', [id]);
		return result.affectedRows > 0;
	}

};

module.exports = Detailnews;
