const mongoose = require("mongoose");
mongoose.set('strictQuery',false);
const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL,{useUnifiedTopology: true,useNewUrlParser: true,});
    console.log("DB Connected Successfully");
  } catch (error) {
    console.log("DB Connection failed:", error.message);
  }
};

dbConnect();
