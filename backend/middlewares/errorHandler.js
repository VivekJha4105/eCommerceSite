const config = require("../config/config");

const errorHandler = (err, req, res, next) => {
  const { statusCode, message } = err;

  res.locals.message = message;

  const response = {
    code: statusCode,
    message,
    ...(config.env === "development" && { stack: err.stack }),
  };

  if (config.env == "development") {
    console.log(err);
    console.log("From Custom errorHandler");
  }

  res.status(statusCode).send(response);
};

module.exports = errorHandler;
