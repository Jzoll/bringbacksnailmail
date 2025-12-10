/**
 * Mail archive service client
 */

import { getToken } from "./authClient";

export interface MailItem {
  id: number;
  direction: "sent" | "received";
  title?: string;
  notes?: string;
  mail_date?: string;
  created_at: string;
}

/**
 * Upload a new mail item
 */
export async function uploadMailItem(
  direction: "sent" | "received",
  image: File,
  title?: string,
  notes?: string,
  mailDate?: string
): Promise<MailItem> {
  const token = getToken();
  if (!token) {
    throw new Error("Not authenticated");
  }

  const formData = new FormData();
  formData.append("direction", direction);
  formData.append("image", image);
  if (title) formData.append("title", title);
  if (notes) formData.append("notes", notes);
  if (mailDate) formData.append("mail_date", mailDate);

  const response = await fetch("/mail", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || "Upload failed");
  }

  return response.json();
}

/**
 * List user's mail items with optional filtering
 */
export async function listMailItems(
  direction?: "sent" | "received",
  limit: number = 50,
  offset: number = 0
): Promise<MailItem[]> {
  const token = getToken();
  if (!token) {
    throw new Error("Not authenticated");
  }

  const params = new URLSearchParams({
    limit: limit.toString(),
    offset: offset.toString(),
  });

  if (direction) {
    params.append("direction", direction);
  }

  const response = await fetch(`/mail?${params.toString()}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || "Failed to load mail items");
  }

  return response.json();
}

/**
 * Delete a mail item
 */
export async function deleteMailItem(itemId: number): Promise<void> {
  const token = getToken();
  if (!token) {
    throw new Error("Not authenticated");
  }

  const response = await fetch(`/mail/${itemId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || "Failed to delete mail item");
  }
}

/**
 * Get image URL for authenticated streaming
 */
export function getImageUrl(itemId: number): string {
  const token = getToken();
  if (!token) {
    throw new Error("Not authenticated");
  }

  // Note: For actual image display, we'll need to handle auth header
  // This returns a base URL; actual fetch needs Authorization header
  return `/images/${itemId}`;
}
