import React, { useState } from "react";
import Searchbar from "./components/Searchbar";
import SavedRequests from "./components/SavedRequests";
import WeatherCard from "./components/WeatherCard";

function App() {
  const [weather, setWeather] = useState(null);
  const [activeTab, setActiveTab] = useState("search");
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Header */}
      <div className="bg-gray-800/50 backdrop-blur-md border-b border-gray-700/50 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo + Title */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center border border-blue-500/30">
                <svg
                  className="w-5 h-5 text-blue-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M5 3a1 1 0 000 2c5.523 0 10 4.477 10 10a1 1 0 102 0C17 8.373 11.627 3 5 3z" />
                  <path d="M5 7a1 1 0 000 2 5 5 0 015 5 1 1 0 102 0 7 7 0 00-7-7z" />
                  <path d="M5 11a1 1 0 100 2 1 1 0 000-2z" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-white">Weather App 🌦️</h1>
            </div>

            {/* Tabs */}
            <div className="flex space-x-1 bg-gray-700/50 rounded-xl p-1 border border-gray-600/50">
              <button
                onClick={() => setActiveTab("search")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeTab === "search"
                    ? "bg-blue-500 text-white shadow-lg"
                    : "text-gray-300 hover:text-white hover:bg-gray-600/50"
                }`}
              >
                Weather Search
              </button>
              <button
                onClick={() => setActiveTab("saved")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeTab === "saved"
                    ? "bg-blue-500 text-white shadow-lg"
                    : "text-gray-300 hover:text-white hover:bg-gray-600/50"
                }`}
              >
                Saved Records
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-grow py-8">
        {activeTab === "search" && (
          <div className="space-y-8">
            <Searchbar onSearch={setWeather} />
            {weather && (
              <div className="max-w-4xl mx-auto px-4">
                <WeatherCard data={weather} />
              </div>
            )}
          </div>
        )}

        {activeTab === "saved" && <SavedRequests />}
      </div>

      {/* Footer */}
      <footer className="bg-gray-800/60 border-t border-gray-700/40 text-center py-4 text-gray-300">
        <p className="text-sm">
          Developed by{" "}
          <span className="text-blue-400 font-semibold">Kalesh Patil</span>
        </p>

        <button
          onClick={() => setShowInfo(!showInfo)}
          className="mt-2 px-4 py-1 text-sm bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-all duration-200"
        >
          {showInfo ? "Hide Info" : "Info"}
        </button>

        {showInfo && (
          <div className="mt-3 max-w-3xl mx-auto bg-gray-700/40 text-gray-200 p-6 rounded-lg border border-gray-600 shadow-md text-left space-y-3">
            <h3 className="text-lg font-semibold text-blue-400">
              About PM Accelerator 🚀
            </h3>
            <p className="text-sm leading-relaxed">
              <strong>Product Manager Accelerator (PMA)</strong> is a global
              learning platform dedicated to empowering aspiring and experienced
              Product Managers. PMA helps individuals gain hands-on experience,
              sharpen leadership skills, and land roles at top companies through
              structured programs, mentorship, and real-world projects.
            </p>

            <ul className="list-disc list-inside text-sm text-gray-300 space-y-1">
              <li>
                <strong>PMA Pro:</strong> End-to-end PM job program with
                FAANG-level training and mock interviews.
              </li>
              <li>
                <strong>AI PM Bootcamp:</strong> Build and launch real AI
                products with engineers and designers.
              </li>
              <li>
                <strong>PMA Power Skills:</strong> Strengthen leadership,
                strategy, and communication as a PM.
              </li>
              <li>
                <strong>PMA Leader:</strong> Accelerate your career to Director,
                VP, or CPO level.
              </li>
            </ul>

            <p className="text-sm leading-relaxed">
              PM Accelerator was founded in <strong>2020</strong> and is
              headquartered in <strong>Boston, MA</strong>. The program has
              helped thousands of professionals worldwide transition into and
              excel in Product Management.
            </p>

            <p className="text-sm text-gray-300">
              🌐{" "}
              <a
                href="https://www.pmaccelerator.io/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline"
              >
                www.pmaccelerator.io
              </a>{" "}
              | 📞 +1 (954) 889-1063 |{" "}
              <a
                href="https://www.linkedin.com/company/product-manager-accelerator/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline"
              >
                LinkedIn →
              </a>
            </p>
          </div>
        )}
      </footer>
    </div>
  );
}

export default App;