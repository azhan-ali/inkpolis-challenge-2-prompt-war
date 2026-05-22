import { NextRequest, NextResponse } from "next/server";
import { ai, GEMINI_MODEL } from "@/lib/gemini";

export async function POST(req: NextRequest) {
  try {
    const { country, stage, difficulty } = await req.json();

    const prompt = `You are a civic education quiz generator for InkPolis app.

Generate exactly 5 multiple-choice quiz questions about the "${stage}" stage of elections in ${country}.
Difficulty level: ${difficulty || "medium"}.

Format your response as a valid JSON array with exactly this structure (no markdown, just raw JSON):
[
  {
    "question": "Question text here?",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "correctIndex": 0,
    "explanation": "Brief explanation why this is correct (max 40 words)"
  }
]

Make questions educational, accurate, and engaging. Vary question types (what, why, how, when).`;

    const response = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: prompt,
    });

    const text = response.text ?? "[]";
    const cleaned = text.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
    const questions = JSON.parse(cleaned);

    return NextResponse.json({ questions });
  } catch (error: unknown) {
    console.error("Quiz API error:", error);
    // Fallback questions
    return NextResponse.json({
      questions: [
        {
          question: "What is the minimum voting age in India?",
          options: ["16 years", "18 years", "21 years", "25 years"],
          correctIndex: 1,
          explanation: "Indian citizens must be 18 years or older to vote, as per the Constitution.",
        },
        {
          question: "Which body conducts elections in India?",
          options: ["Supreme Court", "Parliament", "Election Commission of India", "Cabinet"],
          correctIndex: 2,
          explanation: "The Election Commission of India (ECI) is the constitutional body that oversees all elections.",
        },
        {
          question: "What does EVM stand for?",
          options: ["Electronic Voting Machine", "Election Verification Method", "Electronic Vote Monitor", "Electoral Voting Module"],
          correctIndex: 0,
          explanation: "EVM stands for Electronic Voting Machine, used in Indian elections since 2004.",
        },
        {
          question: "What is NOTA in Indian elections?",
          options: ["Name of The Authority", "None of The Above", "National Online Tally Agency", "New Opposition Track Act"],
          correctIndex: 1,
          explanation: "NOTA means 'None of The Above' — allowing voters to reject all candidates.",
        },
        {
          question: "How many seats are needed for a majority in India's Lok Sabha?",
          options: ["250", "272", "300", "350"],
          correctIndex: 1,
          explanation: "A party needs 272 out of 543 Lok Sabha seats to form a majority government.",
        },
      ],
    });
  }
}
