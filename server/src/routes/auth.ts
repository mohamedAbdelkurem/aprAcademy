import { Router } from "express";

//
// ─── MIDDLEWEARS ────────────────────────────────────────────────────────────────
//
import auth from "../middlewears/auth";
import user from "../middlewears/user";

//
// ─── ROUTES ─────────────────────────────────────────────────────────────────────
//
import { login, logout, me, register } from "../controllers/auth";

// ────────────────────────────────────────────────────────────────────────────────

const router = Router();

// ────────────────────────────────────────────────────────────────────────────────
//! /api/auth
router.post("/login", login);
router.post("/register", register);
router.get("/me", user, auth, me);
router.get("/logout", logout);

// ────────────────────────────────────────────────────────────────────────────────
export default router;
