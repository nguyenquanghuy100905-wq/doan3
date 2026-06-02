const db = require('../config/db');

class Contacts{
	static async getAllContacts() {
		const [result] = await db.query('SELECT * FROM contacts');
		return result;
	}

	static async getContactsById(id) {
		const [result] = await db.execute('SELECT * FROM contacts WHERE id = ?', [id]);
		return result[0];
	}

	static async createContacts(name, email, phone, message) {
		const [result] = await db.execute('INSERT INTO contacts (name, email, phone, message) VALUES (?, ?, ?, ?)', [ name, email, phone, message ]);
		return result.insertId;
	}

	static async updateContacts(id, name, email, phone, message) {
		const [result] = await db.execute('UPDATE contacts SET name = ?, email = ?, phone = ?, message = ? WHERE id = ?', [name, email, phone, message, id]);
		return result.affectedRows > 0;
	}

	static async deleteContacts(id) {
		const [result] = await db.execute('DELETE FROM contacts WHERE id = ?', [id]);
		return result.affectedRows > 0;
	}

};

module.exports = Contacts;
