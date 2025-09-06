export interface Document {
  id: string;
  title: string;
  description: string;
  chat?: string;
}

const BASE_URL = "http://localhost:4000/documents";

async function fetchJSON<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(url, options);
  if (!res.ok) throw new Error(`Fetch error: ${res.statusText}`);
  return res.json();
}

export const getDocuments = (): Promise<Document[]> => fetchJSON<Document[]>(BASE_URL);

export const getDocumentById = (id: string): Promise<Document> =>
  fetchJSON<Document>(`${BASE_URL}/${id}`);

export const createDocument = (doc: Omit<Document, "id">): Promise<Document> =>
  fetchJSON<Document>(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(doc),
  });

export const deleteAllDocuments = (): Promise<void> =>
  fetch(BASE_URL, { method: "DELETE" }).then((res) => {
    if (!res.ok) throw new Error("Failed to delete all documents");
  });
