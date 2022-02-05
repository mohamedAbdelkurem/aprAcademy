import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../entities/User";

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    //
    // ─── GET TOKEN FROM COOKIES ──────────────────────────────────────
    //
    const token = req.cookies.token;
    if (!token) return next();

    //
    // ─── VERIFY TOKEN ────────────────────────────────────────────────
    //
    const { id }: any = jwt.verify(token, process.env.JWT_SECRET!);

    /*
    /  IF TOKEN VALID,  GET THE USER FROM DATABASE 
    /  AND ADD IT TO THE RESPONSE OBJECT. 
    */

    const foundUser = await User.findOne({ id });
    res.locals.user = foundUser;

    return next();
    // ─────────────────────────────────────────────────────────────────
  } catch (error) {
    return res.status(401).json({ error: "unauthenticated" });
  }
};
