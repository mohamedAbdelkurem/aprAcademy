import { Router } from "express";
//
// ─── ROUTES ─────────────────────────────────────────────────────────────────────
//
import certificate from "../controllers/certificate";

//
// ─── MIDDLEWEARS ────────────────────────────────────────────────────────────────
//
import admin from "../middlewears/admin";
import auth from "../middlewears/auth";
import user from "../middlewears/user";

// ────────────────────────────────────────────────────────────────────────────────

const router = Router();

// ────────────────────────────────────────────────────────────────────────────────
//! /api/certificates
router.get("/:id", certificate.get_certificate);
router.post("/:id", user, auth, admin, certificate.create_certificate);
router.delete("/:id", user, auth, admin, certificate.delete_certificate);

// ────────────────────────────────────────────────────────────────────────────────
export default router;
