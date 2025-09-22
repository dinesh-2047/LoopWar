import React, { useState, useEffect } from "react";

function Header() {
  return (
    <header className="w-full py-4 px-6 bg-gradient-to-r from-[#2b1b6b] to-[#5b39d6] text-white">
      <div className="max-w-6xl mx-auto flex items-center gap-6">
        <div className="text-2xl font-extrabold tracking-wider">LOOPWAR</div>
        <nav className="hidden md:flex gap-4 text-sm opacity-90">
          <a className="hover:underline">Create Room</a>
          <a className="hover:underline">Join Room</a>
          <a className="hover:underline">Tournaments</a>
        </nav>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="w-full py-6 mt-8 border-t border-gray-800 bg-transparent text-gray-400">
      <div className="max-w-6xl mx-auto text-center text-sm">
        © {new Date().getFullYear()} LoopWar — Built for friendly duels
      </div>
    </footer>
  );
}

export default function CreateRoom() {
  const [roomName, setRoomName] = useState("");
  const [password, setPassword] = useState("");
  const [maxPlayers, setMaxPlayers] = useState(4);
  const [difficulty, setDifficulty] = useState("easy");
  const [loading, setLoading] = useState(false);
  const [roomLink, setRoomLink] = useState(null);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const move = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setCopied(false);
    if (!roomName.trim()) {
      setError("Room name is required!");
      return;
    }
    setError("");
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      const fakeRoomId = Math.random().toString(36).slice(2, 9);
      const link = `${window.location.origin}/join-room/${fakeRoomId}`;
      setRoomLink(link);
    }, 900);
  };

  const handleCopy = async () => {
    if (!roomLink) return;
    try {
      await navigator.clipboard.writeText(roomLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b0f1e] via-[#1a1333] to-[#0b0f1e] text-gray-200 flex flex-col relative overflow-hidden">
      <style>{`
        .frost {
          background: linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01));
          backdrop-filter: blur(8px);
        }
        .neon-btn {
          box-shadow: 0 6px 18px rgba(91,57,214,0.18), inset 0 -2px 6px rgba(0,0,0,0.25);
        }
        .glow {
          animation: glowPulse 2.4s infinite;
        }
        @keyframes glowPulse {
          0% { box-shadow: 0 0 0 rgba(91,57,214,0.10); }
          50% { box-shadow: 0 0 30px rgba(91,57,214,0.18); }
          100% { box-shadow: 0 0 0 rgba(91,57,214,0.10); }
        }
        .grid-bg {
          background-image: linear-gradient(rgba(139,92,246,0.1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(139,92,246,0.1) 1px, transparent 1px);
          background-size: 50px 50px;
          mask-image: radial-gradient(ellipse at center, white, transparent);
        }
      `}</style>

      {/* Animated Background */}
      <div className="absolute inset-0 grid-bg opacity-30"></div>
      <div
        className="pointer-events-none absolute w-[600px] h-[600px] rounded-full blur-3xl bg-purple-700/20"
        style={{ left: mousePos.x - 300, top: mousePos.y - 300 }}
      ></div>

      <Header />

      <main className="flex-grow flex items-center justify-center px-4 py-12 relative z-10">
        <div
          className="w-full max-w-xl transition-transform duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(138,92,246,0.4)]"
        >
          <div className="frost rounded-2xl border border-gray-700 p-8 shadow-xl">
            <h1 className="text-center text-3xl font-bold mb-6 text-indigo-300">
              Create a Room
            </h1>

            {!roomLink ? (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Room Name */}
                <div>
                  <label className="block text-sm mb-2 text-gray-300">
                    Room Name
                  </label>
                  <div className="relative">
                    <div className="absolute left-3 top-2 text-gray-400">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M12 2L3 6v6c0 5 3 9 9 10 6-1 9-5 9-10V6l-9-4z"
                          stroke="currentColor"
                          strokeWidth="1.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <input
                      className="w-full pl-11 pr-3 py-3 rounded-lg bg-[#0f1628] border border-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="Enter room name"
                      value={roomName}
                      onChange={(e) => setRoomName(e.target.value)}
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm mb-2 text-gray-300">
                    Password (optional)
                  </label>
                  <div className="relative">
                    <div className="absolute left-3 top-2 text-gray-400">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <rect
                          x="3"
                          y="11"
                          width="18"
                          height="10"
                          rx="2"
                          stroke="currentColor"
                          strokeWidth="1.2"
                        />
                        <path
                          d="M7 11V8a5 5 0 0 1 10 0v3"
                          stroke="currentColor"
                          strokeWidth="1.2"
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>
                    <input
                      className="w-full pl-11 pr-3 py-3 rounded-lg bg-[#0f1628] border border-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="Enter password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>

                {/* Max players + difficulty row */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm mb-2 text-gray-300">
                      Max Players
                    </label>
                    <input
                      type="number"
                      min="2"
                      max="16"
                      value={maxPlayers}
                      onChange={(e) => setMaxPlayers(e.target.value)}
                      className="w-full py-3 px-3 rounded-lg bg-[#0f1628] border border-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm mb-2 text-gray-300">
                      Difficulty
                    </label>
                    <select
                      value={difficulty}
                      onChange={(e) => setDifficulty(e.target.value)}
                      className="w-full py-3 px-3 rounded-lg bg-[#0f1628] border border-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="easy">Easy</option>
                      <option value="medium">Medium</option>
                      <option value="hard">Hard</option>
                    </select>
                  </div>
                </div>

                {error && <div className="text-red-400 text-sm">{error}</div>}

                {/* Button */}
                <div className="mt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 rounded-xl neon-btn bg-gradient-to-r from-[#6c47ff] to-[#c84cf1] text-white font-semibold hover:opacity-95 transition relative overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-3">
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        className="opacity-90"
                      >
                        <path
                          d="M22 2s-2.5 3-5 4c-2.5 1-6 1-8 3s-2 5-1 7c1 2 4 3 6 3s5-1 6-3 3-4 3-5-2-5-1-9z"
                          stroke="currentColor"
                          strokeWidth="1.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      {loading ? "Creating..." : "Create Room"}
                    </span>
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-4 text-center">
                <div className="inline-block px-4 py-2 rounded-full bg-emerald-600 text-black font-semibold">
                  Room Ready
                </div>
                <h3 className="text-xl font-bold text-indigo-200">
                  Invite players
                </h3>
                <div className="bg-[#0b1324] p-3 rounded-md text-sm break-all border border-gray-700">
                  {roomLink}
                </div>
                <div className="flex gap-3 mt-3">
                  <button
                    onClick={handleCopy}
                    className="flex-1 py-2 rounded-lg bg-emerald-600 text-black font-semibold"
                  >
                    {copied ? "Copied ✔" : "Copy Link"}
                  </button>
                  <button
                    onClick={() => (window.location = "/")}
                    className="flex-1 py-2 rounded-lg bg-gray-700 text-gray-200"
                  >
                    Back Home
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="mt-4 text-xs text-gray-500 text-center">
            Tip: Use a short memorable room name so friends can join quickly.
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
