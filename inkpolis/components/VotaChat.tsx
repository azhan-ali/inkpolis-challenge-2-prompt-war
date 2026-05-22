"use client";
import { useState, useRef, useEffect } from "react";
import { Country } from "@/lib/election-data";

interface Message {
  role: "user" | "vota";
  text: string;
}

interface VotaChatProps {
  country: Country;
  currentStage: string;
}

export default function VotaChat({ country, currentStage }: VotaChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "vota",
      text: "Hey there! I'm VOTA, your sketch-guide to democracy! 🦉✏️ Ask me anything about elections — voter registration, how votes are counted, myths, or anything else!",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", text: userMsg }]);
    setLoading(true);

    try {
      const history = messages.slice(1).map((m) => ({
        role: m.role === "user" ? "user" : "model",
        parts: [{ text: m.text }],
      }));

      const res = await fetch("/api/vota", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg, country, currentStage, history }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { role: "vota", text: data.reply || data.error }]);
    } catch {
      setMessages((prev) => [...prev, { role: "vota", text: "Oops! My ink ran out. Try again! ✏️" }]);
    } finally {
      setLoading(false);
    }
  };

  const suggestions = [
    "How do I register to vote?",
    "Explain the voting process",
    "What is NOTA?",
    "How are votes counted?",
  ];

  return (
    <div className="sketch-card" style={{ padding: "1.2rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
      {/* VOTA Owl Avatar */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
        <div style={{ fontSize: "2.5rem", lineHeight: 1 }} className="float-paper">🦉</div>
        <div>
          <div className="heading-sketch" style={{ fontSize: "1.3rem", color: "var(--ink-blue)" }}>VOTA</div>
          <div style={{ fontSize: "0.8rem", color: "var(--pencil-gray)", fontFamily: "var(--font-body)" }}>Your AI Civic Guide</div>
        </div>
        <div style={{ marginLeft: "auto", display: "flex", gap: "4px", alignItems: "center" }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#27ae60", display: "inline-block" }}></span>
          <span style={{ fontSize: "0.75rem", color: "var(--pencil-gray)" }}>Online</span>
        </div>
      </div>

      <hr className="sketch-divider" />

      {/* Chat Messages */}
      <div style={{ maxHeight: "280px", overflowY: "auto", display: "flex", flexDirection: "column", gap: "0.75rem", paddingRight: "4px" }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ display: "flex", justifyContent: msg.role === "user" ? "flex-end" : "flex-start" }}>
            {msg.role === "vota" && <span style={{ fontSize: "1.2rem", marginRight: "8px", alignSelf: "flex-end" }}>🦉</span>}
            <div
              style={{
                maxWidth: "80%",
                padding: "0.6rem 0.9rem",
                background: msg.role === "vota" ? "white" : "var(--ink-blue)",
                color: msg.role === "vota" ? "var(--ink-primary)" : "white",
                border: `2px solid ${msg.role === "vota" ? "var(--ink-primary)" : "var(--ink-blue)"}`,
                borderRadius: msg.role === "vota" ? "12px 12px 12px 2px" : "12px 12px 2px 12px",
                fontFamily: "var(--font-hand)",
                fontSize: "1rem",
                boxShadow: "2px 2px 0 rgba(45,27,0,0.15)",
                lineHeight: 1.4,
              }}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {loading && (
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span>🦉</span>
            <div style={{ background: "white", border: "2px solid var(--ink-primary)", borderRadius: "12px 12px 12px 2px", padding: "0.6rem 0.9rem", fontFamily: "var(--font-hand)" }}>
              Sketching a response<span style={{ animation: "blink 1s infinite" }}>...</span>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Quick Suggestions */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
        {suggestions.map((s) => (
          <button key={s} className="btn-sketch" style={{ fontSize: "0.8rem", padding: "0.3rem 0.7rem" }} onClick={() => { setInput(s); }}>
            {s}
          </button>
        ))}
      </div>

      {/* Input */}
      <div style={{ display: "flex", gap: "0.5rem" }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Ask VOTA anything about elections..."
          style={{
            flex: 1,
            padding: "0.6rem 0.9rem",
            border: "2.5px solid var(--ink-primary)",
            borderRadius: "4px",
            fontFamily: "var(--font-hand)",
            fontSize: "1rem",
            background: "white",
            outline: "none",
            boxShadow: "inset 1px 1px 3px rgba(45,27,0,0.08)",
          }}
        />
        <button className="btn-sketch primary" onClick={sendMessage} disabled={loading} style={{ whiteSpace: "nowrap" }}>
          Send ✏️
        </button>
      </div>
    </div>
  );
}
