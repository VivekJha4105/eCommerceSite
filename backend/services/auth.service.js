const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const User = require("../models/user.model");
const sendEmail = require("../utils/sendEmail");

const loginUser = async (body) => {
  const { email, password } = body;
  if (!email || !password) {
    throw new ApiError(httpStatus.BAD_GATEWAY, "Email or Password Missing");
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Invalid Email or Password");
  }

  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Invalid Email or Password");
  }

  return user;
};

const forgotPassword = async (body) => {
  const user = await User.findOne({ email: body.email });
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not Found");
  }

  const resetToken = user.getResetPasswordToken();

  //! Above method initialized the resetPasswordToken property of current user with a token value, but we also need to save it.
  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}:4000/v1/api/auth/password/reset/${resetToken}`;

  const message = `Your Password Reset Link is: \n\n ${resetPasswordUrl} \n\n If not initiated by you then please ignore it.`;

  try {
    await sendEmail({
      email: user.email,
      subject: `Ecommerce Password Recovery`,
      message,
    });
  } catch (error) {
    //* In case of error, we first remove the saved resetPasswordToken and resetPasswordExpires from the current user
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    user.save({ validateBeforeSave: false });
  }
};

const resetPassword = async (req) => {
  //* Recreating the Token hash and search it in database
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.resetToken)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Reset Password Token is invalid or has expired"
    );
  }

  if (req.body.password !== req.body.confirmPassword) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Password and Confirm Password does not match"
    );
  }

  user.password = req.body.password;

  //* We need to remove the reset password token as its purpose is served.
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  //* We can directly save the current user with the updated password as PRE-SAVE hook will get triggered and hash the password before saving it.
  await user.save();

  return user;
};

module.exports = {
  loginUser,
  forgotPassword,
  resetPassword,
};
