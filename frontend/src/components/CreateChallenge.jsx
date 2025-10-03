import { useState } from "react";

const difficulties = ["Easy", "Medium", "Hard"];

export default function CreateChallenge() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [difficulty, setDifficulty] = useState("Easy");
  const [testCases, setTestCases] = useState([{ input: "", output: "", isSample: true }]);
  const [tags, setTags] = useState("");
  const [message, setMessage] = useState("");

  const handleTestCaseChange = (idx, field, value) => {
    const updated = [...testCases];
    updated[idx][field] = value;
    setTestCases(updated);
  };

  const addTestCase = () => {
    setTestCases([...testCases, { input: "", output: "", isSample: false }]);
  };

  const removeTestCase = (idx) => {
    setTestCases(testCases.filter((_, i) => i !== idx));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    // Validation
    if (testCases.length === 0) {
      setMessage("At least one test case is required");
      return;
    }

    if (!testCases.some(tc => tc.isSample)) {
      setMessage("At least one test case must be marked as sample");
      return;
    }

    try {
      const res = await fetch("/api/challenges", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          title: title.trim(),
          description: description.trim(),
          difficulty,
          testCases,
          tags: tags.split(",").map(t => t.trim()).filter(Boolean)
        })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to create challenge");
      }

      setMessage("Challenge created successfully!");
      setTitle(""); setDescription(""); setDifficulty("Easy"); setTestCases([{ input: "", output: "", isSample: true }]); setTags("");
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-8">
      <h2 className="text-2xl font-bold mb-4">Create Coding Challenge</h2>
      <form onSubmit={handleSubmit}>
        <label className="block mb-2 font-semibold">Title</label>
        <input className="w-full mb-4 p-2 border rounded" value={title} onChange={e => setTitle(e.target.value)} required />

        <label className="block mb-2 font-semibold">Description</label>
        <textarea className="w-full mb-4 p-2 border rounded" value={description} onChange={e => setDescription(e.target.value)} required rows={4} />

        <label className="block mb-2 font-semibold">Difficulty</label>
        <select className="w-full mb-4 p-2 border rounded" value={difficulty} onChange={e => setDifficulty(e.target.value)}>
          {difficulties.map(d => <option key={d}>{d}</option>)}
        </select>

        <label className="block mb-2 font-semibold">Tags (comma separated)</label>
        <input className="w-full mb-4 p-2 border rounded" value={tags} onChange={e => setTags(e.target.value)} />

        <label className="block mb-2 font-semibold">Test Cases</label>
        {testCases.map((tc, idx) => (
          <div key={idx} className="mb-2 p-2 border rounded bg-gray-50">
            <input className="mr-2 p-1 border rounded" placeholder="Input" value={tc.input} onChange={e => handleTestCaseChange(idx, "input", e.target.value)} required />
            <input className="mr-2 p-1 border rounded" placeholder="Expected Output" value={tc.output} onChange={e => handleTestCaseChange(idx, "output", e.target.value)} required />
            <label className="mr-2">
              <input type="checkbox" checked={tc.isSample} onChange={e => handleTestCaseChange(idx, "isSample", e.target.checked)} /> Sample
            </label>
            {testCases.length > 1 && <button type="button" className="text-red-500" onClick={() => removeTestCase(idx)}>Remove</button>}
          </div>
        ))}
        <button type="button" className="mb-4 px-3 py-1 bg-blue-100 rounded" onClick={addTestCase}>Add Test Case</button>

        <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded font-bold">Create Challenge</button>
      </form>
      {message && <div className="mt-4 text-center text-lg text-green-600">{message}</div>}
    </div>
  );
}