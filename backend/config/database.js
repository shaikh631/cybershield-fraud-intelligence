import mongoose from "mongoose";
import { env } from "./env.js";
import { User } from "../models/User.js";
import { Alert } from "../models/Alert.js";
import { Case } from "../models/Case.js";
import { alerts, cases, users } from "../../Fraud-Dedection/src/data/mockData.js";
import bcrypt from "bcrypt";

export async function connectDatabase() {
  if (!env.mongodbUri) {
    throw new Error("MONGODB_URI is required to start the backend");
  }

  await mongoose.connect(env.mongodbUri, {
    serverSelectionTimeoutMS: 10000,
  });
  await seedDatabase();
  console.log(`MongoDB connected: ${mongoose.connection.name}`);
}

async function seedDatabase() {
  if (await User.countDocuments() === 0) {
    const demoUsers = [
      { name: "Ayan Shaikh", email: "admin@cybershield.demo", role: "Admin", department: "Fraud Intelligence", password: "Demo@123" },
      { name: "Sarah Khan", email: "analyst@cybershield.demo", role: "Analyst", department: "Transaction Risk", password: "Demo@123" },
      { name: "David Anderson", email: "investigator@cybershield.demo", role: "Investigator", department: "Investigations", password: "Demo@123" },
    ];
    await User.insertMany(await Promise.all(demoUsers.map(async (user) => ({ ...user, password: await bcrypt.hash(user.password, 12) }))));
  }
  if (await Alert.countDocuments() === 0) await Alert.insertMany(alerts);
  if (await Case.countDocuments() === 0) await Case.insertMany(cases);
  if (await User.countDocuments() === 3) await User.insertMany(users.filter((user) => !["admin@cybershield.demo", "analyst@cybershield.demo", "investigator@cybershield.demo"].includes(user.email)).map((user) => ({ ...user, password: bcrypt.hashSync("Demo@123", 12) })));
}

export async function closeDatabase() {
  await mongoose.disconnect();
}
