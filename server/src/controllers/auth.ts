//
// ─── INTERFACES ─────────────────────────────────────────────────────────────────
//
import { Request, Response } from "express";

//
// ─── ENTITIES ───────────────────────────────────────────────────────────────────
//
import User from "../entities/User";

//
// ─── MODULES ────────────────────────────────────────────────────────────────────
//
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookie from "cookie";
import { createErrorObject } from "../utils/helpers";
import { validate } from "class-validator";
//
//! ─── AUTH ───────────────────────────────────────────────────────────────────────
//
//?
//? ─── LOGIN ──────────────────────────────────────────────────────────────────────
//?

export const login = async (req: Request, res: Response) => {
  let errors: any = {};
  const { email, password } = req.body;

  try {
    /*
    GET USER FROM DATABASE USING  USERNAME FROM REQUEST BODY
    */
    const user = await User.findOne({ email });

    /*
    IF USER DOES NOT EXIST , THROW AN ERROR 
    */
    if (!user) {
      errors.email = "هذا البريد الإلكتروني غير مرتبط بأي حساب.";
      throw new Error("VALIDATION ERRORS");
    }
    /*
    IF USER  EXIST ,CHECK IF THE PASSWORD FROM THE REQUEST BODY
    MATCH THE PASSWORD STORED IN THE DATABASE
    */
    const passwordMatch = await bcrypt.compare(password, user.password);

    /*
    IF PASSWORD DOES NOT MATCH THROW AN ERROR
    */
    if (!passwordMatch) {
      errors.password = "كلمة المرور غير مطابقة.";
      throw new Error("VALIDATION ERRORS");
    }
    /*
    IF PASSWORD MATCH , CREATE A NEW TOKEN CONTAINING THE USER ID.
    */
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!);
    /*
    SET THE CREATED TOKEN TO THE HEADER.
    */
    res.set(
      "Set-Cookie",
      cookie.serialize("token", token, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 604800,
        path: "/",
      })
    );
    /*
    USER LOGGED IN SUCCEFULLY
    */
    return res.json({ success: "user  logged in.", user });
  } catch (error) {
    /*
    HANDLING ERRORS
    */
    switch (error.message) {
      /*
       VALIDATION ERRORS :
       - username does not belong to any account.
       or
       - password does not match
      */
      case "VALIDATION ERRORS":
        return res.status(401).json(errors);
      default:
        return res.status(500).json({ error: "something went wrong" });
    }
  }
};

//?
//? ─── REGISTER ───────────────────────────────────────────────────────────────────
//?

export const register = async (req: Request, res: Response) => {
  const { email, password, username, firstname, lastname, level, type } =
    req.body;
  let errors: any = {};

  try {
    //
    // ─── CREATE USER OBJECT BASED ON THE DEFINED ENTITY ─────────────────────────────
    //
    const checkUserEmail= await User.findOne({ where: { email } });
    if (checkUserEmail) {
      errors.email = "البريد الإلكتروني مستخدم مسبقا";
    }
    if (Object.keys(errors).length > 0) {
      throw new Error("VALIDATION ERRORS");
    }
    const checkUserUser = await User.findOne({ where: { username } });
    if (checkUserUser) {
      errors.username = "اسم المستخدم مستعمل مسبقا";
    }
    if (Object.keys(errors).length > 0) {
      throw new Error("VALIDATION ERRORS");
    }

    const user = new User({
      email: email.toLowerCase(),
      username,
      password,
      lastname,
      firstname,
      level,
      type,
    });

    //
    // ─── VALIDATE USER ───────────────────────────────────────────────
    //
  

    errors = await validate(user); // RETURN AN ARRAY

    if (errors.length > 0) {
      errors = createErrorObject(errors);
      throw new Error("VALIDATION ERRORS");
    }
   
    
    /*
    SAVE THE CREATED USER TO THE DATABASE
    */
    const newUser = await user.save();

    /*
    CREATE A NEW TOKEN CONTAINING THE USER ID.
    */
    const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET!);

    /*
    SET THE CREATED TOKEN TO THE HEADER.
    */
    res.set(
      "Set-Cookie",
      cookie.serialize("token", token, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 604800,
        path: "/",
      })
    );

    return res.json(newUser);
  } catch (error) {
    console.log(error);
    switch (error.message) {
      /*
       VALIDATION ERRORS :
       - username is already used.
       or/and
       - password is less than 6 characters.
       or/and
       - email is already used
      */
      case "VALIDATION ERRORS":
        return res.status(401).json(errors);
      default:
        return res.status(500).json({ error: "something went wrong" });
    }
  }
};

//?
//? ─── LOGOUT ─────────────────────────────────────────────────────────────────────
//?

export const logout = (_: Request, res: Response) => {
  try {
    //
    // ─── REMOVE TOKEN FROM THE COOKIES ───────────────────────────────
    //
    res.set(
      "Set-Cookie",
      cookie.serialize("token", "", {
        sameSite: "strict",
        expires: new Date(0),
        path: "/",
        httpOnly: true,
      })
    );
    return res.status(200).json({ success: "user logged out succefully." });
  } catch (error) {
    return res.status(500).json({ error: "something went wrong" });
  }
};

//?
//? ─── PROFILE ────────────────────────────────────────────────────────────────────
//?

export const me = async (_: Request, res: Response) => {
  //
  // ─── RETURN USER FROM THE USER MIDDLEWEAR ───────────────────────────────────────
  //
  try {
    const user = await User.findOne({
      where: { id: res.locals.user.id },
      relations: ["certificates"],
    });
    return res.json(user);
  } catch (error) {
    return res.status(500).json({ error: "something went wrong" });
  }
};
