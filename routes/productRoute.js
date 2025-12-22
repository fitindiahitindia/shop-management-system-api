const express = require('express');
const isLogin = require('../middlewares/isLogin');
const isAdmin = require('../middlewares/isAdmin');
const { createProduct, getProduct, getProductById, deleteProduct, updateProductById, deleteAllProduct, getProductPagination } = require('../controller/productCtrl');
const isAuthenticatedAdmin = require('../middlewares/isAuthenticatedAdmin');
const Admin = require('../model/Admin');
const productRouter = express.Router();
const upload = require('../middlewares/upload');

productRouter.post('/productCreate',isAuthenticatedAdmin(Admin), upload.single('file'), createProduct);
// productRouter.post('/productCreateBulk',createProductsInsideManuallyBulk);
productRouter.get('/productViews',isAuthenticatedAdmin(Admin), getProduct);
productRouter.get('/productViewsPagination',isAuthenticatedAdmin(Admin), getProductPagination);
productRouter.get('/productView/:id',getProductById);
productRouter.put('/productUpdate/:id',updateProductById);
productRouter.delete('/productDelete/:id',isAuthenticatedAdmin(Admin),isAdmin,deleteProduct);
productRouter.delete('/productAllDelete',isAuthenticatedAdmin(Admin),isAdmin,deleteAllProduct);

module.exports = productRouter;