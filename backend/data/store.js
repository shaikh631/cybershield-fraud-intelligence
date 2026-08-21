import bcrypt from "bcrypt";
import { alerts, cases, users } from "../../Fraud-Dedection/src/data/mockData.js";

const accounts = new Map(
  [
    { name: "Ayan Shaikh", email: "admin@cybershield.demo", role: "Admin", department: "Fraud Intelligence", password: bcrypt.hashSync("Demo@123", 10) },
    { name: "Sarah Khan", email: "analyst@cybershield.demo", role: "Analyst", department: "Transaction Risk", password: bcrypt.hashSync("Demo@123", 10) },
    { name: "David Anderson", email: "investigator@cybershield.demo", role: "Investigator", department: "Investigations", password: bcrypt.hashSync("Demo@123", 10) },
  ].map((account) => [account.email, account]),
);

export const store = { alerts: structuredClone(alerts), cases: structuredClone(cases), users: structuredClone(users), accounts };
