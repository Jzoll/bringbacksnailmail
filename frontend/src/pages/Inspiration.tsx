import { useState } from "react";
import { fetchPrompt, type Prompt } from "../services/promptsClient";

export default function Inspiration() {
  const [promptType, setPromptType] = useState<"writing" | "drawing">(
    "writing"
  );
  const [prompt, setPrompt] = useState<Prompt | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await fetchPrompt(promptType);
      setPrompt(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch prompt");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Inspiration</h1>
      <p>Generate writing or drawing prompts to spark creativity.</p>

      <div style={{ marginTop: "2rem" }}>
        <fieldset style={{ border: "none", padding: 0 }}>
          <legend
            style={{
              fontSize: "1.125rem",
              fontWeight: "bold",
              marginBottom: "0.5rem",
            }}
          >
            Prompt Type:
          </legend>
          <div style={{ display: "flex", gap: "1rem" }}>
            <label
              style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
            >
              <input
                type="radio"
                name="promptType"
                value="writing"
                checked={promptType === "writing"}
                onChange={() => setPromptType("writing")}
              />
              Writing
            </label>
            <label
              style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
            >
              <input
                type="radio"
                name="promptType"
                value="drawing"
                checked={promptType === "drawing"}
                onChange={() => setPromptType("drawing")}
              />
              Drawing
            </label>
          </div>
        </fieldset>

        <button
          onClick={handleGenerate}
          disabled={loading}
          style={{
            marginTop: "1rem",
            fontSize: "1.125rem",
            padding: "0.75rem 1.5rem",
            backgroundColor: loading ? "#9ca3af" : "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "0.375rem",
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Loading..." : `Generate ${promptType} prompt`}
        </button>
      </div>

      {error && (
        <div
          role="alert"
          style={{
            marginTop: "2rem",
            padding: "1rem",
            backgroundColor: "#fef2f2",
            border: "1px solid #fca5a5",
            borderRadius: "0.375rem",
            color: "#991b1b",
          }}
        >
          {error}
        </div>
      )}

      {prompt && !error && (
        <div
          style={{
            marginTop: "2rem",
            padding: "1.5rem",
            backgroundColor: "#f0fdf4",
            border: "1px solid #86efac",
            borderRadius: "0.375rem",
          }}
        >
          <h2 style={{ marginTop: 0, fontSize: "1.25rem", color: "#166534" }}>
            Your {prompt.type} prompt:
          </h2>
          <p style={{ fontSize: "1.125rem", lineHeight: "1.75" }}>
            {prompt.text}
          </p>
        </div>
      )}
    </div>
  );
}
