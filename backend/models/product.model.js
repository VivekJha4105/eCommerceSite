const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter Product Name."],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Please Enter Product Description."],
    trim: true,
  },
  price: {
    type: Number,
    required: [true, "Please enter Product Cost."],
    trim: true,
    maxLength: [7, "Price can't exceed 7 Characters."],
  },
  rating: {
    type: Number,
    default: 0,
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  category: {
    type: String,
    required: [true, "Please enter Product Category."],
  },
  stock: {
    type: Number,
    required: [true, "Please Enter Number of Products in Stock."],
    maxLength: [4, "Stock cannot exceed more than Four Characters."],
    default: 1,
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      name: {
        type: String,
        required: true,
        trim: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
        trim: true,
      },
    },
  ],
  createdAT: {
    type: Date,
    default: Date.now,
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
