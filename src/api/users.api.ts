import type { UserRole } from "../types/user.types";

const API = "http://localhost:3000";

function buildAuthHeaders() {
  const headers: Record<string, string> = {};
  const token = localStorage.getItem("token");

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
}

export async function getUsers() {
  const res = await fetch(`${API}/users`, {
    headers: {
      ...buildAuthHeaders(),
    },
  });

  if (!res.ok) {
    throw new Error("Impossible de charger les utilisateurs");
  }

  return res.json();
}

export async function updateUserRole(
  id: string,
  role: UserRole,
) {
  const res = await fetch(
    `${API}/users/${id}/role`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        ...buildAuthHeaders(),
      },
      body: JSON.stringify({ role }),
    },
  );

  if (!res.ok) {
    throw new Error("Impossible de modifier le role");
  }

  return res.json();
}
