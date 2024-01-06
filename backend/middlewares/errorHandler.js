const httpStatus = require("http-status");
const config = require("../config/config");
const ApiError = require("../utils/ApiError");

const errorHandler = (err, req, res, next) => {
  res.locals.message = err.message;

  if (config.env == "development") {
    console.log(err.statusCode, "StatusCode");
    console.log(err);
    console.log("From Custom errorHandler");
  }

  //* MongoDB ID Error (Cast Error).
  if (err.name === "CastError") {
    const message = `Resource not found. Invalid ${err.path}`;
    err = new ApiError(httpStatus.BAD_REQUEST, message);
  }

  //* MongoDB duplicate Key Error
  if (err.code == 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
    err = new ApiError(httpStatus.BAD_REQUEST, message);
  }

  //* Invalid JWT Error
  if (err.name == "JsonWebTokenError") {
    const message = `Json Web Token is invalid, Try again`;
    err = new ApiError(httpStatus.BAD_REQUEST, message);
  }

  //* JWT Expiration Error
  if (err.name == "TokenExpiredError") {
    const message = `Json Web Token is Expired, Try again`;
    err = new ApiError(httpStatus.BAD_REQUEST, message);
  }

  res.status(httpStatus.BAD_REQUEST).json({
    success: false,
    message: err.message,
    ...(config.env === "development" && { stack: err.stack }),
  });
};

module.exports = errorHandler;
