const productController = require("../controllers/products.controller");

const express = require("express");
const { isAuthenticated, authorizedRoles } = require("../middlewares/auth");

const router = express.Router();

//* ADMIN Only Route.
router
  .route("/new")
  .post(
    isAuthenticated,
    authorizedRoles("admin"),
    productController.createProduct
  );

//* ADMIN Only Route.
router
  .route("/:productId")
  .put(
    isAuthenticated,
    authorizedRoles("admin"),
    productController.updateProduct
  )
  .delete(
    isAuthenticated,
    authorizedRoles("admin"),
    productController.deleteProduct
  )
  .get(productController.getProductDetails);

router.route("/").get(productController.getAllProducts);

module.exports = router;
