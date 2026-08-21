import mongoose from "mongoose";

const alertSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true, index: true },
    source: { type: String, required: true },
    threat: { type: String, required: true },
    riskScore: { type: Number, min: 0, max: 100, required: true },
    severity: { type: String, required: true },
    status: { type: String, enum: ["Open", "Investigating", "Resolved"], default: "Open" },
    assignedTo: String,
    timestamp: String,
    caseId: String,
  },
  { timestamps: true, versionKey: false },
);

export const Alert = mongoose.models.Alert || mongoose.model("Alert", alertSchema);
