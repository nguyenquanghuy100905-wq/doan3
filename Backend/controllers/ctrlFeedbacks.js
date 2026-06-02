const Feedbacks = require('../models/feedbacks')
const Image = require('../models/imageproducts')

exports.getAllFeedbacks = async (req,res) => {
	try{

		const feedbacks = await Feedbacks.getAllFeedbacks();
		res.status(200).send(feedbacks);
	} catch (error) {

		res.status(500).send({ message: error.message });
	};
};

exports.getFeedbacksByIdUser = async (req, res) =>{
	try{

		const feedbacks = await Feedbacks.getFeedbacksByIdUser(req.query.id);
		if (!feedbacks) return res.status(404).send({ message: 'feedbacks không tìm thấy' });
		res.status(200).send(feedbacks);
	} catch (error) {

		res.status(500).send({ message: error.message });
	};
};
exports.getFeedbacksByIdProduct = async (req, res) =>{
	try{

		const feedbacks = await Feedbacks.getFeedbacksByIdProduct(req.query.id);
		if (!feedbacks) return res.status(404).send({ message: 'feedbacks không tìm thấy' });
		res.status(200).send(feedbacks);
	} catch (error) {

		res.status(500).send({ message: error.message });
	};
};
exports.getFeedbacksById = async (req, res) =>{
	try{

		const feedbacks = await Feedbacks.getFeedbacksById(req.query.id);
		if (!feedbacks) return res.status(404).send({ message: 'feedbacks không tìm thấy' });
		res.status(200).send(feedbacks);
	} catch (error) {

		res.status(500).send({ message: error.message });
	};
};

exports.getCountFeedbackByIdProduct = async (req, res) =>{
	try{

		const feedbacks = await Feedbacks.getCountFeedbackByIdProduct(req.query.id);
		if (!feedbacks) return res.status(404).send({ message: 'feedbacks không tìm thấy' });
		res.status(200).send(feedbacks);
	} catch (error) {

		res.status(500).send({ message: error.message });
	};
}

let pathIMG = null;
exports.createFeedbacks = async (req, res) => {
	try {
		const { user_id, product_id, star, content} = req.body;
		let pathIMG = '';
		if (req.file) {
            pathIMG = "/public/images/" + req.file.filename;
        }
		const feedbacksId = await Feedbacks.createFeedbacks( user_id, product_id, star, content, pathIMG );
		res.status(201).send({ message: 'Tạo thành công', feedbacksId });
	} catch (error) {
		res.status(500).send({ message: 'Lỗi server', error: error.message });
	};
};
exports.updateFeedbacks = async (req, res) => {
	try {
		const { id } = req.query;
		const { user_id, product_id, star, content} = req.body;
		const path = await Feedbacks.getFeedbacksById(id);
		path.map(item => {
			pathIMG = item.image_path;
		})
        if (req.file) {
			Image.deleteFile(pathIMG);
            pathIMG = "/public/images/" + req.file.filename;
        }
		const updatedFeedbacks = await Feedbacks.updateFeedbacks(id, user_id, product_id, star, content, pathIMG );
		res.status(200).send({ message: 'Cập nhật Feedbacks thành công', updatedFeedbacks });
	} catch (error) {
		res.status(500).send({ message: 'Lỗi server', error: error.message });
	};
};

exports.deleteFeedbacks = async (req, res) => {
    try {
        const { id } = req.query;
        const path = await Feedbacks.getFeedbacksById(id);

        if (path.image_path) {
            path.forEach(item => {
                Image.deleteFile(item.image_path); 
            });
        }

        const deletedFeedbacks = await Feedbacks.deleteFeedbacks(id);
        res.status(200).send({ message: 'Xóa Feedbacks thành công', deletedFeedbacks });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Lỗi server', error: error.message });
    }
};


