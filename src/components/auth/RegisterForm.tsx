import { useState } from "react";
import { Link } from "react-router-dom";
import { register } from "../../api/auth.api";

export default function RegisterForm() {
  const [username, setUsername] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const data = await register({
        username,
        email,
        password,
      });

      localStorage.setItem(
        "token",
        data.access_token
      );
      
      window.location.href = "/items";
    } catch (err) {
      setError("Erreur inscription");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="auth-form"
      onSubmit={handleSubmit}
    >
      <h1>Inscription</h1>

      {error && (
        <div className="auth-error">
          {error}
        </div>
      )}

      <input
        type="text"
        placeholder="Pseudo"
        value={username}
        onChange={(e) =>
          setUsername(e.target.value)
        }
      />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) =>
          setEmail(e.target.value)
        }
      />

      <input
        type="password"
        placeholder="Mot de passe"
        value={password}
        onChange={(e) =>
          setPassword(e.target.value)
        }
      />

      <button disabled={loading}>
        {loading
          ? "Création..."
          : "Créer le compte"}
      </button>

      <Link
        to="/login"
        className="auth-secondary-button"
      >
        Déjà un compte ? Se connecter
      </Link>
    </form>
  );
}