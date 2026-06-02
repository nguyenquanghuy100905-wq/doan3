const Cart = require('../models/cart')

exports.getAllCart = async (req, res) => {
	try {

		const cart = await Cart.getAllCart(req.query.id);
		res.status(200).send(cart);
	} catch (error) {

		res.status(500).send({ message: error.message });
	};
};

exports.createCart = async (req, res) => {
    try{
		const { userId, productId, newquantity} = req.body;
		if (!userId || !productId || !newquantity || newquantity <= 0) {
            return res.status(400).json({ message: "Vui lòng cung cấp đầy đủ thông tin hợp lệ" });
        }
		const cart = await Cart.createCart(userId, productId, newquantity);
		res.status(201).send("Thêm vào giỏ hàng thành công");
	}catch (error) {
		res.status(500).send({ message: error.message });
	}
};

exports.updateCart = async (req, res) => {
	try{
		const { userId, productId,newquantity } = req.body;
		if (!userId || !productId || !newquantity || newquantity <= 0) {
            return res.status(400).json({ message: "Vui lòng cung cấp đầy đủ thông tin hợp lệ" });
        }
        const updatedCart = await Cart.updateCart(userId, productId, newquantity);
        if (!updatedCart) {
            return res.status(404).send({ message: 'Cart not found' });
        }
        res.status(200).send({ message: 'Cập nhật Cart thành công', updatedCart });
	}
	catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.deleteCart = async (req, res) => {
	try {
		const { userId , productId} = req.body;
		const deletedCart = await Cart.deleteCart(userId, productId);
		if (!deletedCart) {
            return res.status(404).send({ message: 'Cart not found' });
        }
		res.status(200).send({ message: 'Xóa sản phẩm khỏi giỏ hàng thành công', deletedCart });
	} catch (error) {
		res.status(500).send({ message: 'Lỗi server', error: error.message });
	};
};

