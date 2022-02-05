import { Router } from "express";
//
// ─── ROUTES ─────────────────────────────────────────────────────────────────────
//
import result from "../controllers/result";

//
// ─── MIDDLEWEARS ────────────────────────────────────────────────────────────────
//
import admin from "../middlewears/admin";
import auth from "../middlewears/auth";
import user from "../middlewears/user";

// ────────────────────────────────────────────────────────────────────────────────

const router = Router();

// ────────────────────────────────────────────────────────────────────────────────
//! /api/lessons
router.get("/r/:id", user, auth, result.get_results);
router.get("/", user, auth, admin, result.get_all_results);
router.get("/checkuser", user, auth, result.check_user);
router.put("/graduate", user, auth, result.graduateUser);
router.get("/:id", user, auth, result.get_result);
router.post("/la/:id", user, auth, result.create_result_lessona);
router.post("/l/:id", user, auth, result.create_result_lesson);
router.delete("/:id", user, auth, admin, result.delete_result);

// ────────────────────────────────────────────────────────────────────────────────
export default router;
