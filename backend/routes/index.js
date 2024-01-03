const express = require("express");

const productRouter = require("./products.route");

const router = express.Router();

router.use("/api", productRouter);

module.exports = router;
