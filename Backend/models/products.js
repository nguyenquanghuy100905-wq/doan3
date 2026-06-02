const db = require("../config/db");

class Products {
  static async getAllProducts() {
    const [result] = await db.query("CALL getAllProducts()");
    result[0].forEach((product) => {
      product.images = product.images ? product.images.split(",") : [];
    });
    return result[0];
  }

  static async getProductsById(id) {
    const [result] = await db.execute("CALL getProductById(?)", [id]);
    result[0].forEach((product) => {
      product.images = product.images ? product.images.split(",") : [];
    });
    return result[0];
  }
  static async getProductsByIdCategory(id) {
    const [result] = await db.execute("CALL getProductsIdCategory(?)", [id]);
    result[0].forEach((product) => {
      product.images = product.images ? product.images.split(",") : [];
    });
    return result[0];
  }

  static async getQuantityProductsById(id) {
    const [result] = await db.execute(
      "SELECT quantity FROM products WHERE id =? ",
      [id]
    );
    return result[0].quantity;
  }
  static async getProductByNameAndColor(name, color) {
    const [result] = await db.execute(
      "SELECT * FROM products WHERE name LIKE ? AND color LIKE ?",
      [`%${name}%`, `%${color}%`]
    );
    return result[0];
  }

  static async createProducts(
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
  ) {
    const [result] = await db.execute(
      "INSERT INTO products (category_id, type_id, name, newprice, oldprice, material, size, weight, color, quantity) VALUES (?, ?, ?, ?, ?, ?,  ?, ?, ?, ?)",
      [
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
      ]
    );
    return result.insertId;
  }

  static async updateProducts(
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
  ) {
    const [result] = await db.execute(
      `UPDATE products
     SET category_id = ?, type_id = ?, name = ?, newprice = ?, oldprice = ?,
         material = ?, size = ?, weight = ?,  color = ?, quantity = ?
     WHERE id = ?`,
      [
        category_id,
        type_id,
        name,
        newprice === "" || newprice === "null" ? null : Number(newprice),
        oldprice === "" || oldprice === "null" ? null : Number(oldprice),
        material,
        size,
        weight,
        color,
        quantity,
        id,
      ]
    );
    return result.affectedRows > 0;
  }

  static async deleteProducts(id) {
    const [result] = await db.execute("DELETE FROM products WHERE id =?", [id]);
    return result.affectedRows > 0;
  }
  static async updateQuantity(id, quantity) {
    const [result] = await db.execute(
      "UPDATE products SET quantity =? WHERE id =?",
      [quantity, id]
    );
    return result.affectedRows > 0;
  }
  static async locsanphammoinhat() {
    const [result] = await db.query("CALL LocSanPhamMoiNhat()");
    result[0].forEach((product) => {
      product.images = product.images ? product.images.split(",") : [];
    });
    return result[0];
  }
  static async locsanphamtheogiatuthapdencao() {
    const [result] = await db.query("CALL LocSanPhamTheoGiaTuThapDenCao()");
    result[0].forEach((product) => {
      product.images = product.images ? product.images.split(",") : [];
    });
    return result[0];
  }
  static async locsanphamtheogiatucaodenthap() {
    const [result] = await db.query("CALL LocSanPhamTheoGiaTuCaoDenThap()");
    result[0].forEach((product) => {
      product.images = product.images ? product.images.split(",") : [];
    });
    return result[0];
  }
  static async locsanphamdanhgiacao() {
    const [result] = await db.query("CALL LocSanPhamDanhGiaCao()");
    result[0].forEach((product) => {
      product.images = product.images ? product.images.split(",") : [];
    });
    return result[0];
  }
}

module.exports = Products;
