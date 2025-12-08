const AysncHandler = require("express-async-handler");
const Product = require("../model/Product");
const Admin = require("../model/Admin");
const Order = require("../model/Order");
const moneyTransfer = require("../model/MoneyTransfer");


exports.createMt = AysncHandler(async(req,res)=>{
    const {senderName,
        receiverName,
        refId,
        amount,
        charges,
    } = req.body;

    if(!senderName){
       return res.status(401).json({
            message:"sender name is required"
        })
    }
    if(!receiverName){
       return res.status(401).json({
            message:"receiver name is required"
        })
    }
    if(!refId){
       return res.status(401).json({
            message:"refId is required"
        })
    }
    if(!amount){
       return res.status(401).json({
            message:"amount is required"
        })
    }
    if(!charges){
       return res.status(401).json({
            message:"charges is required"
        })
    }
    
    //create product
    const createMyT = await moneyTransfer.create({
        senderName,
        receiverName,
        refId,
        amount,
        charges,
        createdBy:await req.adminAuth._id,
    })

    // const admin = await Admin.findById(req.adminAuth._id);
    // admin.mt.push(createPro._id);
    // await admin.save();
    
    res.status(201).json({
        status:"success",
        message:"money transfter add successfully",
        data:createMyT,
    })
})


exports.getMtPagination = AysncHandler(async (req, res) => {
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
      filter.senderName = {
        $regex: search,
        $options: "i" // case-insensitive search
      };
    }

    // Fetch filtered + paginated moneyT
    const moneyT = await moneyTransfer.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    // Count filtered records
    const total = await moneyTransfer.countDocuments(filter);

    res.status(200).json({
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      data: moneyT
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
});



exports.getmtById = AysncHandler(async(req,res)=>{
     const mtById  = await moneyTransfer.findById(req.params.id)
     if(!mtById){
        throw new Error("money transfter does not exist")
     }
     res.status(201).json({
        status:"success",
        message:"money transfter fetched successfully",
        data:mtById
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


