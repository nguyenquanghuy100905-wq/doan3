const db = require('../config/db');
const MahoaPass = require('../middleware/mahoaPass');
class Users{
	static async getAllUsers() {
		const [result] = await db.query('SELECT * FROM users');
		return result;
	}

	static async getUsersById(id) {
		const [result] = await db.execute('SELECT * FROM users WHERE id = ?', [id]);
		return result[0];
	}
	static async getAdressById(id) {
		const [result] = await db.execute('SELECT address FROM users WHERE id =?', [id]);
        return result[0].address;
	}
	static async createUsers(username, password, name, birthday, sex, address, email, phone, image, role_user, ban) {
		const passwordMH = await MahoaPass.maHoa(password);
		const [result] = await db.execute('INSERT INTO users (username, password, name, birthday, sex, address, email, phone, image, role_user, ban) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [ username, passwordMH, name, birthday, sex, address, email, phone, image, role_user, ban ]);
		return result.insertId;
	}

	static async updateUsers(id, username, password, name, birthday, sex, address, email, phone, image, role_user, ban) {
		const [result] = await db.execute('SELECT * FROM users WHERE id = ?', [id]);
		if (!result[0]) return false;
		let passwordMH = result[0].password; 
		if (password) {
			passwordMH = await MahoaPass.maHoa(password);
		}
		const [resultupdate] = await db.execute(
			`UPDATE users 
			SET username = ?, password = ?, name = ?, birthday = ?, sex = ?, 
				address = ?, email = ?, phone = ?, image = ?, role_user = ?, ban = ? 
			WHERE id = ?`, 
			[username, passwordMH, name, birthday, sex, address, email, phone, image, role_user, ban, id]
		);
	
		return resultupdate.affectedRows > 0; 
	}
	

	static async deleteUsers(id) {
		const [result] = await db.execute('DELETE FROM users WHERE id = ?', [id]);
		return result.affectedRows > 0;
	}

	static async login(username, password){
		const [result] = await db.execute('SELECT * FROM users WHERE username =?', [username]);
		const user = result[0];
		if (!user) {
			return null;
		}
		const checkPassword = await MahoaPass.giaiMa(password, user.password);
        return checkPassword ? user : null;
	}

	static async getUserByEmail(email){
        const [result] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
        return result[0];
    }
	static async getUserByPhone(phone){
        const [result] = await db.execute('SELECT * FROM users WHERE phone =?', [phone]);
        return result[0];
    }
	static async getUserByUsername(username){
        const [result] = await db.execute('SELECT * FROM users WHERE username =?', [username]);
        return result[0];
    }
	static async register(username, password, name, birthday, address,email, phone){
		const passwordMH = await MahoaPass.maHoa(password);
		const defaultAvatar = '/public/images/default-avatar.svg';
		const [result] = await db.execute('INSERT INTO users (username, password, name, birthday, address, email, phone, image) VALUES (?,?,?,?,?,?,?,?)', [username, passwordMH, name, birthday, address, email, phone, defaultAvatar]);
        return result.insertId;
    }
	static async updatePassword(id, password){
        const passwordMH = await MahoaPass.maHoa(password);
        const [result] = await db.execute('UPDATE users SET password =? WHERE id =?', [passwordMH, id]);
        return result.affectedRows > 0;
    }
};

module.exports = Users;
