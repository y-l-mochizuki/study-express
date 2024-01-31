import { Request, Response } from "express";
import { TaskSchema } from "../models";

export const getAllTasks = async (req: Request, res: Response) => {
  try {
    const allTask = await TaskSchema.find({});
    res.status(201).json(allTask);
    console.log("test");
  } catch (error) {
    res.status(500).json(error);
  }
};
export const createTask = async (req: Request, res: Response) => {
  try {
    const createTask = await TaskSchema.create(req.body);
    res.status(201).json(createTask);
  } catch (error) {
    res.status(500).json(error);
  }
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
