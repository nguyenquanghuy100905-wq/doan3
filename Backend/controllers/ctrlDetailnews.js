const Detailnews = require('../models/detailnews')

exports.getAllDetailnews = async (req,res) => {
	try{

		const detailnews = await Detailnews.getAllDetailnews();
		res.status(200).send(detailnews);
	} catch (error) {

		res.status(500).send({ message: error.message });
	};
};

exports.getDetailnewsById = async (req, res) =>{
	try{

		const detailnews = await Detailnews.getDetailnewsById(req.query.id);
		if (!detailnews) return res.status(404).send({ message: 'detailnews không tìm thấy' });
		res.status(200).send(detailnews);
	} catch (error) {

		res.status(500).send({ message: error.message });
	};
};

exports.createDetailnews = async (req, res) => {
	try {
		const { news_id, title_news, content_news } = req.body;
		if (!news_id || !title_news || !content_news) {
			return res.status(400).json({ message: 'Vui lòng cung cấp đầy đủ thông tin bắt buộc' });
		}
		const detailnewsId = await Detailnews.createDetailnews( news_id, title_news, content_news );
		res.status(201).send({ message: 'Tạo thành công', detailnewsId });
	} catch (error) {
		res.status(500).send({ message: 'Lỗi server', error: error.message });
	};
};

exports.updateDetailnews = async (req, res) => {
	try {
		const { id } = req.query;
		const { news_id, title_news, content_news } = req.body;
		if (!news_id ||!title_news ||!content_news) {
			return res.status(400).send({ message: 'Vui lòng cung cấp đầy đủ thông tin bắt buộc' });
		}
		const updatedDetailnews = await Detailnews.updateDetailnews(id, news_id, title_news, content_news );
		if (!updatedDetailnews){
			return res.status(404).send({ message: 'Detailnews not found' });
		}
		res.status(200).send({ message: 'Cập nhật Detailnews thành công', updatedDetailnews });
	} catch (error) {
		res.status(500).send({ message: 'Lỗi server', error: error.message });
	};
};

exports.deleteDetailnews = async (req, res) => {
	try {
		const { id } = req.query;
		const deletedDetailnews = await Detailnews.deleteDetailnews(id);
		if (!deletedDetailnews)
		{
			return res.status(404).send({message: 'Detailnews not found' });
		}
		res.status(200).send({ message: 'Xóa Detailnews  thành công', deletedDetailnews });
	} catch (error) {
		res.status(500).send({ message: 'Lỗi server', error: error.message });
	};
};

