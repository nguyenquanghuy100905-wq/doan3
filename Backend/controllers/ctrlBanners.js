const Banners = require('../models/banners')
const Imageproducts = require('../models/imageproducts');

exports.getAllBanners = async (req,res) => {
	try{

		const banners = await Banners.getAllBanners();
		res.status(200).send(banners);
	} catch (error) {

		res.status(500).send({ message: error.message });
	};
};

exports.getBannersById = async (req, res) =>{
	try{

		const banners = await Banners.getBannersById(req.query.id);
		if (!banners) return res.status(404).send({ message: 'banners không tìm thấy' });
		res.status(200).send(banners);
	} catch (error) {

		res.status(500).send({ message: error.message });
	};
};
let ImgPath = null;
exports.createBanners = async (req, res) => {
	try {
		if (req.file) {
			ImgPath = "/public/uploads/" + req.file.filename;
		}
		const bannerId = await Banners.createBanners(ImgPath);
		res.status(201).send({ message: 'Tạo thành công', bannerId });
	} catch (error) {
		res.status(500).send({ message: 'Lỗi server', error: error.message });
	};
};

exports.updateBanners = async (req, res) => {
	try {
		const { id } = req.query;
		const path = await Banners.getBannersById(id);
		Imageproducts.deleteFile(path.image_path);
		if (req.file) {
			pathIMG = "/public/uploads/" + req.file.filename;
		}
		const updateBanners = await Banners.updateBanners(pathIMG);
		res.status(200).send({ message: 'Cập nhật Banners thành công', updateBanners });
	} catch (error) {
		res.status(500).send({ message: 'Lỗi server', error: error.message });
	};
};

exports.deleteBanners = async (req, res) => {
	try {
		const { id } = req.query;
		const path = await Banners.getBannersById(id);
		Imageproducts.deleteFile(path.image_path);
		const deletedBanners = await Banners.deleteBanners(id);
		if (!deletedBanners)
		{
			return res.status(404).send({message: 'Banners not found' });
		}
		res.status(200).send({ message: 'Xóa Banners  thành công', deletedBanners });
	} catch (error) {
		res.status(500).send({ message: 'Lỗi server', error: error.message });
	};
};

