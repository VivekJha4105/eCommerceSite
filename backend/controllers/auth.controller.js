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

module.exports = {
  registerUser,
  loginUser,
};
