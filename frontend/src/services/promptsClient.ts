/**
 * API client for prompts endpoint
 */

export interface Prompt {
  id: number;
  type: "writing" | "drawing";
  text: string;
}

export interface PromptResponse {
  prompt: Prompt;
}

/**
 * Fetch a random prompt of the specified type
 */
export async function fetchPrompt(
  type: "writing" | "drawing"
): Promise<Prompt> {
  const response = await fetch(`/prompts?type=${type}`);

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error(`No ${type} prompts available at this time.`);
    }
    throw new Error(`Failed to fetch prompt: ${response.statusText}`);
  }

  const data: PromptResponse = await response.json();
  return data.prompt;
}
