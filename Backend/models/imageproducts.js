// models/imageproducts.js
const db = require("../config/db");
const fs = require("fs");
const path = require("path");

class Imageproducts {
  static getAllImageproducts() {
    return db.query("CALL getAllImageproducts").then(([result]) => result[0]);
  }

  static getImageproductsById(id) {
    return db.execute("CALL getImageProductsById(?)", [id]).then(([result]) => result[0]);
  }

  static getImageById(id) {
    return db.execute(
      "SELECT image_path FROM imageproducts WHERE id = ?",
      [id]
    ).then(([result]) => result[0]?.image_path);
  }

  static getIdByNameProduct(name, color) {
    return db.execute(
      "SELECT id FROM products WHERE name = ? AND color = ?",
      [name, color]
    ).then(([result]) => result[0]?.id); // Sử dụng optional chaining
  }

  static createImageproducts(product_id, image_path) {
    return db.execute(
      "INSERT INTO imageproducts (product_id, image_path) VALUES (?, ?)",
      [product_id, image_path]
    ).then(([result]) => result.insertId);
  }

  static updateImageproducts(id, product_id, image_path) {
    return db.execute(
      "UPDATE imageproducts SET product_id = ?, image_path = ? WHERE id = ?",
      [product_id, image_path, id]
    ).then(([result]) => result.affectedRows > 0);
  }

  static deleteImageproducts(id) {
    return db.execute(
      "DELETE FROM imageproducts WHERE product_id = ?",
      [id]
    ).then(([result]) => result.affectedRows > 0);
  }

  static deleteOneImageproduct(id) {
    return db.execute(
      "DELETE FROM imageproducts WHERE id = ?",
      [id]
    ).then(([result]) => result.affectedRows > 0);
  }

  static deleteFile(filePath) {
    const file = path.join(__dirname, "..", filePath);
    if (fs.existsSync(file)) {
      fs.unlinkSync(file);
    }
  }
}

module.exports = Imageproducts;
