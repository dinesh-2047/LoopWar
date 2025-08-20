import { useEffect, useState } from "react";

const mockData = [
  { id: 1, username: "Unknown 1", score: 150, matchesWon: 12 },
  { id: 2, username: "Unknown 2", score: 120, matchesWon: 9 },
  { id: 3, username: "Unknown 3", score: 100, matchesWon: 7 },
];

function Leaderboard() {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    setPlayers(mockData.sort((a, b) => b.score - a.score));
  }, []);

  return (
    <div className="bg-gradient-to-br from-gray-900 via-purple-900/50 to-black text-white text-center p-10">
      <h1 className="text-3xl font-bold mb-4 text-center mt-12">
        🏆 Leaderboard{" "}
      </h1>
      <p className="text-lg font-semibold tracking-wider">
        &nbsp; &nbsp; This is the Leaderboard page.
      </p>
      <p className="text-small font-extralight tracking-widest mb-1.5">
        &nbsp; &nbsp; Here you can view the top players and their scores.
      </p>
      <p className="text-lg font-bold">&nbsp; &nbsp; Stay tuned for updates!</p>

      <div className="overflow-x-auto mt-8">
        <table className="w-full border border-gray-200 shadow-xl rounded-2xl overflow-hidden text-center">
          <thead className="bg-gradient-to-r from-purple-600 to-blue-500 text-white">
            <tr>
              <th className="p-4 font-semibold">Rank</th>
              <th className="p-4 font-semibold">Username</th>
              <th className="p-4 font-semibold">Score</th>
              <th className="p-4 font-semibold">Matches Won</th>
            </tr>
          </thead>
          <tbody>
            {players.map((player, index) => {
              let rankColor =
                index === 0
                  ? "bg-yellow-100 text-yellow-700 font-bold"
                  : index === 1
                  ? "bg-gray-100 text-gray-700 font-bold"
                  : index === 2
                  ? "bg-orange-100 text-orange-700 font-bold"
                  : "bg-white";

              return (
                <tr
                  key={player.id}
                  className={`transition transform hover:scale-[1.01] hover:shadow-md ${rankColor}`}
                >

                  <td className="p-4 text-lg">
                    {index === 0
                      ? "🥇"
                      : index === 1
                      ? "🥈"
                      : index === 2
                      ? "🥉"
                      : index + 1}
                  </td>

                  <td className="p-4 flex items-center justify-center gap-3">
                    <img
                      src={`https://api.dicebear.com/7.x/bottts/svg?seed=${player.username}`}
                      alt={player.username}
                      className="w-9 h-9 rounded-full border"
                    />
                    <span className="font-medium">{player.username}</span>
                  </td>

                  <td className="p-4 text-base font-medium">{player.score}</td>

                  <td className="p-4 text-base font-medium">
                    {player.matchesWon}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Leaderboard;
