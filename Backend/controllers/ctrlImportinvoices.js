const Importinvoices = require('../models/importinvoices')

exports.getAllImportinvoices = async (req,res) => {
	try{

		const importinvoices = await Importinvoices.getAllImportinvoices();
		res.status(200).send(importinvoices);
	} catch (error) {

		res.status(500).send({ message: error.message });
	};
};

exports.getImportinvoicesById = async (req, res) =>{
	try{

		const importinvoices = await Importinvoices.getImportinvoicesById(req.query.id);
		if (!importinvoices) return res.status(404).send({ message: 'importinvoices không tìm thấy' });
		res.status(200).send(importinvoices);
	} catch (error) {

		res.status(500).send({ message: error.message });
	};
};

exports.createImportinvoices = async (req, res) => {
	try {
		const { supplier_name, total_amount, note } = req.body;
		if (!supplier_name || !total_amount || !note) {
			return res.status(400).json({ message: 'Vui lòng cung cấp đầy đủ thông tin bắt buộc' });
		}
		const importinvoicesId = await Importinvoices.createImportinvoices(supplier_name, total_amount, note );
		res.status(201).send({ message: 'Tạo thành công', importinvoicesId });
	} catch (error) {
		res.status(500).send({ message: 'Lỗi server', error: error.message });
	};
};

exports.updateImportinvoices = async (req, res) => {
	try {
		const { id } = req.query;
		const { supplier_name, total_amount, note } = req.body;
		if (!supplier_name ||!total_amount ||!note) {
			return res.status(400).send({ message: 'Vui lòng cung cấp đầy đủ thông tin bắt buộc' });
		}
		const updatedImportinvoices = await Importinvoices.updateImportinvoices(id, supplier_name, total_amount, note );
		if (!updatedImportinvoices){
			return res.status(404).send({ message: 'Importinvoices not found' });
		}
		res.status(200).send({ message: 'Cập nhật Importinvoices thành công', updatedImportinvoices });
	} catch (error) {
		res.status(500).send({ message: 'Lỗi server', error: error.message });
	};
};

exports.deleteImportinvoices = async (req, res) => {
	try {
		const { id } = req.query;
		const deletedImportinvoices = await Importinvoices.deleteImportinvoices(id);
		if (!deletedImportinvoices)
		{
			return res.status(404).send({message: 'Importinvoices not found' });
		}
		res.status(200).send({ message: 'Xóa Importinvoices  thành công', deletedImportinvoices });
	} catch (error) {
		res.status(500).send({ message: 'Lỗi server', error: error.message });
	};
};

