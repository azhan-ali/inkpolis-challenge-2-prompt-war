# ✏️ InkPolis — Democracy, Drawn for Everyone

<p align="center">
  <img src="https://img.shields.io/badge/Google%20AI%20Prompt%20War-Challenge%20Winner-blueviolet?style=for-the-badge&logo=google-cloud&logoColor=white" alt="Challenge Badge">
  <img src="https://img.shields.io/badge/Built%20With-Next.js%2014-black?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js">
  <img src="https://img.shields.io/badge/AI%20Engine-Gemini%202.5%20Flash-blue?style=for-the-badge&logo=google&logoColor=white" alt="Gemini">
  <img src="https://img.shields.io/badge/Style-Hand--Drawn%20Sketch-yellow?style=for-the-badge" alt="Sketch Style">
</p>

---

## 🎨 The Concept

Welcome to **InkPolis**, a living scrapbook that transforms the often dry and complex topic of elections into a warm, approachable, and highly interactive learning journey.

Most civic tools are sterile, dashboard-heavy, and dry. **InkPolis pivots entirely.** It features a custom **Hand-Drawn / Sketch aesthetic** — complete with organic wobbly borders, marker illustrations, paper textures, and handwritten typography. It feels like flipping through a passionate civics teacher's personal notebook.

Guided by **VOTA (Virtual On-demand Transparency Advisor)**, an AI-powered sketched owl, users explore election processes, timelines, and rights through interactive visuals, games, and direct conversations.

---

## ✨ Key Features

*   **🗺️ Interactive Marker Journey:** Click through an organic, SVG-drawn timeline of election stages (Registration ➡️ Nomination ➡️ Campaigning ➡️ Voting Day ➡️ Results) custom-tailored for **India 🇮🇳**, the **USA 🇺🇸**, and the **UK 🇬🇧**.
*   **🤖 VOTA AI Guide (Gemini 2.5 Flash):** Chat with a context-aware, friendly civic guide designed to explain complex details simply and dynamically, keeping answers engaging and under 130 words.
*   **🧠 Real-Time Doodle Quiz:** Test your knowledge with dynamically generated quizzes from Gemini based on your selected stage, styled like handwritten study flashcards.
*   **🎭 Role-Play Simulator:** Step into the shoes of a **Voter**, a **Candidate**, or an **Election Officer** to understand their unique workflows and responsibilities.
*   **🔍 Myth-Buster Stamps:** Interactive myth cards that debunk common election misinformation. Correct facts get stamped with a marker-red **FACT** stamp.
*   **🏅 Scrapbook Badge & Streak System:** Track your streak with hand-drawn tally marks and earn collectible stickers for exploring and completing tasks.

---

## 🛠️ The Tech Stack & Architecture

*   **Framework:** Next.js 14 (App Router)
*   **Language:** TypeScript
*   **Styling:** Tailwind CSS + Custom Sketch Engine CSS (uses SVG `feTurbulence` filters to warp borders organically on hover/load)
*   **AI:** `@google/genai` (Migrated to the latest official SDK) running `gemini-2.5-flash`
*   **Animations:** Custom CSS keyframes + Framer Motion (hover tilts, page flips, sticker pop-ins)
*   **Database:** LocalStorage for progress persistence

---

## 🚀 Setup & Installation

Follow these steps to run InkPolis locally:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/<your-username>/inkpolis.git
    cd inkpolis
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Configure environment variables:**
    Create a `.env.local` file in the root directory and add your Gemini API Key:
    ```env
    GEMINI_API_KEY=your_gemini_api_key_here
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

5.  Open [http://localhost:3000](http://localhost:3000) in your browser to experience the sketchbook live!

---

## 🎨 Creative Under-the-Hood Highlights

### 1. Organic Wobbly Borders (Zero Canvas Hack)
We didn't use canvas or external image assets for wobbly cards. Instead, we injected a custom SVG filter inline:
```html
<svg style={{ position: "absolute", width: 0, height: 0 }}>
  <defs>
    <filter id="sketch-filter">
      <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise" />
      <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" xChannelSelector="R" yChannelSelector="G" />
    </filter>
  </defs>
</svg>
```
Any element with `.sketch-card` or `.btn-sketch` warps slightly based on this noise filter, giving it an authentic pencil/marker drawn edge.

### 2. Drifting Background Doodles
The background contains hand-crafted SVG shapes (ballot boxes, margin lines, magnifying glasses) drifting in a slow diagonal scroll animation (`driftDoodles 60s linear infinite`), combined with a paper noise texture overlay for tactile depth.

---

## 🏆 Google AI Prompt War Submission Info
*   **Core Challenge:** Election Process Education
*   **Winning Innovation:** Breaking the standard "chatbot interface" by packaging Gemini AI inside a gamified, beautifully customized physical sketchbook container with multi-role simulators and custom-stamped myth debunkers.
*   **Design Paradigm:** Sketch-Alive / Cozy Craft UI

---
<p align="center">
  <b>Built by Azhan Ali</b>
</p>
