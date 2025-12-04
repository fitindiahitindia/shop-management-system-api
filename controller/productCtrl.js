const AysncHandler = require("express-async-handler");
const reader = require('xlsx')
const file = reader.readFile('assets/amit-shop.xlsx')
const Product = require("./../model/Product");
const Admin = require("../model/Admin");
const Order = require("../model/Order");

//@desc create product
//@route POST api/v1/product
//@acess private

exports.createProduct = AysncHandler(async(req,res)=>{
    const {productName,
        productQuantity,
        productCategory,
        productPurchasingPrice,
        productSellingPrice,
        productPurchasingDate,
    } = req.body;

    if(!productName){
       return res.status(401).json({
            message:"product name is required"
        })
    }
    if(!productQuantity){
       return res.status(401).json({
            message:"product Quantity is required"
        })
    }
    if(!productCategory){
       return res.status(401).json({
            message:"product Category is required"
        })
    }
    if(!productPurchasingPrice){
       return res.status(401).json({
            message:"product Purchasing Price is required"
        })
    }
    if(!productSellingPrice){
       return res.status(401).json({
            message:"product Selling Price is required"
        })
    }
    
     if(!productPurchasingDate){
       return res.status(401).json({
            message:"product Purchasing Date is required"
        })
    }
     
    //check if exist
    // const productExist = await Product.findOne({productName,productCategory})
    // if(productExist){
    //     throw new Error("product already exist");
    // } 
    //create product
    const createPro = await Product.create({
        productName,
        productPurchasingPrice,
        productSellingPrice,
        productQuantity,
        productPurchasingDate,
        productCategory,
        createdBy:await req.adminAuth._id,
    })

    const admin = await Admin.findById(req.adminAuth._id);
    admin.products.push(createPro._id);
    await admin.save();
    
    res.status(201).json({
        status:"success",
        message:"product created successfully",
        data:createPro,
    })
})

//@desc get all product
//@route GET api/v1/product
//@access public

exports.getProduct = AysncHandler(async(req,res)=>{
    const product = await Product.find({createdBy:req.adminAuth.id}).sort({createdAt:-1});
    res.status(201).json({
        status:"success",
        message:"product fetched successfully",
        data:product,
    })

})

exports.getProductPagination = AysncHandler(async(req,res)=>{
    try {
        const page = req.query.page;   // default page = 1
        const limit = req.query.limit; // default limit = 10
        const skip = (page - 1) * limit;

        const products = await Product.find({createdBy:req.adminAuth._id}).sort({createdAt:-1})
            .skip(skip)
            .limit(limit);

        const total = await Product.countDocuments({createdBy:req.adminAuth._id});
        res.status(200).json({
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
            data: products
        });
        // console.log(rel)

    } catch (err) {
         console.log(err);
    }

})


//@desc get single product
//@route GET api/v1/product/:id
//@access public

exports.getProductById = AysncHandler(async(req,res)=>{
     const productById  = await Product.findById(req.params.id)
     if(!productById){
        throw new Error("product does not exist")
     }
     res.status(201).json({
        status:"success",
        message:"product fetched successfully",
        data:productById
     })
}) 


//@desc update Single Product
//@route PUT api/v1/product/:id
//@access private

exports.updateProductById = AysncHandler(async(req,res)=>{
    const {productName,
        productPurchasingPrice,
        productSellingPrice,
        productQuantity,
        productPurchasingDate,
        productCategory} = req.body;

    const updateById = await Product.findByIdAndUpdate(
        req.params.id,
        {
         productName,
        productPurchasingPrice,
        productSellingPrice,
        productQuantity,
        productPurchasingDate,
        productCategory
        }
    )
    res.status(201).json({
        status:"success",
        message:"product updated successfully",
        data:updateById
    })
})
 
//@desc delete product
//@route DELETE api/v1/product/:id
//@acess private

exports.deleteProduct = AysncHandler(async(req,res)=>{
        await Product.findByIdAndDelete(req.params.id);
        await Order.deleteMany({productId:req.params.id})
        res.status(201).json({
            status:"success",
            message:"product deleted successfully",
        })
})

exports.deleteAllProduct = AysncHandler(async(req,res)=>{
        await Product.deleteMany({createdBy:req.adminAuth.id});
        res.status(200).json({
            status:"success",
            message:"products all deleted successfully",
        })
})

exports.createProductsInsideManuallyBulk= AysncHandler(async(req,res)=>{

let data = []

const sheets = file.SheetNames

for(let i = 0; i < sheets.length; i++)
{
   const temp = reader.utils.sheet_to_json(
        file.Sheets[file.SheetNames[i]])
   temp.forEach((res) => {
      const dat = {
        productName : res['Product Name'],
        productCategory : res['Category'],
        productQuantity : res['Quantity'],
        productPurchasingPrice : res['Buying Price']===undefined ?Number(1):Number(res['Buying Price']),
        productPurchasingDate : res['Buying Date'],
        productSellingPrice:Number(res['Selling Price']) < 10 ? 10 : (res['Buying Price']* 50) / 100 + res['Buying Price'],
      }
      data.push(dat)
   })
}

// Printing data
console.log(data)
    

const axios = require("axios");

async function fetchProducts(){
for (const item of data) {
            await callApi(item);
        }
      }
      fetchProducts();
async function callApi(item) {
  try {
        const response = await axios.post("http://localhost:2020/api/v1/product/productCreate",
         item
        , {
            headers: {
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5MTJiOTYzZWEzZjIwOThhZTdmOGIyOSIsImlhdCI6MTc2Mzc5MjI1NywiZXhwIjoxNzY0MjI0MjU3fQ.Q2-5-fZZUYb1rYUidSCC93HVCtbmJWe6-W1D7GsB98g",
                "Content-Type": "application/json"
            }
        });

        console.log(response.data);
    } catch (err) {
        console.log(err);
    }
}

})


