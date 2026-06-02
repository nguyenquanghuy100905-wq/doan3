const Orderinvoices = require('../models/orderinvoices')

exports.getAllOrderinvoices = async (req,res) => {
	try{

		const orderinvoices = await Orderinvoices.getAllOrderinvoices();
		res.status(200).send(orderinvoices);
	} catch (error) {

		res.status(500).send({ message: error.message });
	};
};

exports.getOrderinvoicesById = async (req, res) =>{
	try{

		const orderinvoices = await Orderinvoices.getOrderinvoicesById(req.query.id);
		if (!orderinvoices) return res.status(404).send({ message: 'orderinvoices không tìm thấy' });
		res.status(200).send(orderinvoices);
	} catch (error) {

		res.status(500).send({ message: error.message });
	};
};

exports.createOrderinvoices = async (req, res) => {
	try {
		const { user_id, total_amount, pay, status, note, payment_method_id } = req.body;
		if (!user_id || !total_amount || !pay || !status || !note || !payment_method_id) {
			return res.status(400).json({ message: 'Vui lòng cung cấp đầy đủ thông tin bắt buộc' });
		}
		const orderinvoicesId = await Orderinvoices.createOrderinvoices( user_id, total_amount, pay, status, note, payment_method_id );
		res.status(201).send({ message: 'Tạo thành công', orderinvoicesId });
	} catch (error) {
		res.status(500).send({ message: 'Lỗi server', error: error.message });
	};
};

exports.updateOrderinvoices = async (req, res) => {
	try {
		const { id } = req.query;
		const { user_id, total_amount, pay, status, note, payment_method_id } = req.body;
		if (!user_id ||!total_amount ||!pay ||!status ||!note ||!payment_method_id) {
			return res.status(400).send({ message: 'Vui lòng cung cấp đầy đủ thông tin bắt buộc' });
		}
		const updatedOrderinvoices = await Orderinvoices.updateOrderinvoices(id, user_id, total_amount, pay, status, note, payment_method_id );
		if (!updatedOrderinvoices){
			return res.status(404).send({ message: 'Orderinvoices not found' });
		}
		res.status(200).send({ message: 'Cập nhật Orderinvoices thành công', updatedOrderinvoices });
	} catch (error) {
		res.status(500).send({ message: 'Lỗi server', error: error.message });
	};
};

exports.deleteOrderinvoices = async (req, res) => {
	try {
		const { id } = req.query;
		const deletedOrderinvoices = await Orderinvoices.deleteOrderinvoices(id);
		if (!deletedOrderinvoices)
		{
			return res.status(404).send({message: 'Orderinvoices not found' });
		}
		res.status(200).send({ message: 'Xóa Orderinvoices  thành công', deletedOrderinvoices });
	} catch (error) {
		res.status(500).send({ message: 'Lỗi server', error: error.message });
	};
};

