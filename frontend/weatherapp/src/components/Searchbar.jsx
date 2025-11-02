import React, { useState } from "react";

function Searchbar() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // ✅ Backend URL from .env
  const API = import.meta.env.VITE_API_URL;

  // ✅ Fetch weather from backend
  const fetchWeather = async () => {
    if (!query) return;
    try {
      const res = await fetch(
        `${API}/api/weather?query=${encodeURIComponent(query)}`
      );
      const data = await res.json();
      console.log("API Response:", data);

      if (!data.success || !data.data) {
        setError("Could not fetch weather data");
        setWeather(null);
        return;
      }

      setWeather(data.data);
      setError("");
      setMessage("");
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Could not fetch weather data.");
      setWeather(null);
    }
  };

  // ✅ Save fetched weather data to backend
  const saveWeather = async () => {
    if (!weather) return alert("Please fetch weather first!");

    try {
      const res = await fetch(`${API}/api/save`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(weather),
      });

      const data = await res.json();
      console.log("Save Response:", data);

      if (data.success) {
        setMessage("Weather data saved successfully!");
      } else {
        setMessage("Unable to save data.");
      }
    } catch (err) {
      console.error("Save error:", err);
      setMessage("Unable to save data (server error).");
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="bg-gray-800/50 backdrop-blur-md rounded-2xl p-8 border border-gray-700/50 shadow-2xl">
            <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-blue-500/30">
              <svg
                className="w-8 h-8 text-blue-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M5 3a1 1 0 000 2c5.523 0 10 4.477 10 10a1 1 0 102 0C17 8.373 11.627 3 5 3z" />
                <path d="M5 7a1 1 0 000 2 5 5 0 015 5 1 1 0 102 0 7 7 0 00-7-7z" />
                <path d="M5 11a1 1 0 100 2 1 1 0 000-2z" />
              </svg>
            </div>
            <h1 className="text-4xl font-bold text-white mb-2">
              Weather Forecast
            </h1>
            <p className="text-gray-300 text-lg">
              Get real-time weather updates
            </p>
          </div>
        </div>

        {/* Search Section */}
        <div className="bg-gray-800/50 backdrop-blur-md rounded-2xl shadow-2xl p-6 mb-6 border border-gray-700/50">
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              placeholder="Enter city name, e.g., Jalgaon"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && fetchWeather()}
              className="flex-1 px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
            />
            <button
              onClick={fetchWeather}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              Search
            </button>
          </div>
        </div>

        {/* Messages */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-6 py-4 rounded-xl mb-6 flex items-center gap-3 shadow-lg backdrop-blur-md">
            <svg
              className="w-5 h-5 text-red-400 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
            {error}
          </div>
        )}

        {message && (
          <div className="bg-green-500/10 border border-green-500/20 text-green-400 px-6 py-4 rounded-xl mb-6 flex items-center gap-3 shadow-lg backdrop-blur-md">
            <svg
              className="w-5 h-5 text-green-400 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            {message}
          </div>
        )}

        {/* Weather Display */}
        {weather && (
          <div className="space-y-6">
            {/* Current Weather Card */}
            <div className="bg-gray-800/50 backdrop-blur-md rounded-2xl shadow-2xl p-6 border border-gray-700/50">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">
                  {weather.location?.name}
                </h2>
                <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center border border-blue-500/30">
                  <svg
                    className="w-5 h-5 text-blue-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-r from-blue-500/10 to-blue-600/10 rounded-xl p-6 border border-blue-500/20">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-3xl font-bold text-white">
                        {weather.current?.main?.temp ?? "--"}°C
                      </p>
                      <p className="text-gray-300 text-sm">Temperature</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-green-500/10 to-emerald-600/10 rounded-xl p-6 border border-green-500/20">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xl font-semibold text-white capitalize">
                        {weather.current?.weather?.[0]?.description ?? "--"}
                      </p>
                      <p className="text-gray-300 text-sm">Condition</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Forecast Section */}
            <div className="bg-gray-800/50 backdrop-blur-md rounded-2xl shadow-2xl p-6 border border-gray-700/50">
              <div className="flex items-center gap-3 mb-6">
                <h3 className="text-xl font-bold text-white">5-Day Forecast</h3>
                <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center border border-purple-500/30">
                  <svg
                    className="w-4 h-4 text-purple-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {weather.forecast?.map((day, i) => (
                  <div
                    key={i}
                    className="bg-gray-700/50 hover:bg-gray-700/70 rounded-xl p-4 border border-gray-600/50 transition-all duration-200 hover:scale-105"
                  >
                    <div className="text-sm font-semibold text-white mb-2">
                      {day.date}
                    </div>
                    <div className="text-xs text-gray-300 mb-3 line-clamp-2">
                      {day.summary}
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-blue-300 font-medium">
                        {day.min}°C
                      </span>
                      <span className="text-gray-500 mx-1">/</span>
                      <span className="text-red-300 font-medium">
                        {day.max}°C
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Save Button */}
            <button
              onClick={saveWeather}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-3 border border-green-500/30"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Save Weather Data
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Searchbar;
