const AysncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const Admin = require("../model/Admin");
const generateToken = require("../utils/generateToken");
const verifyToken = require("../utils/verifyToken");
const { hashPassword, isPassMatched } = require("../utils/helpers");
const AdminLogs = require("../model/AdminLogs");
const verifyAdminToken = require("../utils/verifyAdminToken");
const timeDate = require("../utils/dateTime");

//@desc Register admin
//@route POST /api/admins/register
//@acess  Private
exports.registerAdmCtrl = AysncHandler(async (req, res) => {
  const { shopName, ownerName, mobileNo, email,password,address } = req.body;
  //Check if mobile exists
  const adminFound = await Admin.findOne({ mobileNo });
  if (adminFound) {
    throw new Error("Admin Exists");
  }
 
  //register
  const user = await Admin.create({
    shopName,
    ownerName,
    mobileNo,
    email,
    address,
    password: await hashPassword(password),
  });
  res.status(201).json({
    status: "success",
    data: user,
    message: "Shop registered successfully",
  });
});


//@desc     login admins
//@route    POST /api/v1/admins/login
//@access   Private
exports.loginAdminCtrl = AysncHandler(async (req, res) => {
  const { shopId, password } = req.body;
  //find user
  const user = await Admin.findOne({ shopId });
  if (!user) {
    return res.json({ message: "Invalid login crendentials" });
  }
  //verify password
  const isMatched = await isPassMatched(password, user.password);

  if (!isMatched) {
    return res.json({ message: "Invalid login crendentials" });
  } else {
    const token = generateToken(user._id)
    fdata = {
      token:token,
      shopName:user.shopName,
      ownerName:user.ownerName,
      mobileNo:user.mobileNo,
      email:user.email,
      address:user.address,
    }

    // set adminslogs
    
    
    const verifyadmintoken=verifyAdminToken(token)

    await AdminLogs.create({
    login:timeDate(),
    lastActivity:timeDate(),
    createdBy:verifyadmintoken.id,
    token:token,
    ip:req.ip,
    device:req.headers['user-agent'],
  });

    return res.json({
      status:"success",
      data: fdata,
      message: "Admin logged in successfully",
    });
  }
});

//@desc     Get all admins
//@route    GET /api/v1/admins
//@access   Private

exports.getAdminsCtrl = AysncHandler(async (req, res) => {
  res.status(200).json(res.results);
});
//@desc     Get single admin
//@route    GET /api/v1/admins/:id
//@access   Private

exports.getAdminProfileCtrl = AysncHandler(async (req, res) => {
  const admin = await Admin.findById(req.adminAuth._id);
    const adminPrfile = {
        shopId: admin.shopId,
        shopName: admin.shopName,
        ownerName:admin.ownerName,
        mobileNo:admin.mobileNo,
        address:admin.address,
        email:admin.email,
    }
    if (!admin) {
        throw new Error("Admin Not Found");
    } else {
        res.status(200).json({
            status: "success",
            message: "admin profile fetched successfully",
            data: adminPrfile,
        });
    }
});

//@desc    update admin
//@route    UPDATE /api/v1/admins/:id
//@access   Private
exports.updateAdminCtrl = AysncHandler(async (req, res) => {
  const { email, name, password } = req.body;
  //if email is taken
  const emailExist = await Admin.findOne({ email });
  if (emailExist) {
    throw new Error("This email is taken/exist");
  }

  //hash password
  //check if user is updating password

  if (password) {
    //update
    const admin = await Admin.findByIdAndUpdate(
      req.userAuth._id,
      {
        email,
        password: await hashPassword(password),
        name,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json({
      status: "success",
      data: admin,
      message: "Admin updated successfully",
    });
  } else {
    //update
    const admin = await Admin.findByIdAndUpdate(
      req.userAuth._id,
      {
        email,
        name,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json({
      status: "success",
      data: admin,
      message: "Admin updated successfully",
    });
  }
});

//@desc     Delete admin
//@route    DELETE /api/v1/admins/:id
//@access   Private
exports.deleteAdminCtrl = (req, res) => {
  try {
    res.status(201).json({
      status: "success",
      data: "delete admin",
    });
  } catch (error) {
    res.json({
      status: "failed",
      error: error.message,
    });
  }
};

exports.updateAdminPassword = AysncHandler(async (req, res) => {
    const{oldpassword,newpassword,confirmpassword}=req.body;
    var decodedOldPasswords = atob(oldpassword).split('_')[0]
    var decodedNewPasswords =atob(newpassword).split('_')[0]
    var decodedConfirmPasswords =atob(confirmpassword).split('_')[0]

    if (decodedOldPasswords == "") {
        return res.status(401).json({
            status:"failed",
            message: "oldpassword is required"
        })
    }
    if (decodedNewPasswords == "") {
        return res.status(401).json({
            status:"failed",
            message: "newpassword is required"
        })
    }
    if (decodedConfirmPasswords == "") {
        return res.status(401).json({
            status:"failed",
            message: "confirm password is required"
        })
    }
    if(decodedNewPasswords !== decodedConfirmPasswords){
        return res.status(401).json({
            status:"failed",
            message: "new password and confim password are not matched"
        })
    }
    const findUser = await Admin.findOne(req.adminAuth._id);
    const matchPsw = await isPassMatched(decodedOldPasswords,findUser.password)
    const encryptPsw =await hashPassword(decodedNewPasswords)
    if(matchPsw == true){
        const findUser = await Admin.findByIdAndUpdate(req.adminAuth._id,{password:encryptPsw});
        res.status(201).json({
            status: "success",
            message: "password changed successfully",
        });
    }else{
        res.status(401).json({
            status: "failed",
            message: "old password is wrong",
        });
    }
    
})
