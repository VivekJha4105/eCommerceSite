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

//! ADMIN Route
const getAllUsers = catchAsync(async (req, res) => {
  const users = await userService.getAllUsers();
  res.status(httpStatus.OK).json({ success: true, users });
});

//! ADMIN Route
const getSingleUser = catchAsync(async (req, res) => {
  const user = await userService.getSingleUser(req);
  res.status(httpStatus.OK).json({ success: true, user });
});

//! ADMIN Route
const updateUserRole = catchAsync(async (req, res) => {
  const user = await userService.updateUserRole(req);
  res.status(httpStatus.OK).json({ success: true, user });
});

//! ADMIN Route
const deleteUser = catchAsync(async (req, res) => {
  await userService.deleteUser(req);
  res.status(httpStatus.OK).json({ success: true, message: "User Deleted" });
});

module.exports = {
  getUserDetails,
  updatePassword,
  updateUserProfile,
  getAllUsers,
  getSingleUser,
  updateUserRole,
  deleteUser,
};
