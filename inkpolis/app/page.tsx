"use client";
import { useState, useEffect } from "react";
import { Country, electionData, ElectionStage } from "@/lib/election-data";
import ElectionTimeline from "@/components/ElectionTimeline";
import VotaChat from "@/components/VotaChat";
import RoleSimulator from "@/components/RoleSimulator";
import QuizEngine from "@/components/QuizEngine";
import MythBuster from "@/components/MythBuster";

type Tab = "timeline" | "roles" | "quiz" | "myths" | "chat";

const BADGES = [
  { id: "explorer",  icon: "🗺️", label: "Explorer",    desc: "Opened the app",           earned: true  },
  { id: "timelinePro", icon: "📍", label: "Timeline Pro", desc: "Clicked 3+ stages",       earned: false },
  { id: "quizAce",  icon: "🧠", label: "Quiz Ace",    desc: "Got 5/5 on a quiz",        earned: false },
  { id: "mythBuster", icon: "🔍", label: "Myth Buster", desc: "Revealed all myths",       earned: false },
  { id: "diplomat",  icon: "🌍", label: "Diplomat",    desc: "Explored all 3 countries", earned: false },
];

const COUNTRIES: { id: Country; flag: string; name: string }[] = [
  { id: "india", flag: "🇮🇳", name: "India"  },
  { id: "usa",   flag: "🇺🇸", name: "USA"    },
  { id: "uk",    flag: "🇬🇧", name: "UK"     },
];

const TABS: { id: Tab; icon: string; label: string }[] = [
  { id: "timeline", icon: "🗺️", label: "Journey"  },
  { id: "roles",    icon: "🎭", label: "Roles"    },
  { id: "quiz",     icon: "🧠", label: "Quiz"     },
  { id: "myths",    icon: "🔍", label: "Myths"    },
  { id: "chat",     icon: "💬", label: "Ask VOTA" },
];

