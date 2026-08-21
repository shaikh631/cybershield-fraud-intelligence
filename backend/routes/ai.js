import { Router } from "express";
import { analyze } from "../controllers/ai.js";
import { authenticate } from "../middleware/auth.js";

const router = Router();
router.post("/analyze", authenticate, analyze);
export default router;
