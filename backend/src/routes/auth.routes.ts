import { Router } from "express";
import { handleAsync } from "../utils/handleAsync";
import {signup, login, forgotPassword, resetPassword} from "../controllers/auth.controller"

const router = Router();

router.post("/signup", handleAsync(signup));
router.post("/login", handleAsync(login));
router.post("/forgot-password", handleAsync(forgotPassword));
router.post("/reset-password", handleAsync(resetPassword));

export default router;