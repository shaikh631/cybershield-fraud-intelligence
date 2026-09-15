const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

async function request(path, options = {}) {
  const token = localStorage.getItem("cybershield_token");
  let response;
  try {
    response = await fetch(`${API_URL}${path}`, {
      ...options,
      headers: { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}), ...options.headers },
    });
  } catch {
    throw new Error(`Cannot reach the CyberShield API at ${API_URL}. Start the backend or check VITE_API_URL.`);
  }
  const body = await response.json().catch(() => ({ success: false, message: "Invalid server response" }));
  if (!response.ok || !body.success) throw new Error(body.message || "Request failed");
  return body.data ?? body;
}

export const api = {
  login: (credentials) => request("/api/auth/login", { method: "POST", body: JSON.stringify(credentials) }),
  register: (details) => request("/api/auth/register", { method: "POST", body: JSON.stringify(details) }),
  dashboard: () => request("/api/dashboard"),
  analyze: (input) => request("/api/ai/analyze", { method: "POST", body: JSON.stringify(input) }),
  updateAlert: (id, status) => request(`/api/alerts/${id}`, { method: "PATCH", body: JSON.stringify({ status }) }),
};
