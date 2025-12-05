const AysncHandler = require("express-async-handler");
const Order = require("../model/Order");
const Product = require("../model/Product");
const Admin = require("../model/Admin");
const OrderItem = require("../model/OrderItems");
const Customer = require("../model/Customer");

exports.createOrder = AysncHandler(async (req, res) => {
  const { orderItems,customerName,mobileNo } = req.body;
  //validation
  if (!orderItems) {
    return res.status(401).json({
      message: "products are required",
    });
  }

  try {
    // add customer
    if(customerName!="" && mobileNo!=""){
      
      const customerFind = await Customer.findOne({customerName,mobileNo});
      if(!customerFind){
         await Customer.create({
         customerName,
         mobileNo,
         createdBy:await req.adminAuth._id
      })}
    }

    // create order items
    const orderItemsIds = Promise.all(
      orderItems.map(async (orderItem) => {
        let newOrderItem = new OrderItem({
          products: orderItem.productId,
          quantity: orderItem.productQuantity,
          productSellingPrice: orderItem.productSellingPrice,
        });
        newOrderItem = await newOrderItem.save();
        return newOrderItem._id;
      })
    );

    const orderItemsIdsResolved = await orderItemsIds;
    for(let i=0;i<orderItems.length;i++){
        const getProductQuantity=await Product.findById({_id:orderItems[i].productId})
        const updatedQuantity = getProductQuantity.productQuantity - orderItems[i].productQuantity
       
        if(getProductQuantity.productQuantity <= 0){
            
        }
        else{
            await Product.findByIdAndUpdate({_id:orderItems[i].productId},{
            productQuantity:updatedQuantity}
      )
      }
    }
    const order = new Order({
      orderItems: orderItemsIdsResolved,
      customerName: customerName,
      mobileNo: mobileNo,
      createdBy: req.adminAuth._id,
    });
    const createOrd = await order.save();

    res.status(201).json({
      status: "success",
      message: "order created",
      data: createOrd,
    });
  } catch (error) {
    throw new Error(error + "Internal Error");
  }

  // try{

  //     const getProductQuantity=await Product.findById({_id:productId})
  //     const updatedQuantity = getProductQuantity.productQuantity - productQuantity
  //     if(getProductQuantity.productQuantity <= 0){
  //       return res.status(400).json({
  //         status:"success",
  //         message:"Product is out of stock",
  //       })
  //     }
  //     const order = await Order.create({
  //     productId,
  //     productQuantity,
  //     productSellingPrice,
  //     createdBy:await req.adminAuth._id
  //  })

  //  // push code admin's orders
  //  const admin = await Admin.findById(req.adminAuth._id);
  //  admin.orders.push(order._id);
  //  await admin.save();

  //     if(getProductQuantity.productQuantity > 0){
  //      await Product.findByIdAndUpdate(
  //     {_id:productId},
  //     {
  //      productQuantity:updatedQuantity
  //     }
  //     )

  // }

  // res.status(201).json({
  //     status: "success",
  //     message: "order created",
  //     data: order
  // })
  // }catch(error){
  //  throw new Error(error+"Internal Error")
  // }
});

exports.getOrder = AysncHandler(async (req, res) => {
  

  const page = req.query.page; // default page = 1
  const limit = req.query.limit; // default limit = 10
  const skip = (page - 1) * limit;

  try {
     const orderList = await Order.find({ createdBy: req.adminAuth.id })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .populate({
      path: "orderItems",
      populate: {
        path: "products",
        model: "Product",
      },
    });

  const total = await Order.countDocuments({ createdBy: req.adminAuth._id });

  const updateOrderList = orderList.map((order) => {
    return {
      _id: order._id,
      orderId: order.orderId,
      customerName: order.customerName,
      mobileNo: order.mobileNo,
      timeOrdered: order.timeOrdered,
      dateOrdered: order.dateOrdered,
      numberOfItems: order.orderItems.length,
      totalOrderPrice: order.orderItems.reduce(
        (sum, item) => sum + item.productSellingPrice * item.quantity,
        0
      ),
    };
  });

  const setData = {
    order: updateOrderList,
  };

  if (!orderList) {
    throw new Error("Order not found");
  }
  res.status(200).json({
    status: "success",
    message: "order found successfully",
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),
    data: setData,
  });
  } catch (error) {
    throw new Error(error + "Internal Error");
  }
 
});

exports.getOrderById = AysncHandler(async (req, res) => {
  const { id } = req.params;
  const orderList = await Order.find({
    createdBy: req.adminAuth.id,
    _id: id,
  })
    .sort({ createdAt: -1 })
    .populate({
      path: "orderItems",
      populate: {
        path: "products",
        model: "Product",
      },
    });
  // const getOrder = await Order.find({createdBy:req.adminAuth.id});
  // const updateOrderList=orderList.map((res,i)=>{
  //         return res
  //     });
  const updateOrderList = orderList.map((order) => {
    return {
      _id: order._id,
      customerName: order.customerName,
      mobileNo: order.mobileNo, 
      orderId: order.orderId,
      timeOrdered: order.timeOrdered,
      dateOrdered: order.dateOrdered,
      numberOfItems: order.orderItems.length, // <-- here
      // optional: totalPrice of whole order
      totalOrderPrice: order.orderItems.reduce(
        (sum, item) => sum + item.productSellingPrice * item.quantity,
        0
      ),
      orderItems: order.orderItems.map((item) => ({
        pId: item.products.pId,
        productSellingPrice: item.productSellingPrice,
        quantity: item.quantity,
        productCategory: item.products.productCategory,
        productName: item.products.productName,
        totalPrice: item.productSellingPrice * item.quantity,
      })),
    };
  });

  const setData = {
    order: updateOrderList,
  };

  if (!orderList) {
    throw new Error("Order not found");
  }
  res.status(201).json({
    status: "success",
    message: "order found successfully",
    data: setData,
  });
});

exports.deleteOrder = AysncHandler(async (req, res) => {
  const getId = req.params.id;
  //validation
  if (!getId) {
    return res.status(401).json({
      message: "order id is required",
    });
  }

try {
    const getProductInfo = await Order.findById(getId);
  const orderItem = getProductInfo.orderItems;
  for(let i=0;i<orderItem.length;i++){
        const getOrderQuantity=await OrderItem.findById(orderItem[i])
        const getProductQuantity=await Product.findById(getOrderQuantity.products)
         const updatedQuantity =
          Number(getOrderQuantity.quantity) +
          Number(getProductQuantity.productQuantity);

          await Product.findByIdAndUpdate(
                { _id: getOrderQuantity.products },
                {
                productQuantity: updatedQuantity,
                }
            );
        }


  await Order.findByIdAndDelete({ _id: getId });

  res.status(201).json({
    status: "success",
    message: "order deleted successfully",
  });
} catch (error) {
    throw new Error(error + "Internal Error");
}
  
});
