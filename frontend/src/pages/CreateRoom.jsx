import React from "react";
import { useState } from "react";

export const CreateRoom=()=> {
  const [roomName, setRoomName] = useState("");
  const [maxPlayers, setMaxPlayers] = useState(2);
  const [password, setpassword] = useState("")

  const handleCreate = (e) => {
    e.preventDefault();
    // Later  can connect this with backend
    console.log("Room Created:", { roomName, maxPlayers });
    alert(`Room "${roomName}" created with ${maxPlayers} players!`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-pink-500">
      <div className="bg-white/10 p-8 rounded-2xl shadow-xl w-96 backdrop-blur-lg">
        <h1 className="text-2xl font-bold text-white mb-6 text-center">
          Create Room
        </h1>

        <form onSubmit={handleCreate} className="space-y-4">
          <div>
            <label className="block text-white mb-1">Room Name</label>
            <input
              type="text"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
              placeholder="Enter room name"
              className="w-full px-3 py-2 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-white mb-1">Max Players</label>
            <input
              type="number"
              min="2"
              max="10"
              value={maxPlayers}
              onChange={(e) => setMaxPlayers(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-white mb-1">Password</label>
            <input type="password" value={password} onChange={(e)=>setpassword(e.target.value)} placeholder="Enter password" className="w-full px-3 py-2 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none" required/>
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-gradient-to-r from-violet-400 via-purple-500 to-pink-400 text-white font-semibold rounded-lg hover:opacity-90 transition"
          >
            Create
          </button>
        </form>
      </div>
    </div>
  );
}
