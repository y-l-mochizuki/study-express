import { Request, Response } from "express";
import { TaskSchema } from "../models";

export const getAllTasks = async (req: Request, res: Response) => {
  try {
    const allTask = await TaskSchema.find({});
    res.status(201).json(allTask);
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
export const getTask = async (req: Request, res: Response) => {
  const _id = req.params.id;
  try {
    const task = await TaskSchema.findOne({
      _id,
    });
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json(`_id: ${_id}は存在しません`);
  }
};
export const updateTask = async (req: Request, res: Response) => {
  const _id = req.params.id;
  try {
    const updateTask = await TaskSchema.findOneAndUpdate(
      {
        _id,
      },
      req.body,
      {
        new: true,
      },
    );

    res.status(201).json(updateTask);
  } catch (error) {
    res.status(500).json(`_id: ${_id}は存在しません`);
  }
};
export const deleteTask = async (req: Request, res: Response) => {
  const _id = req.params.id;
  try {
    const updateTask = await TaskSchema.findOneAndDelete({
      _id,
    });

    res.status(201).json(updateTask);
  } catch (error) {
    res.status(500).json(`_id: ${_id}は存在しません`);
  }
};
