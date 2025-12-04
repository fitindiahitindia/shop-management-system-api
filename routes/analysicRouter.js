const express = require("express");
const { getDashboardAnalysic } = require("../controller/analysicCtrl");
const isAuthenticatedAdmin = require("../middlewares/isAuthenticatedAdmin");
const Admin = require("../model/Admin");
const isAdmin = require("../middlewares/isAdmin");
const analysicRouter = express.Router();

analysicRouter.get("/",isAuthenticatedAdmin(Admin),isAdmin,getDashboardAnalysic)

export default analysicRouter