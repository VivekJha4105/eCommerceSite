const express = require("express");

const userController = require("../controllers/users.controller");
const { isAuthenticated } = require("../middlewares/auth");

const router = express.Router();

router
  .route("/userProfile")
  .get(isAuthenticated, userController.getUserDetails);

router
  .route("/password/update")
  .put(isAuthenticated, userController.updatePassword);

router
  .route("/userProfile/update")
  .put(isAuthenticated, userController.updateUserProfile);

module.exports = router;
