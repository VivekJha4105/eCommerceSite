const express = require("express");

const productRouter = require("./products.route");
const authRouter = require("./auth.route");

const router = express.Router();

router.use("/product", productRouter);

router.use("/auth", authRouter);

module.exports = router;
