const mongoose = require("mongoose");
const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.LOCAL_URL);
    console.log("DB Connected Successfully");
  } catch (error) {
    console.log("DB Connection failed:", error.message);
  }
};

dbConnect();
