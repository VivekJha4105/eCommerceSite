const httpStatus = require("http-status");
const bcrypt = require("bcryptjs");
const User = require("../models/user.model");
const ApiError = require("../utils/ApiError");

const registerUser = async (body) => {
  //   const user = await User.find({ email: body.email });
  //   if (user) {
  //     throw new ApiError(
  //       httpStatus.BAD_REQUEST,
  //       "User Already Regestered, Login to resume Shopping."
  //     );
  //   }
  const hashedPassword = await bcrypt.hash(body.password, 10);
  const newUser = await User.create({
    ...body,
    password: hashedPassword,
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
