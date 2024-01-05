const catchAsync = require("../utils/catchAsync");
const userService = require("../services/users.service");
const httpStatus = require("http-status");

const registerUser = catchAsync(async (req, res) => {
  const user = await userService.registerUser(req.body);
  res.status(httpStatus.CREATED).json({ success: true, user });
});

module.exports = {
  registerUser,
};
