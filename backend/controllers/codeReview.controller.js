import axios from "axios";

export const reviewCode = async (req, res) => {
  try {
    const { code, language } = req.body;
    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({ error: "OpenAI API key not configured" });
    }
    // Example: Call OpenAI API for code review
    const prompt = `You are an expert code reviewer. Review the following ${language} code for:
1. Code style and best practices
2. Efficiency and performance issues
3. Potential bugs or security vulnerabilities
4. Suggestions for improvement

Provide structured feedback with sections for each category. Be concise but helpful.

Code:
${code}`;
    const openaiRes = await axios.post("https://api.openai.com/v1/chat/completions", {
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 500
    }, {
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      }
    });
    const feedback = openaiRes.data.choices[0].message.content;
    res.json({ feedback });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};