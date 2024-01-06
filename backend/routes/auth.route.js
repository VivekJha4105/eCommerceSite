const express = require("express");

const authController = require("../controllers/auth.controller");

const router = express.Router();

router.route("/register").post(authController.registerUser);

router.route("/login").post(authController.loginUser);

router.route("/logout").get(authController.logoutUser);

router.route("/password/forgot").post(authController.forgotPassword);

router.route("/password/reset/:resetToken").put(authController.resetPassword);

module.exports = router;
