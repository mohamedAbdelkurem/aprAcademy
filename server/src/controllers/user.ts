//
// ─── INTERFACES ─────────────────────────────────────────────────────────────────
//
import { Request, Response } from "express";

//
// ─── VALIDATORS ─────────────────────────────────────────────────────────────────
//

import { length, validate } from "class-validator";
import { getConnection } from "typeorm";

//
// ─── ENTITIES ───────────────────────────────────────────────────────────────────
//
import User, { Level, Role, Type } from "../entities/User";

//
// ─── MODULES ────────────────────────────────────────────────────────────────────
//
import bcrypt from "bcrypt";
import { createErrorObject } from "../utils/helpers";

export const createUser = async (req: Request, res: Response) => {
  const { username, password, email, firstname, lastname } = req.body;
  let errors: any = {};
  try {
    //
    // ─── CREATE USER OBJECT BASED ON THE DEFINED ENTITY ─────────────────────────────
    //
    const user = new User({ username, password, firstname, lastname, email });
    //
    // ─── VALIDATE USER ───────────────────────────────────────────────
    //
    errors = await validate(user); // RETURN AN ARRAY
    if (errors.length > 0) {
      errors = createErrorObject(errors);
      throw new Error("VALIDATION ERRORS");
    }
    console.log(errors);
    /*
    SAVE THE CREATED USER TO THE DATABASE
    */

    const newUser = await user.save();
    return res.json({ success: "user created succefully", newUser });
  } catch (error) {
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

export const getUsers = async (_: Request, res: Response) => {
  try {
    const user = await User.find({
      order: { username: "ASC" },
      where: { role: "user" },
      relations: ["certificates"],
    });
    return res.json(user);
  } catch (error) {
    switch (error.message) {
      default:
        return res.status(500).json({ error: "something went wrong" });
    }
  }
};
export const getTeachers = async (_: Request, res: Response) => {
  try {
    const teachers = await User.find({
      order: { username: "ASC" },
      where: { role: "teacher" },
    });
    return res.json(teachers);
  } catch (error) {
    switch (error.message) {
      default:
        return res.status(500).json({ error: "something went wrong" });
    }
  }
};
export const getTopUsers = async (_: Request, res: Response) => {
  try {
    const user = res.locals.user;
    let users = await getConnection()
      .createQueryBuilder()
      .select("users")
      .from(User, "users")
      .where("users.timespent IS NOT NULL")
      .andWhere("users.type =:type AND users.level =:level", {
        type: user.type,
        level: user.level,
      })
      .orderBy("users.timespent", "ASC")
      .getMany();
    return res.json(users);
  } catch (error) {
    console.log(error);

    switch (error.message) {
      default:
        return res.status(500).json({ error: "something went wrong" });
    }
  }
};

export const getTopUsersALL = async (_: Request, res: Response) => {
  try {
    let users = await getConnection()
      .createQueryBuilder()
      .select("users")
      .from(User, "users")
      .where("users.timespent IS NOT NULL")
      
      .orderBy("users.timespent", "ASC")
      .getMany();
    return res.json(users);
  } catch (error) {
    console.log(error);
    switch (error.message) {
      default:
        return res.status(500).json({ error: "something went wrong" });
    }
  }
};
export const getUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await User.findOne(id);
    if (!user) throw new Error("NOT FOUND");
    return res.json(user);
  } catch (error) {
    switch (error.message) {
      case "NOT FOUND":
        return res.status(404).json({ error: error.message });
      default:
        return res.status(500).json({ error: "something went wrong" });
    }
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const user = await User.delete(req.params.id);
    if (!user) throw new Error("NOT FOUND");
    return res.json({ success: "user deleted succefully." });
  } catch (error) {
    switch (error.message) {
      case "NOT FOUND":
        return res.status(404).json({ error: error.message });
      default:
        return res.status(500).json({ error: "something went wrong" });
    }
  }
};

