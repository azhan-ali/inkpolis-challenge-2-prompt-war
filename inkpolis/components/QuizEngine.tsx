"use client";
import { useState } from "react";
import { Country, electionData } from "@/lib/election-data";

interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

interface QuizEngineProps {
  country: Country;
}

export default function QuizEngine({ country }: QuizEngineProps) {
  const [started, setStarted] = useState(false);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [shake, setShake] = useState(false);

  const { stages } = electionData[country];

  const startQuiz = async () => {
    setLoading(true);
    const randomStage = stages[Math.floor(Math.random() * stages.length)];
    try {
      const res = await fetch("/api/quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ country, stage: randomStage.title, difficulty: "medium" }),
      });
      const data = await res.json();
      setQuestions(data.questions || []);
    } catch {
      setQuestions([]);
    }
    setStarted(true);
    setCurrent(0);
    setScore(0);
    setDone(false);
    setSelected(null);
    setLoading(false);
  };

  const handleAnswer = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    const correct = questions[current]?.correctIndex;
    if (idx === correct) {
      setScore((s) => s + 1);
    } else {
      setShake(true);
      setTimeout(() => setShake(false), 400);
    }
    setTimeout(() => {
      if (current + 1 >= questions.length) {
        setDone(true);
      } else {
        setCurrent((c) => c + 1);
        setSelected(null);
      }
    }, 1400);
  };

  const reset = () => {
    setStarted(false);
    setQuestions([]);
    setCurrent(0);
    setScore(0);
    setDone(false);
    setSelected(null);
  };

  if (!started) {
    return (
      <div style={{ textAlign: "center", padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1rem", alignItems: "center" }}>
        <div style={{ fontSize: "3rem" }}>🧠</div>
        <div className="heading-sketch" style={{ fontSize: "1.4rem" }}>Quiz Time!</div>
        <p style={{ fontFamily: "var(--font-body)", color: "var(--pencil-gray)", maxWidth: 300, fontSize: "0.9rem" }}>
          Test your knowledge with 5 AI-generated questions about {electionData[country].name} elections!
        </p>
        <button className="btn-sketch blue" onClick={startQuiz} disabled={loading} style={{ fontSize: "1.1rem" }}>
          {loading ? "Generating quiz... ✏️" : "Start Quiz! 🚀"}
        </button>
      </div>
    );
  }

  if (done) {
    const percent = Math.round((score / questions.length) * 100);
    const msg = percent === 100 ? "Perfect score! 🎉 Civic genius!" : percent >= 60 ? "Great job! 🌟 Keep learning!" : "Keep going! 📚 You're getting there!";
    return (
      <div style={{ textAlign: "center", padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1rem", alignItems: "center" }}>
        <div style={{ fontSize: "3rem" }}>🏆</div>
        <div className="heading-sketch" style={{ fontSize: "1.6rem" }}>{msg}</div>
        <div
          style={{
            fontFamily: "var(--font-hand)",
            fontSize: "3rem",
            fontWeight: 700,
            color: percent >= 60 ? "var(--ink-green)" : "var(--ink-red)",
          }}
        >
          {score}/{questions.length}
        </div>
        <p style={{ fontFamily: "var(--font-body)", color: "var(--pencil-gray)" }}>{percent}% correct</p>
        <div style={{ display: "flex", gap: "0.75rem" }}>
          <button className="btn-sketch green" onClick={startQuiz}>Play Again 🔄</button>
          <button className="btn-sketch" onClick={reset}>Back</button>
        </div>
      </div>
    );
  }

  const q = questions[current];
  if (!q) return null;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      {/* Progress */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontFamily: "var(--font-hand)", color: "var(--pencil-gray)" }}>
          Question {current + 1}/{questions.length}
        </span>
        <span style={{ fontFamily: "var(--font-hand)", color: "var(--ink-green)", fontWeight: 700 }}>
          Score: {score} ⭐
        </span>
      </div>

      {/* Progress bar */}
      <div style={{ height: 6, background: "var(--paper-dark)", borderRadius: 3, border: "1.5px solid var(--pencil-gray)" }}>
        <div
          style={{
            height: "100%",
            width: `${((current) / questions.length) * 100}%`,
            background: "var(--ink-blue)",
            borderRadius: 3,
            transition: "width 0.3s ease",
          }}
        />
      </div>

      {/* Question card */}
      <div className={`sketch-card lined-paper ${shake ? "shake" : ""}`} style={{ padding: "1.2rem" }} key={current}>
        <div className="washi-tape" style={{ marginBottom: "0.75rem", fontSize: "0.8rem" }}>🧠 Quiz</div>
        <div className="heading-sketch" style={{ fontSize: "1.15rem", lineHeight: 1.35, marginBottom: "1rem" }}>
          {q.question}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          {q.options.map((opt, i) => {
            const isCorrect = i === q.correctIndex;
            const isSelected = i === selected;
            let bg = "white";
            let border = "var(--ink-primary)";
            if (selected !== null) {
              if (isCorrect) { bg = "#d5f5e3"; border = "var(--ink-green)"; }
              else if (isSelected) { bg = "#fadbd8"; border = "var(--ink-red)"; }
            }
            return (
              <button
                key={i}
                onClick={() => handleAnswer(i)}
                style={{
                  padding: "0.6rem 1rem",
                  background: bg,
                  border: `2.5px solid ${border}`,
                  borderRadius: 4,
                  fontFamily: "var(--font-hand)",
                  fontSize: "1rem",
                  textAlign: "left",
                  cursor: selected !== null ? "default" : "pointer",
                  boxShadow: "2px 2px 0 rgba(45,27,0,0.1)",
                  transition: "all 0.15s ease",
                  display: "flex",
                  gap: "0.5rem",
                  alignItems: "center",
                }}
              >
                <span style={{ fontWeight: 700, minWidth: 20 }}>{String.fromCharCode(65 + i)}.</span>
                {opt}
                {selected !== null && isCorrect && <span style={{ marginLeft: "auto" }}>✅</span>}
                {selected !== null && isSelected && !isCorrect && <span style={{ marginLeft: "auto" }}>❌</span>}
              </button>
            );
          })}
        </div>

        {selected !== null && (
          <div style={{ marginTop: "0.75rem", padding: "0.6rem 0.9rem", background: "#eafaf1", border: "2px solid var(--ink-green)", borderRadius: 4, fontFamily: "var(--font-body)", fontSize: "0.88rem" }}>
            💡 {q.explanation}
          </div>
        )}
      </div>
    </div>
  );
}
