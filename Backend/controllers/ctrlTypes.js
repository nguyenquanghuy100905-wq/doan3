const Types = require('../models/types')

exports.getAllTypes = async (req,res) => {
	try{

		const types = await Types.getAllTypes();
		res.status(200).send(types);
	} catch (error) {

		res.status(500).send({ message: error.message });
	};
};

exports.getTypesById = async (req, res) =>{
	try{

		const types = await Types.getTypesById(req.query.id);
		if (!types) return res.status(404).send({ message: 'types không tìm thấy' });
		res.status(200).send(types);
	} catch (error) {

		res.status(500).send({ message: error.message });
	};
};

exports.createTypes = async (req, res) => {
	try {
		const { name } = req.body;
		if (!name) {
			return res.status(400).json({ message: 'Vui lòng cung cấp đầy đủ thông tin bắt buộc' });
		}
		const typesId = await Types.createTypes( name );
		res.status(201).send({ message: 'Tạo thành công', typesId });
	} catch (error) {
		res.status(500).send({ message: 'Lỗi server', error: error.message });
	};
};

exports.updateTypes = async (req, res) => {
	try {
		const { id } = req.query;
		const { name } = req.body;
		if (!id) {
			return res.status(400).send({ message: 'Vui lòng cung cấp ID loại sản phẩm' });
		}
		if (!name) {
			return res.status(400).send({ message: 'Vui lòng cung cấp đầy đủ thông tin bắt buộc' });
		}
		const updatedTypes = await Types.updateTypes(id, name);
		if (!updatedTypes){
			return res.status(404).send({ message: 'Không tìm thấy loại sản phẩm' });
		}
		res.status(200).send({ message: 'Cập nhật loại sản phẩm thành công', updatedTypes });
	} catch (error) {
		console.error("Lỗi cập nhật loại sản phẩm:", error);
		res.status(500).send({ message: 'Lỗi server', error: error.message });
	};
};

exports.deleteTypes = async (req, res) => {
	try {
		const { id } = req.query;
		if (!id) {
			return res.status(400).send({ message: 'Vui lòng cung cấp ID loại sản phẩm' });
		}

		// Xóa các bản ghi liên quan trước khi xóa loại sản phẩm (foreign key constraints)
		const db = require("../config/db");
		// Xóa các bản ghi liên quan đến sản phẩm thuộc loại này
		const [products] = await db.execute("SELECT id FROM products WHERE type_id = ?", [id]);
		for (const product of products) {
			await db.execute("DELETE FROM imageproducts WHERE product_id = ?", [product.id]);
			await db.execute("DELETE FROM feedbacks WHERE product_id = ?", [product.id]);
			await db.execute("DELETE FROM cartdetails WHERE product_id = ?", [product.id]);
			await db.execute("DELETE FROM orderdetails WHERE product_id = ?", [product.id]);
			await db.execute("DELETE FROM importinvoicedetails WHERE product_id = ?", [product.id]);
		}
		await db.execute("DELETE FROM products WHERE type_id = ?", [id]);
		await db.execute("DELETE FROM contenttypes WHERE type_id = ?", [id]);

		const deletedTypes = await Types.deleteTypes(id);
		if (!deletedTypes)
		{
			return res.status(404).send({ message: 'Không tìm thấy loại sản phẩm' });
		}
		res.status(200).send({ message: 'Xóa loại sản phẩm thành công', deletedTypes });
	} catch (error) {
		console.error("Lỗi xóa loại sản phẩm:", error);
		res.status(500).send({ message: 'Lỗi server', error: error.message });
	};
};

