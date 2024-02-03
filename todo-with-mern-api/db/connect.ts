import mongoose from "mongoose";
import "dotenv/config";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL!);
    console.log("success: connected to database");
  } catch (error) {
    console.log(error);
  }
};
