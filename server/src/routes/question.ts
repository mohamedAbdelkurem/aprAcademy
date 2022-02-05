import { Router } from "express";
//
// ─── ROUTES ─────────────────────────────────────────────────────────────────────
//
import question from "../controllers/question";

//
// ─── MIDDLEWEARS ────────────────────────────────────────────────────────────────
//
import auth from "../middlewears/auth";
import user from "../middlewears/user";

// ────────────────────────────────────────────────────────────────────────────────

const router = Router();

// ────────────────────────────────────────────────────────────────────────────────
//! /api/questions
router.get("/", user, auth, question.get_all_questions);
router.get("/me", user, auth, question.get_my_questions);
router.get("/:id", user, auth, question.get_question);
router.post("/", user, auth, question.create_question);
router.delete("/:id", user, auth, question.delete_question);

// ────────────────────────────────────────────────────────────────────────────────
export default router;
