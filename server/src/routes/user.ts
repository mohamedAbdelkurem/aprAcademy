import { Router } from "express";
//
// ─── ROUTES ─────────────────────────────────────────────────────────────────────
//
import {
  createUser,
  deleteUser,
  getTeachers,
  getTopUsers,
  getTopUsersALL,
  getUsers,
  updateUserGrade,
  updateUserNormal,
  updateUserPassword,
  updateUserPreferences,
  updateUserTeacher,
} from "../controllers/user";

//
// ─── MIDDLEWEARS ────────────────────────────────────────────────────────────────
//
import admin from "../middlewears/admin";
import auth from "../middlewears/auth";
import user from "../middlewears/user";

// ────────────────────────────────────────────────────────────────────────────────

const router = Router();

// ────────────────────────────────────────────────────────────────────────────────
//! /api/users
router.post("/", user, auth, admin, createUser);
router.get("/users", user, auth, admin, getUsers);
router.get("/teachers", user, auth, admin, getTeachers);
router.get("/topusers", user, auth, getTopUsers);
router.get("/topusersall", user, auth, getTopUsersALL);
router.post("/updatepreferences", user, auth,  updateUserPreferences);
router.post("/updategrade/:id", user, auth,  updateUserGrade);
router.post("/updateuserteacher/:id", user, auth,admin,  updateUserTeacher);
router.post("/updateusernormal/:id", user, auth,admin,  updateUserNormal);
router.delete("/:id", user, auth, admin, deleteUser);
router.put("/password/:id", user, auth, updateUserPassword);

// ────────────────────────────────────────────────────────────────────────────────
export default router;