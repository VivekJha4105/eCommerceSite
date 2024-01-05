const httpStatus = require("http-status");
const mongoose = require("mongoose");
const validator = require("validator");
const ApiError = require("../utils/ApiError");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Please Enter Your Name"],
      maxLength: [30, "Name can't exceed 30 Characters."],
      minLength: [3, "Name should atleast have 3 characters."],
    },
    email: {
      type: String,
      trim: true,
      required: [true, "Please Enter your Email."],
      unique: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new ApiError(httpStatus.BAD_REQUEST, "Invalid Email Request");
        }
      },
    },
    password: {
      type: String,
      required: [true, "Please Enter Your Password"],
      minLength: [8, "Password should be greater than 8 characters."],
      select: false,
    },
    avatar: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
    role: {
      type: String,
      default: "user",
    },

    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
