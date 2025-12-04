const jwt = require("jsonwebtoken");


const verifyAdminToken = token => {
  return jwt.verify(token,process.env.ADMIN_TOKEN_KEY, (err,decoded) => {
    if (err) {
      return true
    } else {
      return decoded;
    }
  });
  
};

module.exports = verifyAdminToken;
