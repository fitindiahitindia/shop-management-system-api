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
app.use(express.json()); //pass incoming json data
app.use(cors({
  origin: "*",             
  methods: "GET,POST,PUT,DELETE,PATCH",
  allowedHeaders: "Content-Type, Authorization"
}));

const path = require("path")
app.get("/",(req,res)=>{
  res.sendFile(path.join(__dirname + '/index.html'))
})

//Routes
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/analysic", analysicRouter);
app.use("/api/v1/product", productRouter)
app.use("/api/v1/category",categoryRouter)
app.use("/api/v1/order",orderRouter)
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
