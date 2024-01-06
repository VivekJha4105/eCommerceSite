const httpStatus = require("http-status");
const User = require("../models/user.model");
const ApiError = require("../utils/ApiError");

const registerUser = async (body) => {
  const { email, name, password } = body;
  const user = await User.findOne({ email });
  // console.log(user, "user");
  if (user) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Email is taken.");
  }
  const newUser = await User.create({
    name,
    email,
    password,
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
