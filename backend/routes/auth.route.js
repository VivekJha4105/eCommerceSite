const express = require("express");

const authController = require("../controllers/auth.controller");

const router = express.Router();

router.route("/register").post(authController.registerUser);

module.exports = router;
