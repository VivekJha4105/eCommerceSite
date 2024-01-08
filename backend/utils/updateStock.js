const Product = require("../models/product.model");

//* Update the product stock in database after user adds it to his order list
const updateStock = async (productId, quantity) => {
  const product = await Product.findById(productId);

  product.stock -= quantity;

  await product.save({ validateBeforeSave: false });

  return;
};

module.exports = updateStock;
