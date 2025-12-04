const express = require("express");
const isAuthenticatedAdmin = require("../middlewares/isAuthenticatedAdmin");
const Admin = require("../model/Admin");
const { customerViews, getCustomerByPagination } = require("../controller/CustomerCtrl");

const customerRouter = express.Router();

customerRouter.get("/customerViews",isAuthenticatedAdmin(Admin),customerViews);
customerRouter.get("/customerViewsByPag",isAuthenticatedAdmin(Admin),getCustomerByPagination);

module.exports = customerRouter;