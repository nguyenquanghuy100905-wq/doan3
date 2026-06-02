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
		if (!name) {
			return res.status(400).send({ message: 'Vui lòng cung cấp đầy đủ thông tin bắt buộc' });
		}
		const updatedTypes = await Types.updateTypes(id,name);
		if (!updatedTypes){
			return res.status(404).send({ message: 'Types not found' });
		}
		res.status(200).send({ message: 'Cập nhật Types thành công', updatedTypes });
	} catch (error) {
		res.status(500).send({ message: 'Lỗi server', error: error.message });
	};
};

exports.deleteTypes = async (req, res) => {
	try {
		const { id } = req.query;
		const deletedTypes = await Types.deleteTypes(id);
		if (!deletedTypes)
		{
			return res.status(404).send({message: 'Types not found' });
		}
		res.status(200).send({ message: 'Xóa Types  thành công', deletedTypes });
	} catch (error) {
		res.status(500).send({ message: 'Lỗi server', error: error.message });
	};
};

