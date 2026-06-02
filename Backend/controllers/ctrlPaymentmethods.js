const Paymentmethods = require('../models/paymentmethods')

exports.getAllPaymentmethods = async (req,res) => {
	try{

		const paymentmethods = await Paymentmethods.getAllPaymentmethods();
		res.status(200).send(paymentmethods);
	} catch (error) {

		res.status(500).send({ message: error.message });
	};
};

exports.getPaymentmethodsById = async (req, res) =>{
	try{

		const paymentmethods = await Paymentmethods.getPaymentmethodsById(req.query.id);
		if (!paymentmethods) return res.status(404).send({ message: 'paymentmethods không tìm thấy' });
		res.status(200).send(paymentmethods);
	} catch (error) {

		res.status(500).send({ message: error.message });
	};
};

exports.createPaymentmethods = async (req, res) => {
	try {
		const { name, img_payment, description } = req.body;
		if (!name || !img_payment || !description) {
			return res.status(400).json({ message: 'Vui lòng cung cấp đầy đủ thông tin bắt buộc' });
		}
		const paymentmethodsId = await Paymentmethods.createPaymentmethods(name, img_payment, description );
		res.status(201).send({ message: 'Tạo thành công', paymentmethodsId });
	} catch (error) {
		res.status(500).send({ message: 'Lỗi server', error: error.message });
	};
};

exports.updatePaymentmethods = async (req, res) => {
	try {
		const { id } = req.query;
		const { name, img_payment, description } = req.body;
		if (!name ||!img_payment ||!description) {
			return res.status(400).send({ message: 'Vui lòng cung cấp đầy đủ thông tin bắt buộc' });
		}
		const updatedPaymentmethods = await Paymentmethods.updatePaymentmethods(id, name, img_payment, description );
		if (!updatedPaymentmethods){
			return res.status(404).send({ message: 'Paymentmethods not found' });
		}
		res.status(200).send({ message: 'Cập nhật Paymentmethods thành công', updatedPaymentmethods });
	} catch (error) {
		res.status(500).send({ message: 'Lỗi server', error: error.message });
	};
};

exports.deletePaymentmethods = async (req, res) => {
	try {
		const { id } = req.query;
		const deletedPaymentmethods = await Paymentmethods.deletePaymentmethods(id);
		if (!deletedPaymentmethods)
		{
			return res.status(404).send({message: 'Paymentmethods not found' });
		}
		res.status(200).send({ message: 'Xóa Paymentmethods  thành công', deletedPaymentmethods });
	} catch (error) {
		res.status(500).send({ message: 'Lỗi server', error: error.message });
	};
};

