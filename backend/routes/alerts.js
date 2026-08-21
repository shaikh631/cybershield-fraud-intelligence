import { Router } from "express";
import { list, update } from "../controllers/alerts.js";
import { authenticate } from "../middleware/auth.js";

const router = Router();
router.get("/", authenticate, list);
router.patch("/:id", authenticate, update);
export default router;
