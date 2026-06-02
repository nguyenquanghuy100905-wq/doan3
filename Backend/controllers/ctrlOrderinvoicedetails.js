const Orderinvoicedetails = require('../models/orderinvoicedetails')

exports.getAllOrderinvoicedetails = async (req,res) => {
	try{

		const orderinvoicedetails = await Orderinvoicedetails.getAllOrderinvoicedetails();
		res.status(200).send(orderinvoicedetails);
	} catch (error) {

		res.status(500).send({ message: error.message });
	};
};

exports.getOrderinvoicedetailsById = async (req, res) =>{
	try{

		const orderinvoicedetails = await Orderinvoicedetails.getOrderinvoicedetailsById(req.query.id);
		if (!orderinvoicedetails) return res.status(404).send({ message: 'orderinvoicedetails không tìm thấy' });
		res.status(200).send(orderinvoicedetails);
	} catch (error) {

		res.status(500).send({ message: error.message });
	};
};

exports.createOrderinvoicedetails = async (req, res) => {
	try {
		const { order_invoice_id, order_id, subtotal } = req.body;
		if (!order_invoice_id || !order_id || !subtotal) {
			return res.status(400).json({ message: 'Vui lòng cung cấp đầy đủ thông tin bắt buộc' });
		}
		const orderinvoicedetailsId = await Orderinvoicedetails.createOrderinvoicedetails( order_invoice_id, order_id, subtotal );
		res.status(201).send({ message: 'Tạo thành công', orderinvoicedetailsId });
	} catch (error) {
		res.status(500).send({ message: 'Lỗi server', error: error.message });
	};
};

exports.updateOrderinvoicedetails = async (req, res) => {
	try {
		const { id } = req.query;
		const { order_invoice_id, order_id, subtotal } = req.body;
		if (!order_invoice_id ||!order_id ||!subtotal) {
			return res.status(400).send({ message: 'Vui lòng cung cấp đầy đủ thông tin bắt buộc' });
		}
		const updatedOrderinvoicedetails = await Orderinvoicedetails.updateOrderinvoicedetails(id, order_invoice_id, order_id, subtotal );
		if (!updatedOrderinvoicedetails){
			return res.status(404).send({ message: 'Orderinvoicedetails not found' });
		}
		res.status(200).send({ message: 'Cập nhật Orderinvoicedetails thành công', updatedOrderinvoicedetails });
	} catch (error) {
		res.status(500).send({ message: 'Lỗi server', error: error.message });
	};
};

exports.deleteOrderinvoicedetails = async (req, res) => {
	try {
		const { id } = req.query;
		const deletedOrderinvoicedetails = await Orderinvoicedetails.deleteOrderinvoicedetails(id);
		if (!deletedOrderinvoicedetails)
		{
			return res.status(404).send({message: 'Orderinvoicedetails not found' });
		}
		res.status(200).send({ message: 'Xóa Orderinvoicedetails  thành công', deletedOrderinvoicedetails });
	} catch (error) {
		res.status(500).send({ message: 'Lỗi server', error: error.message });
	};
};

