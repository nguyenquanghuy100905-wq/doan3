const db = require('../config/db');

class Categories {
	static async getAllCategories() {
		const [result] = await db.execute('SELECT * FROM categories');
		return result;
	}

	static async getCategoriesAndQuantity() {
		const [result] = await db.query('Call getAllCategories()');
		return result[0];
	}

	static async getCategoriesById(id) {
		const [result] = await db.execute('SELECT * FROM categories WHERE id = ?', [id]);
		return result[0];
	}

	static async createCategories(name, description, image) {
		const [result] = await db.execute('INSERT INTO categories (name, description,image) VALUES (?, ?,?)', [name, description, image]);
		return result.insertId;
	}

	static async updateCategories(id, name, description, image) {
		const [result] = await db.execute('UPDATE categories SET name = ?, description = ?,image=? WHERE id = ?', [name, description, image, id]);
		return result.affectedRows > 0;
	}

	static async deleteCategories(id) {
		const [result] = await db.execute('DELETE FROM categories WHERE id = ?', [id]);
		return result.affectedRows > 0;
	}

};

module.exports = Categories;
