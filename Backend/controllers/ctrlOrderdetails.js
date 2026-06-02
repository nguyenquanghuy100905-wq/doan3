const Orderdetails = require('../models/orderdetails')

exports.getAllOrderdetails = async (req,res) => {
	try{

		const orderdetails = await Orderdetails.getAllOrderdetails();
		res.status(200).send(orderdetails);
	} catch (error) {

		res.status(500).send({ message: error.message });
	};
};

exports.getOrderdetailsById = async (req, res) =>{
	try{

		const orderdetails = await Orderdetails.getOrderdetailsById(req.query.id);
		if (!orderdetails) return res.status(404).send({ message: 'orderdetails không tìm thấy' });
		res.status(200).send(orderdetails);
	} catch (error) {

		res.status(500).send({ message: error.message });
	};
};

exports.createOrderdetails = async (req, res) => {
	try {
		const { order_id, product_id, quantity, subtotal } = req.body;
		if (!order_id || !product_id || !quantity || !subtotal) {
			return res.status(400).json({ message: 'Vui lòng cung cấp đầy đủ thông tin bắt buộc' });
		}
		const orderdetailsId = await Orderdetails.createOrderdetails({ order_id, product_id, quantity, subtotal });
		res.status(201).send({ message: 'Tạo thành công', orderdetailsId });
	} catch (error) {
		res.status(500).send({ message: 'Lỗi server', error: error.message });
	};
};

exports.updateOrderdetails = async (req, res) => {
	try {
		const { id } = req.query;
		const { order_id, product_id, quantity, subtotal } = req.body;
		if (!order_id ||!product_id ||!quantity ||!subtotal) {
			return res.status(400).send({ message: 'Vui lòng cung cấp đầy đủ thông tin bắt buộc' });
		}
		const updatedOrderdetails = await Orderdetails.updateOrderdetails(id, {order_id, product_id, quantity, subtotal });
		if (!updatedOrderdetails){
			return res.status(404).send({ message: 'Orderdetails not found' });
		}
		res.status(200).send({ message: 'Cập nhật Orderdetails thành công', updatedOrderdetails });
	} catch (error) {
		res.status(500).send({ message: 'Lỗi server', error: error.message });
	};
};

exports.deleteOrderdetails = async (req, res) => {
	try {
		const { id } = req.query;
		const deletedOrderdetails = await Orderdetails.deleteOrderdetails(id);
		if (!deletedOrderdetails)
		{
			return res.status(404).send({message: 'Orderdetails not found' });
		}
		res.status(200).send({ message: 'Xóa Orderdetails  thành công', deletedOrderdetails });
	} catch (error) {
		res.status(500).send({ message: 'Lỗi server', error: error.message });
	};
};

