const Contenttypes = require('../models/contenttypes')
const Products = require('../models/products')
const Image = require('../models/imageproducts');


exports.getAllContenttypes = async (req,res) => {
	try{

		const contenttypes = await Contenttypes.getAllContenttypes();
		res.status(200).send(contenttypes);
	} catch (error) {

		res.status(500).send({ message: error.message });
	};
};

exports.getContenttypesById = async (req, res) =>{
	try{
		const contenttypes = await Contenttypes.getContenttypesById(req.query.id);
		if (!contenttypes) return res.status(404).send({ message: 'contenttypes không tìm thấy' });
		res.status(200).send(contenttypes);
	} catch (error) {

		res.status(500).send({ message: error.message });
	};
};
exports.getContentByIdType = async (req, res) =>{
	try{
		const { id } = req.query;
        const contenttypes = await Contenttypes.getContentByIdType(id);
        if (!contenttypes) return res.status(404).send({ message: 'contenttypes không tìm thấy' });
        res.status(200).send(contenttypes);
    } catch (error) {

        res.status(500).send({ message: error.message });
    };
}
let pathIMG= null;
exports.createContenttypes = async (req, res) => {
	try {
		const { type_id, title, content} = req.body;
		if(req.file){
			pathIMG = "/public/images/" + req.file.filename;
		}
		const contenttypesId = await Contenttypes.createContenttypes( type_id, title, content, pathIMG );
		res.status(201).send({ message: 'Tạo thành công', contenttypesId });
	} catch (error) {
		res.status(500).send({ message: 'Lỗi server', error: error.message });
	};
};

exports.updateContenttypes = async (req, res) => {
    try {
        const { id } = req.query;
        const { type_id, title, content} = req.body;
		const path = await Contenttypes.getImgContentById(id);
		Image.deleteFile(path);
		if(req.file){
			pathIMG = "/public/images/" + req.file.filename;
		}
        const updated = await Contenttypes.updateContenttypes(id, type_id, title, content, pathIMG);
        if (!updated) {
            return res.status(404).send({ message: 'Không tìm thấy Contenttypes để cập nhật' });
        }

        res.status(200).send({ message: 'Cập nhật Contenttypes thành công'});
    } catch (error) {
        res.status(500).send({ message: 'Lỗi server', error: error.message });
    }
};


exports.deleteContenttypes = async (req, res) => {
	try {
		const { id } = req.query;
		const path = await Contenttypes.getImgContentById(id);
		Image.deleteFile(path);
		const deletedContenttypes = await Contenttypes.deleteContenttypes(id);
		if (!deletedContenttypes)
		{
			return res.status(404).send({message: 'Contenttypes not found' });
		}
		res.status(200).send({ message: 'Xóa Contenttypes  thành công', deletedContenttypes });
	} catch (error) {
		res.status(500).send({ message: 'Lỗi server', error: error.message });
	};
};

