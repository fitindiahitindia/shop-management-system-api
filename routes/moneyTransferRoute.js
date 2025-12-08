const express = require("express");
const isAuthenticatedAdmin = require("../middlewares/isAuthenticatedAdmin");
const Admin = require("../model/Admin");
const { createMt, getMtPagination, getmtById } = require("../controller/moneyTransferCtrl");

const moneyTransferRouter = express.Router();

moneyTransferRouter.post("/moneyTCreate",isAuthenticatedAdmin(Admin),createMt);
moneyTransferRouter.get("/moneyTViewsPagination",isAuthenticatedAdmin(Admin),getMtPagination);
moneyTransferRouter.get("/getmtById/:id",isAuthenticatedAdmin(Admin),getmtById);
// moneyTransferRouter.delete("/orderDelete/:id",deleteOrder);

module.exports = moneyTransferRouter;