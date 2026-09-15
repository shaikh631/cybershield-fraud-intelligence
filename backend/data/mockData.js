export const alerts = Array.from({ length: 30 }, (_, index) => {
  const modules = ["email", "url", "voice", "deepfake", "insurance", "card"];
  const module = modules[index % modules.length];
  return {
    id: `AL-${10482 - index}`,
    source: module,
    threat: [
      "Credential harvesting campaign",
      "Impossible travel transaction",
      "Lookalike banking domain",
      "KYC face-swap indicators",
      "Duplicate claim pattern",
      "Synthetic voice signature match",
    ][index % 6],
    riskScore:
      [94, 98, 97, 89, 88, 91][index % 6] - (index > 11 ? index % 8 : 0),
    severity: index % 6 < 3 ? "Critical" : index % 3 ? "High" : "Medium",
    status:
      index % 7 === 0 ? "Resolved" : index % 4 === 0 ? "Investigating" : "Open",
    assignedTo: ["Ayan Shaikh", "Sarah Khan", "David Anderson", "Priya Nair"][
      index % 4
    ],
    timestamp: `${index + 2}m ago`,
    caseId: index < 4 ? "CS-10482" : null,
  };
});

export const cases = Array.from({ length: 15 }, (_, index) => ({
  id: `CS-${10482 - index}`,
  title:
    index === 0
      ? "Coordinated Financial Fraud"
      : [
          "Synthetic identity ring",
          "Merchant collusion review",
          "Claims documentation anomaly",
        ][index % 3],
  severity: index < 2 ? "Critical" : index < 6 ? "High" : "Medium",
  alerts: index + 1,
  investigator: ["Sarah Khan", "David Anderson", "Priya Nair"][index % 3],
  status: index % 4 === 3 ? "Closed" : index % 2 ? "In Progress" : "Open",
  sla: index < 2 ? "02:14:38" : "18:42:10",
}));

export const users = [
  "Ayan Shaikh",
  "Sarah Khan",
  "David Anderson",
  "Priya Nair",
  "Meera Patel",
  "Omar Wilson",
  "Nisha Rao",
  "Ravi Menon",
].map((name, index) => ({
  name,
  email: `${name.toLowerCase().replace(" ", ".")}@cybershield.demo`,
  role: ["Admin", "Analyst", "Investigator"][index % 3],
  department: "Fraud Operations",
  status: "Active",
}));
