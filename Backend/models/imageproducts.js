// models/imageproducts.js
const db = require("../config/db");
const fs = require("fs");

class Imageproducts {
  static async getAllImageproducts() {
    const [result] = await db.query("CALL getAllImageproducts");
    return result[0];
  }

  static async getImageproductsById(id) {
    const [result] = await db.execute("CALL getImageProductsById(?)", [id]);
    return result[0];
  }

  static async getImageById(id) {
    const [result] = await db.execute(
      "SELECT image_path FROM imageproducts WHERE id = ?",
      [id]
    );
    return result[0]?.image_path;
  }

  static async getIdByNameProduct(name, color) {
    const [result] = await db.execute(
      "SELECT id FROM products WHERE name = ? AND color = ?",
      [name, color]
    );
    return result[0]?.id; // Sử dụng optional chaining
  }

  static async createImageproducts(product_id, image_path) {
    const [result] = await db.execute(
      "INSERT INTO imageproducts (product_id, image_path) VALUES (?, ?)",
      [product_id, image_path]
    );
    return result.insertId;
  }

  static async updateImageproducts(id, product_id, image_path) {
    const [result] = await db.execute(
      "UPDATE imageproducts SET product_id = ?, image_path = ? WHERE id = ?",
      [product_id, image_path, id]
    );
    return result.affectedRows > 0;
  }

  static async deleteImageproducts(id) {
    const [result] = await db.execute(
      "DELETE FROM imageproducts WHERE product_id = ?",
      [id]
    );
    return result.affectedRows > 0;
  }

  static async deleteOneImageproduct(id) {
    const [result] = await db.execute(
      "DELETE FROM imageproducts WHERE id = ?",
      [id]
    );
    return result.affectedRows > 0;
  }

  static deleteFile(filePath) {
    const file = "C:/Users/haian/OneDrive/Desktop/DoAn3_HaiAnhMobile/Backend" + filePath;
    if (fs.existsSync(file)) {
      fs.unlinkSync(file);
    }
  }
}

module.exports = Imageproducts;
