const express = require("express");
const app = express();
const {
  globalErrHandler,
  notFoundErr,
} = require("../middlewares/globalErrHandler");
const adminRouter = require("../routes/adminRouter");
const productRouter = require("../routes/productRoute");
const categoryRouter = require("../routes/categoryRoute");
const orderRouter = require("../routes/orderRoute");
const cors = require("cors");
const analysicRouter = require("../routes/analysicRouter");
const axios = require("axios");
const customerRouter = require("../routes/customerRouter");

//Middlewares
app.use(cors({
  origin: "*",             
  methods: "GET,POST,PUT,DELETE,PATCH",
  allowedHeaders: "Content-Type, Authorization"
}));

app.use(express.json()); //pass incoming json data

const path = require("path");
const moneyTransferRouter = require("../routes/moneyTransferRoute");
const validate = require("../utils/validate");
app.get("/",(req,res)=>{
  res.sendFile(path.join(__dirname + '/index.html'))
})

// let balance = 1000;

// function withDrawFromAtm(withdrawAmount){
//   return new Promise((resolve,reject)=>{
//     console.log("ATM: process your request...");
//     setTimeout(()=>{
//       if(balance >= withdrawAmount){
//         balance -= withdrawAmount;
//         resolve("cash withdraw: "+ withdrawAmount + ", remaining balance: " + balance);
//       }else{
//         reject("ATM: insufficient balance. Available balance: " + balance);
//       }
//     },3000)
//   })
// }

// async function atmProcess(withdrawAmount){
//  try{
//    console.log("Customer Withdraw:"+ withdrawAmount);
//    const result  = await withDrawFromAtm(withdrawAmount);
//    console.log(result)
//  }catch(err){
//   console.log(err)
//  }

// }

// atmProcess(2000)

// quantity = 10;

// function checkInventory(orderQuantity){
//  let checkInv = new Promise((resolve,reject)=>{
//     console.log("Checking inventory...");
//     setTimeout(()=>{
//       if(orderQuantity <= quantity){
//         quantity -= orderQuantity;
//         resolve("Order quantity is available. Remaining quantity: " + quantity);
//       }
//       else{
//         reject("Order Quantity is not available");
//       }
//     },6000)
//   })
//   return checkInv;
// }

// async function makeOrder(orderQuantity){
//   try{
//     console.log("your order quanity is:"+orderQuantity);
//     const result = await checkInventory(orderQuantity);
//     console.log(result)
//   }catch(error){
//     console.log(error)
//   }
// }

// makeOrder(3)

// let checkEven = new Promise((resolve, reject) => {
//     let number = 3;
//     if (number % 2 === 0) resolve("The number is even!");
//     else reject("The number is odd!");
// });
// checkEven
//     .then((message) => console.log(message)) 
//     .catch((error) => console.error(error)); 


//Routes
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/analysic", analysicRouter);
app.use("/api/v1/product", productRouter)
app.use("/api/v1/category",categoryRouter)
app.use("/api/v1/order",orderRouter)
app.use("/api/v1/moneyTransfer",moneyTransferRouter)
app.use("/api/v1/customer",customerRouter)

//Error middlewares
app.use(notFoundErr);
app.use(globalErrHandler);


// async function createBulkProducts() {
//   try {
//     const response = await axios.post("http://localhost:2020/api/v1/product/productCreateBulk");
          
//           console.log(response.data);
//         } catch (err) {
//           console.log(err);
//         }
//       }
      // createBulkProducts()
// async function deleteAllProducts() {
//   try {
//     const response = await axios.delete("http://localhost:2020/api/v1/product/productAllDelete",{
      
//             headers: {
//                 "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5MTJiOTYzZWEzZjIwOThhZTdmOGIyOSIsImlhdCI6MTc2Mzc5MjI1NywiZXhwIjoxNzY0MjI0MjU3fQ.Q2-5-fZZUYb1rYUidSCC93HVCtbmJWe6-W1D7GsB98g",
//                 "Content-Type": "application/json"
            
// }})
          
//           console.log(response.data);
//         } catch (err) {
//           console.log(err);
//         }
//       }
    // deleteAllProducts()
      
      module.exports = app;
