const productController = require("../controllers/products.controller");

const express = require("express");

const router = express.Router();

//* ADMIN Only Route.
router.route("/product/new").post(productController.createProduct);

//* ADMIN Only Route.
router
  .route("/product/:productId")
  .put(productController.updateProduct)
  .delete(productController.deleteProduct)
  .get(productController.getProductDetails);

router.route("/products").get(productController.getAllProducts);

module.exports = router;
