import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppButton from "@/shared/ui/components/AppButton";
import DocumentsGrid from "@/shared/ui/components/DocumentsGrid";
import { getDocuments, deleteAllDocuments } from "@/api/documents";
import type { Document } from "@/api/documents";

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const navigate = useNavigate();

  const fetchDocuments = async () => {
    try {
      const data = await getDocuments();
      setDocuments(data);
    } catch (err) {
      console.error("Failed to load documents:", err);
      setDocuments([]);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  const handleDeleteAll = async () => {
    if (!confirm("Are you sure you want to delete all documents?")) return;

    try {
      await deleteAllDocuments();
      setDocuments([]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen w-full px-8 py-12 flex justify-center">
      <div className="flex flex-col w-full max-w-6xl gap-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-[var(--primary-color--medium)]">List of documents</h1>
          <div className="flex gap-4">
            <AppButton text="Create document" onClick={() => navigate("/documents/create")} />
            <AppButton text="Delete all documents" onClick={handleDeleteAll} className="bg-red-600 hover:bg-red-700" />
          </div>
        </div>

        <DocumentsGrid documents={documents} />
      </div>
    </div>
  );
}
