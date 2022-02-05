import { NextFunction, Request, Response } from "express";

//
// ─── CHECK IF USER IS AUTHENTICATED ────────────────────────────────────────────
//
export default async (_: Request, res: Response, next: NextFunction) => {
  try {
    const user= res.locals.user;
    if (!user) throw new Error("unauthenticated");
    return next();
  } catch (error) {
    return res.status(401).json({ error: "unauthenticated" });
  }
};
