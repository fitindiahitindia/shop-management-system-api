const express = require("express");
const { categoryCreate, categoryView, categoryViews, categoryUpdate, categoryDelete } = require("../controller/categoryCtrl");
const Admin = require("../model/Admin");
const isAuthenticatedAdmin = require("../middlewares/isAuthenticatedAdmin");

const categoryRouter = express.Router();

categoryRouter.post("/categoryCreate",isAuthenticatedAdmin(Admin),categoryCreate);
categoryRouter.get("/categoryViews",isAuthenticatedAdmin(Admin),categoryViews);
categoryRouter.put("/categoryUpdate/:id",categoryUpdate);
categoryRouter.delete("/categoryDelete/:id",categoryDelete);

export default  categoryRouter;