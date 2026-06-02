var express = require("express");
var router = express.Router();
const token = require("../middleware/authToken");
const users = require("../controllers/ctrlUsers");
const uploads = require("../middleware/uploads");
router.get("/getAllUsers", users.getAllUsers);
router.get("/getUsersById", token.verifyToken, users.getUsersById);
router.post(
  "/createUsers",
  token.verifyToken,
  token.verifyTokenAmin,
  uploads.single("file"),
  users.createUsers
);
router.put(
  "/updateUsers",
  token.verifyToken,
  uploads.single("file"),
  users.updateUsers
);
router.delete(
  "/deleteUsers",
  token.verifyToken,
  token.verifyTokenAmin,
  users.deleteUsers
);
module.exports = router;
