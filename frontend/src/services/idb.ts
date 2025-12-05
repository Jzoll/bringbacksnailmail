import { openDB } from "idb";
import type { DBSchema, IDBPDatabase } from "idb";

export interface ArchivedMailItem {
  id?: number;
  direction: "sent" | "received";
  title?: string;
  notes?: string;
  mail_date?: string;
  image_blob: Blob;
  created_at: string;
}

interface MailDB extends DBSchema {
  archived_mail: {
    key: number;
    value: ArchivedMailItem;
    indexes: { "by-created": string };
  };
}

const DB_NAME = "snailmail-db";
const DB_VERSION = 1;

let dbPromise: Promise<IDBPDatabase<MailDB>> | null = null;

function getDB(): Promise<IDBPDatabase<MailDB>> {
  if (!dbPromise) {
    dbPromise = openDB<MailDB>(DB_NAME, DB_VERSION, {
      upgrade(db) {
        if (!db.objectStoreNames.contains("archived_mail")) {
          const store = db.createObjectStore("archived_mail", {
            keyPath: "id",
            autoIncrement: true,
          });
          store.createIndex("by-created", "created_at");
        }
      },
    });
  }
  return dbPromise;
}

export async function addArchivedMail(
  item: Omit<ArchivedMailItem, "id" | "created_at">
): Promise<number> {
  const db = await getDB();
  const mailItem: Omit<ArchivedMailItem, "id"> = {
    ...item,
    created_at: new Date().toISOString(),
  };
  return db.add("archived_mail", mailItem as ArchivedMailItem);
}

export async function getAllArchivedMail(): Promise<ArchivedMailItem[]> {
  const db = await getDB();
  return db.getAllFromIndex("archived_mail", "by-created");
}

export async function getArchivedMailById(
  id: number
): Promise<ArchivedMailItem | undefined> {
  const db = await getDB();
  return db.get("archived_mail", id);
}

export async function deleteArchivedMail(id: number): Promise<void> {
  const db = await getDB();
  return db.delete("archived_mail", id);
}
