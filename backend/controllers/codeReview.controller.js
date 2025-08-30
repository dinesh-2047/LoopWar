import axios from "axios";

export const reviewCode = async (req, res) => {
  try {
    const { code, language } = req.body;
    // Example: Call OpenAI API for code review
    const prompt = `Review the following ${language} code for style, efficiency, and bugs. Provide feedback and suggestions:\n\n${code}`;
    const openaiRes = await axios.post("https://api.openai.com/v1/chat/completions", {
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 300
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