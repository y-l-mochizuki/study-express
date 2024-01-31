import mongoose from "mongoose";

export const connectDB = async (url: string) => {
  try {
    await mongoose.connect(url);
    console.log("データベースに接続中...");
  } catch (error) {
    throw new Error("Error connecting to database");
  }
};
