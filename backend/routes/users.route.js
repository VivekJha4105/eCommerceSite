const express = require("express");

const userController = require("../controllers/users.controller");
const { isAuthenticated } = require("../middlewares/auth");

const router = express.Router();

router
  .route("/userProfile")
  .get(isAuthenticated, userController.getUserDetails);

module.exports = router;
