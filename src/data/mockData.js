import { CreditCard, HeartPulse, Link2, Mail, Mic2, Video } from "lucide-react";

export const detectionModules = [
  {
    key: "email",
    name: "Phishing Email",
    icon: Mail,
    color: "#3b82f6",
    score: 94,
    description: "NLP, sender reputation, and social engineering analysis.",
  },
  {
    key: "url",
    name: "Phishing URL",
    icon: Link2,
    color: "#8b7cf6",
    score: 97,
    description: "Domain intelligence, redirects, and lookalike detection.",
  },
  {
    key: "voice",
    name: "AI Voice",
    icon: Mic2,
    color: "#d99a3f",
    score: 91,
    description: "Synthetic voice signatures and identity verification.",
  },
  {
    key: "deepfake",
    name: "Deepfake Media",
    icon: Video,
    color: "#c2577f",
    score: 89,
    description: "Frame, face, and synthetic artifact inspection.",
  },
  {
    key: "insurance",
    name: "Insurance Claims",
    icon: HeartPulse,
    color: "#10b981",
    score: 88,
    description: "Claim anomaly, document, and relationship intelligence.",
  },
  {
    key: "card",
    name: "Credit Card",
    icon: CreditCard,
    color: "#2f9e93",
    score: 98,
    description: "Behavior, velocity, device, and location risk analysis.",
  },
];

export const alerts = Array.from({ length: 30 }, (_, index) => {
  const module = detectionModules[index % detectionModules.length];
  return {
    id: `AL-${10482 - index}`,
    source: module.key,
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
