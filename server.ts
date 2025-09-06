import express from "express";
import cors from "cors";
import fs from "fs";


interface Document {
  id: string;
  title: string;
  description: string;
  chat?: string;
}

const app = express();
const PORT = 4000;
const FILE = "./document.json";

app.use(cors());
app.use(express.json());

const loadDocuments = (): Document[] => {
  if (!fs.existsSync(FILE)) return [];
  try {
    return JSON.parse(fs.readFileSync(FILE, "utf-8"));
  } catch {
    return [];
  }
};

const saveDocuments = (docs: Document[]) => {
  fs.writeFileSync(FILE, JSON.stringify(docs, null, 2));
};

let documents: Document[] = loadDocuments();

app.get("/documents", (_req, res) => {
  res.json(documents);
});

app.post("/documents", (req, res) => {
  const { title, description, chat } = req.body;
  const newDoc: Document = { id: Date.now().toString(), title, description, chat };
  documents.push(newDoc);
  saveDocuments(documents);
  res.status(201).json(newDoc);
});

app.delete("/documents", (_req, res) => {
  documents = [];
  saveDocuments(documents);
  res.status(200).json({ message: "All documents deleted" });
});

app.get("/documents/:id", (req, res) => {
  const doc = documents.find((d) => d.id === req.params.id);
  if (!doc) return res.status(404).json({ error: "Document not found" });
  res.json(doc);
});

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
