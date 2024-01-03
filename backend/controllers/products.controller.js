const catchAsync = require("../utils/catchAsync");

const getAllProducts = catchAsync(async (req, res) => {
  res.send("All Good!!");
});

module.exports = {
  getAllProducts,
};
