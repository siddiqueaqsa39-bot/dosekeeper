import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

const app = express();
app.use(express.json());

const PORT = 3000;

// API Endpoint for AI Adherence Insight
app.post("/api/adherence-insight", async (req, res) => {
  try {
    const { problemText, recentLogs, medications } = req.body;

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: "Gemini API key is not configured in server environment." });
    }

    const ai = new GoogleGenAI({ apiKey });

    const logsSummary = Array.isArray(recentLogs) && recentLogs.length > 0
      ? recentLogs.slice(0, 30).map((l: any) => `- Date: ${l.date}, Time: ${l.timeSlot}, Medication: ${l.medicationName} (${l.dosage}), Status: ${l.status.toUpperCase()}`).join("\n")
      : "No recent dose logs available.";

    const medsSummary = Array.isArray(medications) && medications.length > 0
      ? medications.map((m: any) => `- ${m.name} (${m.dosage}): ${m.timesPerDay}x daily at ${m.scheduleTimes ? m.scheduleTimes.join(", ") : "scheduled times"}`).join("\n")
      : "No active medications listed.";

    const prompt = `Patient's self-reported adherence problem/question:
"${problemText || "I want general tips to improve my adherence."}"

Patient Active Medications:
${medsSummary}

Recent Dose Log History:
${logsSummary}

Please analyze this data and the patient's reported issue, and provide compassionate, practical, and tailored advice to help them overcome this challenge.`;

    const result = await ai.models.generateContent({
      model: "gemini-flash-latest",
      contents: prompt,
      config: {
        systemInstruction: "You are DoseKeeper AI, an empathetic, supportive medical adherence specialist and health coach. You analyze a patient's medication logs and self-reported adherence challenges to provide practical, compassionate, and actionable strategies to help them stay on track with their medications. Never provide direct medical diagnoses or tell patients to alter prescription dosages. Provide concise, encouraging advice with bullet points for easy reading."
      }
    });

    const adviceText = result.text || "No response received from AI coach.";
    return res.json({ advice: adviceText });
  } catch (error: any) {
    console.error("Error generating AI insight:", error);
    return res.status(500).json({ error: error.message || "Failed to generate AI insight." });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
