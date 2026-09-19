const express = require("express");
const router = express.Router();
const controller = require("./controller");
const validator = require("./validator");
const upload = require("../../middlewares/upload");
const { isLoggined, isAdmin } = require("../../middlewares/auth");

router.get("/OfferProducts", controller.OfferProducts);
router.post(
  "/createProduct",
  isLoggined,
  isAdmin,
  upload.single("img"),
  validator.createProductValidator(),
  controller.validate,
  controller.createProduct,
);
router.get("/:category", controller.getCategoryProduct);

module.exports = router;
