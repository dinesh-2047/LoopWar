import { useState, useEffect } from "react";
import { Calendar, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [filter, setFilter] = useState("upcoming"); // upcoming / past
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("https://codeforces.com/api/contest.list");
        const data = await res.json();

        if (data.status === "OK") {
          const now = Date.now() / 1000;

          const upcoming = data.result
            .filter((contest) => contest.phase === "BEFORE")
            .map((contest) => ({
              id: contest.id,
              title: contest.name,
              date: new Date(contest.startTimeSeconds * 1000),
              description: `Duration: ${Math.floor(contest.durationSeconds / 3600)} hrs`,
              link: `https://codeforces.com/contests/${contest.id}`,
            }));

          const past = data.result
            .filter((contest) => contest.phase === "FINISHED")
            .slice(0, 15) // show recent 15
            .map((contest) => ({
              id: contest.id,
              title: contest.name,
              date: new Date(contest.startTimeSeconds * 1000),
              description: `Duration: ${Math.floor(contest.durationSeconds / 3600)} hrs`,
              link: `https://codeforces.com/contest/${contest.id}`,
            }));

          setEvents(filter === "upcoming" ? upcoming : past);
        }
      } catch (err) {
        console.error("Error fetching events:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [filter]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white py-16 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <motion.h1
          className="text-5xl font-extrabold text-center mb-8 bg-gradient-to-r from-fuchsia-500 to-violet-400 bg-clip-text text-transparent"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          ⚡ Coding Contests & Events
        </motion.h1>
        <p className="text-center text-gray-300 mb-12 text-lg">
          Explore live and upcoming coding competitions from <span className="text-violet-400 font-semibold">Codeforces</span>.
        </p>

        {/* Filter Buttons */}
        <div className="flex justify-center gap-6 mb-12">
          {["upcoming", "past"].map((type) => (
            <button
              key={type}
              className={`px-6 py-2 rounded-2xl font-semibold transition-all ${
                filter === type
                  ? "bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white shadow-lg scale-105"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
              onClick={() => setFilter(type)}
            >
              {type === "upcoming" ? "Upcoming 🚀" : "Past 📜"}
            </button>
          ))}
        </div>

        {/* Events Grid */}
        {loading ? (
          <p className="text-center text-gray-400 animate-pulse">Loading events...</p>
        ) : events.length === 0 ? (
          <p className="text-center text-gray-400">No {filter} events found.</p>
        ) : (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            {events.map((event) => (
              <motion.div
                key={event.id}
                className="bg-black/60 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:shadow-xl hover:shadow-violet-500/30 transition-all"
                whileHover={{ scale: 1.05 }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <Calendar className="w-5 h-5 text-violet-400" />
                  <span className="text-gray-300 font-medium">
                    {event.date.toLocaleString([], {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </span>
                </div>
                <h2 className="text-2xl font-bold mb-3 text-violet-300">{event.title}</h2>
                <p className="text-gray-400 mb-6">{event.description}</p>
                <a
                  href={event.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-600 to-fuchsia-500 hover:from-violet-500 hover:to-fuchsia-400 text-white font-semibold px-4 py-2 rounded-2xl transition-all shadow-md"
                >
                  Register
                  <ExternalLink className="w-4 h-4" />
                </a>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Events;
