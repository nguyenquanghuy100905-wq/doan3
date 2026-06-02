const Importinvoicedetails = require('../models/importinvoicedetails')

exports.getAllImportinvoicedetails = async (req,res) => {
	try{

		const importinvoicedetails = await Importinvoicedetails.getAllImportinvoicedetails();
		res.status(200).send(importinvoicedetails);
	} catch (error) {

		res.status(500).send({ message: error.message });
	};
};

exports.getImportinvoicedetailsById = async (req, res) =>{
	try{

		const importinvoicedetails = await Importinvoicedetails.getImportinvoicedetailsById(req.query.id);
		if (!importinvoicedetails) return res.status(404).send({ message: 'importinvoicedetails không tìm thấy' });
		res.status(200).send(importinvoicedetails);
	} catch (error) {

		res.status(500).send({ message: error.message });
	};
};

exports.createImportinvoicedetails = async (req, res) => {
	try {
		const { import_invoice_id, product_id, quantity, unit_price, subtotal } = req.body;
		if (!import_invoice_id || !product_id || !quantity || !unit_price || !subtotal) {
			return res.status(400).json({ message: 'Vui lòng cung cấp đầy đủ thông tin bắt buộc' });
		}
		const importinvoicedetailsId = await Importinvoicedetails.createImportinvoicedetails( import_invoice_id, product_id, quantity, unit_price, subtotal );
		res.status(201).send({ message: 'Tạo thành công', importinvoicedetailsId });
	} catch (error) {
		res.status(500).send({ message: 'Lỗi server', error: error.message });
	};
};

exports.updateImportinvoicedetails = async (req, res) => {
	try {
		const { id } = req.query;
		const { import_invoice_id, product_id, quantity, unit_price, subtotal } = req.body;
		if (!import_invoice_id ||!product_id ||!quantity ||!unit_price ||!subtotal) {
			return res.status(400).send({ message: 'Vui lòng cung cấp đầy đủ thông tin bắt buộc' });
		}
		const updatedImportinvoicedetails = await Importinvoicedetails.updateImportinvoicedetails(id, import_invoice_id, product_id, quantity, unit_price, subtotal );
		if (!updatedImportinvoicedetails){
			return res.status(404).send({ message: 'Importinvoicedetails not found' });
		}
		res.status(200).send({ message: 'Cập nhật Importinvoicedetails thành công', updatedImportinvoicedetails });
	} catch (error) {
		res.status(500).send({ message: 'Lỗi server', error: error.message });
	};
};

exports.deleteImportinvoicedetails = async (req, res) => {
	try {
		const { id } = req.query;
		const deletedImportinvoicedetails = await Importinvoicedetails.deleteImportinvoicedetails(id);
		if (!deletedImportinvoicedetails)
		{
			return res.status(404).send({message: 'Importinvoicedetails not found' });
		}
		res.status(200).send({ message: 'Xóa Importinvoicedetails  thành công', deletedImportinvoicedetails });
	} catch (error) {
		res.status(500).send({ message: 'Lỗi server', error: error.message });
	};
};

