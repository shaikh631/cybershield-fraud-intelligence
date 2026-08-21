import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 120 },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
    role: { type: String, enum: ["Admin", "Analyst", "Investigator"], default: "Analyst" },
    department: { type: String, default: "Fraud Operations", maxlength: 120 },
    password: { type: String, required: true, select: false },
    status: { type: String, default: "Active" },
  },
  { timestamps: true, versionKey: false },
);

export const User = mongoose.models.User || mongoose.model("User", userSchema);
