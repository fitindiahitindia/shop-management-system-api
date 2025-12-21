const AysncHandler = require("express-async-handler");
const Order = require("../model/Order");
const mongoose = require("mongoose");
const Product = require("../model/Product");
const Customer = require("../model/Customer");
const MoneyTransfer = require("../model/MoneyTransfer");

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

    const product = await Product.aggregate([
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

    product.forEach(async(item) => {
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

//==================customers=============================

    const customer = await Customer.aggregate([
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

    const customerResult = {};

    customer.forEach(async(item) => {
      const year = item._id.year;
      const monthIndex = item._id.month - 1;
      const monthName = monthNames[monthIndex];

      if (!customerResult[year]) {
        // Initialize all months with 0
        customerResult[year] = {};
        monthNames.forEach((name) => (customerResult[year][name] = 0));
      }

      customerResult[year][monthName] = item.count;
    });

//==================money transfer=============================

    const mt = await MoneyTransfer.aggregate([
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

    const mtResult = {};

    mt.forEach(async(item) => {
      const year = item._id.year;
      const monthIndex = item._id.month - 1;
      const monthName = monthNames[monthIndex];

      if (!mtResult[year]) {
        // Initialize all months with 0
        mtResult[year] = {};
        monthNames.forEach((name) => (mtResult[year][name] = 0));
      }

      mtResult[year][monthName] = item.count;
    });

//==================out of stock product=============================

   const outOfStock = await Product.aggregate([
  {
    $match: {
      createdBy: new mongoose.Types.ObjectId(createdBy),
      productQuantity: "0"
    }
  },
  {
    $group: {
      _id: {
        year: { $year: "$createdAt" },
        month: { $month: "$createdAt" }
      },
      totalOutOfStock: { $sum: 1 }
    }
  },
  {
    $sort: { "_id.year": 1, "_id.month": 1 }
  }
]);

    const outOfStockResult = {};

    outOfStock.forEach(async(item) => {
      const year = item._id.year;
      const monthIndex = item._id.month - 1;
      const monthName = monthNames[monthIndex];
      if (!outOfStockResult[year]) {
        // Initialize all months with 0
        outOfStockResult[year] = {};
        monthNames.forEach((name) => (outOfStockResult[year][name] = 0));
      }

      outOfStockResult[year][monthName] = item.totalOutOfStock;
    });

     const finalData = {
        orderResult:orderResult,
        productResult:productResult,
        customerResult:customerResult,
        mtResult:mtResult,
        outOfStockResult:outOfStockResult
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
