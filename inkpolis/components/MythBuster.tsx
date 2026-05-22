"use client";
import { useState } from "react";
import { myths, Country } from "@/lib/election-data";

interface MythBusterProps {
  country: Country;
}

export default function MythBuster({ country }: MythBusterProps) {
  const [revealed, setRevealed] = useState<Set<number>>(new Set());

  const filtered = myths.filter((m) => m.country === "all" || m.country === country);

  const toggle = (i: number) => {
    setRevealed((prev) => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <div className="heading-sketch" style={{ fontSize: "1.3rem", textAlign: "center" }}>
        🔍 Election Myth-Buster
      </div>
      <p style={{ textAlign: "center", fontFamily: "var(--font-body)", color: "var(--pencil-gray)", fontSize: "0.85rem" }}>
        Tap a myth card to reveal the truth!
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        {filtered.map((item, i) => (
          <div
            key={i}
            className="sketch-card"
            style={{
              padding: "1rem 1.2rem",
              cursor: "pointer",
              borderColor: revealed.has(i) ? "var(--ink-green)" : "var(--ink-red)",
              boxShadow: revealed.has(i) ? "3px 3px 0 rgba(39,174,96,0.3)" : "3px 3px 0 rgba(192,57,43,0.2)",
              transition: "all 0.2s ease",
            }}
            onClick={() => toggle(i)}
          >
            {/* Myth */}
            <div style={{ display: "flex", gap: "0.5rem", alignItems: "flex-start" }}>
              <span style={{ fontSize: "1.2rem" }}>{revealed.has(i) ? "✅" : "❌"}</span>
              <div>
                <div style={{ fontFamily: "var(--font-hand)", fontSize: "0.95rem", color: "var(--ink-red)", fontWeight: 600, marginBottom: "0.25rem" }}>
                  MYTH: {item.myth}
                </div>

                {revealed.has(i) && (
                  <div style={{ animation: "stickerPop 0.3s ease", marginTop: "0.5rem" }}>
                    <hr className="sketch-divider" style={{ margin: "0.5rem 0" }} />
                    <div style={{ display: "flex", gap: "0.5rem", alignItems: "flex-start" }}>
                      <span className="stamp" style={{ fontSize: "0.8rem", padding: "1px 6px" }}>FACT</span>
                      <p style={{ fontFamily: "var(--font-body)", fontSize: "0.88rem", color: "var(--ink-green)", lineHeight: 1.5 }}>
                        {item.fact}
                      </p>
                    </div>
                  </div>
                )}

                {!revealed.has(i) && (
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", color: "var(--pencil-gray)" }}>
                    Tap to reveal the fact →
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
