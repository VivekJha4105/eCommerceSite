const config = require("./config");

const cookieOptions = {
  expiresIn: new Date(
    Date.now() + config.cookieExpiresIn * 24 * 60 * 60 * 1000
  ),
  httpOnly: true,
};

module.exports = cookieOptions;
