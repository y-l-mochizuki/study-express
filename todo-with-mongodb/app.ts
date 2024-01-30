import express from "express";
const app = express();
const PORT = 5001;

// version1 アプデでエンドポイント変わってもいいようにバージョンをつける
app.get("/api/v1/tasks", (req, res) => {
  res.send("タスクを全て取得しました");
});

app.listen(PORT, () => console.log("サーバーが起動しました"));
