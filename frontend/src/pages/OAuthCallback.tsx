import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { googleLogin, storeAuth } from "../services/authClient";

/**
 * OAuth Callback page handles the Google OAuth redirect
 * Extracts the authorization code from URL and exchanges it for an auth token
 */
export default function OAuthCallback() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Get the authorization code from URL params
        const params = new URLSearchParams(window.location.search);
        const code = params.get("code");
        const idToken = params.get("id_token");

        if (!code && !idToken) {
          throw new Error("No authorization code or ID token received");
        }

        // If we have an id_token (from implicit flow), use it directly
        if (idToken) {
          const auth = await googleLogin(idToken);
          storeAuth(auth);
          // Navigate to mailbox after successful login
          window.location.href = "/mailbox";
        } else if (code) {
          // If we have a code (from authorization code flow),
          // send it to backend to exchange for tokens
          const response = await fetch("/auth/google/callback", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ code }),
          });

          if (!response.ok) {
            const error = await response.json();
            throw new Error(error.detail || "OAuth callback failed");
          }

          const auth = await response.json();
          storeAuth(auth);
          // Navigate to mailbox after successful login
          window.location.href = "/mailbox";
        }
      } catch (err: any) {
        setError(err?.message || "Authentication failed");
        setLoading(false);
      }
    };

    handleCallback();
  }, [navigate]);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <p>Processing your login...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          maxWidth: 480,
          margin: "3rem auto",
          padding: "2rem",
          background: "#fff",
          border: "2px solid #dee2e6",
          borderRadius: 12,
        }}
      >
        <h1 style={{ marginBottom: "1rem" }}>Authentication Error</h1>
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
        <a href="/signin" style={{ color: "#007bff", textDecoration: "none" }}>
          Back to Sign In
        </a>
      </div>
    );
  }

  return null;
}
