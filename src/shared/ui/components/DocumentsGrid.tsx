import { Card } from "antd";
import { useNavigate } from "react-router-dom";

interface Document {
  id: string;
  title: string;
  description: string;
  chat?: string;
}

interface DocumentsGridProps {
  documents: Document[];
}

export default function DocumentsGrid({ documents }: DocumentsGridProps) {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
      {documents.map((doc) => (
        <Card
          key={doc.id}
          hoverable
          className="cursor-pointer rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 w-full"
          style={{ backgroundColor: "var(--cyan-50)" }}
          onClick={() => navigate(`/documents/${doc.id}`)}
        >
          <h2 className="text-xl font-semibold mb-2 text-[var(--primary-color--heavy)]">
            {doc.title}
          </h2>
          <p className="text-[var(--black-900)]">{doc.description}</p>
        </Card>
      ))}
    </div>
  );
}
