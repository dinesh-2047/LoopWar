import React, { useRef, useEffect, useState } from "react";
import { Video, Mic, MicOff, User, Users, Phone, PhoneOff } from "lucide-react";

const RoomVoiceVideoChat = () => {
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const [inCall, setInCall] = useState(false);
  const [error, setError] = useState("");
  const [stream, setStream] = useState(null);
  const [micOn, setMicOn] = useState(true);

  useEffect(() => {
    if (!inCall) return;
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((mediaStream) => {
        setStream(mediaStream);
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = mediaStream;
        }
      })
      .catch((err) => setError("Could not access camera/mic: " + err.message));
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [inCall, stream]);

  const toggleMic = () => {
    if (stream) {
      stream.getAudioTracks().forEach(track => {
        track.enabled = !micOn;
      });
      setMicOn(!micOn);
    }
  };

  return (
    <div className="min-h-[70vh] bg-gradient-to-br from-violet-900 via-purple-900/80 to-black p-12 rounded-3xl text-white max-w-3xl mx-auto mt-16 shadow-2xl border border-violet-700/30 relative">
      <div className="absolute top-6 right-8 flex items-center gap-2">
        <Users className="w-6 h-6 text-violet-400" />
        <span className="text-sm text-gray-300">Room Demo</span>
      </div>
      <h2 className="text-4xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-pink-400">Voice/Video Chat</h2>
      <div className="mb-6 flex items-center gap-4">
        {inCall ? (
          <span className="flex items-center gap-2 text-green-400 animate-pulse"><Phone className="w-5 h-5" /> Live</span>
        ) : (
          <span className="flex items-center gap-2 text-gray-400"><PhoneOff className="w-5 h-5" /> Offline</span>
        )}
      </div>
      <div className="flex gap-10 justify-center mb-8">
        <div className="flex flex-col items-center">
          <span className="block text-sm mb-2 text-gray-300 flex items-center gap-2"><User className="w-5 h-5" /> You</span>
          <video ref={localVideoRef} autoPlay playsInline muted className="rounded-2xl w-96 h-72 bg-gray-900 border-4 border-violet-700 shadow-2xl" />
        </div>
        <div className="flex flex-col items-center">
          <span className="block text-sm mb-2 text-gray-300 flex items-center gap-2"><Video className="w-5 h-5" /> Remote</span>
          <video ref={remoteVideoRef} autoPlay playsInline className="rounded-2xl w-96 h-72 bg-gray-900 border-4 border-gray-700 shadow-2xl" />
        </div>
      </div>
      <div className="flex justify-center gap-6 mb-8">
        <button
          className={`px-7 py-3 rounded-full font-semibold text-lg transition-colors duration-200 flex items-center gap-3 ${inCall ? 'bg-red-600 hover:bg-red-700' : 'bg-violet-600 hover:bg-violet-700'}`}
          onClick={() => setInCall(!inCall)}
        >
          {inCall ? <PhoneOff className="w-5 h-5" /> : <Phone className="w-5 h-5" />}
          {inCall ? "End Call" : "Start Call"}
        </button>
        <button
          className={`px-7 py-3 rounded-full font-semibold text-lg transition-colors duration-200 flex items-center gap-3 ${micOn ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-600 hover:bg-gray-700'}`}
          onClick={toggleMic}
          disabled={!inCall}
        >
          {micOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
          {micOn ? "Mute" : "Unmute"}
        </button>
      </div>
      {error && <div className="text-red-400 mt-4 text-center text-lg">{error}</div>}
      <div className="mt-4 text-sm text-gray-400 text-center">This is a demo. For real rooms, integrate with a signaling server and connect users in the same room.</div>
    </div>
  );
};

export default RoomVoiceVideoChat;