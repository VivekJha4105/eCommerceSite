const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const User = require("../models/user.model");

const loginUser = async (body) => {
  const { email, password } = body;
  if (!email || !password) {
    throw new ApiError(httpStatus.BAD_GATEWAY, "Email or Password Missing");
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Invalid Email or Password");
  }

  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Invalid Email or Password");
  }

  return user;
};

module.exports = {
  loginUser,
};
