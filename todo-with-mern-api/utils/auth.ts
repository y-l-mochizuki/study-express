import "dotenv/config";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  if (req.method === "GET") {
    return next();
  }

  const token = await req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(400).json({ message: "トークンがありません" });
  }

  const secret_key = process.env.SECRET_KEY!;
  try {
    const decoded = jwt.verify(token, secret_key);
    if (typeof decoded === "string") throw new Error("Invalid token");

    req.body.email = decoded.email;
    return next();
  } catch (error) {
    return res.status(400).json({ message: "トークンが無効です" });
  }
};
