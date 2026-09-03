const express = require("express");
const router = express.Router();
const controller = require("./controller");
const validator = require("./validator");

router.get("/OfferProducts", controller.OfferProducts);
router.post("/createProduct",validator.createProductValidator(),
controller.validate, controller.createProduct);
router.get("/:category", controller.getCategoryProduct);

module.exports = router;
