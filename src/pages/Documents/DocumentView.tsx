import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getDocumentById } from "@/api/documents";
import type { Document } from "@/api/documents";
import { Card } from "antd";
import AppButton from "@/shared/ui/components/AppButton";

export default function DocumentView() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [document, setDocument] = useState<Document | null>(null);

  useEffect(() => {
    if (!id) return;
    getDocumentById(id)
      .then(setDocument)
      .catch((err) => {
        console.error(err);
        setDocument(null);
      });
  }, [id]);

  return (
    <div className="min-h-screen p-8 flex flex-col items-center">
      <Card className="w-full max-w-2xl rounded-2xl shadow-xl p-6 !bg-[var(--cyan-50)]">
        <h1 className="text-3xl font-bold text-[var(--primary-color--heavy)] mb-4">
          {document ? document.title : `Document ${id}`}
        </h1>

        <p className="text-[var(--black-900)] mb-6 whitespace-pre-line">
          {document?.chat?.trim() || `This is detailed information about the document ${id}.`}
        </p>

        <AppButton text="Back to list" onClick={() => navigate("/documents")} />
      </Card>
    </div>
  );
}
