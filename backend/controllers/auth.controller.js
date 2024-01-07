const httpStatus = require("http-status");

const catchAsync = require("../utils/catchAsync");
const userService = require("../services/users.service");
const authService = require("../services/auth.service");
const cookieOptions = require("../config/cookieOptions");

const registerUser = catchAsync(async (req, res) => {
  const user = await userService.registerUser(req.body);
  const token = user.getJwtToken();
  res
    .status(httpStatus.CREATED)
    .cookie("token", token, cookieOptions)
    .json({ success: true, user, token });
});

const loginUser = catchAsync(async (req, res) => {
  const user = await authService.loginUser(req.body);
  const token = user.getJwtToken();
  res
    .status(httpStatus.OK)
    .cookie("token", token, cookieOptions)
    .json({ success: true, user, token });
});

const logoutUser = catchAsync(async (req, res) => {
  res
    .status(httpStatus.OK)
    .cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    })
    .json({ success: true, message: "Logged Out Successfully" });
});

const forgotPassword = catchAsync(async (req, res) => {
  await authService.forgotPassword(req.body);

  res.status(httpStatus.OK).json({
    success: true,
    message: `Email sent to ${user.email} successfully`,
  });
});

const resetPassword = catchAsync(async (req, res) => {
  const user = await authService.resetPassword(req);
  res.status(httpStatus.OK).json({ success: true, user });
});

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
};
