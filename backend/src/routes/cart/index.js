const express = require("express");
const router = express.Router();
const controller = require("./controller");
const { isLoggined } = require("../../middlewares/auth");
router.post("/add", isLoggined, controller.addToCart);
router.get("/getProdoct", isLoggined, controller.getProdoct);
module.exports = router;
