import { useState } from "react";
import type { FormEvent } from "react";
import { addArchivedMail } from "../services/idb";

interface ArchiveFormProps {
  onSuccess: () => void;
}

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ["image/jpeg", "image/png"];

export default function ArchiveForm({ onSuccess }: ArchiveFormProps) {
  const [direction, setDirection] = useState<"sent" | "received">("sent");
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [mailDate, setMailDate] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!imageFile) {
      setError("Please select an image.");
      return;
    }

    if (!ALLOWED_TYPES.includes(imageFile.type)) {
      setError("Only JPEG and PNG images are allowed.");
      return;
    }

    if (imageFile.size > MAX_FILE_SIZE) {
      setError("Image size must be less than 5MB.");
      return;
    }

    setSubmitting(true);

    try {
      const blob = new Blob([await imageFile.arrayBuffer()], {
        type: imageFile.type,
      });

      await addArchivedMail({
        direction,
        title: title.trim() || undefined,
        notes: notes.trim() || undefined,
        mail_date: mailDate || undefined,
        image_blob: blob,
      });

      // Reset form
      setDirection("sent");
      setTitle("");
      setNotes("");
      setMailDate("");
      setImageFile(null);
      setError(null);

      onSuccess();
    } catch (err) {
      setError("Failed to save mail item. Please try again.");
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "500px" }}>
      <h2>Add Mail</h2>

      {error && (
        <div
          role="alert"
          style={{
            marginBottom: "1rem",
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

      <div style={{ marginBottom: "1rem" }}>
        <label
          htmlFor="image"
          style={{
            display: "block",
            marginBottom: "0.25rem",
            fontWeight: "bold",
          }}
        >
          Image (JPEG or PNG, max 5MB) *
        </label>
        <input
          id="image"
          type="file"
          accept="image/jpeg,image/png"
          onChange={(e) => setImageFile(e.target.files?.[0] || null)}
          required
          disabled={submitting}
        />
      </div>

      <fieldset style={{ border: "none", padding: 0, marginBottom: "1rem" }}>
        <legend style={{ fontWeight: "bold", marginBottom: "0.25rem" }}>
          Direction *
        </legend>
        <div style={{ display: "flex", gap: "1rem" }}>
          <label
            style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
          >
            <input
              type="radio"
              name="direction"
              value="sent"
              checked={direction === "sent"}
              onChange={() => setDirection("sent")}
              disabled={submitting}
            />
            Sent
          </label>
          <label
            style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
          >
            <input
              type="radio"
              name="direction"
              value="received"
              checked={direction === "received"}
              onChange={() => setDirection("received")}
              disabled={submitting}
            />
            Received
          </label>
        </div>
      </fieldset>

      <div style={{ marginBottom: "1rem" }}>
        <label
          htmlFor="title"
          style={{
            display: "block",
            marginBottom: "0.25rem",
            fontWeight: "bold",
          }}
        >
          Title (optional)
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={submitting}
          style={{ width: "100%", padding: "0.5rem", fontSize: "1rem" }}
        />
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <label
          htmlFor="notes"
          style={{
            display: "block",
            marginBottom: "0.25rem",
            fontWeight: "bold",
          }}
        >
          Notes (optional)
        </label>
        <textarea
          id="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          disabled={submitting}
          rows={3}
          style={{ width: "100%", padding: "0.5rem", fontSize: "1rem" }}
        />
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <label
          htmlFor="mailDate"
          style={{
            display: "block",
            marginBottom: "0.25rem",
            fontWeight: "bold",
          }}
        >
          Mail Date (optional)
        </label>
        <input
          id="mailDate"
          type="date"
          value={mailDate}
          onChange={(e) => setMailDate(e.target.value)}
          disabled={submitting}
          style={{ padding: "0.5rem", fontSize: "1rem" }}
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        style={{
          padding: "0.75rem 1.5rem",
          fontSize: "1rem",
          backgroundColor: submitting ? "#9ca3af" : "#2563eb",
          color: "white",
          border: "none",
          borderRadius: "0.375rem",
          cursor: submitting ? "not-allowed" : "pointer",
        }}
      >
        {submitting ? "Saving..." : "Save Mail"}
      </button>
    </form>
  );
}
