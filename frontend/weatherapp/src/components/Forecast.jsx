import React from "react";

function Forecast({ data }) {
  return (
    <div className="bg-gray-800/50 backdrop-blur-md rounded-2xl shadow-2xl p-6 border border-gray-700/50">
      {/* Header */}
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

      {/* Forecast Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {data.map((day, i) => (
          <div
            key={i}
            className="bg-gray-700/50 hover:bg-gray-700/70 rounded-xl p-4 border border-gray-600/50 transition-all duration-200 hover:scale-105 group"
          >
            {/* Date */}
            <div className="text-sm font-semibold text-white mb-3 text-center group-hover:text-blue-300 transition-colors">
              {day.date}
            </div>

            {/* Temperature */}
            <div className="flex items-center justify-center gap-2 mb-3">
              <div className="w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center border border-blue-500/30">
                <svg
                  className="w-3 h-3 text-blue-400"
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
              <p className="text-lg font-bold text-white">{day.temp}°C</p>
            </div>

            {/* Description */}
            <div className="text-xs text-gray-300 text-center leading-tight line-clamp-2 capitalize">
              {day.desc}
            </div>

            {/* Additional Weather Info (if available) */}
            {(day.min || day.max) && (
              <div className="flex items-center justify-center gap-2 mt-3 pt-3 border-t border-gray-600/30">
                {day.min && (
                  <span className="text-xs text-blue-300 font-medium">
                    {day.min}°C
                  </span>
                )}
                {day.min && day.max && (
                  <span className="text-xs text-gray-500">|</span>
                )}
                {day.max && (
                  <span className="text-xs text-red-300 font-medium">
                    {day.max}°C
                  </span>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Forecast;
