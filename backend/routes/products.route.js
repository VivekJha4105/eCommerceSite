const productController = require("../controllers/products.controller");

const express = require("express");
const { isAuthenticated, authorizedRoles } = require("../middlewares/auth");

const router = express.Router();

//! ADMIN Only Route.
router
  .route("/admin/new")
  .post(
    isAuthenticated,
    authorizedRoles("admin"),
    productController.createProduct
  );

//! ADMIN Only Route.
router
  .route("/admin/:productId")
  .put(
    isAuthenticated,
    authorizedRoles("admin"),
    productController.updateProduct
  )
  .delete(
    isAuthenticated,
    authorizedRoles("admin"),
    productController.deleteProduct
  );

//* All access route.
router
  .route("/review")
  .get(productController.getAllReviews)
  .put(isAuthenticated, productController.createProductReview)
  .delete(isAuthenticated, productController.deleteReview);

//* All access route.
router.route("/:productId").get(productController.getProductDetails);

//* All access route.
router.route("/").get(productController.getAllProducts);

module.exports = router;
