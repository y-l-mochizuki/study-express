import express from "express";
export const TaskRoute = express.Router();

// version1 アプデでエンドポイント変わってもいいようにバージョンをつける
TaskRoute.get("/", (req, res) => {
  res.send("タスクを全て取得しました");
});

TaskRoute.post("/", (req, res) => {
  res.send("タスクを新規作成しました");
});

TaskRoute.get("/:id", (req, res) => {
  res.send("ある特定のタスクを取得しました");
});

TaskRoute.patch("/:id", (req, res) => {
  res.send("ある特定のタスクを更新しました");
});

TaskRoute.delete("/:id", (req, res) => {
  res.send("ある特定のタスクを削除しました");
});
