import { useEffect, useState } from "react";
import CodeEditor from "../components/CodeEditor";

const mockData = [
  {
    id: 1,
    username: "Unknown 1",
    score: 150,
    matchesWon: 12,
    matchesPlayed: 15,
    streak: "🔥 4W",
    country: "🇮🇳",
  },
  {
    id: 2,
    username: "Unknown 2",
    score: 120,
    matchesWon: 9,
    matchesPlayed: 12,
    streak: "💥 2W",
    country: "🇺🇸",
  },
  {
    id: 3,
    username: "Unknown 3",
    score: 100,
    matchesWon: 7,
    matchesPlayed: 11,
    streak: "😐 1L",
    country: "🇯🇵",
  },
  {
    id: 4,
    username: "Unknown 4",
    score: 95,
    matchesWon: 6,
    matchesPlayed: 10,
    streak: "🔥 3W",
    country: "🇬🇧",
  },
  {
    id: 5,
    username: "Unknown 5",
    score: 80,
    matchesWon: 5,
    matchesPlayed: 9,
    streak: "💔 2L",
    country: "🇨🇦",
  },
];

function Leaderboard() {
  const [players, setPlayers] = useState([]);
  const [code, setCode] = useState("// Start coding here...");

  useEffect(() => {
    const sorted = [...mockData].sort((a, b) => b.score - a.score);
    setPlayers(sorted);
  }, []);

  return (
    <div className="bg-gradient-to-br from-gray-900 via-purple-900/50 to-black text-white text-center p-10 min-h-screen">

      <h1 className="text-3xl font-bold mb-4 text-center mt-12">
        🏆 Leaderboard
      </h1>
      <h1 className="text-4xl font-bold mb-4 text-center mt-12">🏆 Leaderboard</h1>
      <p className="text-lg font-semibold tracking-wider">
        View the top players and their scores!
      </p>
      <p className="text-sm font-extralight tracking-widest mb-6">
        Updated in real-time as matches progress.
      </p>

      <div className="overflow-x-auto mt-8 rounded-2xl shadow-2xl border border-gray-700">
        <table className="w-full text-sm md:text-base text-center overflow-hidden">
          <thead className="bg-gradient-to-r from-purple-700 to-indigo-600 text-white">
            <tr>
              <th className="p-4">Rank</th>
              <th className="p-4">Player</th>
              <th className="p-4">Score</th>
              <th className="p-4">Matches Won</th>
              <th className="p-4">Matches Played</th>
              <th className="p-4">Win %</th>
              <th className="p-4">Streak</th>
              <th className="p-4">Country</th>
            </tr>
          </thead>
          <tbody>
  {players.map((player, index) => {
    const winRate = ((player.matchesWon / player.matchesPlayed) * 100).toFixed(1);
    const progressBarWidth = `${(player.score / players[0].score) * 100}%`;

    const rankColor =
      index === 0
        ? "bg-yellow-100 text-yellow-800"
        : index === 1
        ? "bg-gray-100 text-gray-800"
        : index === 2
        ? "bg-orange-100 text-orange-800"
        : "bg-white text-black";

    return (
      <tr
        key={player.id}
        className={`transition duration-300 ease-in-out hover:bg-gradient-to-r hover:from-purple-800/40 hover:to-indigo-800/30 hover:shadow-lg hover:shadow-purple-500/30 ${rankColor}`}
      >
        {/* Rank */}
        <td className="p-4 text-xl">
          {index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : index + 1}
        </td>

        {/* Player Avatar + Name */}
        <td className="p-4 flex items-center justify-center gap-3">
          <img
            src={`https://api.dicebear.com/7.x/bottts/svg?seed=${player.username}`}
            alt={player.username}
            className="w-9 h-9 rounded-full border"
          />
          <span className="font-medium">{player.username}</span>
        </td>

        {/* Score */}
        <td className="p-4 text-base font-medium">{player.score}</td>

        {/* Matches Won */}
        <td className="p-4 font-semibold">{player.matchesWon}</td>

        {/* Matches Played */}
        <td className="p-4 font-semibold">{player.matchesPlayed}</td>

        {/* Win % */}
        <td className="p-4 font-semibold">{winRate}%</td>

        {/* Streak */}
        <td className="p-4">{player.streak}</td>

        {/* Country */}
        <td className="p-4">{player.country}</td>
      </tr>
    );
  })}
</tbody>

        </table>
      </div>

      {/* Code editor demo section */}
      <div className="mt-12 text-left">
        <h2 className="text-2xl font-bold mb-4">💻 Try the Code Editor</h2>
        <CodeEditor value={code} onChange={setCode} />
      </div>
    </div>
  );
}

export default Leaderboard;
