const db = require('../config/db');

class Contenttypes{
	static async getAllContenttypes() {
		const [result] = await db.query('CALL getAllContentType()');
		return result[0];
	}

	static async getContenttypesById(id) {
		const [result] = await db.execute('CALL getContenttypesById(?)', [id]);
		return result[0];
	}

	static async getContentByIdType(id) {
		const [result] = await db.execute('CALL getContentByIdType(?)', [id]);
		return result[0];
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
