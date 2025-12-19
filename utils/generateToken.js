const jwt = require("jsonwebtoken");

const generateToken = id => {
  return jwt.sign({ id }, process.env.ADMIN_TOKEN_KEY, { expiresIn: "1d" });
};

module.exports = generateToken;
