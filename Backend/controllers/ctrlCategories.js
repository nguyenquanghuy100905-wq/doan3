const Categories = require("../models/categories");
const Image = require("../models/imageproducts");
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Categories.getAllCategories();
    res.status(200).send(categories);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.getCategoriesAndQuantity = async (req, res) => {
  try {
    const categories = await Categories.getCategoriesAndQuantity();
    res.status(200).send(categories);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.getCategoriesById = async (req, res) => {
  try {
    const categories = await Categories.getCategoriesById(req.query.id);
    if (!categories)
      return res.status(404).send({ message: "categories không tìm thấy" });
    res.status(200).send(categories);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
let pathIMG = "/public/images/delfault.jpeg";
exports.createCategories = async (req, res) => {
  try {
    const { name, description } = req.body;
    if (req.file) {
      pathIMG = "/public/images/" + req.file.filename;
    }
    const categoriesId = await Categories.createCategories(
      name,
      description,
      pathIMG
    );
    res.status(201).send({ message: "Tạo thành công", categoriesId });
  } catch (error) {
    res.status(500).send({ message: "Lỗi server", error: error.message });
  }
};

exports.updateCategories = async (req, res) => {
  try {
    const { id } = req.query;
    const { name, description } = req.body;
    const categoriesData = await Categories.getCategoriesById(id);

    if (!categoriesData) {
      return res.status(404).send({ message: "Danh mục không tồn tại" });
    }

    let pathIMG = categoriesData.image; // giữ ảnh cũ mặc định

    if (req.file) {
      // Nếu có ảnh mới, xóa ảnh cũ (nếu có)
      if (categoriesData.image) {
        await Image.deleteFile(categoriesData.image); // ✅ dùng đúng biến
      }
      // Gán ảnh mới
      pathIMG = "/public/images/" + req.file.filename;
    }

    const updatedCategories = await Categories.updateCategories(
      id,
      name,
      description,
      pathIMG
    );
    if (!updatedCategories) {
      return res.status(404).send({ message: "Cập nhật không thành công" });
    }

    res
      .status(200)
      .send({ message: "Cập nhật Categories thành công", updatedCategories });
  } catch (error) {
    console.error("Lỗi khi cập nhật danh mục:", error);
    res
      .status(500)
      .send({
        message: "Lỗi server khi cập nhật danh mục",
        error: error.message,
      });
  }
};

exports.deleteCategories = async (req, res) => {
  try {
    const { id } = req.query;
    const categoriesData = await Categories.getCategoriesById(id);

    if (!categoriesData) {
      return res.status(404).send({ message: "Danh mục không tồn tại" });
    }

    if (categoriesData.image) {
      await Image.deleteFile(categoriesData.image);
    }

    const deletedCategories = await Categories.deleteCategories(id);
    if (!deletedCategories) {
      return res
        .status(404)
        .send({ message: "Không xóa được danh mục (có thể không tồn tại)" });
    }

    res
      .status(200)
      .send({ message: "Xóa danh mục thành công", deletedCategories });
  } catch (error) {
    console.error("Lỗi khi xóa danh mục:", error);
    res
      .status(500)
      .send({
        message: "Lỗi server khi xóa danh mục sản phẩm",
        error: error.message,
      });
  }
};
