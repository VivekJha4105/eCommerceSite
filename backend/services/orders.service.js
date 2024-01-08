const httpStatus = require("http-status");
const Order = require("../models/order.model");
const ApiError = require("../utils/ApiError");
const updateStock = require("../utils/updateStock");

const createOrder = async (req, res) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    user: req.user.id,
    paidAt: Date.now(),
  });

  return order;
};

//* Getting single order of current user
const getSingleOrderOfCurrentUser = async (req) => {
  const order = await Order.findById(req.params.orderId).populate(
    "user",
    "name email"
  );
  if (!order) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      `No Order with ID: ${req.params.orderId}`
    );
  }

  return order;
};

//* Getting all orders of current user
const getOrdersOfCurrentUser = async (req) => {
  const orders = await Order.find({ user: req.user._id });
  if (!orders) {
    throw new ApiError(httpStatus.NO_CONTENT, `No Order has been made by you`);
  }

  return orders;
};

//! ADMIN -- Getting all orders of all users
const getAllOrders = async () => {
  const orders = await Order.find({});
  if (!orders) {
    throw new ApiError(httpStatus.NO_CONTENT, `No User has placed any order.`);
  }

  const totalPayableAmount = orders.reduce(
    (acc, order) => (acc += order.totalPrice),
    0
  );

  return { orders, totalPayableAmount };
};

//! ADMIN -- Update Order Status -- params: req.params.orderId
const updateOrderStatus = async (req) => {
  const order = await Order.findById(req.params.orderId);
  if (!order) {
    throw new ApiError(
      httpStatus.NO_CONTENT,
      `No order for ID: ${req.params.orderId}`
    );
  }

  if (order.orderStatus === "Delivered") {
    throw new ApiError(httpStatus.BAD_REQUEST, "Order has been delivered");
  }

  order.orderItems.forEach(async (order) => {
    await updateStock(order.product, order.quantity);
  });

  order.orderStatus = req.body.orderStatus;

  if (order.orderStatus === "Delivered") {
    order.deliverdAt = Date.now();
  }

  await order.save({ validateBeforeSave: false });

  return order;
};

//! ADMIN -- Delete Orders
const deleteOrders = async (req) => {
  const order = await Order.findById(req.params.orderId);
  if (!order) {
    throw new ApiError(
      httpStatus.NO_CONTENT,
      `No order for ID: ${req.params.orderId}`
    );
  }

  await Order.findByIdAndDelete(req.params.orderId);

  return;
};

module.exports = {
  createOrder,
  getSingleOrderOfCurrentUser,
  getOrdersOfCurrentUser,
  getAllOrders,
  updateOrderStatus,
  deleteOrders,
};
