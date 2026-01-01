import { useState } from "react";
import { fetchPrompt, Prompt } from "../services/promptsClient";
import "../styles/Inspiration.css";

export default function Inspiration() {
  const [promptType, setPromptType] = useState<"writing" | "drawing">(
    "writing"
  );
  const [prompt, setPrompt] = useState<Prompt | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFetchPrompt = async () => {
    setLoading(true);
    setError(null);

    try {
      const newPrompt = await fetchPrompt(promptType);
      setPrompt(newPrompt);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load prompt");
    } finally {
      setLoading(false);
    }
  };

  const handleTypeToggle = (type: "writing" | "drawing") => {
    setPromptType(type);
    setPrompt(null);
    setError(null);
  };

  return (
    <div className="inspiration-page">
      <header className="inspiration-header">
        <h1>Inspiration Station</h1>
        <p>Get creative writing or drawing prompts for your next letter.</p>
      </header>

      <div className="prompt-type-toggle">
        <button
          className={promptType === "writing" ? "active" : ""}
          onClick={() => handleTypeToggle("writing")}
          aria-pressed={promptType === "writing"}
        >
          Writing
        </button>
        <button
          className={promptType === "drawing" ? "active" : ""}
          onClick={() => handleTypeToggle("drawing")}
          aria-pressed={promptType === "drawing"}
        >
          Drawing
        </button>
      </div>

      <div className="prompt-display">
        {loading && (
          <div className="loading" role="status">
            <p>Loading prompt...</p>
          </div>
        )}

        {error && (
          <div className="error" role="alert">
            <p>{error}</p>
            <button onClick={handleFetchPrompt}>Try Again</button>
          </div>
        )}

        {prompt && !loading && !error && (
          <div className="prompt-card">
            <p className="prompt-text">{prompt.text}</p>
            <button onClick={handleFetchPrompt} className="refresh-button">
              Get Another Prompt
            </button>
          </div>
        )}

        {!prompt && !loading && !error && (
          <div className="prompt-empty">
            <p>Click below to get your first {promptType} prompt.</p>
            <button onClick={handleFetchPrompt} className="get-prompt-button">
              Get a {promptType} prompt
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
