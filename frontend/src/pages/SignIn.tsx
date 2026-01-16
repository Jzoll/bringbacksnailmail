import { useState, useEffect } from "react";
import { login, register, storeAuth } from "../services/authClient";
import eyeIcon from "../assets/icons/eye.svg";
import eyeSlashIcon from "../assets/icons/eye-slash.svg";

declare global {
  interface Window {
    google: any;
  }
  interface ImportMetaEnv {
    readonly VITE_GOOGLE_CLIENT_ID?: string;
  }
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
}

export default function SignIn() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [identifier, setIdentifier] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const calculatePasswordStrength = (pass: string): number => {
    let strength = 0;
    if (pass.length >= 8) strength++;
    if (pass.length >= 12) strength++;
    if (/[a-z]/.test(pass) && /[A-Z]/.test(pass)) strength++;
    if (/\d/.test(pass)) strength++;
    if (/[^a-zA-Z0-9]/.test(pass)) strength++;
    return strength;
  };

  const getPasswordStrengthLabel = (strength: number): string => {
    if (strength === 0) return "";
    if (strength <= 2) return "Weak";
    if (strength <= 3) return "Fair";
    if (strength <= 4) return "Good";
    return "Strong";
  };

  const getPasswordStrengthColor = (strength: number): string => {
    if (strength === 0) return "#dee2e6";
    if (strength <= 2) return "#dc3545";
    if (strength <= 3) return "#ffc107";
    if (strength <= 4) return "#17a2b8";
    return "#28a745";
  };

  useEffect(() => {
    // Initialize Google Sign-In button
    const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

    if (window.google && googleClientId) {
      window.google.accounts.id.initialize({
        client_id: googleClientId,
        callback: handleGoogleSignIn,
      });
      window.google.accounts.id.renderButton(
        document.getElementById("google-signin-button"),
        {
          theme: "outline",
          size: "large",
          width: "100%",
        }
      );
    }
  }, []);

  const handleGoogleSignIn = async (response: any) => {
    try {
      setLoading(true);
      setError(null);

      // Send the ID token to your backend
      const result = await fetch("/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id_token: response.credential }),
      });

      if (!result.ok) {
        const errorData = await result.json();
        throw new Error(errorData.detail || "Google sign in failed");
      }

      const auth = await result.json();
      storeAuth(auth);
      // Navigate to mailbox; reload to refresh nav state
      window.location.href = "/mailbox";
    } catch (err: any) {
      setError(err?.message || "Google sign in failed");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      if (isSignUp) {
        // Sign up
        if (password !== confirmPassword) {
          throw new Error("Passwords do not match");
        }
        if (password.length < 8) {
          throw new Error("Password must be at least 8 characters");
        }
        if (!acceptTerms) {
          throw new Error("You must accept the Terms of Service");
        }
        const auth = await register({
          email,
          username: username || undefined,
          password,
        });
        storeAuth(auth);
      } else {
        // Sign in
        const auth = await login({ identifier, password });
        storeAuth(auth);
      }
      // Navigate to mailbox; reload to refresh nav state
      window.location.href = "/mailbox";
    } catch (err: any) {
      setError(
        err?.message || (isSignUp ? "Sign up failed" : "Sign in failed")
      );
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
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1.5rem",
        }}
      >
        <h1 style={{ margin: 0 }}>{isSignUp ? "Sign Up" : "Sign In"}</h1>
        <button
          type="button"
          onClick={() => setIsSignUp(!isSignUp)}
          style={{
            background: "none",
            border: "none",
            color: "#007bff",
            cursor: "pointer",
            fontSize: "0.9rem",
            textDecoration: "underline",
          }}
        >
          {isSignUp ? "Already have an account?" : "Need an account?"}
        </button>
      </div>

      <p style={{ color: "#6c757d", marginBottom: "1.5rem" }}>
        {isSignUp
          ? "Create a new account to get started."
          : "Enter your email or username and password."}
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
        {isSignUp ? (
          <>
            <label
              htmlFor="email"
              style={{ display: "block", fontWeight: 600, marginBottom: 8 }}
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "0.75rem",
                borderRadius: 8,
                border: "2px solid #dee2e6",
                marginBottom: "1rem",
                boxSizing: "border-box",
              }}
            />

            <label
              htmlFor="username"
              style={{ display: "block", fontWeight: 600, marginBottom: 8 }}
            >
              Username (optional)
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{
                width: "100%",
                padding: "0.75rem",
                borderRadius: 8,
                border: "2px solid #dee2e6",
                marginBottom: "1rem",
                boxSizing: "border-box",
              }}
            />

            <label
              htmlFor="password"
              style={{ display: "block", fontWeight: 600, marginBottom: 8 }}
            >
              Password
            </label>
            <div style={{ position: "relative", marginBottom: "1rem" }}>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setPasswordStrength(
                    calculatePasswordStrength(e.target.value)
                  );
                }}
                required
                minLength={8}
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  paddingRight: "2.5rem",
                  borderRadius: 8,
                  border: "2px solid #dee2e6",
                  boxSizing: "border-box",
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: "0.75rem",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#6c757d",
                  padding: 0,
                  width: "1.5rem",
                  height: "1.5rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                <img
                  src={showPassword ? eyeIcon : eyeSlashIcon}
                  alt={showPassword ? "Hide password" : "Show password"}
                  style={{ width: "1.2rem", height: "1.2rem" }}
                />
              </button>
            </div>
            {password && (
              <div style={{ marginBottom: "1rem" }}>
                <div
                  style={{
                    display: "flex",
                    gap: "0.25rem",
                    marginBottom: "0.25rem",
                  }}
                >
                  {[1, 2, 3, 4, 5].map((level) => (
                    <div
                      key={level}
                      style={{
                        flex: 1,
                        height: "4px",
                        borderRadius: 2,
                        background:
                          level <= passwordStrength
                            ? getPasswordStrengthColor(passwordStrength)
                            : "#dee2e6",
                        transition: "background 0.3s",
                      }}
                    />
                  ))}
                </div>
                <span
                  style={{
                    fontSize: "0.85rem",
                    color: getPasswordStrengthColor(passwordStrength),
                    fontWeight: 500,
                  }}
                >
                  {getPasswordStrengthLabel(passwordStrength)}
                </span>
              </div>
            )}

            <label
              htmlFor="confirmPassword"
              style={{ display: "block", fontWeight: 600, marginBottom: 8 }}
            >
              Confirm Password
            </label>
            <div style={{ position: "relative", marginBottom: "1.5rem" }}>
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={8}
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  paddingRight: "2.5rem",
                  borderRadius: 8,
                  border: "2px solid #dee2e6",
                  boxSizing: "border-box",
                }}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                style={{
                  position: "absolute",
                  right: "0.75rem",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#6c757d",
                  padding: 0,
                  width: "1.5rem",
                  height: "1.5rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                aria-label={
                  showConfirmPassword ? "Hide password" : "Show password"
                }
              >
                <img
                  src={showConfirmPassword ? eyeIcon : eyeSlashIcon}
                  alt={showConfirmPassword ? "Hide password" : "Show password"}
                  style={{ width: "1.2rem", height: "1.2rem" }}
                />
              </button>
            </div>

            <label
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "0.5rem",
                marginBottom: "1.5rem",
                cursor: "pointer",
              }}
            >
              <input
                type="checkbox"
                checked={acceptTerms}
                onChange={(e) => setAcceptTerms(e.target.checked)}
                required
                style={{
                  marginTop: "0.25rem",
                  cursor: "pointer",
                }}
              />
              <span style={{ fontSize: "0.9rem", color: "#495057" }}>
                I agree to the{" "}
                <a
                  href="/terms"
                  target="_blank"
                  style={{ color: "#007bff", textDecoration: "underline" }}
                >
                  Terms of Service
                </a>{" "}
                and{" "}
                <a
                  href="/privacy"
                  target="_blank"
                  style={{ color: "#007bff", textDecoration: "underline" }}
                >
                  Privacy Policy
                </a>
              </span>
            </label>
          </>
        ) : (
          <>
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
                boxSizing: "border-box",
              }}
            />

            <label
              htmlFor="password"
              style={{ display: "block", fontWeight: 600, marginBottom: 8 }}
            >
              Password
            </label>
            <div style={{ position: "relative", marginBottom: "1.5rem" }}>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  paddingRight: "2.5rem",
                  borderRadius: 8,
                  border: "2px solid #dee2e6",
                  boxSizing: "border-box",
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: "0.75rem",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#6c757d",
                  padding: 0,
                  width: "1.5rem",
                  height: "1.5rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                <img
                  src={showPassword ? eyeIcon : eyeSlashIcon}
                  alt={showPassword ? "Hide password" : "Show password"}
                  style={{ width: "1.2rem", height: "1.2rem" }}
                />
              </button>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "1.5rem",
              }}
            >
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  cursor: "pointer",
                  fontSize: "0.9rem",
                }}
              >
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  style={{ cursor: "pointer" }}
                />
                Remember me
              </label>
              <a
                href="/forgot-password"
                style={{
                  color: "#007bff",
                  textDecoration: "none",
                  fontSize: "0.9rem",
                }}
              >
                Forgot password?
              </a>
            </div>
          </>
        )}

        <button
          type="submit"
          className="btn btn-primary"
          disabled={loading}
          aria-disabled={loading}
          style={{
            width: "100%",
            padding: "0.75rem",
            background: "#007bff",
            color: "white",
            border: "none",
            borderRadius: 8,
            fontWeight: 600,
            cursor: "pointer",
            opacity: loading ? 0.6 : 1,
          }}
        >
          {loading
            ? isSignUp
              ? "Creating account…"
              : "Signing in…"
            : isSignUp
            ? "Sign Up"
            : "Sign In"}
        </button>
      </form>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          margin: "1.5rem 0",
          gap: "1rem",
        }}
      >
        <div style={{ flex: 1, height: 1, background: "#dee2e6" }}></div>
        <span style={{ color: "#6c757d" }}>or</span>
        <div style={{ flex: 1, height: 1, background: "#dee2e6" }}></div>
      </div>

      <div
        id="google-signin-button"
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "1.5rem",
        }}
      ></div>
    </div>
  );
}
