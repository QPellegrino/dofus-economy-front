import { useState } from "react";
import { login } from "../../api/auth.api";

export default function LoginForm() {
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

      const data = await login({
        email,
        password,
      });

      localStorage.setItem(
        "token",
        data.access_token
      );
      
      window.location.href = "/items";
    } catch (err) {
      setError("Email ou mot de passe invalide");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="auth-form"
      onSubmit={handleSubmit}
    >
      <h1>Connexion</h1>

      {error && (
        <div className="auth-error">
          {error}
        </div>
      )}

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
          ? "Connexion..."
          : "Se connecter"}
      </button>
    </form>
  );
}