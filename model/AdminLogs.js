const mongoose = require("mongoose");

const adminLogsSchema = new mongoose.Schema({
  login: {
    type: String,
    required: true,
  },
  lastActivity: {
    type: String,
  },
  createdBy:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Admin",
  },
  device: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  ip: {
    type: String,
    required: true,
  },
},{
    timestamps: true,
  });

const AdminLogs = mongoose.model("AdminLogs", adminLogsSchema);
module.exports = AdminLogs;
