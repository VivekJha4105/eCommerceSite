const httpStatus = require("http-status");
const User = require("../models/user.model");
const ApiError = require("../utils/ApiError");

const registerUser = async (body) => {
  const user = await User.find({ email: body.email });
  if (user) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Email is taken.");
  }
  const newUser = await User.create({
    ...body,
    avatar: {
      public_id: "SampleId",
      url: "SampleUrl",
    },
  });
  return newUser;
};

module.exports = {
  registerUser,
};
