import { useState } from "react";
import { Card, Input } from "antd";
import { useNavigate } from "react-router-dom";
import AppButton from "@/shared/ui/components/AppButton";
import { createDocument } from "@/api/documents";

export default function CreateDocument() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [chat, setChat] = useState("");
  const navigate = useNavigate();

  const handleCreate = async () => {
    try {
      await createDocument({ title, description, chat });
      navigate("/documents");
    } catch (err) {
      console.error(err);
      alert("Error creating document");
    }
  };

  return (
    <div className="min-h-screen p-8 flex justify-center items-start">
      <Card className="w-full max-w-2xl rounded-2xl shadow-xl p-8 bg-[var(--neutral-50)]">
        <h1 className="text-3xl font-bold text-[var(--primary-color--heavy)] mb-8">Create document</h1>

        <div className="mb-6">
          <label className="block text-lg font-medium text-[var(--black-900)] mb-2">Document title</label>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} className="py-3 px-4 rounded-md" />
        </div>

        <div className="mb-6">
          <label className="block text-lg font-medium text-[var(--black-900)] mb-2">Document description</label>
          <Input.TextArea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="py-3 px-4 rounded-md"
            rows={4}
          />
        </div>

        <div className="mb-6">
          <label className="block text-lg font-medium text-[var(--black-900)] mb-2">Document details</label>
          <Input.TextArea
            value={chat}
            onChange={(e) => setChat(e.target.value)}
            className="py-3 px-4 rounded-md"
            rows={4}
          />
        </div>

        <AppButton text="Create" onClick={handleCreate} className="w-full mt-4" />
      </Card>
    </div>
  );
}
