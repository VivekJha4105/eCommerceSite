const httpStatus = require("http-status");
const Product = require("../models/product.model");
const ApiError = require("../utils/ApiError");
const ApiQueryFeatures = require("../utils/ApiQueryFeatures");

//! Creating a Product in the Database --- ADMIN only Authorization Route.
const createProduct = async (body) => {
  const product = await Product.create(body);
  return product;
};

//! Updating a Product in the Database --- ADMIN only Authorization Route.
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

//! Deleting a Product in the Database --- ADMIN only Authorization Route.
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
    let resultPerPage = 5;
    const productCount = await Product.countDocuments();

    const apiQueryFeatures = new ApiQueryFeatures(Product.find(), reqQuery)
      .search()
      .filter()
      .pagination(resultPerPage);
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

const createProductReview = async (req) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await getProductDetails(productId);

  if (!product) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      `No Product with id: ${productId}`
    );
  }

  const isReviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    product.reviews.find((rev) => {
      if (rev.user.toString() === req.body.user._id.toString()) {
        rev.comment = comment;
        rev.rating = rating;
      }
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  product.ratings =
    product.reviews.reduce((acc, rev) => (acc += rev.rating), 0) /
    product.numOfReviews;

  await product.save({ validateBeforeSave: false });

  return;
};

const getAllReviews = async (req) => {
  const product = await Product.findById(req.query.productId);
  if (!product) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      `No Product of id: ${req.query.productId}`
    );
  }

  return product.reviews;
};

const deleteReview = async (req) => {
  const product = await Product.findById(req.query.productId);
  if (!product) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      `No Product of id: ${req.query.productId}`
    );
  }

  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.productToDeleteId.toString()
  );

  const ratings =
    reviews.reduce((acc, rev) => (acc += rev.rating), 0) / reviews.length;

  const numOfReviews = reviews.length;

  await Product.findByIdAndUpdate(
    req.query.productId,
    { ratings, reviews, numOfReviews },
    { new: true, runValidators: true, useFindAndModify: false }
  );

  // product.ratings = ratings;
  // product.reviews = [...reviews];
  // product.numOfReviews = numOfReviews;

  // await product.save({ validateBeforeSave: false });

  return;
};

module.exports = {
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getProductDetails,
  createProductReview,
  getAllReviews,
  deleteReview,
};
