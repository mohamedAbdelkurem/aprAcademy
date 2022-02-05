import { Router } from "express";
//
// ─── ROUTES ─────────────────────────────────────────────────────────────────────
//
import comment from "../controllers/comment";

//
// ─── MIDDLEWEARS ────────────────────────────────────────────────────────────────
//
import auth from "../middlewears/auth";
import user from "../middlewears/user";

// ────────────────────────────────────────────────────────────────────────────────

const router = Router();

// ────────────────────────────────────────────────────────────────────────────────
//! /api/comments
router.get("/l/:lessonId", user, auth, comment.get_comments_l);
router.get("/la/:order", user, auth, comment.get_comments_la);
router.get("/q/:questionId", user, auth, comment.get_comments_q);
router.post("/l/:lessonId", user, auth, comment.create_comment_lesson);
router.post("/la/:order", user, auth, comment.create_comment_lessona);
router.post("/q/:questionId", user, auth, comment.create_comment_question);
router.delete("/q/:id", user, auth, comment.delete_comment_q);
router.delete("/l/:id", user, auth, comment.delete_comment);

// ────────────────────────────────────────────────────────────────────────────────
export default router;
