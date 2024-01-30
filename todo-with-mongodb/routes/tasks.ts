import express from "express";
import {
  createTask,
  deleteTask,
  getAllTasks,
  getTask,
  updateTask,
} from "../controllers/task";

export const TaskRoute = express.Router();

// version1 アプデでエンドポイント変わってもいいようにバージョンをつける
TaskRoute.get("/", getAllTasks);

TaskRoute.post("/", createTask);

TaskRoute.get("/:id", getTask);

TaskRoute.patch("/:id", updateTask);

TaskRoute.delete("/:id", deleteTask);
