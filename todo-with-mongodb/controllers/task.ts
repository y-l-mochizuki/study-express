import { Request, Response } from "express";

export const getAllTasks = (req: Request, res: Response) => {
  res.send("タスクを全て取得しました");
};
export const createTask = (req: Request, res: Response) => {
  res.send("タスクを新規作成しました");
};
export const getTask = (req: Request, res: Response) => {
  res.send("ある特定のタスクを取得しました");
};
export const updateTask = (req: Request, res: Response) => {
  res.send("ある特定のタスクを更新しました");
};
export const deleteTask = (req: Request, res: Response) => {
  res.send("ある特定のタスクを削除しました");
};
