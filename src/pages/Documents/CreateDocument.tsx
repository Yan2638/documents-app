import { useState, useEffect, useRef } from "react";
import { Card, Input } from "antd";
import { useNavigate } from "react-router-dom";
import AppButton from "@/shared/ui/components/AppButton";
import { createDocument } from "@/api/documents";

export default function CreateDocument() {
  const navigate = useNavigate();

  const questions = [
    "Enter document title",
    "Enter a description of the document",
    "Enter document details",
  ];

  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [messages, setMessages] = useState<{ from: "bot" | "user"; text: string }[]>([
    { from: "bot", text: questions[0] },
  ]);
  const [currentInput, setCurrentInput] = useState("");

  const chatEndRef = useRef<HTMLDivElement | null>(null);

  const FOOTER_HEIGHT = 72;

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages]);

  const handleSend = async () => {
    if (!currentInput.trim()) return;

    const newAnswers = [...answers, currentInput];
    setAnswers(newAnswers);

    setMessages((prev) => [...prev, { from: "user", text: currentInput }]);
    setCurrentInput("");

    const newStep = step + 1;
    if (newStep < questions.length) {

      setTimeout(() => {
        setMessages((prev) => [...prev, { from: "bot", text: questions[newStep] }]);
      }, 300);
      setStep(newStep);
    } else {

      const [title, description, chat] = newAnswers;
      try {
        await createDocument({ title, description, chat });
        navigate("/documents");
      } catch (err) {
        console.error(err);
        alert("Error creating document");
      }
    }
  };

  return (
    <div className="min-h-screen p-8 flex justify-center items-center">
      <Card
        className="w-full max-w-2xl h-[80vh] rounded-2xl shadow-xl p-0 flex flex-col relative bg-[var(--neutral-50)]"
        bodyStyle={{ padding: 0 }}
      >
        <div className="p-6 border-b">
          <h1 className="text-2xl font-bold text-[var(--primary-color--heavy)]">
            Create document
          </h1>
        </div>

        <div
          className="overflow-y-auto p-6 space-y-3"
          style={{
            height: `calc(100% - ${FOOTER_HEIGHT}px - 72px)`,
            paddingBottom: `${FOOTER_HEIGHT + 12}px`,
          }}
        >
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`px-4 py-2 rounded-2xl shadow-md max-w-[70%] break-words ${
                  msg.from === "user"
                    ? "bg-[var(--primary-color--heavy)] text-white"
                    : "bg-white text-[var(--black-900)]"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}

          <div ref={chatEndRef} />
        </div>

        <div
          className="left-0 right-0 bottom-0 px-6 py-3 border-t bg-[var(--neutral-50)]"
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: `${FOOTER_HEIGHT}px`,
            display: "flex",
            gap: "12px",
            alignItems: "center",
          }}
        >
          <Input
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            onPressEnter={handleSend}
            placeholder="Enter your answer..."
            className="py-3 px-4 rounded-md"
            style={{ flex: 1 }}
          />
          <AppButton text="Send" onClick={handleSend} className="px-6 py-2" />
        </div>
      </Card>
    </div>
  );
}
