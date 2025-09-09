// frontend/src/components/CreateRoom.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // for redirect after success

export default function CreateRoom() {
  const navigate = useNavigate();
  const [roomName, setRoomName] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  // validation
  function validate() {
    const e = {};
    if (!roomName.trim()) {
      e.roomName = "Room name is required.";
    } else if (roomName.trim().length < 3) {
      e.roomName = "Room name must be at least 3 characters.";
    }
    return e;
  }

  async function handleSubmit(ev) {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) return;

    setLoading(true);
    setSuccessMsg("");

    try {
      // ✅ adjust this API endpoint to match your backend
      const res = await fetch("/api/rooms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: roomName, password }),
      });

      if (!res.ok) throw new Error("Failed to create room");

      const data = await res.json();
      setSuccessMsg("Room created successfully!");
      setRoomName("");
      setPassword("");
      setErrors({});

      // redirect after short delay
      setTimeout(() => {
        const roomId = data.roomId || data.id;
        if (roomId) {
          navigate(`/room/${roomId}`);
        } else {
          navigate("/");
        }
      }, 1000);
    } catch (err) {
      setErrors({ submit: err.message });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-10 p-6 bg-white rounded-2xl shadow space-y-4"
    >
      <h2 className="text-xl font-semibold">Create a Room</h2>

      <div>
        <label htmlFor="roomName" className="block text-sm font-medium mb-1">
          Room Name
        </label>
        <input
          id="roomName"
          type="text"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          placeholder="e.g. Coding Battle"
          className={`w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
            errors.roomName ? "border-red-500" : "border-gray-200"
          }`}
        />
        {errors.roomName && (
          <p className="text-sm text-red-600 mt-1">{errors.roomName}</p>
        )}
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium mb-1">
          Password (optional)
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Leave empty for public room"
          className="w-full rounded-lg border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {errors.submit && (
        <p className="text-sm text-red-600">{errors.submit}</p>
      )}

      <div className="flex items-center justify-between">
        <button
          type="submit"
          disabled={loading}
          className={`px-4 py-2 rounded-md text-white font-medium ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700"
          }`}
        >
          {loading ? "Creating..." : "Create Room"}
        </button>

        {successMsg && (
          <span className="text-sm text-green-600">{successMsg}</span>
        )}
      </div>
    </form>
  );
}
