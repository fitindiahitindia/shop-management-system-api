const { JsonWebTokenError } = require("jsonwebtoken");
const verifyAdminToken = require("../utils/verifyAdminToken");
const AdminLogs = require("../model/AdminLogs");
const timeDate = require("../utils/dateTime");

const isAuthenticatedAdmin = (model) =>{
   return async (req, res, next) => {
    //get token from header
    const headerObj = req.headers;
    // if token does not exist
    if(headerObj.authorization==undefined){
      const err = new Error("Token Missing");
      return res.status(401).json({
        status:"failed",
        message:"Token is required"
    })
      // next(err);
    }
    const token = headerObj?.authorization?.split(" ")[1];
    //verify token
    const verifiedToken = verifyAdminToken(token);
    
    if(verifiedToken ==true){
      return res.status(401).json({
        status:"failed",
        message:"Token maybe missing, expired or wrong"
      })
    }
   
    if (verifiedToken) {
      //find the admin 
      const user = await model.findById(verifiedToken.id).select(
        "name role"
        );
        //save the user into req.obj
        req.adminAuth = user;

      const adminlogs = await AdminLogs.find({token:token})
      if(adminlogs){
       await AdminLogs.updateOne(
        {

          token:token
        },
        {
          $set:{lastActivity:timeDate()}
        })
      }
      next();
    } else {
      const err = new Error("Token expired/invalid");
      next(err);
    }
  };
  
}

module.exports = isAuthenticatedAdmin;