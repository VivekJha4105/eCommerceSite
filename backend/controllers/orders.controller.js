const catchAsync = require("../utils/catchAsync");
const orderService = require("../services/orders.service");
const httpStatus = require("http-status");

//* Creating New Order
const createOrder = catchAsync(async (req, res) => {
  const order = await orderService.createOrder(req);
  res.status(httpStatus.OK).json({ message: true, order });
});

//* Getting single order of current user -- params : orderId
const getSingleOrderOfCurrentUser = catchAsync(async (req, res) => {
  const order = await orderService.getSingleOrderOfCurrentUser(req);
  res.status(httpStatus.OK).json({ message: true, order });
});

//* Getting all orders of current user
const getOrdersOfCurrentUser = catchAsync(async (req, res) => {
  const orders = await orderService.getOrdersOfCurrentUser(req);
  res.status(httpStatus.OK).json({ message: true, orders });
});

//! ADMIN -- Getting all orders of all users
const getAllOrders = catchAsync(async (req, res) => {
  const resObj = await orderService.getAllOrders();
  res.status(httpStatus.OK).json({
    message: true,
    totalPayableAmount: resObj.totalPayableAmount,
    orders: resObj.orders,
  });
});

//! ADMIN -- Updating Order Status -- params: req.params.orderId
const updateOrderStatus = catchAsync(async (req, res) => {
  const order = await orderService.updateOrderStatus(req);
  res.status(httpStatus.OK).json({
    message: true,
    order,
  });
});

//! ADMIN -- Deleting Order -- params: req.params.orderId
const deleteOrders = catchAsync(async (req, res) => {
  await orderService.deleteOrders(req);

  res.status(httpStatus.OK).json({
    success: true,
    message: "Order deleted successfully",
  });
});

module.exports = {
  createOrder,
  getSingleOrderOfCurrentUser,
  getOrdersOfCurrentUser,
  getAllOrders,
  updateOrderStatus,
  deleteOrders,
};
