const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
   orderId: {
        type: String,
        required: true,
        default: function () {
            return (
                "ORD" +
                Math.floor(100 + Math.random() * 999999)
            )
        }
    },
    customerName:{
        type:String,
    },
    mobileNo:{
        type:String,
    },
    orderItems:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"OrderItem",
        required:true,
    }],
     createdBy: {
             type: mongoose.Schema.Types.ObjectId,
             ref: "Admin",
             required: true,
         },
     dateOrdered:{
        type:Date,
        default:Date.now,
     },
     timeOrdered:{
        type:String,
        required:true,
        default:()=>{
             const now = new Date();
             return now.toTimeString().split(' ')[0];
        },
     } 

    
},{
    timestamps: true,
}
)

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;