const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({
    quantity:{
        type:Number,
        required:true,
    },
    products:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product"
    },
    productSellingPrice:{
        type:Number,
        required:true
    }
}
)

const OrderItem = mongoose.model('OrderItem', orderItemSchema);
module.exports = OrderItem; 