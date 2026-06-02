const db = require('../config/db');

class Cart{
	static async getAllCart(id) {
		const [result] = await db.execute('CALL getCartByUserId(?)', [id])
		result[0].forEach(img => {
			img.images = img.images ? img.images.split(",") : [];
		});
		return result[0];
	}

	static async createCart(userId,productId,newquantity) {
		const [result] = await db.execute('CALL addProductToCart(?,?,?)', [userId,productId,newquantity]);
		return result;
	}

	static async updateCart(userId,productId,newquantity) {
        const [result] = await db.execute('call UpdateCartQuantity(?,?,?)', [userId,productId,newquantity]);
        return result.affectedRows > 0;
    }
	static async deleteCart(userId,productId) {
		const [result] = await db.execute('call deleteProductFromCart(?,?)', [userId,productId]);
		return result.affectedRows > 0;
	}
	static async deleteCartDetail(user_id){
		const [result] = await db.execute("DELETE FROM Cart WHERE user_id = ?",[user_id])
		return result.affectedRows > 0;
	}
};

module.exports = Cart;
