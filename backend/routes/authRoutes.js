import express from "express";
import {signup, login, logout, forgotPassword, resetPassword, checkAuth, checkAdmin} from "../controllers/authControllers.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { isAdmin } from "../middleware/isAdmin.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);
router.get("/check-auth", verifyToken, checkAuth);
router.get("/isAdmin", verifyToken, isAdmin, checkAdmin);



export default router;