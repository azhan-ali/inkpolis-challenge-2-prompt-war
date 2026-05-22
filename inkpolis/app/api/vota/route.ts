import { NextRequest, NextResponse } from "next/server";
import { ai, GEMINI_MODEL, VOTA_SYSTEM_PROMPT } from "@/lib/gemini";

export async function POST(req: NextRequest) {
  try {
    const { message, country, currentStage, history } = await req.json();

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    const contextInstruction = `${VOTA_SYSTEM_PROMPT}

Current context:
- User's selected country: ${country || "India"}
- Current stage they are viewing: ${currentStage || "general overview"}
- The user is learning about elections in ${country || "India"}.`;

    // Build conversation history
    const contents = [
      { role: "user" as const, parts: [{ text: "Hello VOTA! I want to learn about elections." }] },
      { role: "model" as const, parts: [{ text: "Hey there! I'm VOTA, your sketch-guide to democracy! 🦉✏️ I'm here to draw out the whole election process for you — step by step, like sketching on a whiteboard. What would you like to explore first?" }] },
      ...(Array.isArray(history) ? history : []),
      { role: "user" as const, parts: [{ text: message }] },
    ];

    const response = await ai.models.generateContent({
      model: GEMINI_MODEL,
      systemInstruction: contextInstruction,
      contents,
      config: {
        maxOutputTokens: 300,
        temperature: 0.75,
      },
    });

    const text = response.text ?? "I couldn't form a response. Try again!";
    return NextResponse.json({ reply: text });

  } catch (error: unknown) {
    console.error("VOTA API error:", error);
    const msg = error instanceof Error ? error.message : String(error);
    const isRateLimit = msg.includes("429") || msg.toLowerCase().includes("quota") || msg.includes("Too Many");
    return NextResponse.json(
      {
        error: isRateLimit
          ? "VOTA is taking a short ink break! ✏️ API quota refreshes soon — please try again in 30 seconds!"
          : "VOTA had a thinking hiccup. Try again!",
        details: msg,
      },
      { status: isRateLimit ? 429 : 500 }
    );
  }
}
