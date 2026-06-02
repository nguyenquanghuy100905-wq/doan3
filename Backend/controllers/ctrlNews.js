const News = require('../models/news')

exports.getAllNews = async (req,res) => {
	try{

		const news = await News.getAllNews();
		res.status(200).send(news);
	} catch (error) {

		res.status(500).send({ message: error.message });
	};
};

exports.getNewsById = async (req, res) =>{
	try{

		const news = await News.getNewsById(req.query.id);
		if (!news) return res.status(404).send({ message: 'news không tìm thấy' });
		res.status(200).send(news);
	} catch (error) {

		res.status(500).send({ message: error.message });
	};
};

exports.createNews = async (req, res) => {
	try {
		const { title, content, image_path } = req.body;
		if (!title || !content || !image_path) {
			return res.status(400).json({ message: 'Vui lòng cung cấp đầy đủ thông tin bắt buộc' });
		}
		const newsId = await News.createNews(title, content, image_path );
		res.status(201).send({ message: 'Tạo thành công', newsId });
	} catch (error) {
		res.status(500).send({ message: 'Lỗi server', error: error.message });
	};
};

exports.updateNews = async (req, res) => {
	try {
		const { id } = req.query;
		const { title, content, image_path } = req.body;
		if (!title ||!content ||!image_path) {
			return res.status(400).send({ message: 'Vui lòng cung cấp đầy đủ thông tin bắt buộc' });
		}
		const updatedNews = await News.updateNews(id, title, content, image_path );
		if (!updatedNews){
			return res.status(404).send({ message: 'News not found' });
		}
		res.status(200).send({ message: 'Cập nhật News thành công', updatedNews });
	} catch (error) {
		res.status(500).send({ message: 'Lỗi server', error: error.message });
	};
};

exports.deleteNews = async (req, res) => {
	try {
		const { id } = req.query;
		const deletedNews = await News.deleteNews(id);
		if (!deletedNews)
		{
			return res.status(404).send({message: 'News not found' });
		}
		res.status(200).send({ message: 'Xóa News  thành công', deletedNews });
	} catch (error) {
		res.status(500).send({ message: 'Lỗi server', error: error.message });
	};
};

