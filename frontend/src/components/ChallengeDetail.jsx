import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Play, User, Tag } from "lucide-react";

export default function ChallengeDetail() {
  const { id } = useParams();
  const [challenge, setChallenge] = useState(null);
  const [loading, setLoading] = useState(true);
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [testResults, setTestResults] = useState([]);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    fetchChallenge();
  }, [id]);

  const fetchChallenge = async () => {
    try {
      const res = await fetch(`/api/challenges/${id}`);
      const data = await res.json();
      setChallenge(data);
    } catch (err) {
      console.error("Failed to fetch challenge:", err);
    } finally {
      setLoading(false);
    }
  };

  const runTests = async () => {
    if (!code.trim()) return;
    setRunning(true);
    setTestResults([]);

    try {
      // Simulate test execution with some basic validation
      const results = challenge.testCases.map((testCase, index) => {
        // Simple simulation: check if code contains certain keywords or patterns
        const hasBasicStructure = code.includes('function') || code.includes('def ') || code.includes('class ') || code.includes('int main');
        const passed = hasBasicStructure && Math.random() > 0.3; // 70% pass rate for demo

        return {
          input: testCase.input,
          expected: testCase.output,
          actual: passed ? testCase.output : "Incorrect output", // Simulate correct/incorrect output
          passed,
          isSample: testCase.isSample
        };
      });
      setTestResults(results);
    } catch (err) {
      console.error("Failed to run tests:", err);
    } finally {
      setRunning(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/40 to-black text-white flex items-center justify-center">
        <div className="text-xl">Loading challenge...</div>
      </div>
    );
  }

  if (!challenge) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/40 to-black text-white flex items-center justify-center">
        <div className="text-xl">Challenge not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/40 to-black text-white p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 text-gray-400 hover:text-white mb-4"
          >
            <ArrowLeft size={20} /> Back to Challenges
          </button>
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">{challenge.title}</h1>
              <div className="flex items-center gap-4 mb-4">
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  challenge.difficulty === "Easy" ? "bg-green-500/20 text-green-400" :
                  challenge.difficulty === "Medium" ? "bg-yellow-500/20 text-yellow-400" :
                  "bg-red-500/20 text-red-400"
                }`}>{challenge.difficulty}</span>
                {challenge.creator && (
                  <span className="flex items-center gap-1 text-sm text-gray-400">
                    <User size={16} /> Created by {challenge.creator.username}
                  </span>
                )}
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {challenge.tags?.map((tag, i) => (
                  <span key={i} className="flex items-center gap-1 text-xs px-2 py-1 rounded-md bg-purple-600/20 text-purple-300">
                    <Tag size={12} /> {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="text-gray-300 leading-relaxed">
            {challenge.description}
          </div>
        </div>

        {/* Sample Test Cases */}
        {challenge.testCases?.filter(tc => tc.isSample).length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Sample Test Cases</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {challenge.testCases.filter(tc => tc.isSample).map((testCase, index) => (
                <div key={index} className="bg-gray-800/60 rounded-lg p-4 border border-white/10">
                  <h3 className="font-semibold mb-2">Sample Input {index + 1}</h3>
                  <pre className="bg-gray-900/60 p-2 rounded text-sm mb-2 overflow-x-auto">{testCase.input}</pre>
                  <h3 className="font-semibold mb-2">Sample Output {index + 1}</h3>
                  <pre className="bg-gray-900/60 p-2 rounded text-sm overflow-x-auto">{testCase.output}</pre>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Code Editor */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold mb-4">Your Solution</h2>
            <div className="mb-4">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="bg-gray-800/60 border border-white/10 rounded px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="javascript">JavaScript</option>
                <option value="python">Python</option>
                <option value="java">Java</option>
                <option value="cpp">C++</option>
              </select>
            </div>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Write your code here..."
              className="w-full h-96 bg-gray-800/60 border border-white/10 rounded p-4 text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button
              onClick={runTests}
              disabled={running || !code.trim()}
              className="mt-4 w-full bg-gradient-to-r from-green-500 to-emerald-500 py-3 rounded-lg font-bold hover:scale-105 transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Play size={20} />
              {running ? "Running Tests..." : "Run Tests"}
            </button>
          </div>

          {/* Test Results */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Test Results</h2>
            {testResults.length === 0 ? (
              <div className="text-gray-400 text-center py-8">
                Run your code to see test results
              </div>
            ) : (
              <div className="space-y-4">
                {testResults.map((result, index) => (
                  <div key={index} className={`p-4 rounded-lg border ${result.passed ? 'bg-green-900/20 border-green-500/30' : 'bg-red-900/20 border-red-500/30'}`}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold">Test Case {index + 1}</span>
                      <span className={`px-2 py-1 rounded text-sm ${result.passed ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                        {result.passed ? 'PASS' : 'FAIL'}
                      </span>
                    </div>
                    <div className="text-sm space-y-1">
                      <div><strong>Input:</strong> <code className="bg-gray-900/60 px-1 rounded">{result.input}</code></div>
                      <div><strong>Expected:</strong> <code className="bg-gray-900/60 px-1 rounded">{result.expected}</code></div>
                      <div><strong>Your Output:</strong> <code className="bg-gray-900/60 px-1 rounded">{result.actual}</code></div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}