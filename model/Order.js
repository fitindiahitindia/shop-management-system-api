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
    timeOrdered: {
        type: String,
        required: true,
        default: () => {
            const now = new Date();

            // IST offset in minutes (+5:30)
            const istOffset = 330; 
            const istTime = new Date(now.getTime() + istOffset * 60 * 1000);

            // Format HH:MM:SS
            const hh = String(istTime.getUTCHours()).padStart(2, '0');
            const mm = String(istTime.getUTCMinutes()).padStart(2, '0');
            const ss = String(istTime.getUTCSeconds()).padStart(2, '0');

            return `${hh}:${mm}:${ss}`;
  }
}


    
},{
    timestamps: true,
}
)

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;