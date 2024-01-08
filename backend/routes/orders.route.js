const express = require("express");

const { isAuthenticated, authorizedRoles } = require("../middlewares/auth");
const orderController = require("../controllers/orders.controller");

const router = express.Router();

//* Creating an order for current user
router.route("/new").post(isAuthenticated, orderController.createOrder);

//* Getting all orders of current user
router
  .route("/myOrders")
  .get(isAuthenticated, orderController.getOrdersOfCurrentUser);

//* Get single order of current user -- params: orderId
router
  .route("/:orderId")
  .get(isAuthenticated, orderController.getSingleOrderOfCurrentUser);

//! ADMIN -- Updating Order Status && Deleting Order from DB post its completion and delivery -- params: orderId
router
  .route("/admin/:orderId")
  .put(
    isAuthenticated,
    authorizedRoles("admin"),
    orderController.updateOrderStatus
  )
  .delete(
    isAuthenticated,
    authorizedRoles("admin"),
    orderController.deleteOrders
  );

//! ADMIN -- Getting all the Orders from the Database.
router
  .route("/admin/orders")
  .get(isAuthenticated, authorizedRoles("admin"), orderController.getAllOrders);

module.exports = router;
