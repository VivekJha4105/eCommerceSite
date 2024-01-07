const catchAsync = require("../utils/catchAsync");
const userService = require("../services/users.service");
const httpStatus = require("http-status");

const getUserDetails = catchAsync(async (req, res) => {
  const user = await userService.getUserDetails(req);
  res.status(httpStatus.OK).json({ success: true, user });
});

const updatePassword = catchAsync(async (req, res) => {
  const user = await userService.updatePassword(req);
  res.status(httpStatus.OK).json({ success: true, user });
});

const updateUserProfile = catchAsync(async (req, res) => {
  const user = await userService.updateUserProfile(req);
  res
    .status(httpStatus.OK)
    .json({ success: true, message: "User Profile is updated", user });
});

module.exports = {
  getUserDetails,
  updatePassword,
  updateUserProfile,
};
