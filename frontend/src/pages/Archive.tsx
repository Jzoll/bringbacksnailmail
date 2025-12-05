import { useState, useEffect } from "react";
import { getAllArchivedMail, deleteArchivedMail } from "../services/idb";
import type { ArchivedMailItem } from "../services/idb";
import ArchiveForm from "../components/ArchiveForm";

export default function Archive() {
  const [mailItems, setMailItems] = useState<ArchivedMailItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  const loadItems = async () => {
    setLoading(true);
    setError(null);
    try {
      const items = await getAllArchivedMail();
      setMailItems(items);
    } catch (err) {
      setError("Failed to load archive. Please refresh the page.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadItems();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this mail item?")) {
      return;
    }

    try {
      await deleteArchivedMail(id);
      await loadItems();
    } catch (err) {
      alert("Failed to delete mail item. Please try again.");
      console.error(err);
    }
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    loadItems();
  };

  return (
    <div>
      <h1>Archive</h1>
      <p>Your personal collection of mailed letters and postcards.</p>

      <button
        onClick={() => setShowForm(!showForm)}
        style={{
          marginTop: "1rem",
          marginBottom: "1.5rem",
          padding: "0.75rem 1.5rem",
          fontSize: "1rem",
          backgroundColor: "#2563eb",
          color: "white",
          border: "none",
          borderRadius: "0.375rem",
          cursor: "pointer",
        }}
      >
        {showForm ? "Hide Form" : "+ Add Mail"}
      </button>

      {showForm && (
        <div
          style={{
            marginBottom: "2rem",
            padding: "1.5rem",
            border: "1px solid #e5e7eb",
            borderRadius: "0.375rem",
          }}
        >
          <ArchiveForm onSuccess={handleFormSuccess} />
        </div>
      )}

      {loading && <p>Loading archive...</p>}

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

      {!loading && !error && mailItems.length === 0 && (
        <p style={{ fontStyle: "italic", color: "#6b7280" }}>
          No mail yet. Add your first item to get started!
        </p>
      )}

      {!loading && mailItems.length > 0 && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            gap: "1.5rem",
            marginTop: "1.5rem",
          }}
        >
          {mailItems.map((item) => (
            <MailCard key={item.id} item={item} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
}

interface MailCardProps {
  item: ArchivedMailItem;
  onDelete: (id: number) => void;
}

function MailCard({ item, onDelete }: MailCardProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    const url = URL.createObjectURL(item.image_blob);
    setImageUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [item.image_blob]);

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return null;
    try {
      return new Date(dateStr).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return null;
    }
  };

  return (
    <article
      style={{
        border: "1px solid #e5e7eb",
        borderRadius: "0.5rem",
        overflow: "hidden",
        backgroundColor: "white",
      }}
    >
      {imageUrl && (
        <img
          src={imageUrl}
          alt={item.title || `${item.direction} mail`}
          style={{
            width: "100%",
            height: "200px",
            objectFit: "cover",
            display: "block",
          }}
        />
      )}

      <div style={{ padding: "1rem" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: "0.5rem",
          }}
        >
          <span
            style={{
              fontSize: "0.75rem",
              fontWeight: "bold",
              textTransform: "uppercase",
              color: item.direction === "sent" ? "#059669" : "#2563eb",
            }}
          >
            {item.direction}
          </span>
          <button
            onClick={() => item.id && onDelete(item.id)}
            aria-label="Delete mail item"
            style={{
              padding: "0.25rem 0.5rem",
              fontSize: "0.875rem",
              backgroundColor: "transparent",
              color: "#dc2626",
              border: "1px solid #dc2626",
              borderRadius: "0.25rem",
              cursor: "pointer",
            }}
          >
            Delete
          </button>
        </div>

        {item.title && (
          <h3
            style={{
              margin: "0 0 0.5rem 0",
              fontSize: "1.125rem",
              fontWeight: "bold",
            }}
          >
            {item.title}
          </h3>
        )}

        {item.mail_date && (
          <p
            style={{
              margin: "0 0 0.5rem 0",
              fontSize: "0.875rem",
              color: "#6b7280",
            }}
          >
            {formatDate(item.mail_date)}
          </p>
        )}

        {item.notes && (
          <p
            style={{
              margin: "0.5rem 0 0 0",
              fontSize: "0.875rem",
              color: "#374151",
            }}
          >
            {item.notes}
          </p>
        )}
      </div>
    </article>
  );
}
