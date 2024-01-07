const catchAsync = require("../utils/catchAsync");
const orderService = require("../services/orders.service");
const httpStatus = require("http-status");

//* Creating New Order
const createOrder = catchAsync(async (req, res) => {
  const order = await orderService.createOrder(req);
  res.status(httpStatus.OK).json({ message: true, order });
});

module.exports = {
  createOrder,
};
