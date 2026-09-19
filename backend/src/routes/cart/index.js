const express = require("express");
const router = express.Router();
const controller = require("./controller");
const { isLoggined } = require("../../middlewares/auth");
router.post("/add", isLoggined, controller.addToCart);
router.get("/getProdoct", isLoggined, controller.getProdoct);
router.get("/isComplate", isLoggined, controller.isComplate);
module.exports = router;
