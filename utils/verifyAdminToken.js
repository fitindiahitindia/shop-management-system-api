const jwt = require("jsonwebtoken");
const isExpiryToken = require("./isExpiryToken");


const verifyAdminToken = token => {
  return jwt.verify(token,process.env.ADMIN_TOKEN_KEY, (err,decoded) => {
    if (err) {
      return true
    } else {
     
     return isExpiryToken(decoded)
    }
  });
  
};

module.exports = verifyAdminToken;
