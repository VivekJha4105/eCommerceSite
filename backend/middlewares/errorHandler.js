const httpStatus = require("http-status");
const config = require("../config/config");
const ApiError = require("../utils/ApiError");

const errorHandler = (err, req, res, next) => {
  res.locals.message = err.message;

  if (config.env == "development") {
    console.log(err.statusCode, "StatusCode");
    console.log("From Custom errorHandler");
  }

  //* MongoDB ID Error (Cast Error).
  if (err.name === "CastError") {
    const message = `Resource not found. Invalid ${err.path}`;
    err = new ApiError(httpStatus.BAD_REQUEST, message);
  }

  res.status(httpStatus.BAD_REQUEST).json({
    success: false,
    message: err.message,
    ...(config.env === "development" && { stack: err.stack }),
  });
};

module.exports = errorHandler;
