import React from "react";

function WeatherCard({ data }) {
  return (
    <div className="bg-gray-800/50 backdrop-blur-md rounded-2xl shadow-2xl p-6 border border-gray-700/50 hover:shadow-2xl transition-all duration-300 hover:scale-105">
      {/* Location Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-white truncate">{data.location}</h2>
        <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center border border-blue-500/30">
          <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
        </div>
      </div>

      {/* Temperature - Main Highlight */}
      <div className="bg-gradient-to-r from-blue-500/10 to-blue-600/10 rounded-xl p-4 border border-blue-500/20 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
          <div>
            <p className="text-2xl font-bold text-white">{data.temperature}°C</p>
            <p className="text-sm text-gray-300">Temperature</p>
          </div>
        </div>
      </div>

      {/* Weather Description */}
      {data.description && (
        <div className="flex items-center gap-3 mb-4 p-3 bg-gray-700/30 rounded-lg border border-gray-600/30">
          <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center border border-green-500/30">
            <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-medium text-white capitalize">{data.description}</p>
            <p className="text-xs text-gray-400">Condition</p>
          </div>
        </div>
      )}

      {/* Weather Details Grid */}
      <div className="grid grid-cols-2 gap-3">
        {/* Humidity */}
        <div className="flex items-center gap-2 p-3 bg-gray-700/30 rounded-lg border border-gray-600/30">
          <div className="w-6 h-6 bg-blue-400/20 rounded flex items-center justify-center border border-blue-400/30">
            <svg className="w-3 h-3 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-medium text-white">{data.humidity}%</p>
            <p className="text-xs text-gray-400">Humidity</p>
          </div>
        </div>

        {/* Wind Speed */}
        <div className="flex items-center gap-2 p-3 bg-gray-700/30 rounded-lg border border-gray-600/30">
          <div className="w-6 h-6 bg-gray-400/20 rounded flex items-center justify-center border border-gray-400/30">
            <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.59 4.59A2 2 0 1111 8H2m10.59 11.41A2 2 0 1014 16H2m15.73-8.27A2.5 2.5 0 1119.5 12H2" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-medium text-white">{data.wind_speed} km/h</p>
            <p className="text-xs text-gray-400">Wind</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeatherCard;