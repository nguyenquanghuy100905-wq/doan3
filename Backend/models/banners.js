const db = require('../config/db');

class Banners{
	static async getAllBanners() {
		const [result] = await db.query('SELECT * FROM banners');
		return result;
	}

	static async getBannersById(id) {
		const [result] = await db.execute('SELECT * FROM banners WHERE id = ?', [id]);
		return result[0];
	}

	static async createBanners(image_path) {
		const [result] = await db.execute('INSERT INTO banners (image_path) VALUES (?)', [ image_path ]);
		return result.insertId;
	}

	static async updateBanners(id, image_path) {
		const [result] = await db.execute('UPDATE banners SET image_path = ? WHERE id = ?', [image_path, id]);
		return result.affectedRows > 0;
	}

	static async deleteBanners(id) {
		const [result] = await db.execute('DELETE FROM banners WHERE id = ?', [id]);
		return result.affectedRows > 0;
	}

};

module.exports = Banners;
