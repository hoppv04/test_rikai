import mongoose from "mongoose";

const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URI);
    console.log("Connect MongoDB successfully");
  } catch (error) {
    console.log(`Connect MongoDB failed: ${error}`);
  }
};

export default connectMongoDB;
