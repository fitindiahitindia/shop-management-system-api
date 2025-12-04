const jwt = require("jsonwebtoken");

const generateToken = id => {
  return jwt.sign({ id }, process.env.ADMIN_TOKEN_KEY, { expiresIn: "5d" });
};

module.exports = generateToken;
