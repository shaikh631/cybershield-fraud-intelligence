import { useLocation } from "react-router-dom";
import { FraudProvider } from "./context/FraudContext";
import { Shell } from "./Component/AppShell";
import { ErrorPage } from "./pages/system/ErrorPage";
import {
  AUTH_ROUTES,
  PUBLIC_ROUTES,
  getAppPage,
  isProtectedPath,
} from "./config/routes";

function getCurrentUser() {
  try {
    return JSON.parse(localStorage.getItem("cybershield_user") || "null");
  } catch {
    return null;
  }
}

export function AppRouter() {
  const path = useLocation().pathname;
  const user = getCurrentUser();
  const PublicPage = PUBLIC_ROUTES[path];
  const AuthPage = AUTH_ROUTES[path];
  const appPage = getAppPage(path);

  if (PublicPage) return <PublicPage />;
  if (AuthPage) return <AuthPage />;
  if (path === "/403")
    return (
      <ErrorPage
        code="403"
        title="Access restricted"
        copy="You don't have permission to access this workspace view."
      />
    );
  if (!user && isProtectedPath(path))
    return (
      <ErrorPage
        code="SESSION"
        title="Session expired"
        copy="Please sign in again to enter the demo workspace."
      />
    );
  if (user?.role !== "Admin" && path === "/team")
    return (
      <ErrorPage
        code="403"
        title="Access restricted"
        copy="Team management is available to administrators only."
      />
    );
  if (!appPage)
    return (
      <ErrorPage
        code="404"
        title="Page not found"
        copy="The view you are looking for doesn't exist in this demo workspace."
      />
    );

  return <Shell>{appPage}</Shell>;
}

export default function AppRouterWithState() {
  return (
    <FraudProvider>
      <AppRouter />
    </FraudProvider>
  );
}