export const updateUserPassword = async (req: Request, res: Response) => {
  const { password } = req.body;
  const { id } = req.params;
  const errors: any = {};
  try {
    //
    // ─── CHECK IF USER EXIST ─────────────────────────────────────────
    //
    const user = await User.findOne(id);
    if (!user) throw new Error("NOT FOUND");

    //
    // ─── VALIDATE PASSWORD ───────────────────────────────────────────
    //
    if (length(password, 6))
      errors.password = "password must containt at least 6 characters.";
    if (Object.keys(errors).length > 0) throw new Error("VALIDATION ERRORS");

    //
    // ─── HASHPASSWORD ────────────────────────────────────────────────
    //
    const hashedPassword = await bcrypt.hash(password, 6);

    //
    // ─── UPDATE USER PASSWORD ────────────────────────────────────────
    //
    await getConnection()
      .createQueryBuilder()
      .update(User)
      .set({
        password: hashedPassword,
      })
      .where("id = :id", { id: user?.id })
      .execute();

    return res.json({ success: "user password updated" });
  } catch (error) {
    switch (error.message) {
      case "NOT FOUND":
        return res.status(404).json({ error: error.message });
      /*
       VALIDATION ERRORS :
       - password is less than 6 characters.
      */
      case "VALIDATION ERRORS":
        return res.status(404).json(errors);
      default:
        return res.status(500).json({ error: "something went wrong" });
    }
  }
};
export const updateUserPreferences = async (req: Request, res: Response) => {
  const { levelScore, typeScore } = req.body;
  const { id } = res.locals.user;
  try {
    //
    // ─── CHECK IF USER EXIST ─────────────────────────────────────────
    //
    const user = await User.findOne(id);
    if (!user) throw new Error("NOT FOUND");
    //
    await getConnection()
      .createQueryBuilder()
      .update(User)
      .set({
        level: levelScore >= 20 ? Level.ADVANCED : Level.BEGINNER,
        type: typeScore >= 3 ? Type.SECOND : Type.FIRST,
        startedAt: new Date().toISOString(),
      })
      .where("id = :id", { id })
      .execute();

    return res.json({ success: "user  updated" });
  } catch (error) {
    switch (error.message) {
      case "NOT FOUND":
        return res.status(404).json({ error: error.message });
      default:
        return res.status(500).json({ error: "something went wrong" });
    }
  }
};

export const updateUserGrade = async (req: Request, res: Response) => {
  const { grade } = req.body;
  const id = req.params.id;
  try {
    //
    // ─── CHECK IF USER EXIST ─────────────────────────────────────────
    //
    const user = await User.findOne(id);
    if (!user) throw new Error("NOT FOUND");
    // ─── UPDATE USER GRADE ────────────────────────────────────────
    //
    await getConnection()
      .createQueryBuilder()
      .update(User)
      .set({
        grade,
      })
      .where("id = :id", { id })
      .execute();
    return res.json({ success: "user  updated" });
  } catch (error) {
    switch (error.message) {
      case "NOT FOUND":
        return res.status(404).json({ error: error.message });
      default:
        return res.status(500).json({ error: "something went wrong" });
    }
  }
};

export const updateUserTeacher = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    //
    // ─── CHECK IF USER EXIST ─────────────────────────────────────────
    //
    const user = await User.findOne(id);
    if (!user) throw new Error("NOT FOUND");
    // ─── UPDATE USER GRADE ────────────────────────────────────────
    //
    await getConnection()
      .createQueryBuilder()
      .update(User)
      .set({
        role: Role.TEACHER,
      })
      .where("id = :id", { id })
      .execute();
    return res.json({ success: "user  updated" });
  } catch (error) {
    switch (error.message) {
      case "NOT FOUND":
        return res.status(404).json({ error: error.message });
      default:
        return res.status(500).json({ error: "something went wrong" });
    }
  }
};


export const updateUserNormal = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    //
    // ─── CHECK IF USER EXIST ─────────────────────────────────────────
    //
    const user = await User.findOne(id);
    if (!user) throw new Error("NOT FOUND");
    // ─── UPDATE USER GRADE ────────────────────────────────────────
    //
    await getConnection()
      .createQueryBuilder()
      .update(User)
      .set({
        role: Role.USER,
      })
      .where("id = :id", { id })
      .execute();
    return res.json({ success: "user  updated" });
  } catch (error) {
    switch (error.message) {
      case "NOT FOUND":
        return res.status(404).json({ error: error.message });
      default:
        return res.status(500).json({ error: "something went wrong" });
    }
  }
};