const httpStatus = require("http-status");
const jwt = require("jsonwebtoken");

const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const config = require("../config/config");
const User = require("../models/user.model");

const isAuthenticated = catchAsync(async (req, res, next) => {
  const { token } = req.cookies;
  console.log(token, "token");

  const payload = jwt.verify(token, config.jwt.secret);

  const user = await User.findById(payload.id);

  req.user = user;

  next();
});

const authorizedRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ApiError(
          httpStatus.FORBIDDEN,
          `Role: ${req.user.role} is not authorized to access this resouce.`
        )
      );
    }
    next();
  };
};

module.exports = {
  isAuthenticated,
  authorizedRoles,
};
