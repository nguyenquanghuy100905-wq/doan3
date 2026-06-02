const Promotions = require('../models/promotions')

exports.getAllPromotions = async (req,res) => {
	try{

		const promotions = await Promotions.getAllPromotions();
		res.status(200).send(promotions);
	} catch (error) {

		res.status(500).send({ message: error.message });
	};
};

exports.getPromotionsById = async (req, res) =>{
	try{

		const promotions = await Promotions.getPromotionsById(req.query.id);
		if (!promotions) return res.status(404).send({ message: 'promotions không tìm thấy' });
		res.status(200).send(promotions);
	} catch (error) {
		res.status(500).send({ message: error.message });
	};
};

exports.createPromotions = async (req, res) => {
	try {
		const {id, title, description, discount_percentage, start_date, end_date, quantity_promotion, is_active } = req.body;
		if (!id || !title || !description || !discount_percentage || !start_date || !end_date || !quantity_promotion || is_active === undefined) {
			return res.status(400).json({ message: 'Vui lòng cung cấp đầy đủ thông tin bắt buộc' });
		}
		await Promotions.createPromotions(id, title, description, discount_percentage, start_date, end_date, quantity_promotion, is_active );
		res.status(201).send({ message: 'Tạo thành công', id});
	} catch (error) {
		res.status(500).send({ message: 'Lỗi server', error: error.message });
	};
};

exports.updatePromotions = async (req, res) => {
	try {
		const { id } = req.query;
		const { title, description, discount_percentage, start_date, end_date, quantity_promotion, is_active } = req.body;
		if (!title || !description || !discount_percentage || !start_date || !end_date || !quantity_promotion || is_active === undefined) {
			return res.status(400).send({ message: 'Vui lòng cung cấp đầy đủ thông tin bắt buộc' });
		}
		const updatedPromotions = await Promotions.updatePromotions(id, title, description, discount_percentage, start_date, end_date, quantity_promotion, is_active );
		if (!updatedPromotions){
			return res.status(404).send({ message: 'Promotions not found' });
		}
		res.status(200).send({ message: 'Cập nhật Promotions thành công', updatedPromotions });
	} catch (error) {
		res.status(500).send({ message: 'Lỗi server', error: error.message });
	};
};

exports.deletePromotions = async (req, res) => {
	try {
		const { id } = req.query;
		const deletedPromotions = await Promotions.deletePromotions(id);
		if (!deletedPromotions)
		{
			return res.status(404).send({message: 'Promotions not found' });
		}
		res.status(200).send({ message: 'Xóa Promotions  thành công', deletedPromotions });
	} catch (error) {
		res.status(500).send({ message: 'Lỗi server', error: error.message });
	};
};

