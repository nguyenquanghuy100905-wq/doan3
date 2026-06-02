// routes/imageProducts.js
var express = require("express");
var router = express.Router();
const uploads = require("../middleware/uploads");
const imageproducts = require("../controllers/ctrlImageproducts");

router.get("/getAllImageproducts", imageproducts.getAllImageproducts);
router.get("/getImageproductsById", imageproducts.getImageproductsById);
router.post(
  "/createImageproducts",
  uploads.array("files", 10),
  imageproducts.createImageproducts
);
router.put(
  "/updateImageproducts",
  uploads.single("file"),
  imageproducts.updateImageproducts
);
router.delete("/deleteImageproducts", imageproducts.deleteImageproducts);

module.exports = router;
