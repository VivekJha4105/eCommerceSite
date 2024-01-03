const productController = require("../controllers/products.controller");

const express = require("express");

const router = express.Router();

router.route("/products").get(productController.getAllProducts);

module.exports = router;
