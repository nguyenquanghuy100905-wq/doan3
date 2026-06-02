const db = require('../config/db');

class Types{
	static async getAllTypes() {
		const [result] = await db.query('SELECT * FROM types');
		return result;
	}

	static async getTypesById(id) {
		const [result] = await db.execute('SELECT * FROM types WHERE id = ?', [id]);
		return result[0];
	}

	static async createTypes(name) {
		const [result] = await db.execute('INSERT INTO types (name) VALUES (?)', [ name ]);
		return result.insertId;
	}

	static async updateTypes(id, name) {
		const [result] = await db.execute('UPDATE types SET name = ? WHERE id = ?', [name, id]);
		return result.affectedRows > 0;
	}

	static async deleteTypes(id) {
		const [result] = await db.execute('DELETE FROM types WHERE id = ?', [id]);
		return result.affectedRows > 0;
	}

};

module.exports = Types;
