export function getToken() {
  return localStorage.getItem("token");
}

export function isAuthenticated() {
  return !!getToken();
}

export type UserRole = "admin" | "user";

function decodeJwtPayload(token: string) {
  try {
    const payload = token.split(".")[1];
    if (!payload) return null;

    const base64 = payload
      .replace(/-/g, "+")
      .replace(/_/g, "/");

    return JSON.parse(atob(base64));
  } catch {
    return null;
  }
}

export function getUserRole(): UserRole {
  const token = getToken();
  if (!token) return "user";

  const payload = decodeJwtPayload(token);
  if (!payload) return "user";

  const directRole =
    payload.role ??
    payload.user?.role;

  if (directRole === "admin") {
    return "admin";
  }

  const roles =
    payload.roles ??
    payload.user?.roles;

  if (
    Array.isArray(roles) &&
    roles.includes("admin")
  ) {
    return "admin";
  }

  return "user";
}