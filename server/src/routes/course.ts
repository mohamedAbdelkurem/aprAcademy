import { Router } from "express";
//
// ─── ROUTES ─────────────────────────────────────────────────────────────────────
//
import course from "../controllers/course";

//
// ─── MIDDLEWEARS ────────────────────────────────────────────────────────────────
//
import admin from "../middlewears/admin";
import auth from "../middlewears/auth";
import user from "../middlewears/user";

// ────────────────────────────────────────────────────────────────────────────────

const router = Router();

// ────────────────────────────────────────────────────────────────────────────────
//! /api/courses
router.get("/", user, auth, course.get_courses);
router.get("/match", user, auth, course.get_courses_match);
router.get("/c/:id", user, auth, course.get_course);
router.post("/", user, auth, admin, course.create_course);
router.delete("/:id", user, auth, admin, course.delete_course);

// ────────────────────────────────────────────────────────────────────────────────
export default router;
