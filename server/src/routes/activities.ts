import { Router } from "express";
//
// ─── ROUTES ─────────────────────────────────────────────────────────────────────
//
import activity from "../controllers/activity";

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
router.get("/c/:id", user, auth, activity.get_activities);
router.get("/", user, auth,admin, activity.get_all_activities);
router.get("/:id", user, auth, activity.get_activity);
router.post("/:id", user, auth, admin, activity.create_activity);
router.delete("/:id", user, auth, admin, activity.delete_activity);

// ────────────────────────────────────────────────────────────────────────────────
export default router;
