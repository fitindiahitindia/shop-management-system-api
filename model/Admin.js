const bcrypt = require("bcryptjs");

const mongoose = require("mongoose");
const adminSchema = new mongoose.Schema(
  {
    shopId: {
      type: String,
      required: true,
      default:function(){
        return (
          this.ownerName
          .slice(0,3)
          .toUpperCase() +
          Math.floor(Math.random()*900)
        )
      }
    },
    shopName: {
      type: String,
      required: true,
    },
    ownerName: {
      type: String,
      required: true,
    },
    mobileNo: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: false,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "admin",
    },
    products:[
      {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Product"
      }
    ],
    orders:[
      {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Order"
      }
    ],
    categories:[
      {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Category"
      }
    ],
  },
  {
    timestamps: true,
  }
);

//model
const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
