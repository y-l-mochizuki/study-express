require("dotenv").config();
import express from "express";
import { TaskRoute } from "./routes/tasks";
import { connectDB } from "./db/connect";

const app = express();
const PORT = 5001;

// データベース接続
// mongodb の View Monitoring で確認できる
const start = async () => {
  try {
    await connectDB(process.env.MONGODB_URL || "");

    // ルーティング設定
    app.use("/api/v1/tasks", TaskRoute);
  } catch (error) {
    console.log(error);
  }
};

start();

// jsonを受け取れるようにする
app.use(express.json());
app.listen(PORT, () => console.log("サーバーが起動しました"));
