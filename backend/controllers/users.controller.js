const catchAsync = require("../utils/catchAsync");
const userService = require("../services/users.service");
const httpStatus = require("http-status");

const getUserDetails = catchAsync(async (req, res) => {
  const user = await userService.getUserDetails(req);
  res.status(httpStatus.OK).json({ success: true, user });
});

module.exports = {
  getUserDetails,
};
