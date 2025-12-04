const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
   customerId: {
        type: String,
        required: true,
        default: function () {
            return (
                "CUS" +
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
     createdBy: {
             type: mongoose.Schema.Types.ObjectId,
             ref: "Admin",
             required: true,
         },
},{
    timestamps: true,
}
)

const Customer = mongoose.model('Customer', customerSchema);
module.exports = Customer;