"use client";
import { useState } from "react";
import { roles } from "@/lib/election-data";

export default function RoleSimulator() {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [step, setStep] = useState(0);

  const role = roles.find((r) => r.id === selectedRole);

  if (!selectedRole || !role) {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <div className="heading-sketch" style={{ fontSize: "1.3rem", textAlign: "center" }}>
          🎭 Pick Your Role
        </div>
        <p style={{ textAlign: "center", fontFamily: "var(--font-body)", color: "var(--pencil-gray)", fontSize: "0.9rem" }}>
          Experience the election from a different perspective!
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "1rem" }}>
          {roles.map((r) => (
            <div
              key={r.id}
              className="sketch-card"
              style={{ padding: "1.2rem", textAlign: "center", cursor: "pointer", borderColor: r.color }}
              onClick={() => { setSelectedRole(r.id); setStep(0); }}
            >
              <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>{r.icon}</div>
              <div className="heading-sketch" style={{ fontSize: "1.1rem", color: r.color, marginBottom: "0.3rem" }}>{r.title}</div>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", color: "var(--pencil-gray)" }}>{r.description}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const currentStep = role.journey[step];
  const isLast = step === role.journey.length - 1;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
        <span style={{ fontSize: "2rem" }}>{role.icon}</span>
        <div className="heading-sketch" style={{ fontSize: "1.4rem", color: role.color }}>{role.title} Journey</div>
        <button className="btn-sketch" style={{ marginLeft: "auto", fontSize: "0.8rem" }} onClick={() => setSelectedRole(null)}>
          ← Back
        </button>
      </div>

      {/* Step progress dots */}
      <div style={{ display: "flex", gap: "0.5rem", justifyContent: "center" }}>
        {role.journey.map((_, i) => (
          <div
            key={i}
            style={{
              width: i === step ? 24 : 10,
              height: 10,
              borderRadius: 5,
              background: i <= step ? role.color : "var(--paper-dark)",
              border: `2px solid ${i <= step ? role.color : "var(--pencil-gray)"}`,
              transition: "all 0.2s ease",
              cursor: "pointer",
            }}
            onClick={() => setStep(i)}
          />
        ))}
      </div>

      {/* Current step card */}
      <div
        className="sketch-card lined-paper"
        style={{ padding: "1.5rem", borderColor: role.color, boxShadow: `4px 4px 0 ${role.color}33`, animation: "stickerPop 0.25s ease" }}
        key={step}
      >
        <div className="washi-tape" style={{ marginBottom: "1rem", fontSize: "0.85rem", fontFamily: "var(--font-hand)" }}>
          Step {step + 1} of {role.journey.length}
        </div>
        <div className="heading-sketch" style={{ fontSize: "1.6rem", color: role.color, marginBottom: "0.5rem" }}>
          {currentStep.step}
        </div>
        <p style={{ fontFamily: "var(--font-body)", lineHeight: 1.6, fontSize: "0.95rem" }}>
          {currentStep.detail}
        </p>
      </div>

      <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center" }}>
        {step > 0 && (
          <button className="btn-sketch" onClick={() => setStep((s) => s - 1)}>← Prev</button>
        )}
        {!isLast ? (
          <button className="btn-sketch blue" onClick={() => setStep((s) => s + 1)}>Next Step →</button>
        ) : (
          <div style={{ textAlign: "center" }}>
            <div style={{ fontFamily: "var(--font-hand)", fontSize: "1.2rem", color: "var(--ink-green)" }}>
              🎉 You completed the {role.title} journey!
            </div>
            <button className="btn-sketch green" style={{ marginTop: "0.5rem" }} onClick={() => { setSelectedRole(null); setStep(0); }}>
              Try Another Role
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
