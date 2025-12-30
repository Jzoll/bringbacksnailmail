import { useState } from "react";
import { login, storeAuth } from "../services/authClient";

export default function SignIn() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const auth = await login({ identifier, password });
      storeAuth(auth);
      // Navigate to mailbox; reload to refresh nav state
      window.location.href = "/mailbox";
    } catch (err: any) {
      setError(err?.message || "Sign in failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="signin-page"
      style={{
        maxWidth: 480,
        margin: "3rem auto",
        padding: "2rem",
        background: "#fff",
        border: "2px solid #dee2e6",
        borderRadius: 12,
      }}
    >
      <h1 style={{ marginBottom: "1rem" }}>Sign In</h1>
      <p style={{ color: "#6c757d", marginBottom: "1.5rem" }}>
        Enter your email or username and password.
      </p>
      {error && (
        <div
          role="alert"
          style={{
            background: "#fdecea",
            color: "#c0392b",
            padding: "0.75rem 1rem",
            borderRadius: 8,
            marginBottom: "1rem",
          }}
        >
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <label
          htmlFor="identifier"
          style={{ display: "block", fontWeight: 600, marginBottom: 8 }}
        >
          Email or Username
        </label>
        <input
          id="identifier"
          type="text"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          required
          style={{
            width: "100%",
            padding: "0.75rem",
            borderRadius: 8,
            border: "2px solid #dee2e6",
            marginBottom: "1rem",
          }}
        />

        <label
          htmlFor="password"
          style={{ display: "block", fontWeight: 600, marginBottom: 8 }}
        >
          Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{
            width: "100%",
            padding: "0.75rem",
            borderRadius: 8,
            border: "2px solid #dee2e6",
            marginBottom: "1.5rem",
          }}
        />

        <button
          type="submit"
          className="btn btn-primary"
          disabled={loading}
          aria-disabled={loading}
        >
          {loading ? "Signing in…" : "Sign In"}
        </button>
      </form>
    </div>
  );
}
