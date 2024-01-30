import express from "express";
import { TaskRoute } from "./routes/tasks";

const app = express();
const PORT = 5001;

// ルーティング設定
app.use("/api/v1/tasks", TaskRoute);

app.listen(PORT, () => console.log("サーバーが起動しました"));
