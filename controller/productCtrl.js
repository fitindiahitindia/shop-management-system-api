const AysncHandler = require("express-async-handler");
// const reader = require('xlsx')
// const file = reader.readFile('assets/amit-shop.xlsx')
const Product = require("../model/Product");
const Admin = require("../model/Admin");
const Order = require("../model/Order");
const resServer = require("../utils/resServer");
const dbCommon = require("../common/dbCommon");
const { default: mongoose } = require("mongoose");

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
       return res.status(400).json({
            message:"product name is required"
        })
    }
    if(!productQuantity){
       return res.status(400).json({
            message:"product Quantity is required"
        })
    }
    if(!productCategory){
       return res.status(400).json({
            message:"product Category is required"
        })
    }
    if(!productPurchasingPrice){
       return res.status(400).json({
            message:"product Purchasing Price is required"
        })
    }
    if(!productSellingPrice){
       return res.status(400).json({
            message:"product Selling Price is required"
        })
    }
    
     if(!productPurchasingDate){
       return res.status(400).json({
            message:"product Purchasing Date is required"
        })
    }
     
    //check if exist
    // const productExist = await Product.findOne({productName,productCategory})
    // if(productExist){
    //     throw new Error("product already exist");
    // } 

    //create product

    const productData = {
        productName,
        productPurchasingPrice,
        productSellingPrice,
        productQuantity,
        productPurchasingDate,
        productCategory,
        createdBy:await req.adminAuth._id,
    }
    // insert product
    const objInsI = new dbCommon.insertDbCommon(Product);
    const createPro = await objInsI.create(productData);
    
    //push product to admin
    const objInsF = new dbCommon.findDbCommon(Admin);
    const admin = await objInsF.findByIdFun(req.adminAuth._id);
    admin.products.push(createPro._id);
    await admin.save();
    
    //respone
    resServer(res,201,"success","product created successfully",createPro)
})

//@desc get all product
//@route GET api/v1/product
//@access public

exports.getProduct = AysncHandler(async(req,res)=>{
    const product = await Product.find({createdBy:req.adminAuth.id}).sort({createdAt:-1});
    //respone
    resServer(res,200,"success","product fetched successfully",product)
})

exports.getProductPagination = AysncHandler(async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search ? req.query.search.trim() : "";

    const skip = (page - 1) * limit;

    // 🔍 Search Filter
    const filter = {
      createdBy: req.adminAuth._id
    };

    if (search) {
      filter.productName = {
        $regex: search,
        $options: "i" // case-insensitive search
      };
    }

    // Fetch filtered + paginated products
    const products = await Product.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    // Count filtered records
    const total = await Product.countDocuments(filter);

    res.status(200).json({
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      data: products
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
});



//@desc get single product
//@route GET api/v1/product/:id
//@access public

exports.getProductById = AysncHandler(async(req,res)=>{
     const ObjInstF   =new dbCommon.findDbCommon(Product)
     const product = await ObjInstF.findByIdFun(req.params.id);
     if(!product){
        throw new Error("product does not exist")
     }

     resServer(res,200,"success","product fetched successfully",product)
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
    
    const ObjInstFu = new dbCommon.findDbCommon(Product);
    const updateById = await ObjInstFu.findByIdAndUpdateFun(req.params.id,{
        productName,
        productPurchasingPrice,
        productSellingPrice,
        productQuantity,
        productPurchasingDate,
        productCategory
    })

    resServer(res,200,"success","product updated successfully",updateById)
})
 
//@desc delete product
//@route DELETE api/v1/product/:id
//@acess private

exports.deleteProduct = AysncHandler(async(req,res)=>{
        const session = await mongoose.startSession();
        session.startTransaction();

        try{
         await Product.findByIdAndDelete(req.params.id,{session});
         await Order.deleteMany({productId:req.params.id},{session});

         await session.commitTransaction();
         session.endSession();
         resServer(res,201,"success","product deleted successfully",null)
        }catch(error){
          await session.abortTransaction();
          session.endSession();

          return resServer(res, 500, false, "Delete failed", error.message);
        }
})

exports.deleteAllProduct = AysncHandler(async(req,res)=>{
        await Product.deleteMany({createdBy:req.adminAuth.id});
        res.status(200).json({
            status:"success",
            message:"products all deleted successfully",
        })
})

// exports.createProductsInsideManuallyBulk= AysncHandler(async(req,res)=>{

// let data = []

// const sheets = file.SheetNames

// for(let i = 0; i < sheets.length; i++)
// {
//    const temp = reader.utils.sheet_to_json(
//         file.Sheets[file.SheetNames[i]])
//    temp.forEach((res) => {
//       const dat = {
//         productName : res['Product Name'],
//         productCategory : res['Category'],
//         productQuantity : res['Quantity'],
//         productPurchasingPrice : res['Buying Price']===undefined ?Number(1):Number(res['Buying Price']),
//         productPurchasingDate : res['Buying Date'],
//         productSellingPrice:Number(res['Selling Price']) < 10 ? 10 : (res['Buying Price']* 50) / 100 + res['Buying Price'],
//       }
//       data.push(dat)
//    })
// }

// Printing data
// console.log(data)
    

// const axios = require("axios");

// async function fetchProducts(){
// for (const item of data) {
//             await callApi(item);
//         }
//       }
//       fetchProducts();
// async function callApi(item) {
//   try {
//         const response = await axios.post("http://localhost:2020/api/v1/product/productCreate",
//          item
//         , {
//             headers: {
//                 "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5MTJiOTYzZWEzZjIwOThhZTdmOGIyOSIsImlhdCI6MTc2Mzc5MjI1NywiZXhwIjoxNzY0MjI0MjU3fQ.Q2-5-fZZUYb1rYUidSCC93HVCtbmJWe6-W1D7GsB98g",
//                 "Content-Type": "application/json"
//             }
//         });

//         console.log(response.data);
//     } catch (err) {
//         console.log(err);
//     }
// }

// })


