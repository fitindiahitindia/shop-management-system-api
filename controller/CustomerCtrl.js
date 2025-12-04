const AysncHandler = require("express-async-handler");
const Customer = require("../model/Customer");

exports.customerViews = AysncHandler(async(req,res)=>{
   const getcustomer = await Customer.find({admin:req.adminAuth._id})
   .select("-createdAt -updatedAt -__v -createdBy")
    res.status(201).json({
        status:"success",
        message:"Customers fetched successfully",
        data:getcustomer,
    })  
})

exports.getCustomerByPagination = AysncHandler(async(req,res)=>{
  const page = req.query.page; // default page = 1
  const limit = req.query.limit; // default limit = 10
  const skip = (page - 1) * limit;

  try {
    const customerList = await Customer.find({createdBy:req.adminAuth._id})
   .select("-createdAt -updatedAt -__v -createdBy")
   .sort({ createdAt: -1 })
   .skip(skip)
   .limit(limit)

   const total = await Customer.countDocuments({createdBy:req.adminAuth._id});
   
   const updateCustomerList = customerList.map((customer) => {
    return {
      _id: customer._id,
      customerId: customer.customerId,
      customerName: customer.customerName,
      mobileNo: customer.mobileNo,
    };
  });

    const setData = {
    order: updateCustomerList,
  };

   if (!customerList) {
    throw new Error("Customer not found");
  }
   
   res.status(200).json({
    status: "success",
    message: "customer found successfully",
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),
    data: setData,
  });
  } catch (error) {
     throw new Error(error + "Internal Error");
  }
   
})
 