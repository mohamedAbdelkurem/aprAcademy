import { Router } from "express";
//
// ─── ROUTES ─────────────────────────────────────────────────────────────────────
//
import introduction from "../controllers/introduction";

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
router.get("/c/:id", user, auth, introduction.get_introductions);
router.get("/", user, auth,admin, introduction.get_all_introductions);
router.get("/:id", user, auth, introduction.get_introduction);
router.post("/:id", user, auth, admin, introduction.create_introduction);
router.delete("/:id", user, auth, admin, introduction.delete_introduction);

// ────────────────────────────────────────────────────────────────────────────────
export default router;
