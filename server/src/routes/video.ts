import { Router } from "express";
//
// ─── ROUTES ─────────────────────────────────────────────────────────────────────
//
import video from "../controllers/video";

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
router.get("/c/:id", user, auth, video.get_videos);
router.get("/", user, auth,admin, video.get_all_videos);
router.get("/:id", user, auth, video.get_video);
router.post("/:id", user, auth, admin, video.create_video);
router.delete("/:id", user, auth, admin, video.delete_video);

// ────────────────────────────────────────────────────────────────────────────────
export default router;
