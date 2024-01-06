const httpStatus = require("http-status");
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const ApiError = require("../utils/ApiError");
const config = require("../config/config");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Please Enter Your Name"],
      maxLength: [30, "Name can't exceed 30 Characters."],
      minLength: [3, "Name should atleast have 3 characters."],
    },
    email: {
      type: String,
      trim: true,
      required: [true, "Please Enter your Email."],
      unique: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new ApiError(httpStatus.BAD_REQUEST, "Invalid Email Request");
        }
      },
    },
    password: {
      type: String,
      required: [true, "Please Enter Your Password"],
      minLength: [8, "Password should be greater than 8 characters."],
      select: false,
    },
    avatar: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
    role: {
      type: String,
      default: "user",
    },

    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  {
    timestamps: true,
  }
);

//* Pre-Save hook to hash new or updated passwords
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

//* Instance methods of Class User to generate JWT token
userSchema.methods.getJwtToken = function () {
  const token = jwt.sign({ id: this._id }, config.jwt.secret, {
    expiresIn: config.jwt.expiresIn,
  });

  return token;
};

//* Instance methods of Class User to compare hashed passwords when logging in
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

//* Instance methods of Class User to generate password reset token.
userSchema.methods.getResetPasswordToken = function () {
  // Generating a token
  const resetToken = crypto.randomBytes(20).toString("hex");

  // Generating a hash and updating that hash with our token and digesting it as a hex
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

  return resetToken;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
