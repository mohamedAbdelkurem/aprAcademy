import { Router } from "express";
//
// ─── ROUTES ─────────────────────────────────────────────────────────────────────
//
import lesson from "../controllers/lesson";

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
router.get("/c/:id", user, auth, lesson.get_lessons);
router.get("/", user, auth, admin, lesson.get_all_lessons);
router.get("/:id", user, auth, lesson.get_lesson);
router.post("/v/:id", user, auth, lesson.create_visit);
router.post("/:id", user, auth, admin, lesson.create_lesson);
router.put("/:id", user, auth, admin, lesson.update_lesson);
router.delete("/:id", user, auth, admin, lesson.delete_lesson);

// ────────────────────────────────────────────────────────────────────────────────
export default router;
