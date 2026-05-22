"use client";
import { useState } from "react";
import { electionData, Country, ElectionStage } from "@/lib/election-data";

interface TimelineProps {
  country: Country;
  onStageSelect: (stage: ElectionStage) => void;
  selectedStageId: string | null;
}

export default function ElectionTimeline({ country, onStageSelect, selectedStageId }: TimelineProps) {
  const { stages } = electionData[country];
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div style={{ padding: "1rem 0" }}>
      {/* SVG wobbly connecting path */}
      <div style={{ position: "relative" }}>
        {/* Horizontal scroll container for stages */}
        <div style={{ overflowX: "auto", paddingBottom: "1rem" }}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: "0", minWidth: "fit-content", padding: "0 1rem" }}>
            {stages.map((stage, index) => (
              <div key={stage.id} style={{ display: "flex", alignItems: "center" }}>
                {/* Stage Node */}
                <div
                  style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem", cursor: "pointer", transition: "transform 0.15s ease" }}
                  onClick={() => onStageSelect(stage)}
                  onMouseEnter={() => setHoveredId(stage.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  {/* Circle node */}
                  <div
                    style={{
                      width: 64,
                      height: 64,
                      borderRadius: "50%",
                      background: selectedStageId === stage.id ? stage.color : "white",
                      border: `3px solid ${stage.color}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "1.6rem",
                      boxShadow: selectedStageId === stage.id
                        ? `4px 4px 0 ${stage.color}55`
                        : hoveredId === stage.id
                        ? `3px 3px 0 ${stage.color}44`
                        : "2px 2px 0 rgba(45,27,0,0.15)",
                      transform: hoveredId === stage.id || selectedStageId === stage.id ? "scale(1.1) translateY(-3px)" : "scale(1)",
                      transition: "all 0.15s ease",
                    }}
                  >
                    {stage.icon}
                  </div>

                  {/* Step number */}
                  <div
                    style={{
                      fontFamily: "var(--font-hand)",
                      fontSize: "0.72rem",
                      fontWeight: 700,
                      color: selectedStageId === stage.id ? stage.color : "var(--pencil-gray)",
                      textAlign: "center",
                      maxWidth: 80,
                      lineHeight: 1.2,
                    }}
                  >
                    {index + 1}. {stage.title}
                  </div>
                </div>

                {/* Connector arrow */}
                {index < stages.length - 1 && (
                  <div style={{ display: "flex", alignItems: "center", padding: "0 4px", marginTop: "-1.5rem" }}>
                    <svg width="40" height="20" viewBox="0 0 40 20">
                      {/* Wobbly hand-drawn arrow */}
                      <path
                        d="M2,10 C8,8 12,12 18,10 C24,8 28,12 34,10"
                        stroke="var(--pencil-gray)"
                        strokeWidth="2.5"
                        fill="none"
                        strokeLinecap="round"
                        strokeDasharray="2,3"
                      />
                      <path
                        d="M30,6 L37,10 L30,14"
                        stroke="var(--pencil-gray)"
                        strokeWidth="2.5"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Selected Stage Detail */}
      {selectedStageId && (() => {
        const stage = stages.find((s) => s.id === selectedStageId);
        if (!stage) return null;
        return (
          <div
            className="sketch-card"
            style={{
              marginTop: "1.5rem",
              padding: "1.5rem",
              borderColor: stage.color,
              boxShadow: `4px 4px 0 ${stage.color}33`,
              animation: "stickerPop 0.3s ease forwards",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
              <span style={{ fontSize: "2rem" }}>{stage.icon}</span>
              <div>
                <div className="heading-sketch" style={{ fontSize: "1.5rem", color: stage.color }}>{stage.title}</div>
                <div style={{ fontSize: "0.85rem", color: "var(--pencil-gray)", fontFamily: "var(--font-body)" }}>
                  ⏱️ {stage.duration}
                </div>
              </div>
            </div>

            <p style={{ fontFamily: "var(--font-body)", lineHeight: 1.6, marginBottom: "1rem", fontSize: "0.95rem" }}>
              {stage.description}
            </p>

            <div className="heading-sketch" style={{ fontSize: "1rem", marginBottom: "0.5rem" }}>✏️ Key Facts:</div>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.4rem" }}>
              {stage.keyFacts.map((fact, i) => (
                <li key={i} style={{ display: "flex", gap: "0.5rem", fontFamily: "var(--font-body)", fontSize: "0.9rem" }}>
                  <span style={{ color: stage.color, fontWeight: 700 }}>→</span>
                  {fact}
                </li>
              ))}
            </ul>
          </div>
        );
      })()}

      {!selectedStageId && (
        <p style={{ textAlign: "center", fontFamily: "var(--font-hand)", fontSize: "1.1rem", color: "var(--pencil-gray)", marginTop: "1rem" }}>
          ☝️ Tap any stage above to learn more!
        </p>
      )}
    </div>
  );
}
