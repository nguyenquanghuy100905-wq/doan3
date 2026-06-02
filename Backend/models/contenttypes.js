const db = require('../config/db');

class Contenttypes{
	static async getAllContenttypes() {
		const [result] = await db.query(
			'SELECT ct.id, ct.type_id, t.name AS type_name, ct.title, ct.content, ct.image_path, ct.created_at, ct.updated_at FROM contenttypes ct INNER JOIN types t ON ct.type_id = t.id'
		);
		return result;
	}

	static async getContenttypesById(id) {
		const [result] = await db.execute(
			'SELECT ct.id, ct.type_id, t.name AS type_name, ct.title, ct.content, ct.image_path, ct.created_at, ct.updated_at FROM contenttypes ct INNER JOIN types t ON ct.type_id = t.id WHERE ct.id = ?',
			[id]
		);
		return result[0];
	}

	static async getContentByIdType(id) {
		const [result] = await db.execute(
			'SELECT ct.id, ct.type_id, t.name AS type_name, ct.title, ct.content, ct.image_path, ct.created_at, ct.updated_at FROM contenttypes ct INNER JOIN types t ON ct.type_id = t.id WHERE ct.type_id = ?',
			[id]
		);
		return result;
	}
	static async getImgContentById(id) {
		const [result] = await db.execute('SELECT image_path FROM contenttypes WHERE id =? ', [id]);
        return result[0].image_path;
	}
	static async createContenttypes(type_id, title, content, image_path) {
		const [result] = await db.execute('INSERT INTO contenttypes (type_id, title, content, image_path) VALUES (?, ?, ?, ?)', [ type_id, title, content, image_path ]);
		return result.insertId;
	}

	static async updateContenttypes(id, type_id, title, content, image_path) {
		const [result] = await db.execute(
			'UPDATE contenttypes SET type_id = ?, title = ?, content = ?, image_path = ? WHERE id = ?', 
			[type_id, title, content, image_path, id]
		);
		return result.affectedRows > 0;
	}
	static async deleteContenttypes(id) {
		const [result] = await db.execute('DELETE FROM contenttypes WHERE id = ?', [id]);
		return result.affectedRows > 0;
	}

};

module.exports = Contenttypes;
