import "dotenv/config";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    throw new Error("トークンがありません");
  }

  const secret_key = process.env.SECRET_KEY!;
  try {
    const decoded = jwt.verify(token, secret_key);
    if (typeof decoded === "string") {
      throw new Error("Invalid token");
    }

    req.body.email = decoded.email;
    return next();
  } catch (error) {
    const isError = error instanceof Error;
    return res
      .status(400)
      .json({ message: isError ? error.message : "トークンが無効です" });
  }
};
