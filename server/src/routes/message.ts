import { Router } from "express";
//
// ─── ROUTES ─────────────────────────────────────────────────────────────────────
//
import messages from "../controllers/messages";

//
// ─── MIDDLEWEARS ────────────────────────────────────────────────────────────────
//

import auth from "../middlewears/auth";
import user from "../middlewears/user";

// ────────────────────────────────────────────────────────────────────────────────

const router = Router();

// ────────────────────────────────────────────────────────────────────────────────
//! /api/messages
router.get("/", user, auth, messages.get_messages);
router.get("/:id", user, auth, messages.get_message);
router.post("/", messages.create_message);
router.delete("/:id", user, auth, messages.delete_message);

// ───────────────────────────────────────────────────────────────────────────────
export default router;