export default function Home() {
  const [country, setCountry] = useState<Country>("india");
  const [tab, setTab]         = useState<Tab>("timeline");
  const [selectedStage, setSelectedStage] = useState<ElectionStage | null>(null);
  const [streak, setStreak]   = useState(1);
  const [badges, setBadges]   = useState(BADGES);
  const [countriesVisited, setCountriesVisited] = useState<Set<Country>>(new Set(["india"]));
  const [stagesVisited, setStagesVisited]       = useState(0);
  const [showBadgeToast, setShowBadgeToast]     = useState<string | null>(null);

  // Load streak from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("inkpolis_streak");
    if (saved) setStreak(parseInt(saved));
    const savedBadges = localStorage.getItem("inkpolis_badges");
    if (savedBadges) setBadges(JSON.parse(savedBadges));
  }, []);

  const earnBadge = (id: string, label: string) => {
    setBadges((prev) => {
      const next = prev.map((b) => b.id === id ? { ...b, earned: true } : b);
      localStorage.setItem("inkpolis_badges", JSON.stringify(next));
      return next;
    });
    setShowBadgeToast(`🏅 Badge Earned: ${label}!`);
    setTimeout(() => setShowBadgeToast(null), 3000);
  };

  const handleCountryChange = (c: Country) => {
    setCountry(c);
    setSelectedStage(null);
    const next = new Set(countriesVisited).add(c);
    setCountriesVisited(next);
    if (next.size === 3 && !badges.find((b) => b.id === "diplomat")?.earned) {
      earnBadge("diplomat", "Diplomat");
    }
  };

  const handleStageSelect = (stage: ElectionStage) => {
    setSelectedStage(stage);
    const nextCount = stagesVisited + 1;
    setStagesVisited(nextCount);
    if (nextCount >= 3 && !badges.find((b) => b.id === "timelinePro")?.earned) {
      earnBadge("timelinePro", "Timeline Pro");
    }
  };

  // Tally marks
  const renderTally = (n: number) => {
    const marks = [];
    for (let i = 0; i < Math.min(n, 10); i++) {
      const isCross = (i + 1) % 5 === 0;
      marks.push(
        <span
          key={i}
          style={{
            display: "inline-block",
            width: isCross ? 14 : 3,
            height: isCross ? 3 : 18,
            background: "var(--ink-primary)",
            borderRadius: 2,
            transform: isCross ? "rotate(-15deg)" : "none",
            margin: isCross ? "0 3px 0 -8px" : "0 1px",
            verticalAlign: "middle",
          }}
        />
      );
    }
    return marks;
  };

  return (
    <div style={{ minHeight: "100vh", padding: "clamp(0.75rem, 3vw, 1.5rem)", maxWidth: 900, margin: "0 auto" }}>
      {/* ── Floating background doodles ── */}
      {["✏️","🗳️","⭐","📋","🔍","✔️","📣","🏛️"].map((d, i) => (
        <div key={i} className="bg-doodle float-paper" style={{
          top: `${[8,18,55,72,35,85,15,65][i]}%`,
          left: `${[3,88,2,90,5,85,45,50][i]}%`,
          fontSize: `${[1.5,2,1.2,1.8,1.3,1.6,2.2,1.4][i]}rem`,
          animationDelay: `${i*0.7}s`,
          animationDuration: `${4+i*0.5}s`,
        }}>{d}</div>
      ))}
      {/* Hidden SVG filter for wobbly effect */}
      <svg style={{ position: "absolute", width: 0, height: 0 }}>
        <defs>
          <filter id="sketch-filter">
            <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>

      {/* ── Header ── */}
      <header style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "0.75rem", marginBottom: "1.5rem" }}>
        <div>
          <div className="heading-sketch" style={{ fontSize: "clamp(1.6rem, 5vw, 2.2rem)", color: "var(--ink-blue)", lineHeight: 1 }}>
            ✏️ InkPolis
          </div>
          <div style={{ fontFamily: "var(--font-body)", fontSize: "clamp(0.75rem, 2vw, 0.85rem)", color: "var(--pencil-gray)" }}>
            Democracy, drawn for everyone.
          </div>
        </div>

        {/* Streak */}
        <div className="sketch-card" style={{ padding: "0.4rem 0.75rem", display: "flex", alignItems: "center", gap: "0.4rem" }}>
          <span style={{ fontFamily: "var(--font-hand)", fontSize: "0.85rem" }}>🔥 Streak</span>
          <div style={{ display: "flex", alignItems: "center", gap: "1px" }}>
            {renderTally(streak)}
          </div>
          <span style={{ fontFamily: "var(--font-hand)", fontWeight: 700, fontSize: "0.85rem" }}>{streak}</span>
        </div>

        {/* Country Selector */}
        <div style={{ display: "flex", gap: "0.35rem", flexWrap: "wrap" }}>
          {COUNTRIES.map((c) => (
            <button
              key={c.id}
              className="btn-sketch"
              style={{
                fontSize: "clamp(0.75rem, 2vw, 0.85rem)",
                padding: "0.3rem 0.65rem",
                background: country === c.id ? "var(--ink-blue)" : "var(--paper-bg)",
                color: country === c.id ? "white" : "var(--ink-primary)",
                borderColor: country === c.id ? "var(--ink-blue)" : "var(--ink-primary)",
              }}
              onClick={() => handleCountryChange(c.id)}
            >
              {c.flag} {c.name}
            </button>
          ))}
        </div>
      </header>

      {/* ── VOTA Welcome Banner ── */}
      <div style={{ display: "flex", alignItems: "flex-end", gap: "0.75rem", marginBottom: "1.5rem", flexWrap: "wrap" }}>
        <div className="float-paper" style={{ fontSize: "clamp(2.5rem, 6vw, 3.5rem)", lineHeight: 1, flexShrink: 0 }}>🦉</div>
        <div className="speech-bubble" style={{ flex: 1, minWidth: 220, fontSize: "clamp(0.88rem, 2.5vw, 1.05rem)" }}>
          <span className="highlight-yellow">Hey! I&apos;m VOTA</span> — your ink-stained civic guide! 🎉
          Pick a country, explore the election journey, quiz yourself, or just ask me anything.{" "}
          <span className="highlight-pink">Democracy should be sketched for everyone!</span>
        </div>
      </div>

      {/* ── Country Info Strip ── */}
      <div className="sketch-card" style={{ padding: "0.6rem 1rem", marginBottom: "1.25rem", display: "flex", alignItems: "center", gap: "0.75rem", background: "var(--paper-dark)", flexWrap: "wrap" }}>
        <span style={{ fontSize: "1.6rem" }}>{COUNTRIES.find(c=>c.id===country)?.flag}</span>
        <div style={{ flex: 1, minWidth: 160 }}>
          <div className="heading-sketch" style={{ fontSize: "clamp(0.95rem, 2.5vw, 1.1rem)" }}>{electionData[country].name}</div>
          <div style={{ fontFamily: "var(--font-body)", fontSize: "clamp(0.75rem, 2vw, 0.82rem)", color: "var(--pencil-gray)" }}>
            {electionData[country].system} · {electionData[country].stages.length} stages
          </div>
        </div>
        <div style={{ fontFamily: "var(--font-hand)", fontSize: "clamp(0.75rem, 2vw, 0.85rem)", color: "var(--ink-blue)", whiteSpace: "nowrap" }}>
          Tap a tab to explore →
        </div>
      </div>

      {/* ── Tab Navigation ── */}
      <div style={{ display: "flex", gap: "0.35rem", marginBottom: "1.25rem", flexWrap: "wrap" }}>
        {TABS.map((t) => (
          <button
            key={t.id}
            className="btn-sketch"
            style={{
              fontSize: "clamp(0.8rem, 2.2vw, 0.9rem)",
              padding: "0.4rem 0.85rem",
              background: tab === t.id ? "var(--ink-primary)" : "var(--paper-bg)",
              color: tab === t.id ? "var(--paper-bg)" : "var(--ink-primary)",
              borderColor: tab === t.id ? "var(--ink-primary)" : "var(--pencil-gray)",
              flex: "1 1 auto",
            }}
            onClick={() => setTab(t.id)}
          >
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      {/* ── Tab Content ── */}
      <div className="sketch-card" style={{ padding: "clamp(1rem, 3vw, 1.5rem)", minHeight: 380 }}>
        {tab === "timeline" && (
          <ElectionTimeline
            country={country}
            onStageSelect={handleStageSelect}
            selectedStageId={selectedStage?.id ?? null}
          />
        )}
        {tab === "roles" && <RoleSimulator />}
        {tab === "quiz"  && <QuizEngine country={country} />}
        {tab === "myths" && <MythBuster country={country} />}
        {tab === "chat"  && (
          <VotaChat country={country} currentStage={selectedStage?.title ?? "general"} />
        )}
      </div>

      {/* ── Badges Scrapbook ── */}
      <div className="sketch-card" style={{ marginTop: "1.25rem", padding: "1rem 1.2rem" }}>
        <div className="heading-sketch" style={{ fontSize: "clamp(1rem, 3vw, 1.2rem)", marginBottom: "0.85rem" }}>
          🏅 Your Civic Scrapbook
        </div>
        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
          {badges.map((b) => (
            <div
              key={b.id}
              className={`badge-sticker ${b.earned ? "earned" : "locked"}`}
              title={b.desc}
            >
              <span style={{ fontSize: "clamp(1.2rem, 3vw, 1.6rem)" }}>{b.icon}</span>
              <span>{b.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Footer ── */}
      <footer style={{ marginTop: "2rem", textAlign: "center", fontFamily: "var(--font-hand)", color: "var(--pencil-gray)", fontSize: "0.9rem", paddingBottom: "1rem" }}>
        ✏️ InkPolis · Made with ink & democracy · Powered by{" "}
        <span className="highlight-blue">Google Gemini</span>
      </footer>

      {/* ── Badge Toast ── */}
      {showBadgeToast && (
        <div
          className="sticker-pop"
          style={{
            position: "fixed",
            bottom: "2rem",
            right: "1.5rem",
            background: "#fffde7",
            border: "3px solid #f39c12",
            borderRadius: 8,
            padding: "0.75rem 1.2rem",
            fontFamily: "var(--font-hand)",
            fontSize: "1.1rem",
            boxShadow: "4px 4px 0 #f39c12",
            zIndex: 9998,
          }}
        >
          {showBadgeToast}
        </div>
      )}
    </div>
  );
}
