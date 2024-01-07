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

const getUserDetails = async (req) => {
  const user = await User.findById(req.user.id);

  //* There has to be a User as people who have logged in can only access it.
  return user;
};

const updatePassword = async (req) => {
  const user = await User.findById(req.user.id).select("+password");

  const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

  if (!isPasswordMatched) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Old Password is incorrect.");
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Password does'nt match");
  }

  user.password = req.body.newPassword;

  await user.save();

  return user;
};

const updateUserProfile = async (req) => {
  //! What to do if only one of the fields need to be changed among the below?
  //* To answer above question -> We will generate a autofill body, with user's name and email, at the frontend to send via this request.
  //* Client can edit the pre-filled name and email properties as per their desire.

  const propertiesToUpdate = { email: req.body.email, name: req.body.name };

  //! We will add Cloudinary to fill up other properties of User later.

  const user = await User.findByIdAndUpdate(req.user.id, propertiesToUpdate, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  return user;
};

module.exports = {
  registerUser,
  getUserDetails,
  updatePassword,
  updateUserProfile,
};
