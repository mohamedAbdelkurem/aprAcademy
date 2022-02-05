import { Router } from "express";
//
// ─── ROUTES ─────────────────────────────────────────────────────────────────────
//
import lessona from "../controllers/lessona";

//
// ─── MIDDLEWEARS ────────────────────────────────────────────────────────────────
//
import admin from "../middlewears/admin";
import auth from "../middlewears/auth";
import user from "../middlewears/user";

// ────────────────────────────────────────────────────────────────────────────────

const router = Router();

// ────────────────────────────────────────────────────────────────────────────────
//! /api/lessonasa
router.get("/c/:id", user, auth, lessona.get_lessonsa);
router.get("/", user, auth,admin, lessona.get_all_lessonsa);
router.get("/l/:courseId/:order", user, auth, lessona.get_lessona);
router.post("/:id", user, auth, admin, lessona.create_lessona);
router.put("/:id", user, auth, admin, lessona.update_lessona);
router.delete("/:id", user, auth, admin, lessona.delete_lessona);

// ────────────────────────────────────────────────────────────────────────────────
export default router;
