const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";

export interface Prompt {
  id: string;
  type: "writing" | "drawing";
  text: string;
  active: boolean;
}

export interface PromptResponse {
  prompt: Prompt;
}

export async function fetchPrompt(
  type: "writing" | "drawing"
): Promise<Prompt> {
  const response = await fetch(`${BACKEND_URL}/prompts?type=${type}`);

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error(`No ${type} prompts available. Please try again later.`);
    }
    throw new Error("Failed to fetch prompt");
  }

  const data: PromptResponse = await response.json();
  return data.prompt;
}
