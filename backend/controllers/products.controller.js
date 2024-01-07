const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const productService = require("../services/products.service");

//! Creating a Product in the Database --- ADMIN only Authorization Route.
const createProduct = catchAsync(async (req, res) => {
  req.body.user = req.user.id;
  const product = await productService.createProduct(req.body);
  res.status(httpStatus.CREATED).json({ success: true, product });
});

//! Updating a Product in the Database --- ADMIN only Authorization Route.
const updateProduct = catchAsync(async (req, res) => {
  const updatedProduct = await productService.updateProduct(
    req.params.productId,
    req.body
  );

  res.status(httpStatus.CREATED).json({ success: true, updatedProduct });
});

//! Deleting a Product in Database --- ADMIN only Authorization Route.
const deleteProduct = catchAsync(async (req, res) => {
  await productService.deleteProduct(req.params.productId);
  res
    .status(httpStatus.OK)
    .json({ success: true, message: "Product deleted successfully." });
});

//* Creates new reviews or overwrites the previous one
const createProductReview = catchAsync(async (req, res) => {
  await productService.createProductReview(req);
  res
    .status(httpStatus.OK)
    .json({ succes: true, message: "Review added Successfully" });
});

//* Gets details of a single Product.
const getProductDetails = catchAsync(async (req, res) => {
  const product = await productService.getProductDetails(req.params.productId);
  res.status(httpStatus.OK).json({ success: true, product });
});

//* Gets all the Product.
const getAllProducts = catchAsync(async (req, res) => {
  const productList = await productService.getAllProducts(req.query);
  res.status(httpStatus.OK).json({ success: true, productList });
});

//
const getAllReviews = catchAsync(async (req, res) => {
  const reviewList = await productService.getAllReviews(req);
  res.status(httpStatus.OK).json({ success: true, reviewList });
});

const deleteReview = catchAsync(async (req, res) => {
  await productService.deleteReview(req);
  res
    .status(httpStatus.OK)
    .json({ success: true, message: "Review was Deleted." });
});

module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getProductDetails,
  createProductReview,
  getAllReviews,
  deleteReview,
};
