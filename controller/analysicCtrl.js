const AysncHandler = require("express-async-handler");
const Order = require("../model/Order");
const mongoose = require("mongoose");
const Product = require("../model/Product");

exports.getDashboardAnalysic = AysncHandler(async (req, res) => {
  // get total orders,get total products
    try {
    const createdBy = req.adminAuth.id;
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const data = await Order.aggregate([
      {
        $match: {
          createdBy: new mongoose.Types.ObjectId(createdBy),
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$dateOrdered" },
            month: { $month: "$dateOrdered" },
          },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { "_id.year": 1, "_id.month": 1 },
      },
    ]);

    const orderResult = {};

    data.forEach(async(item) => {
      const year = item._id.year;
      const monthIndex = item._id.month - 1;
      const monthName = monthNames[monthIndex];

      if (!orderResult[year]) {
        // Initialize all months with 0
        orderResult[year] = {};
        monthNames.forEach((name) => (orderResult[year][name] = 0));
      }

      orderResult[year][monthName] = item.count;
    });


//==================product=============================

    const data2 = await Product.aggregate([
      {
        $match: {
          createdBy: new mongoose.Types.ObjectId(createdBy),
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { "_id.year": 1, "_id.month": 1 },
      },
    ]);

    const productResult = {};

    data2.forEach(async(item) => {
      const year = item._id.year;
      const monthIndex = item._id.month - 1;
      const monthName = monthNames[monthIndex];

      if (!productResult[year]) {
        // Initialize all months with 0
        productResult[year] = {};
        monthNames.forEach((name) => (productResult[year][name] = 0));
      }

      productResult[year][monthName] = item.count;
    });
     
     const finalData = {
        orderResult:orderResult,
        productResult:productResult
     }
     res.status(200).json({
        status: "success",
        message: "dashboard analysis fetched successfully",
        data: finalData,
      })

  } catch (error) {
    console.log(error);
  }

  // const order = await Order.find({createdBy:req.adminAuth.id,dateOrdered}).countDocuments();
  // const product = await Product.find({createdBy:req.adminAuth.id}).countDocuments();
});
