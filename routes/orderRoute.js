const express = require("express");
const { createOrder, getOrder, deleteOrder, getOrderById } = require("../controller/orderCtrl");
const isAuthenticatedAdmin = require("../middlewares/isAuthenticatedAdmin");
const Admin = require("../model/Admin");

const orderRouter = express.Router();

orderRouter.post("/orderCreate",isAuthenticatedAdmin(Admin),createOrder);
orderRouter.get("/orderViews",isAuthenticatedAdmin(Admin),getOrder);
orderRouter.get("/orderById/:id",isAuthenticatedAdmin(Admin),getOrderById);
orderRouter.delete("/orderDelete/:id",deleteOrder);

export default orderRouter;