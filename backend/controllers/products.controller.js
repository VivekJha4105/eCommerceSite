const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const productService = require("../services/products.service");

//* Creating a Product in the Database --- ADMIN only Authorization Route.
const createProduct = catchAsync(async (req, res) => {
  req.body.user = req.user.id;
  const product = await productService.createProduct(req.body);
  res.status(httpStatus.CREATED).json({ success: true, product });
});

//* Updating a Product in the Database --- ADMIN only Authorization Route.
const updateProduct = catchAsync(async (req, res) => {
  const updatedProduct = await productService.updateProduct(
    req.params.productId,
    req.body
  );

  res.status(httpStatus.CREATED).json({ success: true, updatedProduct });
});

//* Deleting a Product in Database --- ADMIN only Authorization Route.
const deleteProduct = catchAsync(async (req, res) => {
  await productService.deleteProduct(req.params.productId);
  res
    .status(httpStatus.OK)
    .json({ success: true, message: "Product deleted successfully." });
});

const getProductDetails = catchAsync(async (req, res) => {
  const product = await productService.getProductDetails(req.params.productId);
  res.status(httpStatus.OK).json({ success: true, product });
});

const getAllProducts = catchAsync(async (req, res) => {
  const productList = await productService.getAllProducts(req.query);
  res.status(httpStatus.OK).json({ success: true, productList });
});

module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getProductDetails,
};
