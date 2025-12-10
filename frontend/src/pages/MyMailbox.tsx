import { useState, useEffect } from "react";
import {
  listMailItems,
  deleteMailItem,
  MailItem,
  getImageUrl,
} from "../services/mailClient";
import { getToken } from "../services/authClient";
import "../styles/MyMailbox.css";

type TabType = "sent" | "received";

export default function MyMailbox() {
  const [activeTab, setActiveTab] = useState<TabType>("received");
  const [items, setItems] = useState<MailItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<MailItem | null>(null);

  useEffect(() => {
    loadItems();
  }, [activeTab]);

  const loadItems = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await listMailItems(activeTab);
      setItems(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load items");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (itemId: number) => {
    if (!confirm("Are you sure you want to delete this item?")) {
      return;
    }

    try {
      await deleteMailItem(itemId);
      setItems(items.filter((item) => item.id !== itemId));
      if (selectedItem?.id === itemId) {
        setSelectedItem(null);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete item");
    }
  };

  const openModal = (item: MailItem) => {
    setSelectedItem(item);
  };

  const closeModal = () => {
    setSelectedItem(null);
  };

  return (
    <div className="mailbox-page">
      <header className="mailbox-header">
        <h1>My Mailbox</h1>
        <p>Your private archive of sent and received mail.</p>
      </header>

      <div className="mailbox-tabs">
        <button
          className={activeTab === "received" ? "active" : ""}
          onClick={() => setActiveTab("received")}
          aria-pressed={activeTab === "received"}
        >
          Received
        </button>
        <button
          className={activeTab === "sent" ? "active" : ""}
          onClick={() => setActiveTab("sent")}
          aria-pressed={activeTab === "sent"}
        >
          Sent
        </button>
      </div>

      {loading && (
        <div className="loading" role="status">
          <p>Loading your mail...</p>
        </div>
      )}

      {error && (
        <div className="error" role="alert">
          <p>{error}</p>
          <button onClick={loadItems}>Retry</button>
        </div>
      )}

      {!loading && !error && items.length === 0 && (
        <div className="empty-state">
          <p>No {activeTab} mail yet.</p>
          <p className="empty-hint">
            Add your first item by clicking "Add Mail" above.
          </p>
        </div>
      )}

      {!loading && !error && items.length > 0 && (
        <div className="mail-grid">
          {items.map((item) => (
            <div key={item.id} className="mail-card">
              <div className="mail-image" onClick={() => openModal(item)}>
                <AuthImage itemId={item.id} alt={item.title || "Mail item"} />
              </div>
              <div className="mail-info">
                <h3>{item.title || "Untitled"}</h3>
                {item.mail_date && (
                  <p className="mail-date">
                    {new Date(item.mail_date).toLocaleDateString()}
                  </p>
                )}
                <button
                  className="delete-button"
                  onClick={() => handleDelete(item.id)}
                  aria-label={`Delete ${item.title || "this item"}`}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedItem && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close"
              onClick={closeModal}
              aria-label="Close"
            >
              ×
            </button>
            <div className="modal-image">
              <AuthImage
                itemId={selectedItem.id}
                alt={selectedItem.title || "Mail item"}
              />
            </div>
            <div className="modal-details">
              <h2>{selectedItem.title || "Untitled"}</h2>
              {selectedItem.mail_date && (
                <p className="mail-date">
                  {new Date(selectedItem.mail_date).toLocaleDateString()}
                </p>
              )}
              {selectedItem.notes && (
                <p className="mail-notes">{selectedItem.notes}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * Component to display authenticated images
 */
function AuthImage({ itemId, alt }: { itemId: number; alt: string }) {
  const [imageSrc, setImageSrc] = useState<string>("");
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const loadImage = async () => {
      const token = getToken();
      if (!token) return;

      try {
        const response = await fetch(`/images/${itemId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to load image");
        }

        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setImageSrc(url);
      } catch (err) {
        setImageError(true);
      }
    };

    loadImage();

    return () => {
      if (imageSrc) {
        URL.revokeObjectURL(imageSrc);
      }
    };
  }, [itemId]);

  if (imageError) {
    return <div className="image-error">Failed to load image</div>;
  }

  if (!imageSrc) {
    return <div className="image-loading">Loading...</div>;
  }

  return <img src={imageSrc} alt={alt} />;
}
