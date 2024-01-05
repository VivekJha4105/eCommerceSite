const httpStatus = require("http-status");
const Product = require("../models/product.model");
const ApiError = require("../utils/ApiError");
const ApiQueryFeatures = require("../utils/ApiQueryFeatures");

//* Creating a Product in the Database --- ADMIN only Authorization Route.
const createProduct = async (body) => {
  const product = await Product.create(body);
  return product;
};

//* Updating a Product in the Database --- ADMIN only Authorization Route.
const updateProduct = async (productId, productBody) => {
  try {
    let product = await getProductById(productId);
    product = await Product.findByIdAndUpdate(productId, productBody, {
      new: true,
      useValidatiors: true,
      useFindAndModify: false,
    });
    if (!product) {
      throw new ApiError(
        httpStatus.INTERNAL_SERVER_ERROR,
        "Couldn't update the Product."
      );
    }
    return product;
  } catch (error) {
    throw error;
  }
};

//* Deleting a Product in the Database --- ADMIN only Authorization Route.
const deleteProduct = async (productId) => {
  const product = await Product.findById(productId);
  if (!product) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "No Product with requrested ID."
    );
  }

  await Product.findByIdAndDelete(productId);
  return;
};

const getProductDetails = async (productId) => {
  const product = await Product.findById(productId);
  if (!product) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "No Product with requrested ID."
    );
  }

  return product;
};

const getAllProducts = async (reqQuery) => {
  try {
    const apiQueryFeatures = new ApiQueryFeatures(
      Product.find(),
      reqQuery
    ).search();
    const productList = await apiQueryFeatures.mongoQuery;
    return productList;
  } catch (error) {
    throw error;
  }
};

const getProductById = async (productId) => {
  try {
    const product = await Product.findById(productId);
    if (!product) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        "No Product with requrested ID."
      );
    }
    return product;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getProductDetails,
};
