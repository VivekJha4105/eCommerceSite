const express = require("express");

const userController = require("../controllers/users.controller");
const { isAuthenticated, authorizedRoles } = require("../middlewares/auth");

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

//! ADMIN Rotue
router
  .route("/admin")
  .get(isAuthenticated, authorizedRoles("admin"), userController.getAllUsers);

//! ADMIN Route
router
  .route("/admin/:userId")
  .get(isAuthenticated, authorizedRoles("admin"), userController.getSingleUser)
  .put(isAuthenticated, authorizedRoles("admin"), userController.updateUserRole)
  .delete(isAuthenticated, authorizedRoles("admin"), userController.deleteUser);

module.exports = router;
