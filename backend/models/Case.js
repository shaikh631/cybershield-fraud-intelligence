import mongoose from "mongoose";

const caseSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true },
    severity: String,
    alerts: Number,
    investigator: String,
    status: String,
    sla: String,
  },
  { timestamps: true, versionKey: false },
);

export const Case = mongoose.models.Case || mongoose.model("Case", caseSchema);
