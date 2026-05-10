import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import {
  getUsers,
  updateUserRole,
} from "../api/users.api";
import { getUserRole } from "../utils/auth";
import {
  User,
  UserRole,
} from "../types/user.types";
import "./UsersAdminPage.scss";

export default function UsersAdminPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] =
    useState<string | null>(null);

  const role = getUserRole();
  const isAdmin = role === "admin";

  const loadUsers = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await getUsers();
      setUsers(data);
    } catch {
      setError(
        "Impossible de charger les utilisateurs.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isAdmin) return;
    loadUsers();
  }, [isAdmin]);

  const handleRoleChange = async (
    user: User,
    nextRole: UserRole,
  ) => {
    try {
      setUpdatingId(user._id);
      setError("");
      await updateUserRole(user._id, nextRole);
      await loadUsers();
    } catch {
      setError("Echec de mise a jour du role.");
    } finally {
      setUpdatingId(null);
    }
  };

  if (!isAdmin) {
    return <Navigate to="/items" replace />;
  }

  return (
    <div className="users-admin-page">
      <div className="users-admin-header">
        <h1>Gestion des utilisateurs</h1>
      </div>

      {error && (
        <div className="users-admin-error">
          {error}
        </div>
      )}

      {loading ? (
        <p>Chargement...</p>
      ) : (
        <table className="users-admin-table">
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => {
              const nextRole: UserRole =
                user.role === "admin"
                  ? "user"
                  : "admin";

              return (
                <tr key={user._id}>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>
                    <span
                      className={`role-badge role-${user.role}`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td>
                    <button
                      className="switch-role-btn"
                      disabled={updatingId === user._id}
                      onClick={() =>
                        handleRoleChange(
                          user,
                          nextRole,
                        )
                      }
                    >
                      {updatingId === user._id
                        ? "Mise a jour..."
                        : `Passer ${nextRole}`}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}
