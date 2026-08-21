import {
  AuthFlow,
  ForgotPassword,
  Verification,
} from "../pages/auth/AuthPages";
import { Home } from "../pages/public/Home";
import { Platform } from "../pages/public/Platform";
import { Modules } from "../pages/public/Modules";
import { Security } from "../pages/public/Security";
import { About } from "../pages/public/About";
import { Contact } from "../pages/public/Contact";
import { Dashboard } from "../pages/dashboard/Dashboard";
import { AlertsPage } from "../pages/alerts/AlertsPage";
import { AlertDetails } from "../pages/alerts/AlertDetails";
import { Detection } from "../pages/detections/Detection";
import { Correlation } from "../pages/correlation/Correlation";
import { Cases } from "../pages/cases/Cases";
import { Simple } from "../pages/investigation/Simple";
import { Profile } from "../pages/account/Profile";
import { ErrorPage } from "../pages/system/ErrorPage";

export const PUBLIC_ROUTES = {
  "/": Home,
  "/platform": Platform,
  "/modules": Modules,
  "/security": Security,
  "/about": About,
  "/contact": Contact,
};

export const AUTH_ROUTES = {
  "/login": AuthFlow,
  "/signup": () => <AuthFlow signup />,
  "/forgot-password": ForgotPassword,
  "/verify-otp": Verification,
  "/2fa": () => <Verification twoFactor />,
};

const PROTECTED_PATHS = [
  "/dashboard",
  "/alerts",
  "/correlation",
  "/cases",
  "/evidence",
  "/reports",
  "/audit-log",
  "/team",
  "/settings",
  "/profile",
];

export function getAppPage(path) {
  if (path === "/dashboard") return <Dashboard />;
  if (path === "/alerts") return <AlertsPage />;
  if (path.startsWith("/alerts/")) return <AlertDetails id={getId(path)} />;
  if (path.startsWith("/detections/")) return <Detection type={getId(path)} />;
  if (path === "/correlation") return <Correlation />;
  if (path === "/cases") return <Cases />;
  if (path.startsWith("/cases/")) return <Cases id={getId(path)} />;
  if (["evidence", "reports", "audit-log", "team"].includes(path.slice(1))) {
    return <Simple type={path.slice(1)} />;
  }
  if (path === "/settings") return <Profile settings />;
  if (path === "/profile") return <Profile />;
  return null;
}

export function getId(path) {
  return path.split("/").filter(Boolean).pop();
}

export function isProtectedPath(path) {
  return (
    PROTECTED_PATHS.some(
      (route) => path === route || path.startsWith(`${route}/`),
    ) || path.startsWith("/detections/")
  );
}
