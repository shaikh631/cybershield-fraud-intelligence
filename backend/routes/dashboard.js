import { Router } from "express";
import { dashboard } from "../controllers/dashboard.js";
import { authenticate } from "../middleware/auth.js";

const router = Router();
router.get("/", authenticate, dashboard);
export default router;
