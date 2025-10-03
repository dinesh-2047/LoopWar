import { useState } from "react";

const CodeReviewBot = () => {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFeedback("");
    try {
      const res = await fetch("/api/code-review", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ code, language })
      });
      const data = await res.json();
      setFeedback(data.feedback || data.error);
    } catch (err) {
      setFeedback("Error: " + err.message);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">AI-Powered Code Review Bot</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Language:</label>
          <select value={language} onChange={e => setLanguage(e.target.value)} className="border rounded px-2 py-1">
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
            <option value="c++">C++</option>
            <option value="c#">C#</option>
            <option value="go">Go</option>
            <option value="rust">Rust</option>
            <option value="php">PHP</option>
            <option value="ruby">Ruby</option>
            <option value="typescript">TypeScript</option>
          </select>
        </div>
        <div>
          <label className="block mb-1 font-medium">Paste your code:</label>
          <textarea
            value={code}
            onChange={e => setCode(e.target.value)}
            rows={10}
            className="w-full border rounded px-2 py-1 font-mono"
            placeholder="Paste your code here..."
            required
          />
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded" disabled={loading}>
          {loading ? "Reviewing..." : "Submit for Review"}
        </button>
      </form>
      {feedback && (
        <div className="mt-6 p-4 bg-gray-100 rounded border">
          <h3 className="font-semibold mb-2">AI Feedback:</h3>
          <pre className="whitespace-pre-wrap text-sm">{feedback}</pre>
        </div>
      )}
    </div>
  );
};

export default CodeReviewBot;