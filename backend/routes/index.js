const express = require("express");

const productRouter = require("./products.route");
const authRouter = require("./auth.route");
const userRouter = require("./users.route");

const router = express.Router();

router.use("/product", productRouter);

router.use("/auth", authRouter);

router.use("/user", userRouter);

module.exports = router;
