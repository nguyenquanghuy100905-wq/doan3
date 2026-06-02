// controllers/ctrlImageproducts.js
const Imageproducts = require("../models/imageproducts");

exports.getAllImageproducts = async (req, res) => {
  try {
    const imageproducts = await Imageproducts.getAllImageproducts();
    res.status(200).send(imageproducts);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.getImageproductsById = async (req, res) => {
  try {
    const { id } = req.query;
    const imageproducts = await Imageproducts.getImageproductsById(id);
    if (!imageproducts)
      return res.status(404).send({ message: "Imageproducts không tìm thấy" });
    res.status(200).send(imageproducts);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.createImageproducts = async (req, res) => {
  try {
    const { name, color } = req.body;
    const idProduct = await Imageproducts.getIdByNameProduct(name, color);
    if (!idProduct) {
      return res
        .status(400)
        .json({ message: "Vui lòng cung cấp đầy đủ thông tin bắt buộc" });
    }

    let idImage = null;
    for (const file of req.files) {
      idImage = await Imageproducts.createImageproducts(
        idProduct,
        `/public/images/${file.filename}`
      );
    }

    res.status(201).send({ message: "Tạo thành công", idImage });
  } catch (error) {
    res.status(500).send({ message: "Lỗi server", error: error.message });
  }
};

exports.updateImageproducts = async (req, res) => {
  try {
    const { id } = req.query;
    const { name, color } = req.body;
    const idProduct = await Imageproducts.getIdByNameProduct(name, color);
    if (!id || !idProduct) {
      return res
        .status(400)
        .send({ message: "Vui lòng cung cấp đầy đủ thông tin bắt buộc" });
    }

    const path = await Imageproducts.getImageById(id);
    if (path) {
      Imageproducts.deleteFile(path);
    }

    let pathIMG = req.file ? `/public/images/${req.file.filename}` : path;
    const updatedImageproducts = await Imageproducts.updateImageproducts(
      id,
      idProduct,
      pathIMG
    );
    if (!updatedImageproducts) {
      return res.status(404).send({ message: "Imageproducts not found" });
    }

    res
      .status(200)
      .send({
        message: "Cập nhật Imageproducts thành công",
        updatedImageproducts,
      });
  } catch (error) {
    res.status(500).send({ message: "Lỗi server", error: error.message });
  }
};

exports.deleteImageproducts = async (req, res) => {
  try {
    const { id } = req.query;
    if (!id) {
      return res.status(400).send({ message: "Vui lòng cung cấp ID hợp lệ" });
    }

    const path = await Imageproducts.getImageById(id);
    if (path) {
      Imageproducts.deleteFile(path);
    }

    const deleted = await Imageproducts.deleteOneImageproduct(id);
    if (!deleted) {
      return res.status(404).send({ message: "Không tìm thấy Imageproducts" });
    }

    res.status(200).send({ message: "Xóa Imageproducts thành công", deleted });
  } catch (error) {
    res.status(500).send({ message: "Lỗi server", error: error.message });
  }
};
