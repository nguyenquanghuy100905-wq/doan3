const Products = require("../models/products");
const Image = require("../models/imageproducts");
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Products.getAllProducts();
    res.status(200).send(products);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.getProductsById = async (req, res) => {
  try {
    const products = await Products.getProductsById(req.query.id);
    if (!products)
      return res.status(404).send({ message: "products không tìm thấy" });
    res.status(200).send(products);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
exports.createProducts = async (req, res) => {
  try {
    const {
      category_id,
      type_id,
      name,
      newprice,
      oldprice,
      material,
      size,
      weight,
      color,
      quantity,
    } = req.body;

    const productsId = await Products.createProducts(
      category_id,
      type_id,
      name,
      newprice,
      oldprice,
      material,
      size,
      weight,
      color,
      quantity
    );

    if (req.files && req.files.length > 0) {
      req.files.forEach(async (file) => {
        await Image.createImageproducts(
          productsId,
          `/public/images/${file.filename}`
        );
      });
    }

    res.status(201).send({ message: "Tạo thành công", productsId });
  } catch (error) {
    res.status(500).send({ message: "Lỗi server", error: error.message });
  }
};

exports.updateProducts = async (req, res) => {
  try {
    const { id } = req.query;
    const {
      category_id,
      type_id,
      name,
      newprice,
      oldprice,
      material,
      size,
      weight,
      color,
      quantity,
    } = req.body;

    const updatedProducts = await Products.updateProducts(
      id,
      category_id,
      type_id,
      name,
      newprice,
      oldprice,
      material,
      size,
      weight,
      color,
      quantity
    );

    if (req.files && req.files.length > 0) {
      // 1. Lấy danh sách ảnh hiện tại từ DB
      const data = await Image.getImageproductsById(id);
      if (data && data.length > 0) {
        const images = data.flatMap((item) => {
          // JSON_ARRAYAGG có thể trả về string hoặc array
          if (typeof item.images === 'string') {
            try {
              return JSON.parse(item.images);
            } catch (e) {
              return [item.images];
            }
          }
          return Array.isArray(item.images) ? item.images : [];
        });

        // 2. Xóa file ảnh vật lý
        if (images.length > 0) {
          const deletePromises = images.map(async (item) => {
            await Image.deleteFile(item);
          });
          await Promise.all(deletePromises);
        }

        // 3. Xóa bản ghi ảnh cũ trong DB
        await Image.deleteImageproducts(id);
      }

      // 4. Lưu ảnh mới
      const imagePromises = req.files.map(async (file) => {
        await Image.createImageproducts(id, `/public/images/${file.filename}`);
      });
      await Promise.all(imagePromises);
    }

    res.status(200).send({
      message: "Cập nhật sản phẩm thành công",
      updatedProducts,
    });
  } catch (error) {
    console.error("Lỗi cập nhật sản phẩm:", error);
    res.status(500).send({
      message: "Lỗi server",
      error: error.message,
    });
  }
};

exports.deleteProducts = async (req, res) => {
  try {
		const { id } = req.query;

		// Lấy danh sách ảnh hiện tại từ DB
		const data = await Image.getImageproductsById(id);
		if (data && data.length > 0) {
			const images = data.flatMap(item => {
				// JSON_ARRAYAGG có thể trả về string hoặc array
				if (typeof item.images === 'string') {
					try {
						return JSON.parse(item.images);
					} catch (e) {
						return [item.images];
					}
				}
				return Array.isArray(item.images) ? item.images : [];
			});
			if (images.length > 0) {
				const deletePromises = images.map(async (item) => {
					await Image.deleteFile(item);
				});
				await Promise.all(deletePromises);
			}
		}

		// Xóa bản ghi ảnh trong DB
		await Image.deleteImageproducts(id);

		// Xóa các bản ghi liên quan trước khi xóa sản phẩm (foreign key constraints)
		const db = require("../config/db");
		await db.execute("DELETE FROM feedbacks WHERE product_id = ?", [id]);
		await db.execute("DELETE FROM cartdetails WHERE product_id = ?", [id]);
		await db.execute("DELETE FROM orderdetails WHERE product_id = ?", [id]);
		await db.execute("DELETE FROM importinvoicedetails WHERE product_id = ?", [id]);

		const deletedProducts = await Products.deleteProducts(id);
		res.status(200).send({ message: 'Xóa Products thành công', deletedProducts });
	} catch (error) {
		console.error("Lỗi xóa sản phẩm:", error);
		res.status(500).send({ message: 'Lỗi server', error: error.message });
	};
};
exports.getProductByNameAndColor = async (req, res) => {
  try {
    const { name, color } = req.body;
    const products = await Products.getProductByNameAndColor(name, color);
    res.status(200).send(products);
  } catch (error) {
    res.status(500).send({ message: "L��i server", error: error.message });
  }
};
exports.locsanphammoinhat = async (req, res) => {
  try {
    const locsanphammoinhat = await Products.locsanphammoinhat();
    res.status(200).send(locsanphammoinhat);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
exports.locsanphamtheogiatuthapdencao = async (req, res) => {
  try {
    const locsanphamtheogiatuthapdencao =
      await Products.locsanphamtheogiatuthapdencao();
    res.status(200).send(locsanphamtheogiatuthapdencao);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
exports.locsanphamtheogiatucaodenthap = async (req, res) => {
  try {
    const locsanphamtheogiatucaodenthap =
      await Products.locsanphamtheogiatucaodenthap();
    res.status(200).send(locsanphamtheogiatucaodenthap);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
exports.locsanphamdanhgiacao = async (req, res) => {
  try {
    const locsanphamdanhgiaocao = await Products.locsanphamdanhgiacao();
    res.status(200).send(locsanphamdanhgiaocao);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
exports.getProductsByIdCategory = async (req, res) => {
  try {
    const sanphamtheodanhmuc = await Products.getProductsByIdCategory(
      req.query.id
    );
    res.status(200).send(sanphamtheodanhmuc);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
