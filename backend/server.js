import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { env } from "./config/env.js";
import authRoutes from "./routes/auth.js";
import aiRoutes from "./routes/ai.js";
import dashboardRoutes from "./routes/dashboard.js";
import alertRoutes from "./routes/alerts.js";
import { connectDatabase } from "./config/database.js";
import { notFound, errorHandler } from "./middleware/errorHandler.js";

const app = express();

app.disable("x-powered-by");
app.use(helmet());
app.use(cors({ origin: env.frontendUrl, credentials: true }));
app.use(express.json({ limit: "32kb" }));
app.use(rateLimit({ windowMs: 15 * 60 * 1000, limit: 300, standardHeaders: true }));

app.get("/api/health", (_req, res) =>
  res.json({ success: true, message: "CyberShield API is running" }),
);
app.use("/api/auth", authRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/alerts", alertRoutes);

app.use(notFound);
app.use(errorHandler);

connectDatabase()
  .then(() => app.listen(env.port, () => console.log(`CyberShield API listening on port ${env.port}`)))
  .catch((error) => {
    console.error(`Database startup failed: ${error.message}`);
    process.exit(1);
  });
