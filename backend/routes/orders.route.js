const express = require("express");

const { isAuthenticated } = require("../middlewares/auth");
const orderController = require("../controllers/orders.controller");

const router = express.Router();

router.route("/new").post(isAuthenticated, orderController.createOrder);

//! =======>>>>> We need to Start Today By making route for requesting single order of a user <<<<<===== !//

module.exports = router;
