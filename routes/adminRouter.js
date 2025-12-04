const express = require("express");
const {
  registerAdmCtrl,
  adminPublishResultsCtrl,
  adminSuspendTeacherCtrl,
  adminUnPublishResultsCtrl,
  adminUnSuspendTeacherCtrl,
  adminUnWithdrawTeacherCtrl,
  adminWithdrawTeacherCtrl,
  deleteAdminCtrl,
  getAdminProfileCtrl,
  getAdminsCtrl,
  loginAdminCtrl,
  updateAdminCtrl,
  updateAdminPassword,
} = require("../controller/adminCtrl");
const isLogin = require("../middlewares/isLogin");
const roleRestriction = require("../middlewares/roleRestriction");
const Admin = require("../model/Admin");
const isAuthenticatedAdmin = require("../middlewares/isAuthenticatedAdmin");
const adminRouter = express.Router();

//register
adminRouter.post("/register", registerAdmCtrl);

//login
adminRouter.post("/login", loginAdminCtrl);

//single

adminRouter.get(
  "/profile",
  isAuthenticatedAdmin(Admin),
  roleRestriction("admin"),
  getAdminProfileCtrl
);

//update password
adminRouter.post("/adminPassword",isAuthenticatedAdmin(Admin),updateAdminPassword);

//delete
adminRouter.delete("/:id", deleteAdminCtrl);


module.exports = adminRouter;
