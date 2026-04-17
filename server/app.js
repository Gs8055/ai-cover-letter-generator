import express from "express";
import dotenv from "dotenv";
import OpenAI from "openai";
import cors from "cors";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static("public"));

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// API Route
app.post("/generate", async (req, res) => {
  try {
    const { name, role, company, skills } = req.body;

    if (!name || !role || !company || !skills) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const prompt = `
Write a professional and well-structured cover letter.

Candidate Name: ${name}
Job Role: ${role}
Company: ${company}
Skills: ${skills}

Make it:
- Formal
- 150–200 words
- Proper paragraphs
`;

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
    });

    res.json({
      letter: response.choices[0].message.content,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});