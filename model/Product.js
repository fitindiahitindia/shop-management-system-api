const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    pId: {
        type: String,
        required: true,
        default: function () {
            return (
                "PRO" +
                Math.floor(100 + Math.random() * 999999)
            )
        }
    },
    productImage: {
        type: String,
        required: true
    },
    productName: {
        type: String,
        required: true
    },
    productPurchasingPrice: {
        type: String,
        required: true
    },
    productSellingPrice: {
        type: String,
        required: true
    },
    productQuantity: {
        type: String,
        required: true
    },
    productPurchasingDate: {
        type: String,
        required: true
    },
    productCategory: {
        type: String,
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Admin",
        required: true,
    },
}, {
    timestamps: true,
}, );

//model
const Product = mongoose.model("Product", productSchema);


module.exports = Product;