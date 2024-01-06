const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const compression = require("compression");
const cookieParser = require("cookie-parser");

const errorHandler = require("./middlewares/errorHandler");
const ApiError = require("./utils/ApiError");
const httpStatus = require("http-status");
const router = require("./routes/index");

const app = express();

app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(compression());
app.use(cors());
app.options("*", cors()); //* enabling CORS pre-flight across-the-board

app.use("/v1/api", router);

//* send back 404 error in case of any unknown API request..
app.use((req, res, next) => {
  next(new ApiError(httpStatus.BAD_REQUEST, "Not Found"));
});

//* Custom Error Handling
app.use(errorHandler);

module.exports = app;
