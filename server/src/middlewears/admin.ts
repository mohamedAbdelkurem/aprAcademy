import { NextFunction, Request, Response } from "express";
//
// ─── CHECK IF THE USER ROLE IS ADMIN ────────────────────────────────────────────
//
import {Role} from "../entities/User"
export default async (_: Request, res: Response, next: NextFunction) => {
  try {
    const user  = res.locals.user;
    if (user.role !== Role.ADMIN) throw new Error("unauthenticated : ADMIN ONLY.");
    return next();
  } catch (error) {
    switch (error.message) {
      case "unauthenticated : ADMIN ONLY.":
        return res.status(401).json({ error: error.message });
      default:
        return res.status(500).json({ error: "something went wrong" });
    }
  }
};
