const AysncHandler = require("express-async-handler");
const Category = require("../model/Category");
const Admin = require("../model/Admin");
// const { validationResult } = require("express-validator");

exports.categoryCreate = AysncHandler(async(req,res)=>{
 const{categoryName}=req.body;

    if(!categoryName){
       return res.status(401).json({
            message:"category name is required"
        })
    }
    else if(typeof(categoryName)!=="string"){
        return res.status(401).json({
            message:"category name should be string"
        })
    }
    const categoryExist = await Category.findOne({categoryName});
    if(categoryExist){
       return res.json({
            message:"category is already exist"
        })
    }
    
    const createCategory = await Category.create({
        categoryName,
        // categoryImage:await req.headers.host+'/'+'category/'+req.file.filename,
        admin:await req.adminAuth._id
    })
    const admin = await Admin.findById(req.adminAuth._id);
    admin.categories.push(createCategory._id)
    await admin.save();

    res.status(201).json({
        status:"success",
        message:"category created successfully",
        data:createCategory,
    })
})

 
exports.categoryViews = AysncHandler(async(req,res)=>{
   const getCategory = await Category.find({admin:req.adminAuth._id})
   .select("-password -shopName -ownerName -mobileNo -address -email -role -shopId -createdAt -updatedAt -__v -orders -products -admin")
    res.status(201).json({
        status:"success",
        message:"categories fetched successfully",
        data:getCategory,
    })  
})

exports.categoryUpdate = AysncHandler(async(req,res)=>{
     const {categoryName} = req.body;
    const updateById = await Category.findByIdAndUpdate(
        req.params.id,
        {
        categoryName
        }
    )
    res.status(201).json({
        status:"success",
        message:"category updated successfully",
        data:updateById
    })
})

exports.categoryDelete = AysncHandler(async(req,res)=>{
     await Category.findByIdAndDelete(req.params.id);

    res.status(201).json({
        status:"success",
        message:"category deleted successfully",
    })
})